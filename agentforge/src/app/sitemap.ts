import type { MetadataRoute } from 'next';
import { agents, categories } from '@/data/agents';

const BASE_URL = 'https://agentforge.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${BASE_URL}/agents`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/categories`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  const categoryPages = categories.map(cat => ({
    url: `${BASE_URL}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const agentPages = agents.map(agent => ({
    url: `${BASE_URL}/agents/${agent.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...agentPages];
}
