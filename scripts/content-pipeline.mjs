#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

import { loadDotEnvFile } from './lib/load-dotenv.mjs';

const appRoot = process.cwd();
const envPath = path.join(appRoot, '.env.local');
const contentRoot = process.env.CONTENT_ROOT
  ? path.resolve(process.env.CONTENT_ROOT)
  : path.join(appRoot, 'content');
const articlesRoot = path.join(contentRoot, 'articles');
const ledgerPath = path.join(contentRoot, 'distribution/platform-ledger.json');
const statusPath = path.join(contentRoot, 'distribution/pipeline-status.json');

function redact(value) {
  if (!value) return null;
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(rawFrontmatter) {
  const meta = {};
  for (const line of rawFrontmatter.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separatorIndex = trimmed.indexOf(':');
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      meta[key] = value
        .slice(1, -1)
        .split(',')
        .map((item) => parseScalar(item))
        .filter(Boolean);
    } else {
      meta[key] = parseScalar(value);
    }
  }
  return meta;
}

function readMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const frontmatter = raw.match(/^---\n([\s\S]*?)\n---\n\n?/);
  if (!frontmatter) return { body: raw.trim(), meta: {} };
  return {
    body: raw.slice(frontmatter[0].length).trim(),
    meta: parseFrontmatter(frontmatter[1]),
  };
}

function readArticle(slug) {
  const articlePath = path.join(articlesRoot, slug, 'index.md');
  if (!fs.existsSync(articlePath)) {
    throw new Error(`Missing article: ${articlePath}`);
  }
  const { body, meta } = readMarkdown(articlePath);
  return { slug, body, meta };
}

function readVariant(slug, platform) {
  const variantPath = path.join(articlesRoot, slug, 'variants', `${platform}.md`);
  if (!fs.existsSync(variantPath)) {
    throw new Error(`Missing ${platform} variant: ${variantPath}`);
  }
  return readMarkdown(variantPath);
}

function readLedger() {
  if (!fs.existsSync(ledgerPath)) {
    throw new Error(`Missing distribution ledger: ${ledgerPath}`);
  }
  return JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
}

function hashnodeToken() {
  return process.env.HASHNODE_TOKEN ?? process.env.HASHNODE_API_KEY;
}

async function devto(pathname, options = {}) {
  if (!process.env.DEVTO_API_KEY) {
    throw new Error('Missing DEVTO_API_KEY. Refusing to call DEV API.');
  }
  const response = await fetch(`https://dev.to/api${pathname}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': process.env.DEVTO_API_KEY,
      ...(options.headers ?? {}),
    },
  });
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;
  if (!response.ok) throw new Error(`DEV API ${response.status}: ${JSON.stringify(payload)}`);
  return payload;
}

async function hashnode(query, variables = {}) {
  const token = hashnodeToken();
  if (!token) {
    throw new Error('Missing HASHNODE_TOKEN or HASHNODE_API_KEY. Refusing to call Hashnode API.');
  }
  const response = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const payload = await response.json();
  if (!response.ok || payload.errors) {
    throw new Error(`Hashnode API ${response.status}: ${JSON.stringify(payload.errors ?? payload)}`);
  }
  return payload.data;
}

async function status() {
  const result = {
    checkedAt: new Date().toISOString(),
    configured: {
      devto: Boolean(process.env.DEVTO_API_KEY),
      hashnode: Boolean(hashnodeToken()),
      hashnodePublication: Boolean(process.env.HASHNODE_PUBLICATION_ID),
      medium: 'browser-import',
      linkedin: 'browser-capture',
      hackernoon: 'browser-editorial',
      substack: 'browser-newsletter',
      dzone: 'browser-editorial',
    },
    tokens: {
      devto: redact(process.env.DEVTO_API_KEY),
      hashnode: redact(hashnodeToken()),
    },
    accounts: {},
  };

  if (process.env.DEVTO_API_KEY) {
    const me = await devto('/users/me');
    const articles = await devto('/articles/me/all?per_page=20');
    result.accounts.devto = {
      id: me.id,
      name: me.name,
      username: me.username,
      websiteUrl: me.website_url,
      articleCount: articles.length,
      drafts: articles
        .filter((article) => !article.published)
        .map((article) => ({ id: article.id, title: article.title, url: article.url })),
    };
  }

  if (hashnodeToken()) {
    const data = await hashnode(`
      query Me {
        me {
          id
          username
          name
          publications(first: 20) {
            edges {
              node { id title url }
            }
          }
          drafts(first: 20) {
            edges {
              node { id title slug canonicalUrl }
            }
            totalDocuments
          }
        }
      }
    `);
    result.accounts.hashnode = data.me;
  }

  fs.mkdirSync(path.dirname(statusPath), { recursive: true });
  fs.writeFileSync(statusPath, `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify(result, null, 2));
}

function validate() {
  const ledger = readLedger();
  const errors = [];
  const articleSlugs = fs.existsSync(articlesRoot)
    ? fs
        .readdirSync(articlesRoot, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
    : [];

  for (const slug of articleSlugs) {
    const articlePath = path.join(articlesRoot, slug, 'index.md');
    if (!fs.existsSync(articlePath)) continue;
    const article = readArticle(slug);
    const ledgerArticle = ledger.articles?.[slug];
    if (!ledgerArticle) errors.push(`${slug}: missing ledger entry`);
    if (article.meta.status === 'published' && !article.meta.canonicalUrl) {
      errors.push(`${slug}: published article is missing canonicalUrl`);
    }
    if (article.meta.status === 'published' && !String(article.meta.canonicalUrl).startsWith('https://davidmieloch.com/blog/')) {
      errors.push(`${slug}: canonicalUrl must point to davidmieloch.com/blog`);
    }
  }

  for (const [slug, article] of Object.entries(ledger.articles ?? {})) {
    if (!article.platforms) {
      errors.push(`${slug}: missing platform statuses`);
      continue;
    }
    for (const [platform, record] of Object.entries(article.platforms)) {
      const statusValue = record?.status;
      if (Array.isArray(statusValue)) {
        errors.push(`${slug}/${platform}: status must be a single string`);
      }
      if (statusValue === 'published' && !record.url) {
        errors.push(`${slug}/${platform}: published platform status requires url`);
      }
    }
  }

  if (errors.length > 0) {
    console.error(`Validation failed:\n- ${errors.join('\n- ')}`);
    process.exit(1);
  }

  console.log(JSON.stringify({ ok: true, articles: articleSlugs.length }, null, 2));
}

function scheduleDryRun(slug) {
  const article = readArticle(slug);
  const platforms = {
    davidmieloch: { action: 'canonical-site-build', mode: 'local-build' },
    linkedin: { action: 'create-launch-post', mode: 'requires-browser-confirmation' },
    medium: { action: 'import-canonical-url', mode: 'requires-browser-confirmation' },
    devto: { action: 'create-unpublished-draft', mode: 'api-backed' },
    hashnode: { action: 'create-delisted-draft', mode: 'api-backed' },
    hackernoon: { action: 'import-canonical-url-submit-review', mode: 'requires-browser-confirmation' },
    dzone: { action: 'prepare-editorial-submission', mode: 'requires-browser-confirmation' },
    substack: { action: 'prepare-newsletter-draft', mode: 'requires-browser-confirmation' },
  };

  console.log(JSON.stringify({
    slug,
    title: article.meta.title,
    canonicalUrl: article.meta.canonicalUrl,
    publicPosting: 'not-performed-by-this-command',
    platforms,
  }, null, 2));
}

async function createDevtoDraft(slug) {
  const { body, meta } = readVariant(slug, 'devto');
  const article = readArticle(slug);
  const payload = {
    article: {
      title: meta.title ?? article.meta.title,
      body_markdown: body,
      published: false,
      tags: Array.isArray(meta.tags) ? meta.tags.slice(0, 4) : article.meta.tags,
      description: meta.description ?? article.meta.description,
      canonical_url: meta.canonical_url ?? article.meta.canonicalUrl,
    },
  };
  const created = await devto('/articles', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  console.log(JSON.stringify({
    platform: 'devto',
    action: 'created-unpublished-draft',
    id: created.id,
    title: created.title,
    published: created.published,
    url: created.url,
  }, null, 2));
}

async function createHashnodeDraft(slug) {
  if (!process.env.HASHNODE_PUBLICATION_ID) {
    throw new Error('Missing HASHNODE_PUBLICATION_ID. Refusing to call Hashnode API.');
  }
  const { body, meta } = readVariant(slug, 'hashnode');
  const article = readArticle(slug);
  const tags = Array.isArray(meta.tags) ? meta.tags : article.meta.tags;
  const data = await hashnode(`
    mutation CreateDraft($input: CreateDraftInput!) {
      createDraft(input: $input) {
        draft { id slug title canonicalUrl }
      }
    }
  `, {
    input: {
      title: meta.title ?? article.meta.title,
      subtitle: meta.description ?? article.meta.description,
      publicationId: process.env.HASHNODE_PUBLICATION_ID,
      contentMarkdown: body,
      originalArticleURL: meta.canonical_url ?? article.meta.canonicalUrl,
      tags: tags.map((name) => ({
        name,
        slug: String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      })),
      settings: {
        enableTableOfContent: true,
        activateNewsletter: false,
        delist: true,
      },
    },
  });
  console.log(JSON.stringify({
    platform: 'hashnode',
    action: 'created-delisted-draft',
    draft: data.createDraft.draft,
  }, null, 2));
}

function linkedinCaptureList() {
  console.log(JSON.stringify({
    sourceOfTruth: 'linkedin',
    url: 'https://www.linkedin.com/in/davidmieloch/recent-activity/articles/',
    status: 'authenticated-browser-required',
    outputConvention: 'content/articles/<slug>/source-linkedin.md',
    note: 'If browser capture is unavailable, request a fresh LinkedIn data export and normalize each article into the same source-linkedin.md convention.',
  }, null, 2));
}

function usage() {
  console.log(`Usage:
  pnpm content:pipeline status
  pnpm content:pipeline validate
  pnpm content:pipeline schedule:dry-run <slug>
  pnpm content:pipeline devto:create-draft <slug>
  pnpm content:pipeline hashnode:create-draft <slug>
  pnpm content:pipeline linkedin:capture-list

Safety:
  - DEV and Hashnode commands create unpublished/delisted drafts only.
  - Medium, LinkedIn, HackerNoon, DZone, and Substack remain browser/editorial workflows.
  - No command in this script publishes public content.
`);
}

loadDotEnvFile(envPath);

const [command, slug] = process.argv.slice(2);

try {
  if (command === 'status') {
    await status();
  } else if (command === 'validate') {
    validate();
  } else if (command === 'schedule:dry-run' && slug) {
    scheduleDryRun(slug);
  } else if (command === 'devto:create-draft' && slug) {
    await createDevtoDraft(slug);
  } else if (command === 'hashnode:create-draft' && slug) {
    await createHashnodeDraft(slug);
  } else if (command === 'linkedin:capture-list') {
    linkedinCaptureList();
  } else {
    usage();
    process.exit(command ? 1 : 0);
  }
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
