import { spawnSync } from 'child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { createRequire } from 'node:module';
import { join } from 'path';
import { tmpdir } from 'os';
import { afterEach, describe, expect, it, vi } from 'vitest';
import sharp from 'sharp';

import {
  generatePlatformPackages,
  loadSyndicationPolicy,
} from '../../scripts/lib/platform-packages.mjs';
import {
  buildDistributionQueue,
  distributionQueueMarkdown,
  filterDistributionQueue,
} from '../../scripts/lib/distribution-queue.mjs';
import {
  buildPublishSchedule,
  dueScheduleEntries,
  publishScheduleMarkdown,
} from '../../scripts/lib/content-scheduler.mjs';
import {
  contentMetricsChecklist,
  contentMetricsReport,
  recordContentMetric,
} from '../../scripts/lib/content-metrics.mjs';
import {
  buildContentLedger,
  contentLedgerMarkdown,
} from '../../scripts/lib/content-ledger.mjs';
import {
  buildArticleImageManifest,
} from '../../scripts/lib/article-image-manifest.ts';

const require = createRequire(import.meta.url);
const tsxLoaderPath = require.resolve('tsx');
import {
  buildLaunchApprovalPacket,
} from '../../scripts/lib/launch-approval.mjs';
import {
  emptyLaunchApprovalLedger,
  recordLaunchApproval,
} from '../../scripts/lib/launch-approval-ledger.mjs';
import {
  buildLinkedInArticleTransferPackets,
} from '../../scripts/lib/linkedin-article-transfer.mjs';
import {
  buildInteriorImagePlan,
} from '../../scripts/lib/interior-image-plan.mjs';
import {
  generateInteriorImages,
  processQueuedImageRequests,
} from '../../scripts/lib/image-generation.ts';
import {
  buildArticleReadinessReport,
} from '../../scripts/lib/article-readiness.mjs';
import {
  approveArticleAudio,
  audioStatus,
  audioTranscriptStatus,
  generateArticleAudio,
  prepareArticleAudio,
  quoteArticleAudio,
  verifyArticleAudioTranscript,
  writeGeneratedBlogVoiceTracks,
} from '../../scripts/lib/audio-narration.mjs';
import {
  buildN8nExport,
  buildLaunchSocialCalendar,
  buildPostizPushPlan,
  buildSocialPackages,
  buildSocialPostManifest,
  buildSocialReadiness,
  buildSocialSchedule,
  createPostizDrafts,
  recordSocialRefusal,
} from '../../scripts/lib/social-automation.mjs';

type ContentLedgerOptions = {
  obsidianBlogsRoot: string;
  websiteArticlesRoot: string;
  publicRoot: string;
  packagesRoot: string;
  platformLedgerPath: string;
  publishSchedulePath: string;
  generatedAt: string;
};

type AudioPrepareOptions = {
  articlesRoot: string;
  slug: string;
  force?: boolean;
  generatedAt?: string;
};

type AudioSlugOptions = {
  articlesRoot: string;
  slug: string;
};

type AudioGenerateOptions = {
  articlesRoot: string;
  publicRoot: string;
  slug: string;
  spendApproved: boolean;
  force?: boolean;
  voiceId?: string;
  generatedAt?: string;
};

type AudioStatusOptions = {
  articlesRoot: string;
  publicRoot: string;
  slug?: string;
};

type AudioTranscriptVerifyOptions = {
  articlesRoot: string;
  publicRoot: string;
  slug: string;
  transcript: string;
  provider?: string;
  model?: string;
  generatedAt?: string;
  failOnMismatch?: boolean;
};

type AudioTranscriptStatusOptions = {
  articlesRoot: string;
  publicRoot: string;
  slug?: string;
};

type AudioTracksOptions = {
  articlesRoot: string;
  publicRoot: string;
  outputPath: string;
};

type SocialPackageOptions = {
  ledger: Record<string, unknown>;
  inventory: Record<string, unknown>;
  articlesRoot: string;
  outputRoot: string;
  slug: string;
  platform?: string;
  generatedAt?: string;
};

type SocialManifestOptions = {
  ledger: Record<string, unknown>;
  inventory: Record<string, unknown>;
  slug: string;
  platform: string;
  packagePath?: string;
  mode?: string;
  generatedAt?: string;
  approvalStatus?: string;
};

type SocialScheduleOptions = {
  packageRoot: string;
  inventory: Record<string, unknown>;
  startAt?: string;
  intervalHours?: number;
  generatedAt?: string;
};

type LaunchSocialCalendarOptions = {
  siteReleaseCalendar: Record<string, any>;
  inventory: Record<string, unknown>;
  packageRoot: string;
  platform?: string;
  sourceCalendar?: string;
  purpose?: string;
  generatedAt?: string;
};

type LaunchApprovalPacketOptions = {
  launchPlan: Record<string, any>;
  siteReleaseCalendar: Record<string, any>;
  socialCalendar: Record<string, any>;
  socialTeasers: Record<string, any>;
  approvalLedger?: Record<string, any>;
  imageManifests?: Record<string, any>;
  generatedAt?: string;
};

type LinkedInArticleTransferOptions = {
  launchPlan: Record<string, any>;
  articlesRoot: string;
  publicRoot: string;
  outputRoot: string;
  slug?: string;
  write?: boolean;
  generatedAt?: string;
};

type InteriorImagePlanOptions = {
  launchPlan: Record<string, any>;
  articlesRoot: string;
  outputPath?: string;
  countPerArticle?: number;
  variantsPerPlacement?: number;
  write?: boolean;
  generatedAt?: string;
};

type InteriorImageGenerationOptions = {
  inputPath: string;
  articlesRoot: string;
  publicRoot: string;
  slug: string;
  requestId?: string | null;
  placementId?: string | null;
  limit?: number;
  provider?: string;
  model?: string;
  quality?: string;
  size?: string;
  spendApproved?: boolean;
  dryRun?: boolean;
  onlyMissing?: boolean;
  generatedAt?: string;
};

type ArticleReadinessOptions = {
  articlesRoot: string;
  publicRoot: string;
  siteReleaseCalendarPath: string;
  obsidianBlogsRoot: string;
  outputPath?: string;
  markdownOutputPath?: string;
  write?: boolean;
  generatedAt?: string;
};

type SocialN8nExportOptions = {
  socialCalendar: ReturnType<typeof buildSocialSchedule>;
  inventory: Record<string, unknown>;
  generatedAt?: string;
};

type SocialReadinessOptions = {
  inventory: Record<string, unknown>;
  generatedAt?: string;
};

type SocialRefusalOptions = {
  refusalPath: string;
  platform: string;
  action: string;
  reason: string;
  notes?: string;
  screenshotPath?: string | null;
  generatedAt?: string;
};

const prepareAudio = prepareArticleAudio as unknown as (
  options: AudioPrepareOptions
) => ReturnType<typeof prepareArticleAudio>;
const approveAudio = approveArticleAudio as unknown as (
  options: AudioSlugOptions
) => ReturnType<typeof approveArticleAudio>;
const quoteAudio = quoteArticleAudio as unknown as (
  options: AudioSlugOptions
) => ReturnType<typeof quoteArticleAudio>;
const statusAudio = audioStatus as unknown as (
  options: AudioStatusOptions
) => ReturnType<typeof audioStatus>;
const verifyTranscript = verifyArticleAudioTranscript as unknown as (
  options: AudioTranscriptVerifyOptions
) => ReturnType<typeof verifyArticleAudioTranscript>;
const statusTranscript = audioTranscriptStatus as unknown as (
  options: AudioTranscriptStatusOptions
) => ReturnType<typeof audioTranscriptStatus>;
const generateAudio = generateArticleAudio as unknown as (
  options: AudioGenerateOptions
) => ReturnType<typeof generateArticleAudio>;
const writeVoiceTracks = writeGeneratedBlogVoiceTracks as unknown as (
  options: AudioTracksOptions
) => ReturnType<typeof writeGeneratedBlogVoiceTracks>;
const generateSocialPackages = buildSocialPackages as unknown as (
  options: SocialPackageOptions
) => ReturnType<typeof buildSocialPackages>;
const generateSocialManifest = buildSocialPostManifest as unknown as (
  options: SocialManifestOptions
) => ReturnType<typeof buildSocialPostManifest>;
const generateSocialSchedule = buildSocialSchedule as unknown as (
  options: SocialScheduleOptions
) => ReturnType<typeof buildSocialSchedule>;
const generateLaunchSocialCalendar = buildLaunchSocialCalendar as unknown as (
  options: LaunchSocialCalendarOptions
) => ReturnType<typeof buildLaunchSocialCalendar>;
const generateLaunchApprovalPacket = buildLaunchApprovalPacket as unknown as (
  options: LaunchApprovalPacketOptions
) => ReturnType<typeof buildLaunchApprovalPacket>;
const approveLaunchGate = recordLaunchApproval as unknown as (
  options: {
    approvalLedger: Record<string, any>;
    launchPlan: Record<string, any>;
    slug: string;
    gate: string;
    approvedBy?: string;
    note?: string;
    generatedAt?: string;
  }
) => ReturnType<typeof recordLaunchApproval>;
const generateLinkedInArticleTransfer = buildLinkedInArticleTransferPackets as unknown as (
  options: LinkedInArticleTransferOptions
) => ReturnType<typeof buildLinkedInArticleTransferPackets>;
const generateInteriorImagePlan = buildInteriorImagePlan as unknown as (
  options: InteriorImagePlanOptions
) => ReturnType<typeof buildInteriorImagePlan>;
const generateInteriorImageBatch = generateInteriorImages as unknown as (
  options: InteriorImageGenerationOptions
) => ReturnType<typeof generateInteriorImages>;
const processQueuedInteriorImageRequests = processQueuedImageRequests as unknown as (
  options: InteriorImageGenerationOptions
) => ReturnType<typeof processQueuedImageRequests>;
const generateArticleReadiness = buildArticleReadinessReport as unknown as (
  options: ArticleReadinessOptions
) => ReturnType<typeof buildArticleReadinessReport>;
const generateN8nExport = buildN8nExport as unknown as (
  options: SocialN8nExportOptions
) => ReturnType<typeof buildN8nExport>;
const generatePostizPushPlan = buildPostizPushPlan as unknown as (
  options: SocialN8nExportOptions & {
    platform?: string;
    limit?: number;
    dryRun?: boolean;
  }
) => ReturnType<typeof buildPostizPushPlan>;
const generatePostizDrafts = createPostizDrafts as unknown as (
  options: SocialN8nExportOptions & {
    platform?: string;
    limit?: number;
    apiKey?: string;
  }
) => ReturnType<typeof createPostizDrafts>;
const generateSocialReadiness = buildSocialReadiness as unknown as (
  options: SocialReadinessOptions
) => ReturnType<typeof buildSocialReadiness>;
const createSocialRefusal = recordSocialRefusal as unknown as (
  options: SocialRefusalOptions
) => ReturnType<typeof recordSocialRefusal>;

const roots: string[] = [];

afterEach(() => {
  for (const root of roots) {
    rmSync(root, { recursive: true, force: true });
  }
  roots.length = 0;
});

function tempRoot() {
  const root = mkdtempSync(join(tmpdir(), 'content-distribution-'));
  roots.push(root);
  return root;
}

function article() {
  return {
    slug: 'the-factory',
    meta: {
      title: 'The Factory',
      description: 'Factory thesis',
      canonicalUrl: 'https://davidmieloch.com/blog/the-factory',
      tags: ['ai', 'factory'],
    },
    body: '## The Productivity Trap\n\nFactories changed when managers redesigned the line around the new power source.',
  };
}

function writeDraftCommandFixture(root: string, platform: 'devto' | 'hashnode') {
  const slug = 'package-only-article';
  mkdirSync(join(root, 'content/articles', slug), { recursive: true });
  mkdirSync(join(root, 'content/distribution/packages', slug), { recursive: true });
  writeFileSync(
    join(root, 'content/articles', slug, 'index.md'),
    `---
title: "Article Title"
description: "Article description"
canonicalUrl: "https://davidmieloch.com/blog/${slug}"
tags: ["ai", "pipeline", "agents", "factory", "april-fools"]
---

Canonical body should not be posted when a package exists.
`,
  );
  writeFileSync(
    join(root, 'content/distribution/packages', slug, `${platform}.md`),
    `---
title: "Packaged Title"
description: "Packaged description"
canonical_url: "https://davidmieloch.com/blog/${slug}"
tags: ["distribution", "draft"]
---

Packaged ${platform} body.
`,
  );
  return slug;
}

function writeAudioArticleFixture(root: string, slug = 'the-factory') {
  mkdirSync(join(root, 'content/articles', slug), { recursive: true });
  writeFileSync(
    join(root, 'content/articles', slug, 'index.md'),
    `---
title: "The Factory"
description: "Factory article"
publishedAt: "2026-04-14"
status: "published"
canonicalUrl: "https://davidmieloch.com/blog/${slug}"
tags: ["ai", "factory"]
---

![Factory image](/blog/${slug}/images/hero.png)

## The AI Factory

The AI factory is not just an API wrapper. It is a workflow.

| Stage | Owner |
| --- | --- |
| Build | Agent |
| Review | Skeptic |

\`\`\`ts
const invisible = "do not read code blocks";
\`\`\`

Read more at https://example.com/nope.

The PRD gives the agent a target. The CLI gives the human a fallback.
`,
  );
}

function writeAudioFileFixture(root: string, slug = 'the-factory', body = 'fixture audio') {
  const audioDirectory = join(root, 'public/audio/voice/blog');
  mkdirSync(audioDirectory, { recursive: true });
  writeFileSync(join(audioDirectory, `${slug}.mp3`), body);
}

function readAudioScriptBody(root: string, slug = 'the-factory') {
  return readFileSync(join(root, 'content/articles', slug, 'audio.md'), 'utf8')
    .replace(/^---\n[\s\S]*?\n---\n\n?/, '')
    .trim();
}

function writeFetchStub(root: string, capturePath: string) {
  const stubPath = join(root, 'fetch-stub.mjs');
  writeFileSync(
    stubPath,
    `import { writeFileSync } from 'node:fs';

globalThis.fetch = async (url, options = {}) => {
  const body = options.body ? JSON.parse(options.body) : null;
  writeFileSync(${JSON.stringify(capturePath)}, JSON.stringify({ url: String(url), body }, null, 2));

  if (String(url).includes('dev.to')) {
    return {
      ok: true,
      status: 201,
      text: async () => JSON.stringify({
        id: 123,
        title: body.article.title,
        published: body.article.published,
        url: 'https://dev.to/dashboard'
      })
    };
  }

  const hashnodePayload = {
    data: {
      createDraft: {
        draft: {
          id: 'draft-123',
          slug: 'package-only-article',
          title: body.variables.input.title,
          canonicalUrl: body.variables.input.originalArticleURL
        }
      }
    }
  };

  return {
    ok: true,
    status: 200,
    json: async () => hashnodePayload,
    text: async () => JSON.stringify(hashnodePayload)
  };
};
`,
  );
  return stubPath;
}

function runDraftCommand(root: string, command: string, slug: string, capturePath: string, extraArgs: string[] = []) {
  const stubPath = writeFetchStub(root, capturePath);
  return spawnSync(
    process.execPath,
    ['--import', tsxLoaderPath, '--import', stubPath, join(process.cwd(), 'scripts/content-pipeline.mjs'), command, slug, ...extraArgs],
    {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        DEVTO_API_KEY: 'dev-token',
        HASHNODE_TOKEN: 'hash-token',
        HASHNODE_PUBLICATION_ID: 'publication-123',
      },
    },
  );
}

function writeLedgerFixture(root: string) {
  mkdirSync(join(root, 'content/distribution'), { recursive: true });
  writeFileSync(
    join(root, 'content/distribution/platform-ledger.json'),
    JSON.stringify({
      updatedAt: '2026-05-18',
      articles: {
        'the-factory': {
          title: 'The Factory',
          canonicalUrl: 'https://davidmieloch.com/blog/the-factory',
          platforms: {
            davidmieloch: { status: 'ready-local', url: 'https://davidmieloch.com/blog/the-factory' },
            devto: { status: 'not-started', url: '' },
            hashnode: { status: 'not-started', url: '' },
            hackernoon: { status: 'not-started', url: '' },
            medium: { status: 'published', url: 'https://medium.com/@davidmieloch/the-factory' },
          },
        },
      },
    }, null, 2),
  );
}

function socialAccountInventory(writeStatus: 'ready' | 'blocked' = 'blocked'): Record<string, any> {
  return {
    exposureGate: {
      default: 'internal-only',
      question: 'Does anybody but Dave need to touch this GUI?',
    },
    credentialStore: {
      provider: '1Password',
      vault: 'Brain Garden',
      writeStatus,
      blocker: writeStatus === 'ready'
        ? null
        : 'Current 1Password service account can read the vault but cannot create or update items.',
    },
    postiz: {
      url: 'https://social-davidmieloch.brain-garden.io',
      network: 'internal-brain-garden',
      publicExposure: 'not-required',
    },
    n8n: {
      ownerAgent: 'Commander Data',
      workflowStatus: 'planned',
    },
    accounts: [
      {
        platform: 'bluesky',
        identityLayer: 'brand-lab',
        accountKind: 'new-canary',
        knownState: 'not-created',
        postizChannelStatus: 'not-connected',
        proposedHandle: 'brain-garden-factory',
        postizPriority: 1,
        testPostPolicy: 'public-bland-test-allowed-after-1password-custody',
      },
      {
        platform: 'linkedin',
        identityLayer: 'personal-authority',
        accountKind: 'existing-personal',
        knownState: 'exists',
        postizChannelStatus: 'not-connected',
        proposedHandle: 'davidmieloch',
        postizPriority: 9,
        testPostPolicy: 'no-public-test-posts',
      },
    ],
  };
}

function writeLaunchCalendarFixture(root: string) {
  mkdirSync(join(root, 'content/distribution'), { recursive: true });
  writeFileSync(
    join(root, 'content/distribution/launch-calendar.json'),
    JSON.stringify({
      schemaVersion: 'launch-calendar-v1',
      updatedAt: '2026-05-18',
      launches: [
        {
          id: 'launch-1',
          title: 'Due launch',
          sourcePlatform: 'linkedin',
          scheduledAt: '2026-05-19T11:00:00-04:00',
          articleSlug: null,
          pendingSource: { status: 'awaiting-source-url' },
          targetPlatforms: [{ platform: 'devto', approvalMode: 'draft-only' }],
          approvalPolicy: {
            requiresDavidApproval: true,
            publicPublishAllowed: false,
          },
        },
        {
          id: 'launch-2',
          title: 'Future launch',
          sourcePlatform: 'linkedin',
          scheduledAt: '2026-05-20T11:00:00-04:00',
          articleSlug: 'the-factory',
          targetPlatforms: [{ platform: 'devto', approvalMode: 'draft-only' }],
          approvalPolicy: {
            requiresDavidApproval: true,
            publicPublishAllowed: false,
          },
        },
      ],
    }, null, 2),
  );
}

function longBody() {
  return Array.from({ length: 75 }, () => (
    'The factory primitive is a concrete repeatable unit that turns agent labor into durable substrate.'
  )).join(' ');
}

async function writeImageFixture(filePath: string, width = 1408, height = 768) {
  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 24, g: 20, b: 18, alpha: 1 },
    },
  })
    .png()
    .toFile(filePath);
}

function runPipelineCommand(root: string, args: string[]) {
  return spawnSync(
    process.execPath,
    ['--import', tsxLoaderPath, join(process.cwd(), 'scripts/content-pipeline.mjs'), ...args],
    {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        CONTENT_ROOT: join(root, 'content'),
        DEVTO_API_KEY: '',
        HASHNODE_TOKEN: '',
        HASHNODE_API_KEY: '',
        HASHNODE_PUBLICATION_ID: '',
      },
    },
  );
}

describe('platform package generation', () => {
  it('creates policy-driven full mirrors with canonical and tracked URLs', () => {
    const root = tempRoot();
    const policy = loadSyndicationPolicy();

    generatePlatformPackages({
      article: article(),
      outputRoot: root,
      platforms: ['medium'],
      policy,
      generatedAt: '2026-05-18T00:00:00.000Z',
    });

    const markdown = readFileSync(join(root, 'the-factory', 'medium.md'), 'utf8');
    const manifest = JSON.parse(readFileSync(join(root, 'the-factory', 'manifest.json'), 'utf8'));

    expect(markdown).toContain('post_mode: "full-mirror"');
    expect(markdown).toContain('canonical_url: "https://davidmieloch.com/blog/the-factory"');
    expect(markdown).toContain('tracked_url: "https://davidmieloch.com/blog/the-factory?utm_source=medium&utm_medium=syndication&utm_campaign=content_distribution&utm_content=the-factory"');
    expect(markdown).toContain('## The Productivity Trap');
    expect(markdown).toContain('Read the canonical version: https://davidmieloch.com/blog/the-factory?utm_source=medium');
    expect(manifest.policyVersion).toBe(policy.version);
    expect(manifest.files[0]).toMatchObject({
      platform: 'medium',
      postMode: 'full-mirror',
      canonicalSupport: 'supported',
      approvalRequired: true,
    });
  });

  it('creates discussion-first Reddit packages instead of duplicate mirrors', () => {
    const root = tempRoot();

    generatePlatformPackages({
      article: article(),
      outputRoot: root,
      platforms: ['reddit'],
      generatedAt: '2026-05-18T00:00:00.000Z',
    });

    const markdown = readFileSync(join(root, 'the-factory', 'reddit.md'), 'utf8');

    expect(markdown).toContain('post_mode: "discussion"');
    expect(markdown).toContain('Suggested discussion shape, not a blind cross-post');
    expect(markdown).toContain('Do not post the same package to multiple subreddits unchanged.');
    expect(markdown).not.toContain('## The Productivity Trap');
  });
});

describe('social automation substrate', () => {
  it('generates safe social teaser packages with credential custody gates', () => {
    const root = tempRoot();
    const outputRoot = join(root, 'content/distribution/social-packages');
    writeLedgerFixture(root);
    writeAudioArticleFixture(root);

    const generated = generateSocialPackages({
      ledger: JSON.parse(readFileSync(join(root, 'content/distribution/platform-ledger.json'), 'utf8')),
      inventory: socialAccountInventory(),
      articlesRoot: join(root, 'content/articles'),
      outputRoot,
      slug: 'the-factory',
      platform: 'bluesky',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    const markdown = readFileSync(join(outputRoot, 'the-factory', 'bluesky.md'), 'utf8');
    const manifest = JSON.parse(readFileSync(join(outputRoot, 'the-factory', 'manifest.json'), 'utf8'));

    expect(generated.publicPublishingPerformed).toBe(false);
    expect(generated.safeDefault).toBe('do-not-post');
    expect(markdown).toContain('Safe default: do-not-post');
    expect(markdown).toContain('Public posting requires explicit David approval.');
    expect(markdown).toContain('Credential custody verified: no');
    expect(markdown).toContain('utm_source=bluesky');
    expect(manifest.files[0]).toMatchObject({
      platform: 'bluesky',
    });
  });

  it('prefers curated social teaser copy when available', () => {
    const root = tempRoot();
    const outputRoot = join(root, 'content/distribution/social-packages');
    writeLedgerFixture(root);
    writeAudioArticleFixture(root);
    mkdirSync(join(root, 'content/distribution'), { recursive: true });
    writeFileSync(
      join(root, 'content/distribution/social-teasers.json'),
      JSON.stringify({
        schemaVersion: 'social-teasers-v1',
        teasers: {
          'the-factory': {
            linkedin: 'Curated launch copy that should replace the article excerpt.',
          },
        },
      }),
    );

    generateSocialPackages({
      ledger: JSON.parse(readFileSync(join(root, 'content/distribution/platform-ledger.json'), 'utf8')),
      inventory: socialAccountInventory(),
      articlesRoot: join(root, 'content/articles'),
      outputRoot,
      slug: 'the-factory',
      platform: 'linkedin',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    const markdown = readFileSync(join(outputRoot, 'the-factory', 'linkedin.md'), 'utf8');

    expect(markdown).toContain('Curated launch copy that should replace the article excerpt.');
    expect(markdown).toContain('Read the canonical essay:');
    expect(markdown).not.toContain('A software factory is not a metaphor');
  });

  it('builds signed post manifests without granting publish permission', () => {
    const root = tempRoot();
    const outputRoot = join(root, 'content/distribution/social-packages');
    writeLedgerFixture(root);
    writeAudioArticleFixture(root);
    const ledger = JSON.parse(readFileSync(join(root, 'content/distribution/platform-ledger.json'), 'utf8'));
    const inventory = socialAccountInventory();

    generateSocialPackages({
      ledger,
      inventory,
      articlesRoot: join(root, 'content/articles'),
      outputRoot,
      slug: 'the-factory',
      platform: 'bluesky',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    const manifest = generateSocialManifest({
      ledger,
      inventory,
      slug: 'the-factory',
      platform: 'bluesky',
      packagePath: join(outputRoot, 'the-factory', 'bluesky.md'),
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    expect(manifest.payload.text).toContain('The Factory');
    expect(manifest.approval).toMatchObject({
      status: 'missing',
      approvedBy: '',
    });
    expect(manifest.safety).toMatchObject({
      safeDefault: 'do-not-post',
      credentialCustodyVerified: false,
      deletePathKnown: false,
    });
    expect(manifest.signature.digest).toMatch(/^[a-f0-9]{64}$/);
  });

  it('exports blocked n8n dispatch packets until credentials are safely stored', () => {
    const root = tempRoot();
    const outputRoot = join(root, 'content/distribution/social-packages');
    writeLedgerFixture(root);
    writeAudioArticleFixture(root);
    const ledger = JSON.parse(readFileSync(join(root, 'content/distribution/platform-ledger.json'), 'utf8'));
    const inventory = socialAccountInventory();

    generateSocialPackages({
      ledger,
      inventory,
      articlesRoot: join(root, 'content/articles'),
      outputRoot,
      slug: 'the-factory',
      platform: 'bluesky',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    const readiness = generateSocialReadiness({ inventory, generatedAt: '2026-06-05T00:00:00.000Z' });
    const schedule = generateSocialSchedule({
      packageRoot: outputRoot,
      inventory,
      startAt: '2026-06-06T13:00:00.000Z',
      intervalHours: 6,
      generatedAt: '2026-06-05T00:00:00.000Z',
    });
    const exportPayload = generateN8nExport({
      socialCalendar: schedule,
      inventory,
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    expect(readiness.summary).toMatchObject({
      accounts: 2,
      blocked: 2,
      canaryEligible: 1,
      connectorTestReady: 0,
    });
    expect(schedule.summary).toMatchObject({
      totalEntries: 1,
      blockedEntries: 1,
    });
    expect(schedule.entries[0]).toMatchObject({
      platform: 'bluesky',
      safeDefault: 'do-not-post',
      publicPublishingAllowed: false,
      blocked: true,
    });
    expect(exportPayload).toMatchObject({
      status: 'blocked-on-credential-custody',
      publicPublishingPerformed: false,
      ownerAgent: 'Commander Data',
    });
    expect(exportPayload.packets[0].policy).toMatchObject({
      publicPublishingAllowed: false,
      safeDefault: 'do-not-post',
      allowedAction: 'blocked',
    });
  });

  it('keeps social dispatch blocked when credentials are stored but Postiz channels are not connected', () => {
    const root = tempRoot();
    const outputRoot = join(root, 'content/distribution/social-packages');
    writeLedgerFixture(root);
    writeAudioArticleFixture(root);
    const ledger = JSON.parse(readFileSync(join(root, 'content/distribution/platform-ledger.json'), 'utf8'));
    const inventory = socialAccountInventory('ready');

    generateSocialPackages({
      ledger,
      inventory,
      articlesRoot: join(root, 'content/articles'),
      outputRoot,
      slug: 'the-factory',
      platform: 'linkedin',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    const readiness = generateSocialReadiness({ inventory, generatedAt: '2026-06-05T00:00:00.000Z' });
    const schedule = generateSocialSchedule({
      packageRoot: outputRoot,
      inventory,
      startAt: '2026-06-06T13:00:00.000Z',
      intervalHours: 6,
      generatedAt: '2026-06-05T00:00:00.000Z',
    });
    const exportPayload = generateN8nExport({
      socialCalendar: schedule,
      inventory,
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    expect(readiness.accounts.find((account: { platform: string }) => account.platform === 'linkedin')).toMatchObject({
      readyForCredentialedSetup: true,
      readyForPostizDrafts: false,
      postizChannelStatus: 'not-connected',
      blocked: true,
      blocker: 'Postiz channel is not connected for this platform.',
    });
    expect(schedule.entries[0]).toMatchObject({
      platform: 'linkedin',
      postizChannelStatus: 'not-connected',
      blocked: true,
      blocker: 'Postiz channel is not connected for this platform.',
    });
    expect(exportPayload).toMatchObject({
      status: 'blocked-on-channel-setup',
      blocker: '1 packets blocked by account or channel readiness.',
    });
    expect(exportPayload.packets[0].policy).toMatchObject({
      allowedAction: 'blocked',
      blocker: 'Postiz channel is not connected for this platform.',
    });
  });

  it('allows n8n to create Postiz draft packets only after the target channel is connected', () => {
    const root = tempRoot();
    const outputRoot = join(root, 'content/distribution/social-packages');
    writeLedgerFixture(root);
    writeAudioArticleFixture(root);
    const ledger = JSON.parse(readFileSync(join(root, 'content/distribution/platform-ledger.json'), 'utf8'));
    const inventory = socialAccountInventory('ready');
    inventory.accounts[0] = {
      ...inventory.accounts[0],
      knownState: 'exists',
      postizChannelStatus: 'connected',
      deletePathKnown: true,
    };

    generateSocialPackages({
      ledger,
      inventory,
      articlesRoot: join(root, 'content/articles'),
      outputRoot,
      slug: 'the-factory',
      platform: 'bluesky',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    const schedule = generateSocialSchedule({
      packageRoot: outputRoot,
      inventory,
      startAt: '2026-06-06T13:00:00.000Z',
      intervalHours: 6,
      generatedAt: '2026-06-05T00:00:00.000Z',
    });
    const exportPayload = generateN8nExport({
      socialCalendar: schedule,
      inventory,
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    expect(schedule.entries[0]).toMatchObject({
      platform: 'bluesky',
      blocked: false,
      blocker: null,
    });
    expect(exportPayload).toMatchObject({
      status: 'ready-for-internal-workflow-build',
      blocker: null,
    });
    expect(exportPayload.packets[0].policy).toMatchObject({
      allowedAction: 'create-postiz-draft-or-schedule',
      blocker: null,
    });
  });

  it('plans Postiz draft actions for connected LinkedIn packets without publishing', () => {
    const root = tempRoot();
    const outputRoot = join(root, 'content/distribution/social-packages');
    writeLedgerFixture(root);
    writeAudioArticleFixture(root);
    const ledger = JSON.parse(readFileSync(join(root, 'content/distribution/platform-ledger.json'), 'utf8'));
    const inventory = socialAccountInventory('ready');
    inventory.postiz.connectedIntegrations = [
      {
        platform: 'linkedin',
        postizChannelId: 'linkedin-channel-1',
        postizChannelName: 'David Mieloch',
      },
    ];
    inventory.accounts[1] = {
      ...inventory.accounts[1],
      postizChannelStatus: 'connected',
      postizChannelId: 'linkedin-channel-1',
      postizChannelName: 'David Mieloch',
    };

    generateSocialPackages({
      ledger,
      inventory,
      articlesRoot: join(root, 'content/articles'),
      outputRoot,
      slug: 'the-factory',
      platform: 'linkedin',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    const schedule = generateSocialSchedule({
      packageRoot: outputRoot,
      inventory,
      startAt: '2026-06-06T13:00:00.000Z',
      intervalHours: 6,
      generatedAt: '2026-06-05T00:00:00.000Z',
    });
    const pushPlan = generatePostizPushPlan({
      socialCalendar: schedule,
      inventory,
      platform: 'linkedin',
      dryRun: true,
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    expect(pushPlan).toMatchObject({
      status: 'dry-run-ready',
      publicPublishingPerformed: false,
      dryRun: true,
      summary: {
        selectedEntries: 1,
        readyEntries: 1,
        blockedEntries: 0,
        plannedActions: 1,
      },
    });
    expect(pushPlan.plannedActions[0]).toMatchObject({
      action: 'create-postiz-draft-or-schedule',
      mode: 'draft-first',
      articleSlug: 'the-factory',
      platform: 'linkedin',
      postiz: {
        channelId: 'linkedin-channel-1',
        channelName: 'David Mieloch',
      },
      approval: {
        required: true,
        status: 'missing',
      },
      safety: {
        publicPublishingAllowed: false,
        safeDefault: 'do-not-post',
      },
    });
    expect(pushPlan.plannedActions[0].payload.text).toContain('The Factory');
  });

  it('falls back to repo-relative social package paths when calendar paths came from another host', () => {
    const root = tempRoot();
    const outputRoot = join(root, 'content/distribution/social-packages');
    const previousCwd = process.cwd();
    writeLedgerFixture(root);
    writeAudioArticleFixture(root);
    const ledger = JSON.parse(readFileSync(join(root, 'content/distribution/platform-ledger.json'), 'utf8'));
    const inventory = socialAccountInventory('ready');
    inventory.accounts[1] = {
      ...inventory.accounts[1],
      postizChannelStatus: 'connected',
      postizChannelId: 'linkedin-channel-1',
      postizChannelName: 'David Mieloch',
    };

    generateSocialPackages({
      ledger,
      inventory,
      articlesRoot: join(root, 'content/articles'),
      outputRoot,
      slug: 'the-factory',
      platform: 'linkedin',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    const schedule = generateSocialSchedule({
      packageRoot: outputRoot,
      inventory,
      startAt: '2026-06-06T13:00:00.000Z',
      intervalHours: 6,
      generatedAt: '2026-06-05T00:00:00.000Z',
    });
    schedule.entries[0].packagePath = '/Users/dmieloch/not-this-checkout/content/distribution/social-packages/the-factory/linkedin.md';

    try {
      process.chdir(root);
      const pushPlan = generatePostizPushPlan({
        socialCalendar: schedule,
        inventory,
        platform: 'linkedin',
        dryRun: true,
        generatedAt: '2026-06-05T00:00:00.000Z',
      });

      expect(pushPlan.plannedActions[0].packagePath).toContain('content/distribution/social-packages/the-factory/linkedin.md');
      expect(pushPlan.plannedActions[0].payload.text).toContain('The Factory');
    } finally {
      process.chdir(previousCwd);
    }
  });

  it('derives a launch social calendar from website release dates and social packages', () => {
    const root = tempRoot();
    const outputRoot = join(root, 'content/distribution/social-packages');
    writeLedgerFixture(root);
    writeAudioArticleFixture(root);
    const ledger = JSON.parse(readFileSync(join(root, 'content/distribution/platform-ledger.json'), 'utf8'));
    const inventory = socialAccountInventory('ready');
    inventory.accounts[1] = {
      ...inventory.accounts[1],
      postizChannelStatus: 'connected',
      postizChannelId: 'linkedin-channel-1',
      postizChannelName: 'David Mieloch',
    };

    generateSocialPackages({
      ledger,
      inventory,
      articlesRoot: join(root, 'content/articles'),
      outputRoot,
      slug: 'the-factory',
      platform: 'linkedin',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    const calendar = generateLaunchSocialCalendar({
      siteReleaseCalendar: {
        entries: [
          {
            slug: 'the-factory',
            title: 'The Factory',
            plannedReleaseAt: '2026-06-10T11:00:00-04:00',
            linkedin: {
              plannedPostAt: '2026-06-10T11:00:00-04:00',
            },
          },
        ],
      },
      inventory,
      packageRoot: outputRoot,
      platform: 'linkedin',
      sourceCalendar: 'content/distribution/site-release-calendar.json',
      generatedAt: '2026-06-07T00:00:00.000Z',
    });

    expect(calendar.publicPublishingPerformed).toBe(false);
    expect(calendar.observation.status).toBe('PASS');
    expect(calendar.entries).toHaveLength(1);
    expect(calendar.entries[0]).toMatchObject({
      articleSlug: 'the-factory',
      platform: 'linkedin',
      scheduledAt: '2026-06-10T15:00:00.000Z',
      postizChannelStatus: 'connected',
      postizChannelId: 'linkedin-channel-1',
      blocked: false,
      blocker: null,
      approval: {
        required: true,
        status: 'missing',
        requiredFrom: 'David',
      },
    });
    expect(calendar.entries[0].checksum).toMatch(/^[a-f0-9]{64}$/);
  });

  it('builds a David approval packet from launch artifacts', () => {
    const packet = generateLaunchApprovalPacket({
      launchPlan: {
        series: 'Factory Primitives',
        decisionSeam: {
          name: 'factory-primitives-launch-approval',
          actor: 'David',
          safeDefault: 'do-not-publish',
        },
        articles: [
          {
            slug: 'the-factory',
            title: 'The Factory',
            contentStatus: 'ready-for-editorial-approval',
            imageStatus: 'hero-staged-for-review',
            coverImage: '/blog/the-factory/images/hero-linkedin.png',
            imageManifest: 'content/articles/the-factory/image-manifest.json',
            checksumSha256: 'a'.repeat(64),
            caption: 'Factory hero.',
            blocker: null,
            nextAction: 'David image and copy approval.',
          },
        ],
      },
      siteReleaseCalendar: {
        entries: [
          {
            slug: 'the-factory',
            title: 'The Factory',
            plannedReleaseAt: '2026-06-10T11:00:00-04:00',
            website: {
              status: 'staged-draft',
              markdownPath: 'content/articles/the-factory/index.md',
              canonicalUrl: 'https://davidmieloch.com/blog/the-factory',
            },
          },
        ],
      },
      socialCalendar: {
        entries: [
          {
            articleSlug: 'the-factory',
            status: 'planned',
            scheduledAt: '2026-06-10T15:00:00.000Z',
            packagePath: '/tmp/social-packages/the-factory/linkedin.md',
            checksum: 'b'.repeat(64),
            postizChannelStatus: 'connected',
            blocked: false,
            blocker: null,
          },
        ],
      },
      socialTeasers: {
        teasers: {
          'the-factory': {
            linkedin: 'Curated reveal copy.',
          },
        },
      },
      imageManifests: {
        'the-factory': {
          assets: [
            {
              id: 'hero-linkedin',
              publicPath: '/blog/the-factory/images/hero-linkedin.png',
              sourcePath: 'public/blog/the-factory/images/hero-linkedin.png',
              checksumSha256: 'a'.repeat(64),
              caption: 'Factory hero.',
            },
          ],
        },
      },
      generatedAt: '2026-06-07T00:00:00.000Z',
    });

    expect(packet.publicPublishingPerformed).toBe(false);
    expect(packet.safeDefault).toBe('do-not-publish');
    expect(packet.summary).toMatchObject({
      articles: 1,
      blocked: 0,
      readyForDavidReview: 1,
      approvalGatesPerArticle: 5,
    });
    expect(packet.articles[0]).toMatchObject({
      slug: 'the-factory',
      website: {
        draftPreviewUrl: '/draft-lab/articles/the-factory',
      },
      heroImage: {
        publicPath: '/blog/the-factory/images/hero-linkedin.png',
      },
      linkedinReveal: {
        scheduledAt: '2026-06-10T15:00:00.000Z',
        teaser: 'Curated reveal copy.',
      },
      blocked: false,
    });
    expect(packet.articles[0].gates.map((gate: { status: string }) => gate.status)).toEqual([
      'missing',
      'missing',
      'missing',
      'missing',
      'missing',
    ]);
  });

  it('folds local approval ledger state into the launch approval packet', () => {
    const launchPlan = {
      series: 'Factory Primitives',
      articles: [
        {
          slug: 'the-factory',
          title: 'The Factory',
          contentStatus: 'ready-for-editorial-approval',
          imageStatus: 'hero-staged-for-review',
          coverImage: '/blog/the-factory/images/hero-linkedin.png',
          imageManifest: 'content/articles/the-factory/image-manifest.json',
          checksumSha256: 'a'.repeat(64),
          caption: 'Factory hero.',
          blocker: null,
        },
      ],
    };
    const approval = approveLaunchGate({
      approvalLedger: emptyLaunchApprovalLedger('2026-06-07T00:00:00.000Z'),
      launchPlan,
      slug: 'the-factory',
      gate: 'hero-image-approved',
      approvedBy: 'David',
      note: 'Hero looks good.',
      generatedAt: '2026-06-07T01:00:00.000Z',
    });

    const packet = generateLaunchApprovalPacket({
      launchPlan,
      siteReleaseCalendar: {
        entries: [
          {
            slug: 'the-factory',
            plannedReleaseAt: '2026-06-10T11:00:00-04:00',
            website: {
              status: 'staged-draft',
              markdownPath: 'content/articles/the-factory/index.md',
              canonicalUrl: 'https://davidmieloch.com/blog/the-factory',
            },
          },
        ],
      },
      socialCalendar: {
        entries: [
          {
            articleSlug: 'the-factory',
            status: 'planned',
            scheduledAt: '2026-06-10T15:00:00.000Z',
            packagePath: '/tmp/social-packages/the-factory/linkedin.md',
            checksum: 'b'.repeat(64),
            postizChannelStatus: 'connected',
            blocked: false,
            blocker: null,
          },
        ],
      },
      socialTeasers: {
        teasers: {
          'the-factory': {
            linkedin: 'Curated reveal copy.',
          },
        },
      },
      approvalLedger: approval.ledger,
      generatedAt: '2026-06-07T02:00:00.000Z',
    });

    expect(approval.recorded).toEqual([
      {
        slug: 'the-factory',
        gate: 'hero-image-approved',
        status: 'approved',
      },
    ]);
    expect(packet.summary).toMatchObject({
      approvalGatesPerArticle: 5,
      fullyApproved: 0,
    });
    expect(packet.articles[0].gates).toContainEqual({
      label: 'hero-image-approved',
      status: 'approved',
      requiredFrom: 'David',
      approvedBy: 'David',
      approvedAt: '2026-06-07T01:00:00.000Z',
      note: 'Hero looks good.',
    });
  });

  it('builds safe LinkedIn Article transfer packets from canonical article markdown', () => {
    const root = tempRoot();
    mkdirSync(join(root, 'content/articles/the-factory'), { recursive: true });
    mkdirSync(join(root, 'public/blog/the-factory/images'), { recursive: true });
    writeFileSync(join(root, 'public/blog/the-factory/images/hero-linkedin.png'), 'fake image bytes');
    writeFileSync(
      join(root, 'content/articles/the-factory/index.md'),
      `---
title: "The Factory"
description: "Factory description"
canonicalUrl: "https://davidmieloch.com/blog/the-factory"
series: "Factory Primitives"
coverImage: "/blog/the-factory/images/hero-linkedin.png"
---

# The Factory

![Factory](/blog/the-factory/images/hero-linkedin.png)

## The Primitive

The factory turns repeated agent labor into substrate.

\`\`\`ts
const keepTheIdea = true;
\`\`\`
`,
    );

    const transfer = generateLinkedInArticleTransfer({
      launchPlan: {
        articles: [
          {
            slug: 'the-factory',
            title: 'The Factory',
          },
        ],
      },
      articlesRoot: join(root, 'content/articles'),
      publicRoot: join(root, 'public'),
      outputRoot: join(root, 'content/distribution/linkedin-article-transfer'),
      generatedAt: '2026-06-07T03:00:00.000Z',
    });

    expect(transfer.publicPublishingPerformed).toBe(false);
    expect(transfer.safeDefault).toBe('stop-at-linkedin-draft-preview');
    expect(transfer.summary).toMatchObject({
      selectedArticles: 1,
      heroImagesPresent: 1,
    });
    expect(transfer.packets[0]).toMatchObject({
      slug: 'the-factory',
      title: 'The Factory',
      subtitle: 'Factory description',
      canonicalUrl: 'https://davidmieloch.com/blog/the-factory',
      safety: {
        publicPublishingAllowed: false,
        requiresDavidApproval: true,
      },
      browserStaging: {
        destination: 'https://www.linkedin.com/pulse/new/',
        stopBefore: 'publish-submit-schedule',
      },
      heroImage: {
        exists: true,
      },
    });
    expect(transfer.packets[0].bodyMarkdown).toContain('## The Primitive');
    expect(transfer.packets[0].bodyMarkdown).toContain('const keepTheIdea = true;');
    expect(transfer.packets[0].bodyMarkdown).not.toContain('![Factory]');
  });

  it('builds section-aware interior image briefs without calling a paid generator', () => {
    const root = tempRoot();
    mkdirSync(join(root, 'content/articles/the-ai-bill-you-cant-predict'), { recursive: true });
    writeFileSync(
      join(root, 'content/articles/the-ai-bill-you-cant-predict/index.md'),
      `---
title: "The AI Bill You Can't Predict"
description: "The cost problem is hidden in the formula."
canonicalUrl: "https://davidmieloch.com/blog/the-ai-bill-you-cant-predict"
status: draft
---

# The AI Bill You Can't Predict

## The Formula You Don't Control

Usage and pricing move under your feet.

## Why This Is Hard to See

The system hides the variables.

## The Enterprise Risk

Budgets become weather.
`,
    );
    const outputPath = join(root, 'content/distribution/factory-primitives-interior-image-plan.json');

    const plan = generateInteriorImagePlan({
      launchPlan: {
        articles: [
          {
            slug: 'the-ai-bill-you-cant-predict',
            title: "The AI Bill You Can't Predict",
          },
        ],
      },
      articlesRoot: join(root, 'content/articles'),
      outputPath,
      countPerArticle: 3,
      variantsPerPlacement: 2,
      write: true,
      generatedAt: '2026-06-07T06:00:00.000Z',
    });

    expect(plan.strategy).toMatchObject({
      approvedImageTarget: 3,
      candidateVariantTarget: 6,
      spendRule: 'Generation commands must require explicit --spend-approved.',
    });
    expect(plan.articles[0].placements).toHaveLength(3);
    expect(plan.articles[0].placements[0]).toMatchObject({
      target: {
        afterHeading: "The Formula You Don't Control",
        role: 'article-interior',
      },
    });
    expect(plan.articles[0].placements[0].variants[0].prompt).toContain('1950s space western industrial noir');
    expect(plan.articles[0].placements[0].variants[0].prompt).toContain('no words');
    expect(readFileSync(outputPath, 'utf8')).toContain('"interior-image-plan-v1"');
    expect(
      readFileSync(
        join(root, 'content/articles/the-ai-bill-you-cant-predict/image-brief.md'),
        'utf8',
      ),
    ).toContain('Target: approve 3 article-body images from 6 generated candidates.');
  });

  it('writes dry-run interior image generation receipts without calling a paid provider', async () => {
    const root = tempRoot();
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    mkdirSync(join(articlesRoot, 'the-filter'), { recursive: true });
    writeFileSync(
      join(articlesRoot, 'the-filter/index.md'),
      `---
title: "The AI Cost Rug Pull Isn't a Bubble. It's a Filter."
description: "The filter separates prompt users from factory builders."
canonicalUrl: "https://davidmieloch.com/blog/the-filter"
status: draft
---

# The Filter

## What the Price Increase Actually Reveals

The subsidized rates hid the real shape of the work.

## The Factory Model

The economics change when the unit is a factory.
`,
    );
    const planPath = join(root, 'content/distribution/factory-primitives-interior-image-plan.json');
    generateInteriorImagePlan({
      launchPlan: {
        articles: [{ slug: 'the-filter', title: 'The Filter' }],
      },
      articlesRoot,
      outputPath: planPath,
      countPerArticle: 2,
      variantsPerPlacement: 2,
      write: true,
      generatedAt: '2026-06-07T06:00:00.000Z',
    });

    const result = await generateInteriorImageBatch({
      inputPath: planPath,
      articlesRoot,
      publicRoot,
      slug: 'the-filter',
      limit: 4,
      dryRun: true,
      spendApproved: false,
      generatedAt: '2026-06-07T08:00:00.000Z',
    });

    expect(result).toMatchObject({
      dryRun: true,
      selected: 4,
      generated: 0,
      planned: 4,
      failures: 0,
    });
    expect(result.manifestPath).toContain('content/articles/the-filter/images/generated/manifest.json');
    const manifest = JSON.parse(
      readFileSync(join(root, 'content/articles/the-filter/images/generated/manifest.json'), 'utf8'),
    );
    expect(manifest.assets).toHaveLength(4);
    expect(manifest.assets[0]).toMatchObject({
      role: 'article-interior',
      status: 'planned',
      publicPath: '/blog/the-filter/images/generated/inline-01/inline-01-v1.png',
    });
  });

  it('supports MiniMax dry-run interior image generation metadata', async () => {
    const root = tempRoot();
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    mkdirSync(join(articlesRoot, 'the-filter'), { recursive: true });
    writeFileSync(
      join(articlesRoot, 'the-filter/index.md'),
      `---
title: "The Filter"
status: draft
---

# The Filter

## The Factory Model

The economics change when the unit is a factory.
`,
    );
    const planPath = join(root, 'content/distribution/factory-primitives-interior-image-plan.json');
    generateInteriorImagePlan({
      launchPlan: {
        articles: [{ slug: 'the-filter', title: 'The Filter' }],
      },
      articlesRoot,
      outputPath: planPath,
      countPerArticle: 1,
      variantsPerPlacement: 1,
      write: true,
      generatedAt: '2026-06-07T06:00:00.000Z',
    });

    const result = await generateInteriorImageBatch({
      inputPath: planPath,
      articlesRoot,
      publicRoot,
      slug: 'the-filter',
      limit: 1,
      provider: 'minimax',
      model: 'image-01',
      size: '16:9',
      dryRun: true,
      spendApproved: false,
      generatedAt: '2026-06-07T08:00:00.000Z',
    });

    expect(result).toMatchObject({
      dryRun: true,
      selected: 1,
      planned: 1,
      failures: 0,
    });
    const manifest = JSON.parse(
      readFileSync(join(root, 'content/articles/the-filter/images/generated/manifest.json'), 'utf8'),
    );
    expect(manifest.provider).toMatchObject({
      id: 'minimax',
      endpoint: 'https://api.minimax.io/v1/image_generation',
      model: 'image-01',
      size: '16:9',
    });
  });

  it('plans queued Draft Lab image requests through the image worker without spending', async () => {
    const root = tempRoot();
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    const generatedRoot = join(articlesRoot, 'the-filter/images/generated');
    mkdirSync(generatedRoot, { recursive: true });
    writeFileSync(
      join(articlesRoot, 'the-filter/index.md'),
      `---
title: "The Filter"
status: draft
---

# The Filter

## The Factory Model

The economics change when the unit is a factory.
`,
    );
    const planPath = join(root, 'content/distribution/factory-primitives-interior-image-plan.json');
    generateInteriorImagePlan({
      launchPlan: {
        articles: [{ slug: 'the-filter', title: 'The Filter' }],
      },
      articlesRoot,
      outputPath: planPath,
      countPerArticle: 1,
      variantsPerPlacement: 1,
      write: true,
      generatedAt: '2026-06-07T06:00:00.000Z',
    });
    writeFileSync(
      join(generatedRoot, 'requests.json'),
      `${JSON.stringify(
        {
          schemaVersion: 'draft-lab-image-requests-v1',
          requests: [
            {
              id: 'inline-01-1780847000000',
              slug: 'the-filter',
              placementId: 'inline-01',
              prompt: 'A 1950s space-western filter gate sorting expensive signals from cheap noise.',
              status: 'queued',
              requestedAt: '2026-06-07T08:00:00.000Z',
              requestedBy: 'draft-lab-ui',
              updatedAt: '2026-06-07T08:00:00.000Z',
            },
          ],
        },
        null,
        2,
      )}\n`,
    );

    const result = await processQueuedInteriorImageRequests({
      inputPath: planPath,
      articlesRoot,
      publicRoot,
      slug: 'the-filter',
      limit: 1,
      provider: 'minimax',
      model: 'image-01',
      size: '16:9',
      dryRun: true,
      spendApproved: false,
      generatedAt: '2026-06-07T09:00:00.000Z',
    });

    expect(result).toMatchObject({
      schemaVersion: 'image-request-worker-result-v1',
      dryRun: true,
      queued: 1,
      planned: 1,
      failures: 0,
    });
    expect(result.results[0]).toMatchObject({
      requestId: 'inline-01-1780847000000',
      placementId: 'inline-01',
      status: 'planned',
      prompt: 'A 1950s space-western filter gate sorting expensive signals from cheap noise.',
    });
  });

  it('can target a specific queued Draft Lab image request', async () => {
    const root = tempRoot();
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    const generatedRoot = join(articlesRoot, 'the-filter/images/generated');
    mkdirSync(generatedRoot, { recursive: true });
    writeFileSync(
      join(articlesRoot, 'the-filter/index.md'),
      `---
title: "The Filter"
status: draft
---

# The Filter

## The Factory Model

The economics change when the unit is a factory.
`,
    );
    const planPath = join(root, 'content/distribution/factory-primitives-interior-image-plan.json');
    generateInteriorImagePlan({
      launchPlan: {
        articles: [{ slug: 'the-filter', title: 'The Filter' }],
      },
      articlesRoot,
      outputPath: planPath,
      countPerArticle: 1,
      variantsPerPlacement: 1,
      write: true,
      generatedAt: '2026-06-07T06:00:00.000Z',
    });
    writeFileSync(
      join(generatedRoot, 'requests.json'),
      `${JSON.stringify(
        {
          schemaVersion: 'draft-lab-image-requests-v1',
          requests: [
            {
              id: 'old-junk-request',
              slug: 'the-filter',
              placementId: 'inline-01',
              prompt: 'ignore this stale prompt',
              status: 'queued',
              requestedAt: '2026-06-07T08:00:00.000Z',
              requestedBy: 'draft-lab-ui',
              updatedAt: '2026-06-07T08:00:00.000Z',
            },
            {
              id: 'target-good-request',
              slug: 'the-filter',
              placementId: 'inline-01',
              prompt: 'A 1950s space-western filter gate sorting expensive signals from cheap noise.',
              status: 'queued',
              requestedAt: '2026-06-07T08:10:00.000Z',
              requestedBy: 'draft-lab-ui',
              updatedAt: '2026-06-07T08:10:00.000Z',
            },
          ],
        },
        null,
        2,
      )}\n`,
    );

    const result = await processQueuedInteriorImageRequests({
      inputPath: planPath,
      articlesRoot,
      publicRoot,
      slug: 'the-filter',
      requestId: 'target-good-request',
      limit: 1,
      provider: 'minimax',
      model: 'image-01',
      size: '16:9',
      dryRun: true,
      spendApproved: false,
      generatedAt: '2026-06-07T09:00:00.000Z',
    });

    expect(result).toMatchObject({
      queued: 1,
      planned: 1,
      failures: 0,
    });
    expect(result.results[0]).toMatchObject({
      requestId: 'target-good-request',
      prompt: 'A 1950s space-western filter gate sorting expensive signals from cheap noise.',
    });
  });

  it('plans queued source-image variation requests with source metadata', async () => {
    const root = tempRoot();
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    const generatedRoot = join(articlesRoot, 'the-filter/images/generated');
    mkdirSync(generatedRoot, { recursive: true });
    writeFileSync(
      join(articlesRoot, 'the-filter/index.md'),
      `---
title: "The Filter"
status: draft
---

# The Filter

## The Factory Model

The economics change when the unit is a factory.
`,
    );
    const planPath = join(root, 'content/distribution/factory-primitives-interior-image-plan.json');
    generateInteriorImagePlan({
      launchPlan: {
        articles: [{ slug: 'the-filter', title: 'The Filter' }],
      },
      articlesRoot,
      outputPath: planPath,
      countPerArticle: 1,
      variantsPerPlacement: 1,
      write: true,
      generatedAt: '2026-06-07T06:00:00.000Z',
    });
    writeFileSync(
      join(generatedRoot, 'requests.json'),
      `${JSON.stringify(
        {
          schemaVersion: 'draft-lab-image-requests-v1',
          requests: [
            {
              id: 'source-variation-request',
              slug: 'the-filter',
              placementId: 'inline-01',
              prompt: 'Keep the portal, but add a crowd being filtered by cost.',
              status: 'queued',
              requestedAt: '2026-06-07T08:10:00.000Z',
              requestedBy: 'draft-lab-ui',
              updatedAt: '2026-06-07T08:10:00.000Z',
              sourceAssetId: 'inline-01:inline-01-v1',
              sourceVariantId: 'inline-01-v1',
              sourceImageUrl:
                'https://davidmieloch.brain-garden.io/api/draft-lab/generated-image?path=%2Fblog%2Fthe-filter%2Fimages%2Fgenerated%2Finline-01%2Finline-01-v1.png',
            },
          ],
        },
        null,
        2,
      )}\n`,
    );

    const result = await processQueuedInteriorImageRequests({
      inputPath: planPath,
      articlesRoot,
      publicRoot,
      slug: 'the-filter',
      requestId: 'source-variation-request',
      limit: 1,
      provider: 'minimax',
      model: 'image-01',
      size: '16:9',
      dryRun: true,
      spendApproved: false,
      generatedAt: '2026-06-07T09:00:00.000Z',
    });

    expect(result).toMatchObject({
      queued: 1,
      planned: 1,
      failures: 0,
    });
    expect(result.results[0]).toMatchObject({
      requestId: 'source-variation-request',
      generationMode: 'source-image-variation',
      sourceAssetId: 'inline-01:inline-01-v1',
      sourceVariantId: 'inline-01-v1',
      requestPrompt: 'Keep the portal, but add a crowd being filtered by cost.',
    });
    expect(result.results[0].prompt).toContain(
      'Use the supplied source image as the visual reference',
    );
    expect(result.results[0].prompt).toContain(
      'Keep the portal, but add a crowd being filtered by cost.',
    );
  });

  it('reads Draft Lab image requests from the durable data root when configured', async () => {
    const root = tempRoot();
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    const dataRoot = join(root, 'draft-lab-data');
    const generatedRoot = join(articlesRoot, 'the-filter/images/generated');
    const durableGeneratedRoot = join(
      dataRoot,
      'content/articles/the-filter/images/generated',
    );
    mkdirSync(generatedRoot, { recursive: true });
    mkdirSync(durableGeneratedRoot, { recursive: true });
    writeFileSync(
      join(articlesRoot, 'the-filter/index.md'),
      `---
title: "The Filter"
status: draft
---

# The Filter

## The Factory Model

The economics change when the unit is a factory.
`,
    );
    const planPath = join(root, 'content/distribution/factory-primitives-interior-image-plan.json');
    generateInteriorImagePlan({
      launchPlan: {
        articles: [{ slug: 'the-filter', title: 'The Filter' }],
      },
      articlesRoot,
      outputPath: planPath,
      countPerArticle: 1,
      variantsPerPlacement: 1,
      write: true,
      generatedAt: '2026-06-07T06:00:00.000Z',
    });
    writeFileSync(
      join(generatedRoot, 'requests.json'),
      `${JSON.stringify(
        {
          schemaVersion: 'draft-lab-image-requests-v1',
          requests: [],
        },
        null,
        2,
      )}\n`,
    );
    writeFileSync(
      join(durableGeneratedRoot, 'requests.json'),
      `${JSON.stringify(
        {
          schemaVersion: 'draft-lab-image-requests-v1',
          requests: [
            {
              id: 'durable-root-request',
              slug: 'the-filter',
              placementId: 'inline-01',
              prompt: 'This request only exists outside the git checkout.',
              status: 'queued',
              requestedAt: '2026-06-07T08:10:00.000Z',
              requestedBy: 'draft-lab-ui',
              updatedAt: '2026-06-07T08:10:00.000Z',
            },
          ],
        },
        null,
        2,
      )}\n`,
    );

    const previousDataRoot = process.env.DRAFT_LAB_DATA_ROOT;
    process.env.DRAFT_LAB_DATA_ROOT = dataRoot;
    try {
      const result = await processQueuedInteriorImageRequests({
        inputPath: planPath,
        articlesRoot,
        publicRoot,
        slug: 'the-filter',
        requestId: 'durable-root-request',
        limit: 1,
        provider: 'minimax',
        model: 'image-01',
        size: '16:9',
        dryRun: true,
        spendApproved: false,
        generatedAt: '2026-06-07T09:00:00.000Z',
      });

      expect(result).toMatchObject({
        queued: 1,
        planned: 1,
        failures: 0,
      });
      expect(result.results[0]).toMatchObject({
        requestId: 'durable-root-request',
        prompt: 'This request only exists outside the git checkout.',
      });
      expect(result.requestsPath).toContain('draft-lab-data');
    } finally {
      if (previousDataRoot === undefined) {
        delete process.env.DRAFT_LAB_DATA_ROOT;
      } else {
        process.env.DRAFT_LAB_DATA_ROOT = previousDataRoot;
      }
    }
  });

  it('reports website draft and vault-candidate article readiness gates', () => {
    const root = tempRoot();
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    const obsidianRoot = join(root, 'obsidian/blogs');
    mkdirSync(join(articlesRoot, 'the-filter'), { recursive: true });
    mkdirSync(join(publicRoot, 'blog/the-filter/images'), { recursive: true });
    mkdirSync(join(obsidianRoot, 'third-wave'), { recursive: true });
    writeFileSync(join(publicRoot, 'blog/the-filter/images/hero.png'), 'fake image');
    writeFileSync(
      join(articlesRoot, 'the-filter/index.md'),
      `---
title: "The Filter"
description: "A draft with planned images."
publishedAt: "2026-06-10"
status: "draft"
canonicalUrl: "https://davidmieloch.com/blog/the-filter"
coverImage: "/blog/the-filter/images/hero.png"
---

# The Filter

## One
Body.

## Two
Body.

## Three
Body.
`,
    );
    writeFileSync(
      join(articlesRoot, 'the-filter/image-manifest.json'),
      JSON.stringify({
        assets: [
          {
            id: 'hero-linkedin',
            role: 'hero-and-linkedin-preview',
            publicPath: '/blog/the-filter/images/hero.png',
            width: 1920,
            height: 1080,
            caption: 'A black hole filter over a frontier software factory.',
          },
        ],
      }),
    );
    mkdirSync(join(articlesRoot, 'the-filter/images'), { recursive: true });
    writeFileSync(
      join(articlesRoot, 'the-filter/images/interior-plan.json'),
      JSON.stringify({ targetApprovedImages: 2, candidateVariants: 4 }),
    );
    writeFileSync(join(articlesRoot, 'the-filter/image-brief.md'), '# brief');
    const siteCalendarPath = join(root, 'content/distribution/site-release-calendar.json');
    mkdirSync(join(root, 'content/distribution'), { recursive: true });
    mkdirSync(join(root, 'content/distribution/linkedin-article-transfer/the-filter'), { recursive: true });
    writeFileSync(
      siteCalendarPath,
      JSON.stringify({
        entries: [
          {
            slug: 'the-filter',
            plannedReleaseAt: '2026-06-10T07:00:00-04:00',
            linkedin: { status: 'needs-browser-staging' },
          },
        ],
      }),
    );
    writeFileSync(
      join(root, 'content/distribution/factory-primitives-social-calendar.json'),
      JSON.stringify({
        entries: [
          {
            articleSlug: 'the-filter',
            platform: 'linkedin',
            scheduledAt: '2026-06-10T11:00:00.000Z',
            packagePath: join(root, 'content/distribution/social-packages/the-filter/linkedin.md'),
          },
        ],
      }),
    );
    writeFileSync(
      join(root, 'content/distribution/linkedin-article-transfer/the-filter/linkedin-article-transfer.json'),
      JSON.stringify({
        bodyMarkdown: 'Native LinkedIn article body.',
        heroImage: {
          exists: true,
        },
      }),
    );
    writeFileSync(
      join(obsidianRoot, 'third-wave/2026-04-30-asi-should-be-the-avatar-not-god.md'),
      `---
date: 2026-04-30
status: draft
---

# ASI Should Be the Avatar, Not God

Avatar: The Last Airbender is the metaphor here. Aang and Team Avatar make the governance point.
`,
    );

    const outputPath = join(root, 'content/distribution/article-readiness-report.json');
    const markdownOutputPath = join(root, 'docs/ops/article-readiness-report.md');
    const report = generateArticleReadiness({
      articlesRoot,
      publicRoot,
      siteReleaseCalendarPath: siteCalendarPath,
      obsidianBlogsRoot: obsidianRoot,
      outputPath,
      markdownOutputPath,
      write: true,
      generatedAt: '2026-06-07T08:00:00.000Z',
    });

    expect(report.summary).toMatchObject({
      websiteArticles: 1,
      websiteDrafts: 1,
      websiteDraftsReadyForRelease: 0,
      websiteDraftsNeedingInteriorImages: 1,
      vaultCandidates: 1,
      vaultCandidatesNotOnWebsite: 1,
      vaultCandidatesWithCopyrightReferenceRisk: 1,
    });
    expect(report.websiteDrafts[0].warnings).toContain('draft interior images planned but not generated/approved');
    expect(report.websiteDrafts[0].gates).toMatchObject({
      heroLinkedInReady: true,
      imageCaptions: true,
      linkedinArticleTransfer: true,
      linkedinTeaserScheduled: true,
      siteLinkedInReleaseAligned: true,
    });
    expect(report.vaultCandidates[0]).toMatchObject({
      slug: 'asi-should-be-the-avatar-not-god',
      gates: {
        ipPolicy: 'copyright-reference-review-required',
      },
    });
    expect(report.vaultCandidates[0].recommendedImageStrategy).toContain('Do not generate protected-character/style imitation');
    expect(readFileSync(outputPath, 'utf8')).toContain('"article-readiness-report-v1"');
    expect(readFileSync(markdownOutputPath, 'utf8')).toContain('ASI Should Be the Avatar, Not God');
  });

  it('writes LinkedIn Article transfer JSON and Markdown packets through the CLI', () => {
    const root = tempRoot();
    mkdirSync(join(root, 'content/articles/the-factory'), { recursive: true });
    mkdirSync(join(root, 'content/distribution'), { recursive: true });
    mkdirSync(join(root, 'public/blog/the-factory/images'), { recursive: true });
    writeFileSync(join(root, 'public/blog/the-factory/images/hero-linkedin.png'), 'fake image bytes');
    writeFileSync(
      join(root, 'content/distribution/factory-primitives-launch-plan.json'),
      JSON.stringify({
        series: 'Factory Primitives',
        articles: [
          {
            slug: 'the-factory',
            title: 'The Factory',
          },
        ],
      }, null, 2),
    );
    writeFileSync(
      join(root, 'content/articles/the-factory/index.md'),
      `---
title: "The Factory"
description: "Factory description"
canonicalUrl: "https://davidmieloch.com/blog/the-factory"
coverImage: "/blog/the-factory/images/hero-linkedin.png"
---

# The Factory

The factory turns repeated agent labor into substrate.
`,
    );

    const result = runPipelineCommand(root, [
      'linkedin:article-transfer',
      'all',
      '--write',
      '--output=content/distribution/linkedin-article-transfer',
    ]);

    expect(result.status).toBe(0);
    const jsonPath = join(
      root,
      'content/distribution/linkedin-article-transfer/the-factory/linkedin-article-transfer.json',
    );
    const markdownPath = join(
      root,
      'content/distribution/linkedin-article-transfer/the-factory/linkedin-article-transfer.md',
    );
    const checklistPath = join(
      root,
      'content/distribution/linkedin-article-transfer/linkedin-article-staging-checklist.md',
    );
    const packet = JSON.parse(readFileSync(jsonPath, 'utf8'));
    const markdown = readFileSync(markdownPath, 'utf8');
    const checklist = readFileSync(checklistPath, 'utf8');
    expect(packet).toMatchObject({
      slug: 'the-factory',
      title: 'The Factory',
      safety: {
        safeDefault: 'stop-at-linkedin-draft-preview',
        publicPublishingAllowed: false,
      },
    });
    expect(markdown).toContain('Stop before: publish-submit-schedule');
    expect(markdown).toContain('The factory turns repeated agent labor into substrate.');
    expect(checklist).toContain('Safe default: stop at LinkedIn draft/preview.');
    expect(checklist).toContain('Do not publish, submit, schedule, or share.');
    expect(checklist).toContain('JSON packet:');
  });

  it('blocks non-dry-run Postiz pushes until the API adapter is verified', () => {
    const root = tempRoot();
    const outputRoot = join(root, 'content/distribution/social-packages');
    writeLedgerFixture(root);
    writeAudioArticleFixture(root);
    const ledger = JSON.parse(readFileSync(join(root, 'content/distribution/platform-ledger.json'), 'utf8'));
    const inventory = socialAccountInventory('ready');
    inventory.accounts[1] = {
      ...inventory.accounts[1],
      postizChannelStatus: 'connected',
      postizChannelId: 'linkedin-channel-1',
    };

    generateSocialPackages({
      ledger,
      inventory,
      articlesRoot: join(root, 'content/articles'),
      outputRoot,
      slug: 'the-factory',
      platform: 'linkedin',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    const schedule = generateSocialSchedule({
      packageRoot: outputRoot,
      inventory,
      startAt: '2026-06-06T13:00:00.000Z',
      intervalHours: 6,
      generatedAt: '2026-06-05T00:00:00.000Z',
    });
    const pushPlan = generatePostizPushPlan({
      socialCalendar: schedule,
      inventory,
      platform: 'linkedin',
      dryRun: false,
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    expect(pushPlan).toMatchObject({
      status: 'blocked-non-dry-run-not-implemented',
      publicPublishingPerformed: false,
      dryRun: false,
      plannedActions: [],
      summary: {
        readyEntries: 1,
        plannedActions: 1,
      },
    });
    expect(pushPlan.reason).toContain('Postiz API writes are intentionally disabled');
  });

  it('blocks Postiz draft creation when the API key is missing', async () => {
    const root = tempRoot();
    const outputRoot = join(root, 'content/distribution/social-packages');
    writeLedgerFixture(root);
    writeAudioArticleFixture(root);
    const ledger = JSON.parse(readFileSync(join(root, 'content/distribution/platform-ledger.json'), 'utf8'));
    const inventory = socialAccountInventory('ready');
    inventory.accounts[1] = {
      ...inventory.accounts[1],
      postizChannelStatus: 'connected',
      postizChannelId: 'linkedin-channel-1',
    };

    generateSocialPackages({
      ledger,
      inventory,
      articlesRoot: join(root, 'content/articles'),
      outputRoot,
      slug: 'the-factory',
      platform: 'linkedin',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    const schedule = generateSocialSchedule({
      packageRoot: outputRoot,
      inventory,
      startAt: '2026-06-06T13:00:00.000Z',
      intervalHours: 6,
      generatedAt: '2026-06-05T00:00:00.000Z',
    });
    const result = await generatePostizDrafts({
      socialCalendar: schedule,
      inventory,
      platform: 'linkedin',
      apiKey: '',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    expect(result).toMatchObject({
      status: 'blocked-missing-postiz-api-key',
      publicPublishingPerformed: false,
      created: [],
    });
  });

  it('blocks Postiz draft creation when David approval is missing', async () => {
    const root = tempRoot();
    const outputRoot = join(root, 'content/distribution/social-packages');
    writeLedgerFixture(root);
    writeAudioArticleFixture(root);
    const ledger = JSON.parse(readFileSync(join(root, 'content/distribution/platform-ledger.json'), 'utf8'));
    const inventory = socialAccountInventory('ready');
    inventory.accounts[1] = {
      ...inventory.accounts[1],
      postizChannelStatus: 'connected',
      postizChannelId: 'linkedin-channel-1',
    };

    generateSocialPackages({
      ledger,
      inventory,
      articlesRoot: join(root, 'content/articles'),
      outputRoot,
      slug: 'the-factory',
      platform: 'linkedin',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    const schedule = generateSocialSchedule({
      packageRoot: outputRoot,
      inventory,
      startAt: '2026-06-06T13:00:00.000Z',
      intervalHours: 6,
      generatedAt: '2026-06-05T00:00:00.000Z',
    });
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    const result = await generatePostizDrafts({
      socialCalendar: schedule,
      inventory,
      platform: 'linkedin',
      apiKey: 'test-postiz-key',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    expect(result).toMatchObject({
      status: 'blocked-missing-david-approval',
      publicPublishingPerformed: false,
      dryRun: false,
      created: [],
    });
    expect(result.blockedEntries[0]).toMatchObject({
      articleSlug: 'the-factory',
      platform: 'linkedin',
      blocker: 'David approval is missing.',
    });
    expect(fetchMock).not.toHaveBeenCalled();
    fetchMock.mockRestore();
  });

  it('creates Postiz draft payloads through the public API without publishing', async () => {
    const root = tempRoot();
    const outputRoot = join(root, 'content/distribution/social-packages');
    writeLedgerFixture(root);
    writeAudioArticleFixture(root);
    const ledger = JSON.parse(readFileSync(join(root, 'content/distribution/platform-ledger.json'), 'utf8'));
    const inventory = socialAccountInventory('ready');
    inventory.postiz.url = 'https://social-davidmieloch.brain-garden.io';
    inventory.accounts[1] = {
      ...inventory.accounts[1],
      postizChannelStatus: 'connected',
      postizChannelId: 'linkedin-channel-1',
      postizChannelName: 'David Mieloch',
    };

    generateSocialPackages({
      ledger,
      inventory,
      articlesRoot: join(root, 'content/articles'),
      outputRoot,
      slug: 'the-factory',
      platform: 'linkedin',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    const schedule = generateSocialSchedule({
      packageRoot: outputRoot,
      inventory,
      startAt: '2026-06-06T13:00:00.000Z',
      intervalHours: 6,
      generatedAt: '2026-06-05T00:00:00.000Z',
    });
    schedule.entries[0].approval.status = 'approved';
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      status: 201,
      text: async () => JSON.stringify([
        {
          postId: 'postiz-post-1',
          integration: 'linkedin-channel-1',
        },
      ]),
    } as Response);

    const result = await generatePostizDrafts({
      socialCalendar: schedule,
      inventory,
      platform: 'linkedin',
      apiKey: 'test-postiz-key',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    expect(result).toMatchObject({
      status: 'created-drafts',
      publicPublishingPerformed: false,
      dryRun: false,
      summary: {
        createdDrafts: 1,
        failedDrafts: 0,
      },
    });
    expect(result.created[0]).toMatchObject({
      status: 'created-draft',
      articleSlug: 'the-factory',
      platform: 'linkedin',
      postizChannelId: 'linkedin-channel-1',
      publicPublishingAllowed: false,
    });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://social-davidmieloch.brain-garden.io/api/public/v1/posts',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'test-postiz-key',
          'Content-Type': 'application/json',
        }),
      }),
    );
    const body = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(body).toMatchObject({
      type: 'draft',
      creationMethod: 'CLI',
      shortLink: false,
      tags: [],
      posts: [
        {
          integration: { id: 'linkedin-channel-1' },
          settings: {},
          value: [
            {
              delay: 0,
              image: [],
            },
          ],
        },
      ],
    });
    expect(body.posts[0].value[0].content).toContain('The Factory');
    fetchMock.mockRestore();
  });

  it('records refusal receipts for manual or credential blockers', () => {
    const root = tempRoot();
    const refusalPath = join(root, 'content/distribution/refusal-inbox.json');

    const refusal = createSocialRefusal({
      refusalPath,
      platform: '1password',
      action: 'create-credential-item',
      reason: 'service-account-lacks-create-update-permission',
      notes: 'Blocks account creation and connector tests.',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    const inbox = JSON.parse(readFileSync(refusalPath, 'utf8'));
    expect(refusal.publicPublishingPerformed).toBe(false);
    expect(inbox.records).toHaveLength(1);
    expect(inbox.records[0]).toMatchObject({
      platform: '1password',
      action: 'create-credential-item',
      status: 'blocked',
      reason: 'service-account-lacks-create-update-permission',
    });
  });
});

describe('content metrics observability', () => {
  it('records metrics and reports coverage against package manifests and ledger receipts', () => {
    const root = tempRoot();
    const packagesRoot = join(root, 'packages');
    const ledgerPath = join(root, 'platform-ledger.json');
    const metricsPath = join(root, 'content-metrics.json');

    generatePlatformPackages({
      article: article(),
      outputRoot: packagesRoot,
      platforms: ['medium', 'reddit'],
      generatedAt: '2026-05-18T00:00:00.000Z',
    });

    writeFileSync(
      ledgerPath,
      JSON.stringify({
        articles: {
          'the-factory': {
            canonicalUrl: 'https://davidmieloch.com/blog/the-factory',
            platforms: {
              medium: {
                status: 'published',
                url: 'https://medium.com/@davidmieloch/the-factory',
              },
              reddit: {
                status: 'draft',
              },
            },
          },
        },
      }),
    );

    recordContentMetric({
      metricsPath,
      slug: 'the-factory',
      platform: 'medium',
      url: 'https://medium.com/@davidmieloch/the-factory',
      source: 'manual',
      observedAt: '2026-05-18T12:00:00.000Z',
      metrics: {
        views: 120,
        clicks: 9,
        reactions: 4,
        comments: 1,
        shares: 2,
        subscribers: 0,
      },
    });

    const report = contentMetricsReport({
      ledgerPath,
      packagesRoot,
      metricsPath,
    });
    const platforms = report.platforms as Record<string, {
      packages: number;
      publishedReceipts: number;
      metricRecords: number;
      missingMetricsForPublished: number;
    }>;

    expect(report.summary).toMatchObject({
      packagedArticles: 1,
      packageFiles: 2,
      publishedReceipts: 1,
      metricRecords: 1,
      missingMetricsForPublished: 0,
    });
    expect(platforms.medium).toMatchObject({
      packages: 1,
      publishedReceipts: 1,
      metricRecords: 1,
      missingMetricsForPublished: 0,
    });
    expect(report.observation).toMatchObject({
      claim: 'content distribution metrics are reconciled against package manifests and platform receipts',
      status: 'PASS',
      fallbackChain: [
        'content-metrics.json checksum',
        'package manifest and ledger reconciliation',
        'ROM heartbeat',
      ],
    });
  });

  it('builds a platform-specific metrics capture queue for published receipts without metrics', () => {
    const root = tempRoot();
    const ledgerPath = join(root, 'platform-ledger.json');
    const metricsPath = join(root, 'content-metrics.json');
    const policyPath = join(root, 'syndication-policy.json');

    writeFileSync(
      ledgerPath,
      JSON.stringify({
        articles: {
          'the-factory': {
            title: 'The Factory',
            platforms: {
              devto: {
                status: 'published',
                url: 'https://dev.to/david/the-factory',
              },
              medium: {
                status: 'draft',
                url: 'https://medium.com/@david/the-factory',
              },
            },
          },
        },
      }),
    );
    writeFileSync(
      policyPath,
      JSON.stringify({
        platforms: {
          devto: {
            displayName: 'DEV',
            metrics: {
              source: 'api-or-manual',
              fields: ['page_views_count', 'public_reactions_count', 'comments_count'],
            },
          },
        },
      }),
    );

    const checklist = contentMetricsChecklist({ ledgerPath, metricsPath, policyPath });

    expect(checklist.status).toBe('DEGRADED');
    expect(checklist.captureQueue).toEqual([
      {
        slug: 'the-factory',
        title: 'The Factory',
        platform: 'devto',
        displayName: 'DEV',
        url: 'https://dev.to/david/the-factory',
        source: 'api-or-manual',
        fields: ['page_views_count', 'public_reactions_count', 'comments_count'],
        command: 'pnpm content:pipeline metrics:record the-factory devto --url=https://dev.to/david/the-factory --page_views_count=0 --public_reactions_count=0 --comments_count=0',
      },
    ]);
    const platforms = checklist.platforms as Record<string, {
      publishedReceipts: number;
      missingMetricRecords: number;
    }>;
    expect(platforms.devto).toMatchObject({
      publishedReceipts: 1,
      missingMetricRecords: 1,
    });
  });

  it('normalizes platform-native metric aliases into comparable counts', () => {
    const root = tempRoot();
    const metricsPath = join(root, 'content-metrics.json');

    const record = recordContentMetric({
      metricsPath,
      slug: 'the-factory',
      platform: 'devto',
      url: 'https://dev.to/david/the-factory',
      metrics: {
        page_views_count: 42,
        public_reactions_count: 7,
        comments_count: 3,
      },
    });

    expect(record.metrics).toMatchObject({
      views: 42,
      reactions: 7,
      comments: 3,
    });
    expect(record.raw).toMatchObject({
      page_views_count: 42,
      public_reactions_count: 7,
      comments_count: 3,
    });
  });
});

describe('upstream content ledger', () => {
  it('dedupes Obsidian drafts, keeps dated folders canonical, and tracks image and schedule gates', () => {
    const root = tempRoot();
    const blogsRoot = join(root, 'blogs');
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    const packagesRoot = join(root, 'content/distribution/packages');
    const platformLedgerPath = join(root, 'content/distribution/platform-ledger.json');
    const publishSchedulePath = join(root, 'content/distribution/publish-schedule.json');

    mkdirSync(join(blogsRoot, '6-3-2026', 'the-filter'), { recursive: true });
    mkdirSync(join(blogsRoot, '_organized/vault-drafts'), { recursive: true });
    mkdirSync(join(packagesRoot, 'the-filter'), { recursive: true });
    mkdirSync(join(root, 'content/distribution'), { recursive: true });
    writeFileSync(
      join(blogsRoot, '6-3-2026/the-filter.md'),
      `---
title: "The Filter"
status: "draft"
---

# The Filter

${longBody()}
`,
    );
    writeFileSync(join(blogsRoot, '6-3-2026/the-filter/filter-hero.png'), 'fake image bytes');
    writeFileSync(
      join(blogsRoot, '6-3-2026/HANDOFF.md'),
      `# Golden Hammer Series Session Handoff

This is workflow context, not an article.
`,
    );
    writeFileSync(
      join(blogsRoot, '_organized/vault-drafts/the-filter.md'),
      `---
title: "The Filter"
status: "draft"
---

# The Filter

Older organized duplicate.
`,
    );
    writeFileSync(join(packagesRoot, 'the-filter', 'linkedin.md'), 'linkedin package');
    writeFileSync(
      platformLedgerPath,
      JSON.stringify({ articles: {} }, null, 2),
    );
    writeFileSync(
      publishSchedulePath,
      JSON.stringify({
        entries: [
          {
            articleSlug: 'the-filter',
            scheduledAt: '2026-06-08T15:00:00.000Z',
            platform: 'linkedin',
            displayName: 'LinkedIn',
            action: 'prepare-social-teaser',
            status: 'draft',
            safeDefault: 'do-not-publish',
            approval: { status: 'missing' },
            publicPublishingAllowed: false,
          },
        ],
      }, null, 2),
    );

    const buildLedger = buildContentLedger as unknown as (
      options: ContentLedgerOptions
    ) => ReturnType<typeof buildContentLedger>;
    const ledger = buildLedger({
      obsidianBlogsRoot: blogsRoot,
      websiteArticlesRoot: articlesRoot,
      publicRoot,
      packagesRoot,
      platformLedgerPath,
      publishSchedulePath,
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    expect(ledger.publicPublishingPerformed).toBe(false);
    expect(ledger.summary).toMatchObject({
      totalCandidates: 1,
      likelyLegitUnpublished: 1,
      needsImageWork: 1,
      needsSocialTeaser: 0,
      needsReleaseSchedule: 0,
    });
    expect(ledger.duplicateGroups).toHaveLength(1);
    expect(ledger.items[0]).toMatchObject({
      slug: 'the-filter',
      sourceBucket: 'dated-folder',
      collection: 'Factory Primitives',
      gates: {
        thesis: 'likely-finished-text-review-needed',
        image: 'needs-image-selection-approval',
        website: 'needs-website-staging',
        socialTeaser: 'package-started',
        release: 'scheduled-or-queued',
        approval: 'needs-david-approval-before-public-release',
      },
      releaseSchedule: {
        status: 'scheduled-or-queued',
        count: 1,
        nextScheduledAt: '2026-06-08T15:00:00.000Z',
      },
    });

    const markdown = contentLedgerMarkdown(ledger);
    expect(markdown).toContain('# Content Ledger');
    expect(markdown).toContain('- Needs release schedule: 0');
    expect(markdown).toContain('Release: scheduled-or-queued next 2026-06-08T15:00:00.000Z');
  });

  it('writes the content ledger and Markdown report through the CLI without publishing', () => {
    const root = tempRoot();
    const blogsRoot = join(root, 'blogs');
    const outputPath = join(root, 'content/distribution/content-ledger.json');
    const reportPath = join(root, 'docs/ops/content-ledger.md');

    mkdirSync(join(blogsRoot, '6-3-2026'), { recursive: true });
    mkdirSync(join(root, 'content/distribution'), { recursive: true });
    writeFileSync(
      join(blogsRoot, '6-3-2026/the-meter.md'),
      `---
title: "The Meter"
---

# The Meter

${longBody()}
`,
    );
    writeFileSync(
      join(root, 'content/distribution/platform-ledger.json'),
      JSON.stringify({ articles: {} }, null, 2),
    );

    const result = runPipelineCommand(root, [
      'content:ledger',
      '--write',
      `--obsidian-root=${blogsRoot}`,
      `--output=${outputPath}`,
      `--report=${reportPath}`,
    ]);

    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout);
    expect(payload).toMatchObject({
      publicPublishingPerformed: false,
      outputPath,
      reportPath,
      summary: {
        totalCandidates: 1,
      },
    });
    expect(JSON.parse(readFileSync(outputPath, 'utf8')).items[0]).toMatchObject({
      slug: 'the-meter',
    });
    expect(readFileSync(reportPath, 'utf8')).toContain('# Content Ledger');
  });

  it('normalizes article image manifests from on-disk images and article embeds', async () => {
    const root = tempRoot();
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    const slug = 'the-filter';
    mkdirSync(join(articlesRoot, slug), { recursive: true });
    mkdirSync(join(publicRoot, 'blog', slug, 'images'), { recursive: true });
    await writeImageFixture(join(publicRoot, 'blog', slug, 'images', 'hero.png'));
    await writeImageFixture(join(publicRoot, 'blog', slug, 'images', 'inline-one.png'));

    writeFileSync(
      join(articlesRoot, slug, 'index.md'),
      `---
title: "The Filter"
description: "A draft with planned images."
publishedAt: "2026-06-10"
status: "draft"
canonicalUrl: "https://davidmieloch.com/blog/${slug}"
series: "Factory Primitives"
---

# The Filter

![A black hole filter over a frontier software factory.](/blog/${slug}/images/hero.png)

## One
Body.

![Workers stampeding toward the gate.](/blog/${slug}/images/inline-one.png)

## Two
Body.
`,
    );

    const manifest = await buildArticleImageManifest({
      articlesRoot,
      publicRoot,
      slug,
      generatedAt: '2026-06-11T00:00:00.000Z',
    });

    expect(manifest.publicPublishingPerformed).toBe(false);
    expect(manifest.manifest.articleSlug).toBe(slug);
    expect(manifest.manifest.assets).toHaveLength(2);
    expect(manifest.manifest.assets[0]).toMatchObject({
      id: 'hero-linkedin',
      role: 'hero-and-linkedin-preview',
      publicPath: `/blog/${slug}/images/hero.png`,
      caption: 'A black hole filter over a frontier software factory.',
      promptSummary: 'A black hole filter over a frontier software factory.',
      width: 1408,
      height: 768,
      aspectRatio: '16:9',
    });
    expect(manifest.manifest.assets[1]).toMatchObject({
      id: 'inline-01',
      role: 'article-interior',
      publicPath: `/blog/${slug}/images/inline-one.png`,
      caption: 'Workers stampeding toward the gate.',
    });
    const writtenManifest = JSON.parse(readFileSync(join(articlesRoot, slug, 'image-manifest.json'), 'utf8'));
    expect(writtenManifest.articleSlug).toBe(slug);
    expect(writtenManifest.assets).toHaveLength(2);
    expect(writtenManifest.assets[0]).toMatchObject({
      publicPath: `/blog/${slug}/images/hero.png`,
    });
  });

  it('writes image manifests through the CLI for a single article slug', async () => {
    const root = tempRoot();
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    const slug = 'the-filter';
    mkdirSync(join(articlesRoot, slug), { recursive: true });
    mkdirSync(join(publicRoot, 'blog', slug, 'images'), { recursive: true });
    await writeImageFixture(join(publicRoot, 'blog', slug, 'images', 'hero.png'));

    writeFileSync(
      join(articlesRoot, slug, 'index.md'),
      `---
title: "The Filter"
description: "A draft with planned images."
publishedAt: "2026-06-10"
status: "draft"
canonicalUrl: "https://davidmieloch.com/blog/${slug}"
---

# The Filter

![A black hole filter over a frontier software factory.](/blog/${slug}/images/hero.png)
`,
    );

    const result = runPipelineCommand(root, [
      'article:image-manifest',
      slug,
      '--approval-status=staged-for-david-review',
    ]);

    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout);
    expect(payload).toMatchObject({
      publicPublishingPerformed: false,
      results: [
        {
          slug,
          assetCount: 1,
        },
      ],
      failures: [],
    });
    expect(JSON.parse(readFileSync(join(articlesRoot, slug, 'image-manifest.json'), 'utf8'))).toMatchObject({
      articleSlug: slug,
      approval: {
        status: 'staged-for-david-review',
      },
    });
  });

  it('downgrades an approved manifest when the image assets change', async () => {
    const root = tempRoot();
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    const slug = 'the-filter';
    mkdirSync(join(articlesRoot, slug), { recursive: true });
    mkdirSync(join(publicRoot, 'blog', slug, 'images'), { recursive: true });
    await writeImageFixture(join(publicRoot, 'blog', slug, 'images', 'hero.png'));

    writeFileSync(
      join(articlesRoot, slug, 'index.md'),
      `---
title: "The Filter"
description: "A draft with planned images."
publishedAt: "2026-06-10"
status: "draft"
canonicalUrl: "https://davidmieloch.com/blog/${slug}"
---

# The Filter

![A black hole filter over a frontier software factory.](/blog/${slug}/images/hero.png)
`,
    );

    await buildArticleImageManifest({
      articlesRoot,
      publicRoot,
      slug,
      generatedAt: '2026-06-11T00:00:00.000Z',
    });

    writeFileSync(
      join(articlesRoot, slug, 'image-manifest.json'),
      JSON.stringify({
        schemaVersion: 'article-image-manifest-v1',
        generatedAt: '2026-06-11T00:00:00.000Z',
        publicPublishingPerformed: false,
        articleSlug: slug,
        articleTitle: 'The Filter',
        series: 'Factory Primitives',
        visualSystem: 'editorial article art',
        approval: {
          status: 'approved',
          requiredFrom: 'David',
          approvedAt: '2026-06-11T00:00:00.000Z',
        },
        assets: [
          {
            id: 'hero-linkedin',
            role: 'hero-and-linkedin-preview',
            publicPath: `/blog/${slug}/images/hero.png`,
            sourcePath: `public/blog/${slug}/images/hero.png`,
            width: 1408,
            height: 768,
            aspectRatio: '16:9',
            checksumSha256: 'old-checksum',
            caption: 'A black hole filter over a frontier software factory.',
            promptSummary: 'A black hole filter over a frontier software factory.',
            provider: 'minimax',
            generationReceipt: null,
          },
        ],
        launchReadiness: {
          status: 'ready-for-editorial-approval',
          releaseTarget: '2026-06-10',
          blocker: null,
        },
      }, null, 2),
    );

    await writeImageFixture(join(publicRoot, 'blog', slug, 'images', 'hero.png'), 1600, 900);

    const manifest = await buildArticleImageManifest({
      articlesRoot,
      publicRoot,
      slug,
      generatedAt: '2026-06-12T00:00:00.000Z',
    });

    expect(manifest.manifest.approval).toMatchObject({
      status: 'staged-for-david-review',
      requiredFrom: 'David',
      approvedAt: null,
    });
    expect(manifest.manifest.launchReadiness.status).toBe('needs-editorial-approval');
    expect(manifest.manifest.launchReadiness.blocker).toBe(
      'Image assets changed after approval; re-approval required.',
    );
  });
});

describe('article audio narration pipeline', () => {
  it('prepares a spoken audio script without images, tables, raw URLs, or code blocks', () => {
    const root = tempRoot();
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    writeAudioArticleFixture(root);

    const prepared = prepareAudio({
      articlesRoot,
      slug: 'the-factory',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    expect(prepared).toMatchObject({
      slug: 'the-factory',
      action: 'prepared-audio-script',
    });
    const script = readFileSync(join(articlesRoot, 'the-factory', 'audio.md'), 'utf8');
    expect(script).toContain('The A.I. factory is not just an A.P.I. wrapper.');
    expect(script).toContain('The P.R.D. gives the agent a target.');
    expect(script).not.toContain('Factory image');
    expect(script).not.toContain('Stage | Owner');
    expect(script).not.toContain('invisible');
    expect(script).not.toContain('https://example.com');

    const status = statusAudio({
      articlesRoot,
      publicRoot,
      slug: 'the-factory',
    });
    expect(status.articles[0]).toMatchObject({
      slug: 'the-factory',
      status: 'needs-script-approval',
      audioExists: false,
    });
    expect(quoteAudio({ articlesRoot, slug: 'the-factory' }).quote).toMatchObject({
      endpoint: 'https://api.speechify.ai/v1/audio/stream',
      requiresChunking: false,
    });
  });

  it('marks an audio script stale when the canonical article changes', () => {
    const root = tempRoot();
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    writeAudioArticleFixture(root);
    prepareAudio({ articlesRoot, slug: 'the-factory' });

    writeFileSync(
      join(articlesRoot, 'the-factory', 'index.md'),
      readFileSync(join(articlesRoot, 'the-factory', 'index.md'), 'utf8').replace(
        'It is a workflow.',
        'It is a workflow that now changed.',
      ),
    );

    expect(statusAudio({ articlesRoot, publicRoot, slug: 'the-factory' }).articles[0]).toMatchObject({
      status: 'audio-script-stale',
    });
  });

  it('refuses paid Speechify generation unless spend is explicitly approved', async () => {
    const root = tempRoot();
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    writeAudioArticleFixture(root);
    prepareAudio({ articlesRoot, slug: 'the-factory' });
    approveAudio({ articlesRoot, slug: 'the-factory' });

    await expect(generateAudio({
      articlesRoot,
      publicRoot,
      slug: 'the-factory',
      spendApproved: false,
      voiceId: 'voice-id',
    })).rejects.toThrow('requires --spend-approved');
  });

  it('requires transcript proof before audio can be considered launch-current', () => {
    const root = tempRoot();
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    writeAudioArticleFixture(root);
    prepareAudio({ articlesRoot, slug: 'the-factory' });
    writeAudioFileFixture(root);

    expect(statusTranscript({ articlesRoot, publicRoot, slug: 'the-factory' }).articles[0]).toMatchObject({
      status: 'needs-transcript-verification',
    });
  });

  it('rejects transcript proof when the audio transcript is missing the ending', () => {
    const root = tempRoot();
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    writeAudioArticleFixture(root);
    prepareAudio({ articlesRoot, slug: 'the-factory' });
    writeAudioFileFixture(root);
    const scriptBody = readAudioScriptBody(root);
    const cutOffTranscript = scriptBody.split(/\s+/).slice(0, 12).join(' ');

    expect(() => verifyTranscript({
      articlesRoot,
      publicRoot,
      slug: 'the-factory',
      transcript: cutOffTranscript,
      provider: 'test',
      model: 'fixture',
      generatedAt: '2026-06-05T00:00:00.000Z',
    })).toThrow('Transcript verification failed');
    expect(statusTranscript({ articlesRoot, publicRoot, slug: 'the-factory' }).articles[0]).toMatchObject({
      status: 'audio-transcript-failed',
    });
  });

  it('marks transcript proof current only while script and audio hashes still match', () => {
    const root = tempRoot();
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    writeAudioArticleFixture(root);
    prepareAudio({ articlesRoot, slug: 'the-factory' });
    writeAudioFileFixture(root);
    const scriptBody = readAudioScriptBody(root);

    const verification = verifyTranscript({
      articlesRoot,
      publicRoot,
      slug: 'the-factory',
      transcript: scriptBody,
      provider: 'test',
      model: 'fixture',
      generatedAt: '2026-06-05T00:00:00.000Z',
    });

    expect(verification.comparison).toMatchObject({
      status: 'PASS',
      tailCoveragePass: true,
    });
    expect(statusTranscript({ articlesRoot, publicRoot, slug: 'the-factory' }).articles[0]).toMatchObject({
      status: 'current',
    });

    writeAudioFileFixture(root, 'the-factory', 'changed fixture audio');

    expect(statusTranscript({ articlesRoot, publicRoot, slug: 'the-factory' }).articles[0]).toMatchObject({
      status: 'audio-transcript-stale',
      staleReasons: ['audio-hash-mismatch'],
    });
  });

  it('writes a generated MP3 and native blog voice track after approved generation', async () => {
    const root = tempRoot();
    const articlesRoot = join(root, 'content/articles');
    const publicRoot = join(root, 'public');
    const outputPath = join(root, 'generatedBlogVoiceTracks.ts');
    const originalFetch = globalThis.fetch;
    const originalApiKey = process.env.SPEECHIFY_API_KEY;
    const audioBytes = new Uint8Array([73, 68, 51, 4]);
    writeAudioArticleFixture(root);
    prepareAudio({ articlesRoot, slug: 'the-factory' });
    approveAudio({ articlesRoot, slug: 'the-factory' });

    process.env.SPEECHIFY_API_KEY = 'test-api-key';
    globalThis.fetch = (async () => new Response(audioBytes, {
      status: 200,
      headers: { 'content-type': 'audio/mpeg' },
    })) as unknown as typeof fetch;

    try {
      const generated = await generateAudio({
        articlesRoot,
        publicRoot,
        slug: 'the-factory',
        spendApproved: true,
        voiceId: 'voice-id',
        generatedAt: '2026-06-05T00:00:00.000Z',
      });
      const tracks = writeVoiceTracks({
        articlesRoot,
        publicRoot,
        outputPath,
      });

      expect(generated).toMatchObject({
        slug: 'the-factory',
        action: 'generated-audio',
        publicSrc: '/audio/voice/blog/the-factory.mp3',
        bytes: 4,
      });
      expect(readFileSync(join(publicRoot, 'audio/voice/blog/the-factory.mp3'))).toEqual(
        Buffer.from(audioBytes),
      );
      expect(tracks.tracks).toEqual([
        {
          id: 'the-factory',
          title: 'The Factory',
          artist: 'Narration by David Mieloch',
          src: '/audio/voice/blog/the-factory.mp3',
          description: 'Audio version of The Factory.',
        },
      ]);
      expect(readFileSync(outputPath, 'utf8')).toContain('generatedBlogVoiceTracks');
      expect(readFileSync(outputPath, 'utf8')).toContain('/audio/voice/blog/the-factory.mp3');
    } finally {
      globalThis.fetch = originalFetch;
      if (originalApiKey === undefined) {
        delete process.env.SPEECHIFY_API_KEY;
      } else {
        process.env.SPEECHIFY_API_KEY = originalApiKey;
      }
    }
  });
});

describe('distribution queue planning', () => {
  it('derives approval-aware next actions from ledger, packages, and readiness', () => {
    const root = tempRoot();
    const packagesRoot = join(root, 'packages');
    const ledger = {
      articles: {
        'the-factory': {
          title: 'The Factory',
          series: 'AI Factory',
          platforms: {
            devto: { status: 'not-started', url: '' },
            hashnode: { status: 'not-started', url: '' },
            medium: { status: 'not-started', url: '' },
            reddit: { status: 'manual-package-required', url: '' },
            hackernoon: { status: 'draft', url: 'https://app.hackernoon.com/mobile/draft' },
            linkedin: { status: 'source', url: 'https://linkedin.com/pulse/the-factory' },
          },
        },
      },
    };
    mkdirSync(join(packagesRoot, 'the-factory'), { recursive: true });
    writeFileSync(join(packagesRoot, 'the-factory', 'devto.md'), 'dev package');
    writeFileSync(join(packagesRoot, 'the-factory', 'medium.md'), 'medium package');
    const policy = loadSyndicationPolicy();

    const queue = buildDistributionQueue({
      ledger,
      policy,
      packagesRoot,
      configured: {
        devto: true,
        hashnode: true,
        hashnodePublication: false,
      },
      canonicalReady: false,
      generatedAt: '2026-05-19T00:00:00.000Z',
    });

    expect(queue.publicPublishingPerformed).toBe(false);
    expect(queue.summary).toMatchObject({
      totalActions: 5,
      unblockedActions: 2,
      blockedActions: 3,
      lanes: {
        'factory-front-door': {
          total: 5,
          blocked: 3,
          unblocked: 2,
        },
      },
    });
    const recommendedNext = queue.recommendedNext as Array<{ action: string }>;
    expect(recommendedNext.map((action) => action.action)).toEqual([
      'review-existing-draft',
      'create-api-draft',
    ]);
    expect(queue.actions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          platform: 'devto',
          action: 'create-api-draft',
          blocked: false,
          releaseLane: 'factory-front-door',
          packagePath: join(packagesRoot, 'the-factory', 'devto.md'),
          nextCommand: 'pnpm content:pipeline draft:create the-factory devto',
        }),
        expect.objectContaining({
          platform: 'medium',
          action: 'blocked-until-ready',
          blocked: true,
          blocker: 'Canonical davidmieloch.com blog URLs are not verified.',
        }),
        expect.objectContaining({
          platform: 'hashnode',
          action: 'blocked-until-ready',
          blocked: true,
          blocker: 'Missing working Hashnode token/publication id pair.',
        }),
      ]),
    );
    expect(queue.observation).toMatchObject({
      claim: 'content distribution next actions are derived from ledger, packages, policy, and readiness',
      status: 'DEGRADED',
    });
  });

  it('pushes legacy backfill behind the current factory brand lane', () => {
    const root = tempRoot();
    const ledger = {
      articles: {
        'legacy-post': {
          title: 'Legacy Post',
          series: 'Legacy Engineering Notes',
          source: { platform: 'medium' },
          platforms: {
            hackernoon: { status: 'not-started', url: '' },
          },
        },
        'factory-post': {
          title: 'Factory Post',
          series: 'AI Factory',
          source: { platform: 'linkedin' },
          platforms: {
            hackernoon: { status: 'not-started', url: '' },
          },
        },
      },
    };

    const queue = buildDistributionQueue({
      ledger,
      policy: loadSyndicationPolicy(),
      packagesRoot: root,
      canonicalReady: true,
    });

    const actions = queue.actions as Array<{ slug: string }>;
    expect(actions.map((action) => action.slug)).toEqual(['factory-post', 'legacy-post']);
    expect(queue.actions[0]).toMatchObject({
      releaseLane: 'factory-front-door',
      priority: 40,
    });
    expect(queue.actions[1]).toMatchObject({
      releaseLane: 'legacy-backfill',
      priority: 75,
    });
  });

  it('filters queue output by lane, platform, action, blocked state, and limit', () => {
    const root = tempRoot();
    const ledger = {
      articles: {
        'factory-post': {
          title: 'Factory Post',
          series: 'AI Factory',
          platforms: {
            devto: { status: 'not-started', url: '' },
            medium: { status: 'not-started', url: '' },
            reddit: { status: 'manual-package-required', url: '' },
          },
        },
      },
    };
    const queue = buildDistributionQueue({
      ledger,
      policy: loadSyndicationPolicy(),
      packagesRoot: root,
      configured: { devto: true },
      canonicalReady: false,
    });

    const filtered = filterDistributionQueue(queue, {
      lane: 'factory-front-door',
      platform: 'devto',
      action: 'create-api-draft',
      blocked: false,
      limit: 1,
    });

    expect(filtered.filters).toMatchObject({
      lane: 'factory-front-door',
      platform: 'devto',
      action: 'create-api-draft',
      blocked: false,
      limit: 1,
    });
    expect(filtered.actions).toHaveLength(1);
    expect(filtered.actions[0]).toMatchObject({
      slug: 'factory-post',
      platform: 'devto',
      action: 'create-api-draft',
      blocked: false,
    });
    expect(filtered.summary).toMatchObject({
      totalActions: 1,
      unblockedActions: 1,
      blockedActions: 0,
    });
  });

  it('filters queue output by multiple platforms before limiting', () => {
    const root = tempRoot();
    const ledger = {
      articles: {
        'factory-post': {
          title: 'Factory Post',
          series: 'AI Factory',
          platforms: {
            dzone: { status: 'not-started', url: '' },
            substack: { status: 'not-started', url: '' },
            reddit: { status: 'manual-package-required', url: '' },
          },
        },
      },
    };
    const queue = buildDistributionQueue({
      ledger,
      policy: loadSyndicationPolicy(),
      packagesRoot: root,
      canonicalReady: true,
    });

    const filtered = filterDistributionQueue(queue, {
      platforms: ['dzone', 'substack'],
      blocked: false,
      limit: 2,
    });

    const actions = filtered.actions as Array<{ platform: string }>;
    expect(actions.map((action) => action.platform).sort()).toEqual(['dzone', 'substack']);
    expect(filtered.summary).toMatchObject({
      totalActions: 2,
      unblockedActions: 2,
      blockedActions: 0,
    });
  });

  it('renders filtered queue output as a Markdown execution checklist', () => {
    const root = tempRoot();
    mkdirSync(join(root, 'the-factory'), { recursive: true });
    writeFileSync(join(root, 'the-factory', 'devto.md'), 'dev package');
    const queue = buildDistributionQueue({
      ledger: {
        articles: {
          'the-factory': {
            title: 'The Factory',
            series: 'AI Factory',
            platforms: {
              devto: { status: 'not-started', url: '' },
            },
          },
        },
      },
      policy: loadSyndicationPolicy(),
      packagesRoot: root,
      configured: { devto: true },
      canonicalReady: true,
      generatedAt: '2026-05-19T00:00:00.000Z',
    });

    const markdown = distributionQueueMarkdown(queue);

    expect(markdown).toContain('# Content Distribution Execution Queue');
    expect(markdown).toContain('- Total actions: 1');
    expect(markdown).toContain('- factory-front-door: 1 total, 1 unblocked, 0 blocked');
    expect(markdown).toContain('- [ ] DEV / The Factory (`the-factory`) - create-api-draft.');
    expect(markdown).toContain(`Package: \`${join(root, 'the-factory', 'devto.md')}\``);
    expect(markdown).toContain('Command: `pnpm content:pipeline draft:create the-factory devto`');
  });

  it('renders remaining queue actions beyond the recommended first page', () => {
    const actions = Array.from({ length: 12 }, (_, index) => ({
      slug: `post-${index}`,
      title: `Post ${index}`,
      series: 'AI Factory',
      platform: 'dzone',
      displayName: 'DZone',
      status: 'not-started',
      workflow: 'manual',
      postMode: 'editorial-rewrite',
      approvalRequired: true,
      publicPublishingAllowed: false,
      hasPackage: false,
      packagePath: null,
      url: '',
      releaseLane: 'factory-front-door',
      laneNote: 'Current brand',
      priority: 40,
      action: 'prepare-manual-draft',
      blocked: false,
      nextCommand: null,
      note: 'Manual workflow',
    }));
    const queue = {
      generatedAt: '2026-05-19T00:00:00.000Z',
      publicPublishingPerformed: false,
      filters: {},
      summary: {
        totalActions: 12,
        unblockedActions: 12,
        blockedActions: 0,
        grouped: {},
        lanes: {
          'factory-front-door': { total: 12, blocked: 0, unblocked: 12 },
        },
      },
      actions,
      recommendedNext: actions.slice(0, 10),
      observation: {},
    };

    const markdown = distributionQueueMarkdown(queue);

    expect(markdown).toContain('## Remaining Actions');
    expect(markdown).toContain('DZone / Post 11 (`post-11`)');
  });
});

describe('content publish scheduling', () => {
  it('turns a filtered queue into approval-gated schedule entries', () => {
    const root = tempRoot();
    mkdirSync(join(root, 'the-factory'), { recursive: true });
    writeFileSync(join(root, 'the-factory', 'dzone.md'), 'dzone package');
    const queue = buildDistributionQueue({
      ledger: {
        articles: {
          'the-factory': {
            title: 'The Factory',
            series: 'AI Factory',
            platforms: {
              dzone: { status: 'not-started', url: '' },
            },
          },
        },
      },
      policy: loadSyndicationPolicy(),
      packagesRoot: root,
      canonicalReady: true,
      generatedAt: '2026-05-20T00:00:00.000Z',
    });

    const schedule = buildPublishSchedule({
      queue,
      generatedAt: '2026-05-20T12:00:00.000Z',
      startAt: '2026-05-21T13:00:00-04:00',
      intervalDays: 2,
    });

    expect(schedule.publicPublishingPerformed).toBe(false);
    expect(schedule.decisionSeam).toMatchObject({
      name: 'public-publish-approval',
      safeDefault: 'do-not-publish',
    });
    expect(schedule.entries[0]).toMatchObject({
      scheduledAt: '2026-05-21T17:00:00.000Z',
      platform: 'dzone',
      articleSlug: 'the-factory',
      executionMode: 'browser-manual',
      publicPublishingAllowed: false,
      safeDefault: 'do-not-publish',
      approval: {
        required: true,
        status: 'missing',
      },
      packagePath: join(root, 'the-factory', 'dzone.md'),
    });
  });

  it('reports due schedule entries without executing publication', () => {
    const schedule = {
      entries: [
        {
          id: 'schedule:dzone:one:2026-05-20',
          scheduledAt: '2026-05-20T10:00:00.000Z',
          blocked: false,
        },
        {
          id: 'schedule:dzone:two:2026-05-21',
          scheduledAt: '2026-05-21T10:00:00.000Z',
          blocked: false,
        },
      ],
    };

    const result = dueScheduleEntries(schedule, new Date('2026-05-20T12:00:00.000Z'));

    expect(result.publicPublishingPerformed).toBe(false);
    expect(result.due).toHaveLength(1);
    expect(result.pending).toHaveLength(1);
  });

  it('renders the schedule as a human fallback checklist', () => {
    const markdown = publishScheduleMarkdown({
      generatedAt: '2026-05-20T12:00:00.000Z',
      publicPublishingPerformed: false,
      decisionSeam: {
        name: 'public-publish-approval',
        safeDefault: 'do-not-publish',
      },
      summary: {
        totalEntries: 1,
        blockedEntries: 0,
      },
      entries: [
        {
          scheduledAt: '2026-05-21T17:00:00.000Z',
          displayName: 'DZone',
          title: 'The Factory',
          articleSlug: 'the-factory',
          action: 'prepare-manual-draft',
          safeDefault: 'do-not-publish',
          packagePath: '/tmp/the-factory/dzone.md',
          nextCommand: null,
          blocked: false,
        },
      ],
    });

    expect(markdown).toContain('# Content Publish Schedule');
    expect(markdown).toContain('Decision seam: public-publish-approval');
    expect(markdown).toContain('Package: `/tmp/the-factory/dzone.md`');
    expect(markdown).toContain('Stop before publish, submit, or send unless David explicitly approves.');
  });
});

describe('platform draft commands', () => {
  it('creates DEV drafts from generated package markdown when article variant is absent', () => {
    const root = tempRoot();
    const capturePath = join(root, 'devto-capture.json');
    const slug = writeDraftCommandFixture(root, 'devto');

    const result = runDraftCommand(root, 'devto:create-draft', slug, capturePath);

    expect(result.status, result.stderr).toBe(0);
    const request = JSON.parse(readFileSync(capturePath, 'utf8'));
    expect(request.body.article).toMatchObject({
      title: 'Packaged Title',
      body_markdown: 'Packaged devto body.',
      published: false,
      description: 'Packaged description',
      canonical_url: `https://davidmieloch.com/blog/${slug}`,
    });
    expect(request.body.article.tags).toEqual(['distribution', 'draft']);
  });

  it('limits DEV fallback article tags to four when the package has no tags', () => {
    const root = tempRoot();
    const capturePath = join(root, 'devto-capture.json');
    const slug = writeDraftCommandFixture(root, 'devto');
    writeFileSync(
      join(root, 'content/distribution/packages', slug, 'devto.md'),
      `---
title: "Packaged Title"
description: "Packaged description"
canonical_url: "https://davidmieloch.com/blog/${slug}"
---

Packaged devto body.
`,
    );

    const result = runDraftCommand(root, 'devto:create-draft', slug, capturePath);

    expect(result.status, result.stderr).toBe(0);
    const request = JSON.parse(readFileSync(capturePath, 'utf8'));
    expect(request.body.article.tags).toEqual(['ai', 'pipeline', 'agents', 'factory']);
  });

  it('normalizes DEV tags to alphanumeric values', () => {
    const root = tempRoot();
    const capturePath = join(root, 'devto-capture.json');
    const slug = writeDraftCommandFixture(root, 'devto');
    writeFileSync(
      join(root, 'content/distribution/packages', slug, 'devto.md'),
      `---
title: "Packaged Title"
description: "Packaged description"
canonical_url: "https://davidmieloch.com/blog/${slug}"
tags: ["april-fools", "AI", "software-factory", "ai"]
---

Packaged devto body.
`,
    );

    const result = runDraftCommand(root, 'devto:create-draft', slug, capturePath);

    expect(result.status, result.stderr).toBe(0);
    const request = JSON.parse(readFileSync(capturePath, 'utf8'));
    expect(request.body.article.tags).toEqual(['aprilfools', 'ai', 'softwarefactory']);
  });

  it('creates delisted Hashnode drafts from generated package markdown when article variant is absent', () => {
    const root = tempRoot();
    const capturePath = join(root, 'hashnode-capture.json');
    const slug = writeDraftCommandFixture(root, 'hashnode');

    const result = runDraftCommand(root, 'hashnode:create-draft', slug, capturePath);

    expect(result.status, result.stderr).toBe(0);
    const request = JSON.parse(readFileSync(capturePath, 'utf8'));
    expect(request.body.variables.input).toMatchObject({
      title: 'Packaged Title',
      subtitle: 'Packaged description',
      publicationId: 'publication-123',
      contentMarkdown: 'Packaged hashnode body.',
      originalArticleURL: `https://davidmieloch.com/blog/${slug}`,
      settings: {
        enableTableOfContent: true,
        activateNewsletter: false,
        delist: true,
      },
    });
    expect(request.body.variables.input.tags).toEqual([
      { name: 'distribution', slug: 'distribution' },
      { name: 'draft', slug: 'draft' },
    ]);
  });
});

describe('platform readiness governance', () => {
  it('records manual platform receipts without patching the ledger by hand', () => {
    const root = tempRoot();
    writeLedgerFixture(root);

    const result = runPipelineCommand(root, [
      'receipt:record',
      'the-factory',
      'hackernoon',
      '--status=draft',
      '--url=https://app.hackernoon.com/mobile/draft-123',
      '--notes=Saved draft shell; not submitted.',
    ]);

    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout);
    expect(payload).toMatchObject({
      slug: 'the-factory',
      platform: 'hackernoon',
      receipt: {
        status: 'draft',
        url: 'https://app.hackernoon.com/mobile/draft-123',
        notes: 'Saved draft shell; not submitted.',
      },
    });

    const ledger = JSON.parse(readFileSync(join(root, 'content/distribution/platform-ledger.json'), 'utf8'));
    expect(ledger.articles['the-factory'].platforms.hackernoon).toMatchObject({
      status: 'draft',
      url: 'https://app.hackernoon.com/mobile/draft-123',
      notes: 'Saved draft shell; not submitted.',
    });
  });

  it('reports platform readiness without requiring network access', () => {
    const root = tempRoot();
    writeLedgerFixture(root);
    generatePlatformPackages({
      article: article(),
      outputRoot: join(root, 'content/distribution/packages'),
      platforms: ['medium', 'devto', 'hackernoon'],
      generatedAt: '2026-05-18T00:00:00.000Z',
    });

    const result = runPipelineCommand(root, ['readiness', '--skip-network']);

    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout);
    expect(payload).toMatchObject({
      purpose: 'content distribution platform readiness',
      publicPublishingPerformed: false,
      probes: {
        canonical: { status: 'SKIPPED' },
      },
      packageCoverage: {
        packagedArticles: 1,
        platformPackageCounts: {
          medium: 1,
          devto: 1,
          hackernoon: 1,
        },
      },
    });
    expect(payload.platforms.linkedin.status).toBe('source-only');
    expect(payload.platforms.reddit.status).toBe('approval-gated');
  });

  it('reports due launches and source blockers from the launch calendar', () => {
    const root = tempRoot();
    writeLaunchCalendarFixture(root);

    const result = runPipelineCommand(root, [
      'launch:due',
      '--now=2026-05-19T12:00:00-04:00',
    ]);

    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout);
    expect(payload.publicPublishingPerformed).toBe(false);
    expect(payload.due).toHaveLength(1);
    expect(payload.due[0]).toMatchObject({
      id: 'launch-1',
      due: true,
      blockers: ['missing articleSlug', 'awaiting-source-url', 'public publish disabled'],
    });
    expect(payload.pending[0]).toMatchObject({
      id: 'launch-2',
      due: false,
    });
  });

  it('skips manual draft creation targets and explains the handoff', () => {
    const root = tempRoot();
    writeLedgerFixture(root);

    const result = runPipelineCommand(root, [
      'draft:create',
      'the-factory',
      'hackernoon',
    ]);

    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout);
    expect(payload).toMatchObject({
      slug: 'the-factory',
      platform: 'hackernoon',
      skipped: true,
      reason: 'hackernoon is a browser/manual workflow; use receipt:record after manual draft setup.',
    });
  });

  it('writes and reads a local publish schedule through the CLI', () => {
    const root = tempRoot();
    writeLedgerFixture(root);
    const outputPath = join(root, 'content/distribution/test-publish-schedule.json');

    const generated = runPipelineCommand(root, [
      'schedule:generate',
      '--skip-network',
      '--platform=hackernoon',
      '--blocked=false',
      '--start=2026-05-21T09:00:00-04:00',
      '--interval-days=2',
      '--write',
      `--output=${outputPath}`,
    ]);

    expect(generated.status, generated.stderr).toBe(0);
    const payload = JSON.parse(generated.stdout);
    expect(payload).toMatchObject({
      schemaVersion: 'content-publish-schedule-v1',
      publicPublishingPerformed: false,
      outputPath,
      summary: {
        totalEntries: 1,
      },
    });
    expect(payload.entries[0]).toMatchObject({
      platform: 'hackernoon',
      articleSlug: 'the-factory',
      safeDefault: 'do-not-publish',
      approval: {
        required: true,
        status: 'missing',
      },
    });

    const due = runPipelineCommand(root, [
      'schedule:due',
      `--input=${outputPath}`,
      '--now=2026-05-21T10:00:00-04:00',
    ]);

    expect(due.status, due.stderr).toBe(0);
    expect(JSON.parse(due.stdout).due).toHaveLength(1);
  });

  it('reports missing receipts and missing metrics as observable state', () => {
    const root = tempRoot();
    writeLedgerFixture(root);

    const result = runPipelineCommand(root, ['receipts:report']);

    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout);
    expect(payload.publicPublishingPerformed).toBe(false);
    expect(payload.status).toBe('DEGRADED');
    expect(payload.missingReceipts).toEqual(
      expect.arrayContaining([
        { slug: 'the-factory', platform: 'devto', status: 'not-started' },
        { slug: 'the-factory', platform: 'hackernoon', status: 'not-started' },
      ]),
    );
    expect(payload.missingMetrics).toEqual([
      { slug: 'the-factory', platform: 'medium', url: 'https://medium.com/@davidmieloch/the-factory' },
    ]);
    expect(payload.observation).toMatchObject({
      claim: 'platform receipts and published metrics are observable from the ledger',
      status: 'DEGRADED',
    });
  });

  it('prints a metrics capture checklist from policy fields', () => {
    const root = tempRoot();
    writeLedgerFixture(root);
    writeFileSync(
      join(root, 'content/distribution/syndication-policy.json'),
      JSON.stringify({
        platforms: {
          medium: {
            displayName: 'Medium',
            metrics: {
              source: 'manual',
              fields: ['views', 'reads', 'fans', 'clicks'],
            },
          },
        },
      }),
    );

    const result = runPipelineCommand(root, ['metrics:checklist']);

    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout);
    expect(payload.publicPublishingPerformed).toBe(false);
    expect(payload.captureQueue).toEqual([
      expect.objectContaining({
        slug: 'the-factory',
        platform: 'medium',
        displayName: 'Medium',
        fields: ['views', 'reads', 'fans', 'clicks'],
        command: 'pnpm content:pipeline metrics:record the-factory medium --url=https://medium.com/@davidmieloch/the-factory --views=0 --reads=0 --fans=0 --clicks=0',
      }),
    ]);
    expect(payload.observation).toMatchObject({
      claim: 'published platform receipts have a concrete metrics capture checklist',
      status: 'DEGRADED',
    });
  });

  it('prints an approval-aware distribution queue without network access', () => {
    const root = tempRoot();
    writeLedgerFixture(root);
    generatePlatformPackages({
      article: article(),
      outputRoot: join(root, 'content/distribution/packages'),
      platforms: ['devto', 'medium', 'hackernoon'],
      generatedAt: '2026-05-18T00:00:00.000Z',
    });
    writeFileSync(
      join(root, 'content/distribution/syndication-policy.json'),
      JSON.stringify(loadSyndicationPolicy()),
    );

    const result = runPipelineCommand(root, ['queue', '--skip-network']);

    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout);
    expect(payload.publicPublishingPerformed).toBe(false);
    expect(payload.summary).toMatchObject({
      totalActions: 3,
      blockedActions: 2,
    });
    expect(payload.actions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          platform: 'devto',
          action: 'blocked-until-ready',
          blocker: 'Missing DEVTO_API_KEY.',
        }),
        expect.objectContaining({
          platform: 'hackernoon',
          action: 'prepare-manual-draft',
          blocked: false,
        }),
      ]),
    );
    expect(payload.observation).toMatchObject({
      status: 'DEGRADED',
    });
  });

  it('prints filtered queue output and Markdown checklist payloads', () => {
    const root = tempRoot();
    writeLedgerFixture(root);
    generatePlatformPackages({
      article: article(),
      outputRoot: join(root, 'content/distribution/packages'),
      platforms: ['hackernoon'],
      generatedAt: '2026-05-18T00:00:00.000Z',
    });
    writeFileSync(
      join(root, 'content/distribution/syndication-policy.json'),
      JSON.stringify(loadSyndicationPolicy()),
    );

    const queueResult = runPipelineCommand(root, [
      'queue',
      '--skip-network',
      '--platform=hackernoon',
      '--blocked=false',
      '--limit=1',
    ]);
    expect(queueResult.status, queueResult.stderr).toBe(0);
    const queuePayload = JSON.parse(queueResult.stdout);
    expect(queuePayload.filters).toMatchObject({
      platform: 'hackernoon',
      blocked: false,
      limit: 1,
    });
    expect(queuePayload.actions).toHaveLength(1);
    expect(queuePayload.actions[0]).toMatchObject({
      platform: 'hackernoon',
      blocked: false,
      packagePath: join(root, 'content/distribution/packages/the-factory/hackernoon.md'),
    });

    const markdownResult = runPipelineCommand(root, [
      'queue:markdown',
      '--skip-network',
      '--platform=hackernoon',
      '--blocked=false',
      '--limit=1',
    ]);
    expect(markdownResult.status, markdownResult.stderr).toBe(0);
    const markdownPayload = JSON.parse(markdownResult.stdout);
    expect(markdownPayload.publicPublishingPerformed).toBe(false);
    expect(markdownPayload.markdown).toContain('# Content Distribution Execution Queue');
    expect(markdownPayload.markdown).toContain('HackerNoon / The Factory');
    expect(markdownPayload.markdown).toContain(`Package: \`${join(root, 'content/distribution/packages/the-factory/hackernoon.md')}\``);
    expect(markdownPayload.observation).toMatchObject({
      claim: 'content distribution queue can be rendered as a human execution checklist',
      status: 'PASS',
    });
  });

  it('writes a filtered queue Markdown checklist to disk', () => {
    const root = tempRoot();
    writeLedgerFixture(root);
    generatePlatformPackages({
      article: article(),
      outputRoot: join(root, 'content/distribution/packages'),
      platforms: ['hackernoon'],
      generatedAt: '2026-05-18T00:00:00.000Z',
    });
    writeFileSync(
      join(root, 'content/distribution/syndication-policy.json'),
      JSON.stringify(loadSyndicationPolicy()),
    );
    const outputPath = join(root, 'docs/ops/session-next-actions.md');

    const result = runPipelineCommand(root, [
      'queue:write',
      '--skip-network',
      '--platform=hackernoon',
      '--blocked=false',
      '--limit=1',
      `--output=${outputPath}`,
    ]);

    expect(result.status, result.stderr).toBe(0);
    const payload = JSON.parse(result.stdout);
    expect(payload).toMatchObject({
      publicPublishingPerformed: false,
      outputPath,
      observation: {
        claim: 'content distribution queue markdown was written as a durable execution artifact',
        status: 'PASS',
      },
    });
    const markdown = readFileSync(outputPath, 'utf8');
    expect(markdown).toContain('# Content Distribution Execution Queue');
    expect(markdown).toContain('HackerNoon / The Factory');
    expect(markdown).toContain(`Package: \`${join(root, 'content/distribution/packages/the-factory/hackernoon.md')}\``);
  });
});
