import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/reviews?agentId=xxx
 * Returns all reviews for an agent, with user profile info.
 *
 * POST /api/reviews
 * Creates a review. Requires auth.
 * Body: { agentId, rating, title?, body? }
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const agentId = searchParams.get("agentId");

  if (!agentId) {
    return NextResponse.json(
      { error: "agentId is required" },
      { status: 400 }
    );
  }

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

  // Also get aggregate stats
  const { data: stats } = await supabase
    .from("agent_review_stats")
    .select("*")
    .eq("agent_id", agentId)
    .single();

  return NextResponse.json({ reviews: data, stats });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { agentId, rating, title, reviewBody } = body;

  // Validate
  if (!agentId || !rating || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "agentId and rating (1-5) are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      agent_id: agentId,
      user_id: user.id,
      rating,
      title: title || null,
      body: reviewBody || null,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      // unique violation — user already reviewed this agent
      return NextResponse.json(
        { error: "You have already reviewed this agent" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ review: data }, { status: 201 });
}
