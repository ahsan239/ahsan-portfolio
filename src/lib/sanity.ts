
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Check if the project is using a placeholder ID
export const isSanityConfigured = !!(projectId && projectId !== 'your-project-id');

export const client = createClient({
  projectId: projectId || 'your-project-id',
  dataset: dataset,
  apiVersion: '2024-01-01',
  useCdn: false, // Set to true for production if you have high traffic
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * GROQ Queries for Projects
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
