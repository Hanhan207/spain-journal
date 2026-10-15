import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  output: 'static',
  site: 'https://hanhan207.github.io',
  base: isGitHubPages ? '/spain-journal' : '/',
  trailingSlash: 'always',
  integrations: [react()],
});
