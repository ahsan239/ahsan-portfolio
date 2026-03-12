
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

/**
 * @fileOverview Sanity Client Configuration
 * Uses hardcoded Project ID for reliable production access.
 */

const projectId = '61no71y9'; // Hardcoded Project ID to ensure data loads in deployed environments
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const isSanityConfigured = !!(projectId && projectId.length >= 5);

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production', 
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export const PROJECTS_QUERY = `*[_type == "project"] | order(createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  "imageUrl": coverImage.asset->url,
  technologies,
  featured,
  liveLink,
  githubLink
}`;

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  fullDescription,
  "imageUrl": coverImage.asset->url,
  technologies,
  liveLink,
  githubLink,
  gallery[] {
    "url": asset->url
  }
}`;
