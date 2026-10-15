import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary';
import { muxInput } from 'sanity-plugin-mux-input';
import { schemaTypes } from './schemaTypes';

export function createStudioConfig(projectId: string, dataset = 'production') {
  return defineConfig({
    name: 'spain-journal',
    title: '旅行与个人网站',
    projectId,
    dataset,
    plugins: [
      structureTool(),
      visionTool(),
      cloudinarySchemaPlugin(),
      muxInput({
        video_quality: 'basic',
        max_resolution_tier: '1080p',
        acceptedMimeTypes: ['video/*'],
      }),
    ],
    schema: { types: schemaTypes },
  });
}
