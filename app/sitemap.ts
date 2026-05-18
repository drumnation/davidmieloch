import type { MetadataRoute } from 'next';

import { getPublishedArticles, getSiteUrl } from '../src/content/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const staticRoutes = [
    '',
    '/blog',
    '/bio',
    '/experience',
    '/code-examples',
    '/contact',
    '/enterprise-ai-development-framework',
    '/fullstack-react-best-practices-integration',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const articleRoutes = getPublishedArticles().map((article) => ({
    url: article.canonicalUrl,
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
  }));

  return [...staticRoutes, ...articleRoutes];
}
