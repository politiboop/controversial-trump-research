import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://research.thetrumptracker.com',
  output: 'static',
  build: {
    format: 'directory',
  },
});
