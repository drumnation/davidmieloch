import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { afterEach, describe, expect, it } from 'vitest';

import {
  cancelContentOpsSchedule,
  dryRunContentOpsRelease,
  prepareContentOpsPackages,
  upsertContentOpsSchedule,
} from './actions';

const tempRoots: string[] = [];

function tempRoot() {
  const root = mkdtempSync(join(tmpdir(), 'content-ops-actions-'));
  tempRoots.push(root);
  return root;
}

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

function writeJson(root: string, relativePath: string, value: unknown) {
  const filePath = join(root, relativePath);
  mkdirSync(join(filePath, '..'), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

describe('content ops safe actions', () => {
  it('upserts website schedule entries without claiming public publish', () => {
    const root = tempRoot();
    writeJson(root, 'content/distribution/site-release-calendar.json', {
      schemaVersion: 'site-release-calendar-v1',
      safeDefault: 'do-not-publish',
      entries: [],
    });

    const result = upsertContentOpsSchedule({
      appRoot: root,
      slug: 'approved-draft',
      title: 'Approved Draft',
      scheduledAt: '2026-07-01T12:00:00.000Z',
    });

    expect(result.publicPublishingPerformed).toBe(false);
    expect(result.changedFiles).toEqual([
      'content/distribution/site-release-calendar.json',
    ]);
    const written = JSON.parse(
      readFileSync(
        join(root, 'content/distribution/site-release-calendar.json'),
        'utf8',
      ),
    );
    expect(written.entries[0]).toMatchObject({
      slug: 'approved-draft',
      plannedReleaseAt: '2026-07-01T12:00:00.000Z',
      safeDefault: 'do-not-publish',
    });
  });

  it('returns dry-run release command without executing deploy', () => {
    const result = dryRunContentOpsRelease({
      appRoot: tempRoot(),
      slug: 'approved-draft',
    });

    expect(result.publicPublishingPerformed).toBe(false);
    expect(result.nextCommand).toBe(
      'pnpm content:pipeline content:release-workflow approved-draft',
    );
    expect(result.changedFiles).toEqual([]);
  });

  it('returns package preparation command without posting', () => {
    const result = prepareContentOpsPackages({
      appRoot: tempRoot(),
      slug: 'approved-draft',
    });

    expect(result.publicPublishingPerformed).toBe(false);
    expect(result.nextCommand).toBe(
      'pnpm content:pipeline social:package approved-draft all',
    );
  });

  it('cancels schedule entries by slug without deleting unrelated entries', () => {
    const root = tempRoot();
    writeJson(root, 'content/distribution/site-release-calendar.json', {
      schemaVersion: 'site-release-calendar-v1',
      safeDefault: 'do-not-publish',
      entries: [
        { slug: 'approved-draft', title: 'Approved Draft' },
        { slug: 'keep-draft', title: 'Keep Draft' },
      ],
    });

    const result = cancelContentOpsSchedule({
      appRoot: root,
      slug: 'approved-draft',
    });

    expect(result.publicPublishingPerformed).toBe(false);
    expect(result.changedFiles).toEqual([
      'content/distribution/site-release-calendar.json',
    ]);
    const written = JSON.parse(
      readFileSync(
        join(root, 'content/distribution/site-release-calendar.json'),
        'utf8',
      ),
    );
    expect(written.entries.map((entry: { slug: string }) => entry.slug)).toEqual([
      'keep-draft',
    ]);
  });
});
