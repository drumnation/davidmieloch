import { describe, expect, it } from 'vitest';

import {
  RELEASE_LADDER_STEP_IDS,
  buildReleaseLadderRoutes,
  buildSiteReleaseLadderPlan,
  buildSiteReleaseReceipt,
  parseSiteReleaseLadderConfig,
} from '../../scripts/lib/site-release-ladder.mjs';

type SiteReleaseReceipt = {
  command: string;
  mode: string;
  receiptPath: string;
  deployments: {
    staging: {
      backupPath: string;
    };
    production: {
      backupPath: string;
    };
  };
  checks: {
    production: {
      audio: Array<{
        slug: string;
        ok: boolean;
        sha256: string;
      }>;
    };
  };
  observation: {
    claim: string;
    status: string;
  };
};

describe('site release ladder', () => {
  it('defaults to a non-mutating dry-run plan with the full promotion path', () => {
    const config = parseSiteReleaseLadderConfig({
      slug: 'the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter',
      generatedAt: '2026-06-28T12:00:00.000Z',
      appRoot: '/repo',
    });

    const plan = buildSiteReleaseLadderPlan(config);

    expect(config.mode).toBe('dry-run');
    expect(config.mutationAllowed).toBe(false);
    expect(plan.steps.map((step) => step.id)).toEqual(RELEASE_LADDER_STEP_IDS);
    expect(plan.steps.filter((step) => step.mutates).map((step) => step.id)).toEqual([
      'promote-main',
      'deploy-staging',
      'deploy-production',
      'write-receipt',
    ]);
    expect(plan.commands.localAssetGate).toBe(
      'pnpm content:pipeline launch:assets the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter',
    );
    expect(plan.commands.releaseStatus).toContain('site:release-status --live');
  });

  it('requires explicit slug targeting before building a release ladder', () => {
    expect(() => parseSiteReleaseLadderConfig({ appRoot: '/repo' })).toThrow(
      /requires --slug=<slug>/,
    );
  });

  it('builds route and audio checks for each targeted slug', () => {
    expect(
      buildReleaseLadderRoutes(['factory-amplification-and-modular-primitives']),
    ).toEqual([
      '/',
      '/blog',
      '/rss.xml',
      '/sitemap.xml',
      '/blog/factory-amplification-and-modular-primitives',
      '/audio/voice/blog/factory-amplification-and-modular-primitives.mp3',
    ]);
  });

  it('creates a durable receipt that records staging and production evidence', () => {
    const config = parseSiteReleaseLadderConfig({
      slug: 'factory-amplification-and-modular-primitives',
      execute: true,
      generatedAt: '2026-06-28T12:00:00.000Z',
      receipt: 'content/distribution/release-receipts/test.json',
      appRoot: '/repo',
    });
    const plan = buildSiteReleaseLadderPlan(config);

    const receipt = buildSiteReleaseReceipt({
      config,
      plan,
      status: 'passed',
      git: {
        branch: 'codex/release',
        targetSha: 'abc123',
        promotedRef: 'forgejo/main',
      },
      deployments: {
        staging: {
          service: 'davidmieloch-staging.service',
          backupPath: '/home/dave/platform-repos/backups/staging',
          active: true,
        },
        production: {
          service: 'davidmieloch-production.service',
          backupPath: '/home/dave/platform-repos/backups/production',
          active: true,
        },
      },
      checks: {
        staging: {
          routes: [{ url: 'https://staging/blog/factory', status: 200, ok: true }],
          rss: { ok: true, containsSlugs: ['factory-amplification-and-modular-primitives'] },
          audio: [
            {
              slug: 'factory-amplification-and-modular-primitives',
              ok: true,
              sha256: 'hash',
              durationSeconds: 120,
            },
          ],
        },
        production: {
          routes: [{ url: 'https://prod/blog/factory', status: 200, ok: true }],
          rss: { ok: true, containsSlugs: ['factory-amplification-and-modular-primitives'] },
          audio: [
            {
              slug: 'factory-amplification-and-modular-primitives',
              ok: true,
              sha256: 'hash',
              durationSeconds: 120,
            },
          ],
        },
      },
    }) as unknown as SiteReleaseReceipt;

    expect(receipt.command).toBe('site:release-ladder');
    expect(receipt.mode).toBe('execute');
    expect(receipt.receiptPath).toBe('/repo/content/distribution/release-receipts/test.json');
    expect(receipt.deployments.staging.backupPath).toContain('/backups/staging');
    expect(receipt.checks.production.audio[0]).toMatchObject({
      slug: 'factory-amplification-and-modular-primitives',
      ok: true,
      sha256: 'hash',
    });
    expect(receipt.observation).toMatchObject({
      claim:
        'site release ladder checked content assets, promoted main, deployed staging and production, verified live routes/rss/audio, and wrote release receipt',
      status: 'PASS',
    });
  });
});
