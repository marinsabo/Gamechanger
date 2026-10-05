// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL / BASE_PATH are injected by the GitHub Pages workflow so the same
// build works on a custom domain and on <user>.github.io/<repo>/.
const site = process.env.SITE_URL ?? 'https://gamechanger.hr';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'hr', locales: { hr: 'hr-HR', en: 'en-US' } },
    }),
  ],
  image: {
    layout: 'constrained',
  },
});
