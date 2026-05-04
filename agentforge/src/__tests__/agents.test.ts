import { agents, categories, getAgentById, getFeaturedAgents, getNewAgents, formatUsers, searchAgents } from "@/data/agents";

describe("Agent Data", () => {
  test("has 500+ agents", () => {
    expect(agents.length).toBeGreaterThanOrEqual(500);
  });

  test("has 15 categories", () => {
    expect(categories.length).toBe(15);
  });

  test("all agents have required fields", () => {
    agents.forEach(agent => {
      expect(agent.id).toBeTruthy();
      expect(agent.name).toBeTruthy();
      expect(agent.url).toBeTruthy();
      expect(agent.rating).toBeGreaterThanOrEqual(0);
      expect(agent.rating).toBeLessThanOrEqual(5);
      expect(agent.users).toBeGreaterThanOrEqual(0);
      expect(["Free", "Freemium", "Premium", "Pay-as-you-go", "Custom"]).toContain(agent.price);
    });
  });

  test("no duplicate agent ids", () => {
    const ids = agents.map(a => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("getAgentById returns correct agent", () => {
    const cursor = getAgentById("cursor");
    expect(cursor).toBeDefined();
    expect(cursor?.name).toBe("Cursor");
  });

  test("getAgentById returns undefined for missing id", () => {
    expect(getAgentById("nonexistent")).toBeUndefined();
  });

  test("getFeaturedAgents returns only featured agents", () => {
    const featured = getFeaturedAgents();
    expect(featured.length).toBeGreaterThan(0);
    featured.forEach(a => expect(a.featured).toBe(true));
  });

  test("getNewAgents returns only new agents", () => {
    const newAgents = getNewAgents();
    expect(newAgents.length).toBeGreaterThan(0);
    newAgents.forEach(a => expect(a.new).toBe(true));
  });

  test("formatUsers formats correctly", () => {
    expect(formatUsers(500)).toBe("500");
    expect(formatUsers(1000)).toBe("1K+");
    expect(formatUsers(50000)).toBe("50K+");
    expect(formatUsers(1000000)).toBe("1M+");
    expect(formatUsers(200000000)).toBe("200M+");
  });

  test("searchAgents finds by name", () => {
    const results = searchAgents("cursor");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(a => a.name.toLowerCase().includes("cursor"))).toBe(true);
  });

  test("searchAgents finds by tag", () => {
    const results = searchAgents("SEO");
    expect(results.length).toBeGreaterThan(0);
  });
});

describe("Categories", () => {
  test("all category slugs are unique", () => {
    const slugs = categories.map(c => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test("agent categories match defined categories", () => {
    const categorySlugs = new Set(categories.map(c => c.slug));
    agents.forEach(agent => {
      expect(categorySlugs.has(agent.categorySlug)).toBe(true);
    });
  });
});
