import { NextResponse } from "next/server";
import { agents, categories } from "@/data/agents";

export async function GET() {
  const totalAgents = agents.length;
  const totalUsers = agents.reduce((sum, a) => sum + a.users, 0);
  const avgRating = (agents.reduce((sum, a) => sum + a.rating, 0) / agents.length).toFixed(1);
  const freeAgents = agents.filter(a => a.price === "Free").length;
  const featuredAgents = agents.filter(a => a.featured).length;
  const newAgents = agents.filter(a => a.new).length;

  return NextResponse.json({
    totalAgents,
    totalUsers,
    avgRating: parseFloat(avgRating),
    freeAgents,
    featuredAgents,
    newAgents,
    categories: categories.length,
  });
}
