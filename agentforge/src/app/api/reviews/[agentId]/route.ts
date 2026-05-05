import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/reviews/[agentId]
 * Returns all reviews for a specific agent.
 *
 * PATCH /api/reviews/[agentId]
 * Update own review.
 *
 * DELETE /api/reviews/[agentId]
 * Delete own review.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const { agentId } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reviews")
    .select(`
      id, agent_id, rating, title, body, helpful, created_at, updated_at,
      user_id,
      profiles:user_id ( username, avatar_url )
    `)
    .eq("agent_id", agentId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: stats } = await supabase
    .from("agent_review_stats")
    .select("*")
    .eq("agent_id", agentId)
    .single();

  return NextResponse.json({ reviews: data, stats });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const { agentId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { rating, title, reviewBody } = body;

  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (rating !== undefined) updates.rating = rating;
  if (title !== undefined) updates.title = title;
  if (reviewBody !== undefined) updates.body = reviewBody;

  const { data, error } = await supabase
    .from("reviews")
    .update(updates)
    .eq("agent_id", agentId)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  return NextResponse.json({ review: data });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ agentId: string }> }
) {
  const { agentId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("agent_id", agentId)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
