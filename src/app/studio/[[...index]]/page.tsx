
'use client';

/**
 * @fileOverview This route hosts the embedded Sanity Studio.
 * Allows managing content directly at /studio.
 */

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
