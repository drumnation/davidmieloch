import { getPublishedArticles, getSiteUrl } from '../../src/content/articles';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function GET() {
  const siteUrl = getSiteUrl();
  const articles = getPublishedArticles();
  const items = articles
    .map((article) => {
      return `<item>
  <title>${escapeXml(article.title)}</title>
  <description>${escapeXml(article.description)}</description>
  <link>${escapeXml(article.canonicalUrl)}</link>
  <guid isPermaLink="true">${escapeXml(article.canonicalUrl)}</guid>
  <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
</item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>David Mieloch Writing</title>
  <description>Essays and field notes on AI-native software work, agents, and engineering judgment.</description>
  <link>${siteUrl}/blog</link>
  <language>en-us</language>
  ${items}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
