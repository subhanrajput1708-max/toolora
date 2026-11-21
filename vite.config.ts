import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import { ALL_TOOLS } from './src/data/tools';
import { ALL_GUIDES } from './src/data/guides';
import { SITE_CONFIG } from './src/data/site';

interface StaticRouteMeta {
  routePath: string;
  title: string;
  description: string;
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

  return baseHtml
    .replace(/<title>.*?<\/title>/s, `<title>${safeTitle}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/s,
      `<meta name="description" content="${safeDesc}" />`
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
  return {
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ and generates static per-route HTML entry points + 404.html for GitHub Pages
      {
        name: 'copy-assets-and-static-routes',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, { recursive: true, force: true });
          }

          const indexHtmlPath = path.join(distDir, 'index.html');
          if (!fs.existsSync(indexHtmlPath)) return;
          const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

          const staticRoutes: StaticRouteMeta[] = [
            {
              routePath: '/tools/',
              title: 'All Free Online Tools — 22 Everyday Utilities | TooloraHub',
              description:
                'Browse all 22 free online tools on TooloraHub across Text & Writing, Web & Internet, Everyday Calculators, and File & Productivity.',
            },
            {
              routePath: '/guides/',
              title: 'Guides & Practical Tips — Digital Productivity & Formatting | TooloraHub',
              description:
                'Explore practical guides on text formatting, URL slugs, HTML entities, everyday calculations, and browser productivity.',
            },
            {
              routePath: '/about/',
              title: 'About Us — TooloraHub & Developer Muhammad Subhan',
              description:
                'Learn about TooloraHub, our focus on simple browser-based utilities, and developer Muhammad Subhan with 6 years of web development experience.',
            },
            {
              routePath: '/contact/',
              title: 'Contact Us — Reach Developer Muhammad Subhan | TooloraHub',
              description:
                'Contact TooloraHub developer Muhammad Subhan via email, phone, or the validated contact form for tool suggestions or support.',
            },
            {
              routePath: '/privacy-policy/',
              title: 'Privacy Policy | TooloraHub',
              description:
                'Read the TooloraHub Privacy Policy explaining how tools process input inside your browser and how direct contact inquiries are handled.',
            },
            {
              routePath: '/terms-and-conditions/',
              title: 'Terms & Conditions | TooloraHub',
              description:
                'Review the Terms & Conditions for accessing and using the free online utilities and guides published on TooloraHub.',
            },
            {
              routePath: '/disclaimer/',
              title: 'Disclaimer | TooloraHub',
              description:
                'Read the TooloraHub Disclaimer regarding calculation estimates, unit conversions, and informational guide content.',
            },
            ...ALL_TOOLS.map((tool) => ({
              routePath: tool.path,
              title: tool.metaTitle,
              description: tool.metaDescription,
            })),
            ...ALL_GUIDES.map((guide) => ({
              routePath: guide.path,
              title: guide.metaTitle,
              description: guide.metaDescription,
            })),
          ];

          for (const route of staticRoutes) {
            const relDir = route.routePath.replace(/^\/+|\/+$/g, '');
            if (!relDir) continue;
            const targetDir = path.join(distDir, relDir);
            fs.mkdirSync(targetDir, { recursive: true });
            fs.writeFileSync(path.join(targetDir, 'index.html'), injectRouteMeta(baseHtml, route), 'utf-8');
          }

          // Generate 404.html for GitHub Pages so unknown URLs render the React 404 page directly without redirecting to homepage
          const notFoundHtml = injectRouteMeta(baseHtml, {
            routePath: '/404.html',
            title: 'Page Not Found (404) | TooloraHub',
            description: 'The requested page could not be found on TooloraHub.',
          });
          fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');
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
