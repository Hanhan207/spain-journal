import { createStudioConfig } from './sanity/studioConfig';

export default createStudioConfig(
  process.env.PUBLIC_SANITY_PROJECT_ID!,
  process.env.PUBLIC_SANITY_DATASET || 'production',
);
