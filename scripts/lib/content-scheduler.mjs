function parseDate(value, label) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid ${label}: ${value}`);
  }
  return date;
}

function addInterval(date, index, { intervalDays = 0, intervalHours = 0 }) {
  const next = new Date(date.getTime());
  const ms =
    (Number(intervalDays) || 0) * 24 * 60 * 60 * 1000 +
    (Number(intervalHours) || 0) * 60 * 60 * 1000;
  next.setTime(next.getTime() + index * ms);
  return next;
}

function executionModeFor(action) {
  if (action.blocked) return 'blocked';
  if (action.action === 'create-api-draft') return 'api-draft';
  if (action.action === 'review-existing-draft') return 'review-existing-draft';
  return 'browser-manual';
}

function scheduleId(action, scheduledAt) {
  return [
    'schedule',
    action.platform,
    action.slug,
    scheduledAt.slice(0, 10),
  ].join(':');
}

function scheduleEntry(action, scheduledAt) {
  return {
    id: scheduleId(action, scheduledAt),
    scheduledAt,
    platform: action.platform,
    displayName: action.displayName,
    articleSlug: action.slug,
    title: action.title,
    series: action.series,
    releaseLane: action.releaseLane,
    action: action.action,
    status: action.status,
    blocked: action.blocked,
    blocker: action.blocker ?? null,
    executionMode: executionModeFor(action),
    packagePath: action.packagePath ?? null,
    nextCommand: action.nextCommand ?? null,
    publicPublishingAllowed: false,
    safeDefault: 'do-not-publish',
    approval: {
      required: true,
      status: 'missing',
      requiredFrom: 'David',
      note: 'This schedule can prepare drafts and review packets. Public publish requires explicit approval.',
    },
    manualFallback: action.packagePath
      ? `Open ${action.packagePath} and paste into ${action.displayName}; stop before publish/submit.`
      : `Use ${action.displayName} browser/editor flow; stop before publish/submit.`,
  };
}

function summarize(entries) {
  const platforms = {};
  const lanes = {};
  for (const entry of entries) {
    platforms[entry.platform] ??= { total: 0, blocked: 0, due: 0 };
    platforms[entry.platform].total += 1;
    if (entry.blocked) platforms[entry.platform].blocked += 1;

    lanes[entry.releaseLane] ??= { total: 0, blocked: 0 };
    lanes[entry.releaseLane].total += 1;
    if (entry.blocked) lanes[entry.releaseLane].blocked += 1;
  }
  return {
    totalEntries: entries.length,
    blockedEntries: entries.filter((entry) => entry.blocked).length,
    platforms,
    lanes,
  };
}

/**
 * @param {{
 *   queue?: { generatedAt?: string, actions: Array<Record<string, any>> },
 *   generatedAt?: string,
 *   startAt?: string,
 *   intervalDays?: number|string,
 *   intervalHours?: number|string,
 *   title?: string
 * }} options
 */
export function buildPublishSchedule({
  queue = null,
  generatedAt = new Date().toISOString(),
  startAt = generatedAt,
  intervalDays = 1,
  intervalHours = 0,
  title = 'Content Distribution Schedule',
} = {}) {
  if (!queue) throw new Error('buildPublishSchedule requires a queue.');
  const start = parseDate(startAt, '--start');
  const entries = queue.actions.map((action, index) => {
    const scheduledAt = addInterval(start, index, { intervalDays, intervalHours }).toISOString();
    return scheduleEntry(action, scheduledAt);
  });

  return {
    schemaVersion: 'content-publish-schedule-v1',
    title,
    generatedAt,
    sourceQueueGeneratedAt: queue.generatedAt,
    publicPublishingPerformed: false,
    decisionSeam: {
      name: 'public-publish-approval',
      actor: 'David',
      safeDefault: 'do-not-publish',
      allowedAutomationBeforeSeam: ['package generation', 'draft creation where API supports unpublished drafts', 'browser/manual draft prep'],
      disallowedAutomationWithoutApproval: ['public publish', 'submit for review', 'post to LinkedIn', 'post to Reddit'],
    },
    summary: summarize(entries),
    entries,
    observation: {
      claim: 'content launch timing is represented as an inspectable schedule before any public publish action',
      status: entries.some((entry) => entry.blocked) ? 'DEGRADED' : 'PASS',
      fallbackChain: [
        'publish-schedule.json readback',
        'platform-ledger.json receipt reconciliation',
        'ROM heartbeat',
      ],
    },
  };
}

export function dueScheduleEntries(schedule, now = new Date()) {
  const nowDate = now instanceof Date ? now : parseDate(now, '--now');
  const entries = schedule.entries ?? [];
  const due = [];
  const pending = [];
  for (const entry of entries) {
    const scheduledAt = parseDate(entry.scheduledAt, `scheduledAt for ${entry.id}`);
    if (scheduledAt <= nowDate) due.push(entry);
    else pending.push(entry);
  }
  return {
    generatedAt: new Date().toISOString(),
    now: nowDate.toISOString(),
    publicPublishingPerformed: false,
    status: due.some((entry) => entry.blocked) ? 'DEGRADED' : 'PASS',
    due,
    pending,
    observation: {
      claim: 'due content distribution entries can be read without executing publication',
      status: due.some((entry) => entry.blocked) ? 'DEGRADED' : 'PASS',
      fallbackChain: [
        'publish-schedule.json due readback',
        'manual calendar inspection',
        'ROM heartbeat',
      ],
    },
  };
}

function entryLine(entry) {
  const packageRef = entry.packagePath ? ` Package: \`${entry.packagePath}\`.` : '';
  const command = entry.nextCommand ? ` Command: \`${entry.nextCommand}\`.` : '';
  const blocker = entry.blocked ? ` Blocker: ${entry.blocker}` : '';
  return `- [ ] ${entry.scheduledAt} - ${entry.displayName} / ${entry.title} (\`${entry.articleSlug}\`) - ${entry.action}; safe default: ${entry.safeDefault}.${packageRef}${command}${blocker}`;
}

export function publishScheduleMarkdown(schedule) {
  const lines = [
    '# Content Publish Schedule',
    '',
    `Generated: ${schedule.generatedAt}`,
    `Public publishing performed: ${schedule.publicPublishingPerformed ? 'yes' : 'no'}`,
    `Decision seam: ${schedule.decisionSeam?.name ?? 'public-publish-approval'}`,
    `Safe default: ${schedule.decisionSeam?.safeDefault ?? 'do-not-publish'}`,
    '',
    '## Summary',
    '',
    `- Total entries: ${schedule.summary?.totalEntries ?? 0}`,
    `- Blocked entries: ${schedule.summary?.blockedEntries ?? 0}`,
    '',
    '## Entries',
    '',
  ];

  if (!schedule.entries?.length) {
    lines.push('- [ ] No schedule entries.');
  } else {
    for (const entry of schedule.entries) {
      lines.push(entryLine(entry));
    }
  }

  lines.push(
    '',
    '## Human Fallback',
    '',
    '- Open the listed package file.',
    '- Paste or import into the target platform editor.',
    '- Stop before publish, submit, or send unless David explicitly approves.',
    '- Record the result with `pnpm content:pipeline receipt:record <slug> <platform> --status=<draft|submitted|published|skipped> --url=<url>`.',
  );

  return `${lines.join('\n')}\n`;
}
