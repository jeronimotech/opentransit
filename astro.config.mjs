import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jeronimotech.github.io',
  base: '/opentransit',
  trailingSlash: 'always',
  vite: { plugins: [tailwindcss()] },
  integrations: [
    starlight({
      title: 'opentransit',
      description: 'Open-source, multi-city, multimodal trip planning on open data.',
      logo: { src: './src/assets/logo.svg', replacesTitle: false },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/jeronimotech/opentransit' },
      ],
      defaultLocale: 'root',
      locales: {
        root: { label: 'Español', lang: 'es' },
        en: { label: 'English', lang: 'en' },
      },
      editLink: { baseUrl: 'https://github.com/jeronimotech/opentransit/edit/main/' },
      customCss: ['./src/styles/starlight.css'],
      sidebar: [
        { label: 'Empezar', translations: { en: 'Get started' }, items: [
          { slug: 'docs' },
          { slug: 'docs/getting-started' },
          { slug: 'docs/architecture' },
        ] },
        { label: 'Guías', translations: { en: 'Guides' }, items: [
          { slug: 'docs/adding-a-city' },
          { slug: 'docs/admin-panel' },
          { slug: 'docs/web-app' },
          { slug: 'docs/mobile-app' },
          { slug: 'docs/data-quality' },
        ] },
        { label: 'Referencia', translations: { en: 'Reference' }, items: [
          { slug: 'docs/api' },
          { slug: 'docs/roadmap' },
          { slug: 'docs/faq' },
        ] },
        { label: 'Proyecto', translations: { en: 'Project' }, items: [
          { slug: 'docs/contributing' },
          { slug: 'docs/governance' },
          { slug: 'docs/security' },
          { slug: 'docs/license' },
        ] },
      ],
    }),
    sitemap(),
  ],
});
