import { NextResponse } from "next/server";
import { getAgentById, agents } from "@/data/agents";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const agent = getAgentById(id);

  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  const related = agents
    .filter(a => a.categorySlug === agent.categorySlug && a.id !== agent.id)
    .slice(0, 3);

  return NextResponse.json({ agent, related });
}
