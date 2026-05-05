-- AgentForge — Supabase initial schema
-- Run: supabase db push  (or paste into Supabase SQL editor)

-- ─── Extensions ──────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Profiles ────────────────────────────────────────────────────────────────
-- Mirrors auth.users with extra app-specific fields.
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  username    text unique,
  avatar_url  text,
  bio         text,
  website     text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create a profile row when a user signs up.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── Reviews ─────────────────────────────────────────────────────────────────
create table public.reviews (
  id          uuid primary key default uuid_generate_v4(),
  agent_id    text not null,           -- matches agents.json id
  user_id     uuid not null references auth.users (id) on delete cascade,
  rating      smallint not null check (rating between 1 and 5),
  title       text,
  body        text,
  helpful     int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (agent_id, user_id)           -- one review per user per agent
);

alter table public.reviews enable row level security;

create policy "Reviews are viewable by everyone"
  on public.reviews for select using (true);

create policy "Authenticated users can insert reviews"
  on public.reviews for insert
  with check (auth.uid() = user_id);

create policy "Users can update own reviews"
  on public.reviews for update using (auth.uid() = user_id);

create policy "Users can delete own reviews"
  on public.reviews for delete using (auth.uid() = user_id);

create index idx_reviews_agent_id on public.reviews (agent_id);
create index idx_reviews_user_id  on public.reviews (user_id);

-- ─── Favorites (saved agents) ────────────────────────────────────────────────
create table public.favorites (
  id          uuid primary key default uuid_generate_v4(),
  agent_id    text not null,
  user_id     uuid not null references auth.users (id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (agent_id, user_id)
);

alter table public.favorites enable row level security;

create policy "Users can view own favorites"
  on public.favorites for select using (auth.uid() = user_id);

create policy "Authenticated users can insert favorites"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own favorites"
  on public.favorites for delete using (auth.uid() = user_id);

create index idx_favorites_user_id on public.favorites (user_id);

-- ─── Review votes (helpful / not helpful) ────────────────────────────────────
create table public.review_votes (
  id          uuid primary key default uuid_generate_v4(),
  review_id   uuid not null references public.reviews (id) on delete cascade,
  user_id     uuid not null references auth.users (id) on delete cascade,
  is_helpful  boolean not null,
  created_at  timestamptz not null default now(),
  unique (review_id, user_id)
);

alter table public.review_votes enable row level security;

create policy "Review votes viewable by everyone"
  on public.review_votes for select using (true);

create policy "Authenticated users can vote"
  on public.review_votes for insert
  with check (auth.uid() = user_id);

create policy "Users can change own vote"
  on public.review_votes for update using (auth.uid() = user_id);

-- ─── Agent stats (materialized view for fast reads) ──────────────────────────
create or replace view public.agent_review_stats as
  select
    agent_id,
    count(*)                as review_count,
    round(avg(rating), 1)   as avg_rating,
    count(*) filter (where rating = 5) as five_star,
    count(*) filter (where rating = 4) as four_star,
    count(*) filter (where rating = 3) as three_star,
    count(*) filter (where rating = 2) as two_star,
    count(*) filter (where rating = 1) as one_star
  from public.reviews
  group by agent_id;
