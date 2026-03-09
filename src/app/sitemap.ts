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
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hire`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cms`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.1,
    },
  ];
}
