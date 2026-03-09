import { MetadataRoute } from 'next';

/**
 * @fileOverview Generates robots.txt for the portfolio.
 * Aligns with PRD Section 3.6 (SEO & Performance).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cms', '/api/'],
    },
    sitemap: 'https://alexrivera.dev/sitemap.xml',
  };
}
