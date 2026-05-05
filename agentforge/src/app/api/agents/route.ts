import { NextResponse } from "next/server";
import { agents, categories, searchAgents } from "@/data/agents";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";
  const price = searchParams.get("price") || "all";
  const sort = searchParams.get("sort") || "popular";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "24");

  // Use Fuse.js fuzzy search when there's a query
  let filtered = q ? searchAgents(q) : [...agents];

  if (category !== "all") {
    filtered = filtered.filter((a) => a.categorySlug === category);
  }

  if (price !== "all") {
    filtered = filtered.filter((a) => a.price === price);
  }

  if (sort === "popular") {
    filtered.sort((a, b) => b.users - a.users);
  } else if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === "newest") {
    filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
  } else if (sort === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    agents: paginated,
    total,
    page,
    totalPages,
    categories,
  });
}
