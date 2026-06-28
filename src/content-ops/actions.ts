import fs from 'node:fs';
import path from 'node:path';

import type { ContentOpsActionResult } from './types';

function result(
  action: string,
  overrides: Partial<ContentOpsActionResult>,
): ContentOpsActionResult {
  return {
    ok: true,
    action,
    generatedAt: new Date().toISOString(),
    publicPublishingPerformed: false,
    paidGenerationPerformed: false,
    changedFiles: [],
    receiptPath: null,
    blockers: [],
    warnings: [],
    nextCommand: null,
    ...overrides,
  };
}

function readJson(filePath: string, fallback: Record<string, unknown>) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as Record<string, unknown>;
}

function writeJson(filePath: string, payload: unknown) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`);
}

function siteReleaseCalendarPath(appRoot: string) {
  return path.join(appRoot, 'content/distribution/site-release-calendar.json');
}

export function upsertContentOpsSchedule({
  appRoot = process.cwd(),
  slug,
  title,
  scheduledAt,
}: {
  appRoot?: string;
  slug: string;
  title: string;
  scheduledAt: string;
}) {
  const relativePath = 'content/distribution/site-release-calendar.json';
  const filePath = siteReleaseCalendarPath(appRoot);
  const calendar = readJson(filePath, {
    schemaVersion: 'site-release-calendar-v1',
    safeDefault: 'do-not-publish',
    entries: [],
  });
  const existingEntries = Array.isArray(calendar.entries) ? calendar.entries : [];
  const entries = existingEntries.filter(
    (entry): entry is Record<string, unknown> =>
      typeof entry === 'object' &&
      entry !== null &&
      (entry as { slug?: string }).slug !== slug,
  );

  entries.push({
    slug,
    title,
    plannedReleaseAt: scheduledAt,
    status: 'planned',
    safeDefault: 'do-not-publish',
    publicPublishingAllowed: false,
    approval: {
      required: true,
      status: 'missing',
      requiredFrom: 'David',
    },
  });

  calendar.entries = entries.sort((left, right) =>
    String(left.plannedReleaseAt ?? '').localeCompare(
      String(right.plannedReleaseAt ?? ''),
    ),
  );
  calendar.publicPublishingPerformed = false;
  calendar.safeDefault = 'do-not-publish';
  writeJson(filePath, calendar);

  return result('schedule-upsert', {
    changedFiles: [relativePath],
    nextCommand: `pnpm content:pipeline content:release-workflow ${slug}`,
  });
}

export function cancelContentOpsSchedule({
  appRoot = process.cwd(),
  slug,
}: {
  appRoot?: string;
  slug: string;
}) {
  const relativePath = 'content/distribution/site-release-calendar.json';
  const filePath = siteReleaseCalendarPath(appRoot);
  const calendar = readJson(filePath, {
    schemaVersion: 'site-release-calendar-v1',
    safeDefault: 'do-not-publish',
    entries: [],
  });
  const existingEntries = Array.isArray(calendar.entries) ? calendar.entries : [];

  calendar.entries = existingEntries.filter(
    (entry) =>
      typeof entry === 'object' &&
      entry !== null &&
      (entry as { slug?: string }).slug !== slug,
  );
  calendar.publicPublishingPerformed = false;
  calendar.safeDefault = 'do-not-publish';
  writeJson(filePath, calendar);

  return result('schedule-cancel', {
    changedFiles: [relativePath],
    nextCommand: 'pnpm content:pipeline ops:next',
  });
}

export function dryRunContentOpsRelease({ slug }: { appRoot?: string; slug: string }) {
  return result('release-dry-run', {
    nextCommand: `pnpm content:pipeline content:release-workflow ${slug}`,
  });
}

export function prepareContentOpsPackages({ slug }: { appRoot?: string; slug: string }) {
  return result('packages-prepare', {
    nextCommand: `pnpm content:pipeline social:package ${slug} all`,
  });
}
