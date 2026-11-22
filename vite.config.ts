import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import { ALL_TOOLS } from './src/data/tools';
import { SITE_CONFIG } from './src/data/site';

interface StaticRouteMeta {
  routePath: string;
  title: string;
  description: string;
  robots?: string;
}

function normalizeBasePath(raw?: string): string {
  if (!raw || raw.trim() === '' || raw.trim() === '/') return '/';
  const trimmed = raw.trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectRouteMeta(baseHtml: string, meta: StaticRouteMeta): string {
  const canonicalUrl = `${SITE_CONFIG.domain}${meta.routePath}`;
  const safeTitle = escapeHtmlAttr(meta.title);
  const safeDesc = escapeHtmlAttr(meta.description);
  const safeRobots = escapeHtmlAttr(meta.robots ?? 'index, follow');

  return baseHtml
    .replace(/<title>.*?<\/title>/s, `<title>${safeTitle}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/s,
      `<meta name="description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/s,
      `<meta name="robots" content="${safeRobots}" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/s,
      `<link rel="canonical" href="${canonicalUrl}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/s,
      `<meta property="og:url" content="${canonicalUrl}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/s,
      `<meta property="og:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/s,
      `<meta property="og:description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/s,
      `<meta name="twitter:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/s,
      `<meta name="twitter:description" content="${safeDesc}" />`
    );
}

export default defineConfig(() => {
  const basePath = normalizeBasePath(process.env.VITE_BASE_PATH || '/');

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'rewrite-public-favicon-base',
        transformIndexHtml(html: string): string {
          if (basePath === '/') return html;
          return html
            .replace(/href="\/logo\.png"/g, `href="${basePath}logo.png"`)
            .replace(/href="\/sitemap\.xml"/g, `href="${basePath}sitemap.xml"`);
        },
      },
      {
        name: 'copy-assets-and-static-routes',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const indexHtmlPath = path.join(distDir, 'index.html');
          if (!fs.existsSync(indexHtmlPath)) return;
          const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

          const staticRoutes: StaticRouteMeta[] = [
            {
              routePath: '/tools/',
              title: 'All 50 Free Online Tools | TooloraHub',
              description:
                'Browse all 50 free browser-based utilities on TooloraHub across Text, Calculators, Finance, Date & Time, Conversions, Productivity, and Web Tools.',
            },
            {
              routePath: '/about/',
              title: 'About TooloraHub & Muhammad Subhan | TooloraHub',
              description:
                'Learn what TooloraHub is, how its 50 utilities across 7 categories and Toolora Assistant work, and meet developer Muhammad Subhan (6 years of experience).',
            },
            {
              routePath: '/contact/',
              title: 'Contact Us — Support & Tool Ideas | TooloraHub',
              description:
                'Contact TooloraHub developer Muhammad Subhan via email, phone, or the validated email-draft form for tool ideas, bug reports, or feedback.',
            },
            {
              routePath: '/sitemap/',
              title: 'Sitemap — All Pages & 50 Free Tools | TooloraHub',
              description:
                'Browse the complete TooloraHub sitemap with direct links to all 50 free browser tools across 7 categories, core site pages, and legal policies.',
            },
            {
              routePath: '/privacy-policy/',
              title: 'Privacy Policy | TooloraHub',
              description:
                'Read TooloraHub’s Privacy Policy covering local browser tools, Toolora Assistant, voluntary contact details, cookies, and user rights.',
            },
            {
              routePath: '/terms-and-conditions/',
              title: 'Terms & Conditions | TooloraHub',
              description:
                'Review TooloraHub’s Terms & Conditions covering permitted use, user responsibilities, accuracy limits, intellectual property, and liability.',
            },
            {
              routePath: '/disclaimer/',
              title: 'Disclaimer | TooloraHub',
              description:
                'Read the TooloraHub Disclaimer regarding general informational use, calculator and tool guide limitations, and verification responsibilities.',
            },
            ...ALL_TOOLS.map((tool) => ({
              routePath: tool.path,
              title: tool.metaTitle,
              description: tool.metaDescription,
            })),
          ];

          for (const route of staticRoutes) {
            const relDir = route.routePath.replace(/^\/+|\/+$/g, '');
            if (!relDir) continue;
            const targetDir = path.join(distDir, relDir);
            fs.mkdirSync(targetDir, { recursive: true });
            fs.writeFileSync(path.join(targetDir, 'index.html'), injectRouteMeta(baseHtml, route), 'utf-8');
          }

          const notFoundHtml = injectRouteMeta(baseHtml, {
            routePath: '/404.html',
            title: 'Page Not Found (404) | TooloraHub',
            description: 'The requested page could not be found on TooloraHub.',
            robots: 'noindex, follow',
          });
          fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

          // Generate up-to-date SEO XML sitemap for all canonical indexable URLs
          const lastMod = new Date().toISOString().slice(0, 10);
          const xmlEntries: Array<{ path: string; changefreq: string; priority: string }> = [
            { path: '/', changefreq: 'weekly', priority: '1.0' },
            { path: '/tools/', changefreq: 'weekly', priority: '0.9' },
            { path: '/sitemap/', changefreq: 'weekly', priority: '0.7' },
            { path: '/about/', changefreq: 'monthly', priority: '0.7' },
            { path: '/contact/', changefreq: 'monthly', priority: '0.7' },
            { path: '/privacy-policy/', changefreq: 'yearly', priority: '0.4' },
            { path: '/terms-and-conditions/', changefreq: 'yearly', priority: '0.4' },
            { path: '/disclaimer/', changefreq: 'yearly', priority: '0.4' },
            ...ALL_TOOLS.map((tool) => ({
              path: tool.path,
              changefreq: 'monthly',
              priority: '0.8',
            })),
          ];

          const xmlBody = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...xmlEntries.map(
              (item) =>
                `  <url>\n    <loc>${SITE_CONFIG.domain}${item.path}</loc>\n    <lastmod>${lastMod}</lastmod>\n    <changefreq>${item.changefreq}</changefreq>\n    <priority>${item.priority}</priority>\n  </url>`
            ),
            '</urlset>',
            '',
          ].join('\n');

          fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xmlBody, 'utf-8');
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
