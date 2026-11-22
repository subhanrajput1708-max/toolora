import { useEffect } from 'react';
import { SITE_CONFIG } from '../data/site';

interface PageMetaOptions {
  title: string;
  description: string;
  path: string;
  robots?: string;
  schema?: Record<string, unknown>;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function usePageMeta({
  title,
  description,
  path,
  robots = 'index, follow',
  schema,
}: PageMetaOptions) {
  useEffect(() => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${SITE_CONFIG.domain}${normalizedPath}`;

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', robots);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    const scriptId = 'toolorahub-page-schema';
    const existing = document.getElementById(scriptId);
    if (existing) {
      existing.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [title, description, path, robots, schema]);
}
