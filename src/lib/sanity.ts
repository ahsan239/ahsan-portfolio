
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

/**
 * Validates if the Sanity Project ID is a real value (not a placeholder).
 */
export const isSanityConfigured = !!(projectId && projectId !== 'your-project-id' && projectId.length > 5);

export const client = createClient({
  projectId: projectId || '61no71y9',
  dataset: dataset,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production', 
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * GROQ Queries for Projects
 * Fetches core metadata for project cards on the homepage.
 */
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

/**
 * GROQ Query for Individual Project
 * Fetches full details including rich text and gallery images.
 */
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
