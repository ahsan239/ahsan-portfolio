import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';

/**
 * @fileOverview Sanity Studio Configuration
 * Hardcoded Project ID to ensure the Studio connects correctly in deployed environments.
 */

const projectId = '61no71y9';
const dataset = 'production';

export default defineConfig({
  name: 'default',
  title: 'Ahsan Portfolio Studio',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});