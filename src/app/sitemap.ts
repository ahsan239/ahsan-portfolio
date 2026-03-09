import { MetadataRoute } from 'next';

/**
 * @fileOverview Generates the sitemap for the portfolio.
 * Aligns with PRD Section 3.6 (SEO & Performance).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alexrivera.dev';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/hire`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cms`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.1, // CMS should not be high priority for indexing
    },
  ];
}
