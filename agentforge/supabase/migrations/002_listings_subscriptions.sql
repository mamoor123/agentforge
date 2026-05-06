-- ─── Listings (paid tier overrides) ─────────────────────────────────────────
create table public.listings (
  id            uuid primary key default uuid_generate_v4(),
  agent_id      text not null unique,        -- matches agents.json id
  tier          text not null default 'basic' check (tier in ('basic', 'featured', 'spotlight')),
  email         text,
  name          text,
  status        text not null default 'active' check (status in ('active', 'cancelled', 'expired')),
  activated_at  timestamptz not null default now(),
  expires_at    timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.listings enable row level security;

create policy "Listings viewable by everyone"
  on public.listings for select using (true);

create policy "Service role can manage listings"
  on public.listings for all using (true);

create index idx_listings_agent_id on public.listings (agent_id);
create index idx_listings_tier on public.listings (tier);

-- ─── Subscriptions (Lemon Squeezy) ─────────────────────────────────────────
create table public.subscriptions (
  id                uuid primary key default uuid_generate_v4(),
  listing_id        uuid not null references public.listings (id) on delete cascade,
  lemon_squeezy_id  text unique,             -- Lemon Squeezy subscription/order ID
  variant_id        text,                    -- Lemon Squeezy variant ID
  status            text not null default 'active',
  customer_email    text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

create policy "Service role can manage subscriptions"
  on public.subscriptions for all using (true);

create index idx_subscriptions_listing_id on public.subscriptions (listing_id);
create index idx_subscriptions_ls_id on public.subscriptions (lemon_squeezy_id);
