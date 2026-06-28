import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const DEFAULT_STAGING_URL = 'https://davidmieloch.brain-garden.io';
const DEFAULT_PRODUCTION_URL = 'https://davidmieloch.com';
const DEFAULT_REMOTE = 'forgejo';
const DEFAULT_TARGET_REF = 'main';
const DEFAULT_RELEASE_HOST = 'dave@100.71.79.54';
const DEFAULT_STAGING_DIR = '/home/dave/platform-repos/davidmieloch-staging';
const DEFAULT_PRODUCTION_DIR = '/home/dave/platform-repos/davidmieloch-production';
const DEFAULT_STAGING_SERVICE = 'davidmieloch-staging.service';
const DEFAULT_PRODUCTION_SERVICE = 'davidmieloch-production.service';
const DEFAULT_BACKUP_ROOT = '/home/dave/platform-repos/backups';

export const RELEASE_LADDER_STEP_IDS = [
  'asset-gates',
  'git-readiness',
  'promote-main',
  'deploy-staging',
  'verify-staging',
  'deploy-production',
  'verify-production',
  'release-status',
  'write-receipt',
];

function normalizeBaseUrl(value) {
  return String(value || '').replace(/\/+$/, '');
}

function slugList(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return String(value)
    .split(',')
    .map((slug) => slug.trim())
    .filter(Boolean);
}

function booleanOption(value) {
  return value === true || value === 'true' || value === '1' || value === 'yes';
}

function safeTimestamp(generatedAt) {
  return String(generatedAt).replace(/[-:.]/g, '').replace(/\+\d{4}$/, 'Z');
}

function safeSlugPart(slugs) {
  return slugs.join('+').replace(/[^a-zA-Z0-9+_-]/g, '-').slice(0, 160);
}

function resolveInsideAppRoot(appRoot, value) {
  return path.isAbsolute(value) ? value : path.join(appRoot, value);
}

function defaultReceiptPath(appRoot, generatedAt, slugs) {
  return path.join(
    appRoot,
    'content/distribution/release-receipts',
    `${safeTimestamp(generatedAt)}-${safeSlugPart(slugs)}.json`,
  );
}

function shellQuote(value) {
  return `'${String(value).replace(/'/g, "'\\''")}'`;
}

function commandLine(command, args) {
  return [command, ...args].map((part) => (/\s/.test(part) ? shellQuote(part) : part)).join(' ');
}

function remoteTrackingRef(config) {
  return `refs/remotes/${config.remote}/${config.targetRef}`;
}

function remoteTrackingName(config) {
  return `${config.remote}/${config.targetRef}`;
}

export function parseSiteReleaseLadderConfig(options = {}) {
  const appRoot = options.appRoot ? path.resolve(String(options.appRoot)) : process.cwd();
  const generatedAt = options.generatedAt ?? new Date().toISOString();
  const slugs = slugList(options.slug ?? options.slugs);
  if (slugs.length === 0) {
    throw new Error('site:release-ladder requires --slug=<slug>. Use comma-separated slugs for a multi-article release.');
  }

  if (booleanOption(options.execute) && booleanOption(options['dry-run'])) {
    throw new Error('site:release-ladder cannot use --execute and --dry-run together.');
  }

  const mode = booleanOption(options.execute) ? 'execute' : 'dry-run';
  const receiptPath = options.receipt
    ? resolveInsideAppRoot(appRoot, String(options.receipt))
    : defaultReceiptPath(appRoot, generatedAt, slugs);

  return {
    appRoot,
    command: 'site:release-ladder',
    generatedAt,
    mode,
    mutationAllowed: mode === 'execute',
    slugs,
    slugArg: slugs.join(','),
    remote: options.remote ?? DEFAULT_REMOTE,
    targetRef: options['target-ref'] ?? DEFAULT_TARGET_REF,
    releaseHost: options.host ?? options['release-host'] ?? DEFAULT_RELEASE_HOST,
    staging: {
      name: 'staging',
      baseUrl: normalizeBaseUrl(options['staging-url'] ?? DEFAULT_STAGING_URL),
      repoDir: options['staging-dir'] ?? DEFAULT_STAGING_DIR,
      service: options['staging-service'] ?? DEFAULT_STAGING_SERVICE,
    },
    production: {
      name: 'production',
      baseUrl: normalizeBaseUrl(options['production-url'] ?? DEFAULT_PRODUCTION_URL),
      repoDir: options['production-dir'] ?? DEFAULT_PRODUCTION_DIR,
      service: options['production-service'] ?? DEFAULT_PRODUCTION_SERVICE,
    },
    backupRoot: options['backup-root'] ?? DEFAULT_BACKUP_ROOT,
    receiptPath,
  };
}

export function buildReleaseLadderRoutes(slugs) {
  const routes = ['/', '/blog', '/rss.xml', '/sitemap.xml'];
  for (const slug of slugs) {
    routes.push(`/blog/${slug}`);
    routes.push(`/audio/voice/blog/${slug}.mp3`);
  }
  return [...new Set(routes)];
}

export function buildSiteReleaseLadderPlan(config) {
  const localAssetGate = `pnpm content:pipeline launch:assets ${config.slugArg}`;
  const releaseStatus = `pnpm content:pipeline site:release-status --live --slug=${config.slugArg}`;
  const routes = buildReleaseLadderRoutes(config.slugs);

  const steps = [
    {
      id: 'asset-gates',
      title: 'Check content, audio, transcript, and launch asset gates',
      environment: 'local',
      mutates: false,
      command: localAssetGate,
    },
    {
      id: 'git-readiness',
      title: 'Verify clean branch and fast-forward eligibility against main',
      environment: 'local',
      mutates: false,
      command: `git fetch ${config.remote} ${config.targetRef}:${remoteTrackingRef(config)} && git merge-base --is-ancestor ${remoteTrackingName(config)} HEAD`,
    },
    {
      id: 'promote-main',
      title: 'Promote verified branch to main',
      environment: 'git',
      mutates: true,
      command: `git push ${config.remote} HEAD:${config.targetRef}`,
    },
    {
      id: 'deploy-staging',
      title: 'Backup, fast-forward, gate, build, and restart staging',
      environment: config.releaseHost,
      mutates: true,
      repoDir: config.staging.repoDir,
      service: config.staging.service,
    },
    {
      id: 'verify-staging',
      title: 'Verify staging routes, RSS, and audio',
      environment: config.staging.baseUrl,
      mutates: false,
      routes,
    },
    {
      id: 'deploy-production',
      title: 'Backup, fast-forward, gate, build, and restart production',
      environment: config.releaseHost,
      mutates: true,
      repoDir: config.production.repoDir,
      service: config.production.service,
    },
    {
      id: 'verify-production',
      title: 'Verify production routes, RSS, and audio',
      environment: config.production.baseUrl,
      mutates: false,
      routes,
    },
    {
      id: 'release-status',
      title: 'Reconcile branch, staging, and production release state',
      environment: 'local',
      mutates: false,
      command: releaseStatus,
    },
    {
      id: 'write-receipt',
      title: 'Write durable release receipt',
      environment: 'local',
      mutates: true,
      path: config.receiptPath,
    },
  ];

  return {
    command: 'site:release-ladder',
    mode: config.mode,
    mutationAllowed: config.mutationAllowed,
    generatedAt: config.generatedAt,
    target: {
      slugs: config.slugs,
      targetRef: config.targetRef,
      remote: config.remote,
      stagingUrl: config.staging.baseUrl,
      productionUrl: config.production.baseUrl,
    },
    commands: {
      localAssetGate,
      releaseStatus,
      promoteMain: `git push ${config.remote} HEAD:${config.targetRef}`,
    },
    steps,
    receiptPath: config.receiptPath,
    dryRunNote: config.mutationAllowed
      ? null
      : 'Dry run only. Re-run with --execute to push main, deploy staging/production, and write the release receipt.',
  };
}

function spawnCommand(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    input: options.input,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 32,
  });
  return {
    command: commandLine(command, args),
    ok: result.status === 0,
    status: result.status,
    signal: result.signal,
    stdout: result.stdout?.trim() ?? '',
    stderr: result.stderr?.trim() ?? '',
  };
}

function assertCommandOk(result, message) {
  if (!result.ok) {
    const detail = result.stderr || result.stdout || `exit ${result.status}`;
    throw new Error(`${message}: ${detail}`);
  }
}

function gitCommand(args, appRoot) {
  return spawnCommand('git', args, { cwd: appRoot });
}

function pnpmCommand(args, appRoot) {
  return spawnCommand('pnpm', args, { cwd: appRoot });
}

function sha256File(filePath) {
  const hash = crypto.createHash('sha256');
  hash.update(fs.readFileSync(filePath));
  return hash.digest('hex');
}

function fileDurationSeconds(filePath) {
  const result = spawnCommand('ffprobe', [
    '-v',
    'error',
    '-show_entries',
    'format=duration',
    '-of',
    'default=noprint_wrappers=1:nokey=1',
    filePath,
  ]);
  if (!result.ok) return null;
  const value = Number.parseFloat(result.stdout);
  return Number.isFinite(value) ? value : null;
}

function localAudioEvidence(appRoot, slug) {
  const filePath = path.join(appRoot, 'public/audio/voice/blog', `${slug}.mp3`);
  if (!fs.existsSync(filePath)) {
    return {
      slug,
      ok: false,
      path: filePath,
      error: 'Missing local audio file.',
    };
  }

  return {
    slug,
    ok: true,
    path: filePath,
    bytes: fs.statSync(filePath).size,
    sha256: sha256File(filePath),
    durationSeconds: fileDurationSeconds(filePath),
  };
}

function curlStatus(url) {
  const result = spawnCommand('curl', [
    '--location',
    '--silent',
    '--show-error',
    '--output',
    '/dev/null',
    '--write-out',
    '%{http_code}',
    '--max-time',
    '30',
    url,
  ]);
  const status = Number.parseInt(result.stdout, 10);
  return {
    url,
    status: Number.isFinite(status) ? status : null,
    ok: result.ok && status >= 200 && status < 400,
    error: result.ok ? null : result.stderr || result.stdout,
  };
}

function curlText(url) {
  const result = spawnCommand('curl', [
    '--location',
    '--silent',
    '--show-error',
    '--max-time',
    '30',
    url,
  ]);
  return {
    url,
    ok: result.ok,
    text: result.stdout,
    error: result.ok ? null : result.stderr || result.stdout,
  };
}

function verifyRss(baseUrl, slugs) {
  const url = `${baseUrl}/rss.xml`;
  const result = curlText(url);
  const containsSlugs = slugs.filter((slug) => result.text.includes(`/blog/${slug}`));
  return {
    url,
    ok: result.ok && containsSlugs.length === slugs.length,
    containsSlugs,
    missingSlugs: slugs.filter((slug) => !containsSlugs.includes(slug)),
    error: result.error,
  };
}

function verifyAudio(baseUrl, appRoot, slugs) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'site-release-audio-'));
  try {
    return slugs.map((slug) => {
      const expected = localAudioEvidence(appRoot, slug);
      const url = `${baseUrl}/audio/voice/blog/${slug}.mp3`;
      const outputPath = path.join(tempDir, `${slug}.mp3`);
      const download = spawnCommand('curl', [
        '--location',
        '--silent',
        '--show-error',
        '--fail',
        '--max-time',
        '120',
        '--output',
        outputPath,
        url,
      ]);
      if (!download.ok) {
        return {
          slug,
          url,
          ok: false,
          expected,
          error: download.stderr || download.stdout,
        };
      }

      const sha256 = sha256File(outputPath);
      const durationSeconds = fileDurationSeconds(outputPath);
      const durationDelta = expected.durationSeconds !== null && durationSeconds !== null
        ? Math.abs(expected.durationSeconds - durationSeconds)
        : null;
      const ok = expected.ok
        && sha256 === expected.sha256
        && durationSeconds !== null
        && durationDelta !== null
        && durationDelta < 0.5;

      return {
        slug,
        url,
        ok,
        sha256,
        durationSeconds,
        durationDelta,
        expected,
      };
    });
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function verifyLiveSurface(environment, config) {
  const routes = buildReleaseLadderRoutes(config.slugs);
  const routeChecks = routes.map((route) => curlStatus(`${environment.baseUrl}${route}`));
  const rss = verifyRss(environment.baseUrl, config.slugs);
  const audio = verifyAudio(environment.baseUrl, config.appRoot, config.slugs);
  return {
    baseUrl: environment.baseUrl,
    routes: routeChecks,
    rss,
    audio,
    ok:
      routeChecks.every((check) => check.ok)
      && rss.ok
      && audio.every((check) => check.ok),
  };
}

function backupPathFor(config, environment, targetSha) {
  const shortSha = targetSha.slice(0, 12);
  const stamp = safeTimestamp(config.generatedAt);
  return path.posix.join(
    config.backupRoot,
    `${path.posix.basename(environment.repoDir)}-pre-main-${shortSha}-${stamp}`,
  );
}

function remoteDeployScript(config, environment, targetSha, backupPath) {
  return `set -euo pipefail

REPO_DIR=${shellQuote(environment.repoDir)}
SERVICE=${shellQuote(environment.service)}
TARGET_REF=${shellQuote(config.targetRef)}
TARGET_SHA=${shellQuote(targetSha)}
SLUGS=${shellQuote(config.slugArg)}
BACKUP_DIR=${shellQuote(backupPath)}
STAMP=${shellQuote(safeTimestamp(config.generatedAt))}

if [ -s "$HOME/.nvm/nvm.sh" ]; then
  . "$HOME/.nvm/nvm.sh"
  nvm use default >/dev/null 2>&1 || true
fi

if ! command -v pnpm >/dev/null 2>&1 && command -v corepack >/dev/null 2>&1; then
  corepack enable >/dev/null 2>&1 || true
fi

command -v pnpm >/dev/null
mkdir -p "$BACKUP_DIR"
cd "$REPO_DIR"

git status --short --branch > "$BACKUP_DIR/git-status.txt"
git diff > "$BACKUP_DIR/worktree.diff"
git diff --cached > "$BACKUP_DIR/index.diff"
git ls-files --others --exclude-standard > "$BACKUP_DIR/untracked-files.txt"
tar --exclude='.git' --exclude='node_modules' --exclude='.next' --exclude='.turbo' -czf "$BACKUP_DIR/worktree.tar.gz" .

if [ -n "$(git status --porcelain)" ]; then
  git stash push -u -m "pre-main-promotion $SERVICE $TARGET_SHA $STAMP"
else
  echo "worktree clean; no stash needed"
fi

git fetch origin "$TARGET_REF"
if git show-ref --verify --quiet "refs/heads/$TARGET_REF"; then
  git switch "$TARGET_REF"
else
  git switch -c "$TARGET_REF" --track "origin/$TARGET_REF"
fi
git merge --ff-only "origin/$TARGET_REF"

ACTUAL_SHA="$(git rev-parse HEAD)"
if [ "$ACTUAL_SHA" != "$TARGET_SHA" ]; then
  echo "Expected $TARGET_SHA but checkout is $ACTUAL_SHA" >&2
  exit 23
fi

pnpm --config.auto-install-peers=true install --frozen-lockfile
pnpm content:pipeline launch:assets "$SLUGS"
pnpm vercel-check
systemctl --user restart "$SERVICE"
systemctl --user is-active "$SERVICE"
`;
}

function runRemoteDeploy(config, environment, targetSha) {
  const backupPath = backupPathFor(config, environment, targetSha);
  const script = remoteDeployScript(config, environment, targetSha, backupPath);
  const result = spawnCommand('ssh', [config.releaseHost, 'bash', '-s'], { input: script });
  assertCommandOk(result, `${environment.name} deploy failed`);
  return {
    service: environment.service,
    repoDir: environment.repoDir,
    backupPath,
    active: /\bactive\b/.test(result.stdout),
    command: result.command,
    stdout: result.stdout,
    stderr: result.stderr,
  };
}

function assertLiveSurface(surface, environmentName) {
  if (surface.ok) return;
  const failedRoutes = surface.routes.filter((route) => !route.ok).map((route) => route.url);
  const failedAudio = surface.audio.filter((audio) => !audio.ok).map((audio) => audio.url);
  const missingRss = surface.rss.missingSlugs ?? [];
  throw new Error(
    `${environmentName} verification failed: `
      + [
        failedRoutes.length ? `routes ${failedRoutes.join(', ')}` : null,
        missingRss.length ? `RSS missing ${missingRss.join(', ')}` : null,
        failedAudio.length ? `audio ${failedAudio.join(', ')}` : null,
      ].filter(Boolean).join('; '),
  );
}

export function buildSiteReleaseReceipt({
  config,
  plan,
  status,
  git = {},
  deployments = {},
  checks = {},
  commandLog = [],
  releaseStatus = [],
  errors = [],
}) {
  const passed = status === 'passed';
  return {
    command: 'site:release-ladder',
    status,
    mode: config.mode,
    generatedAt: config.generatedAt,
    receiptPath: config.receiptPath,
    target: {
      slugs: config.slugs,
      remote: config.remote,
      targetRef: config.targetRef,
      stagingUrl: config.staging.baseUrl,
      productionUrl: config.production.baseUrl,
    },
    git,
    deployments,
    checks,
    releaseStatus,
    commandLog,
    errors,
    plan,
    observation: {
      claim:
        'site release ladder checked content assets, promoted main, deployed staging and production, verified live routes/rss/audio, and wrote release receipt',
      status: passed ? 'PASS' : status === 'planned' ? 'DEGRADED' : 'FAIL',
      fallbackChain: [
        'local launch:assets gate',
        'git fast-forward promotion to main',
        'staging deploy and live route/rss/audio checks',
        'production deploy and live route/rss/audio checks',
        'durable release receipt',
      ],
    },
  };
}

function writeReceipt(receipt) {
  fs.mkdirSync(path.dirname(receipt.receiptPath), { recursive: true });
  fs.writeFileSync(receipt.receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
}

function errorWithPayload(message, payload) {
  const error = new Error(message);
  error.payload = payload;
  return error;
}

export async function runSiteReleaseLadder(options = {}) {
  const config = parseSiteReleaseLadderConfig(options);
  const plan = buildSiteReleaseLadderPlan(config);

  if (!config.mutationAllowed) {
    return buildSiteReleaseReceipt({
      config,
      plan,
      status: 'planned',
    });
  }

  const commandLog = [];
  const git = {};
  const deployments = {};
  const checks = {};
  const releaseStatus = [];
  const errors = [];

  const record = (stepId, result) => {
    commandLog.push({ stepId, ...result });
    return result;
  };

  try {
    const branch = record('git-readiness', gitCommand(['branch', '--show-current'], config.appRoot));
    assertCommandOk(branch, 'Unable to read current branch');
    git.branch = branch.stdout;

    const targetSha = record('git-readiness', gitCommand(['rev-parse', 'HEAD'], config.appRoot));
    assertCommandOk(targetSha, 'Unable to read release SHA');
    git.targetSha = targetSha.stdout;

    const dirty = record('git-readiness', gitCommand(['status', '--porcelain'], config.appRoot));
    assertCommandOk(dirty, 'Unable to inspect local git status');
    if (dirty.stdout) {
      throw new Error('Local worktree is dirty. Commit or stash release changes before running --execute.');
    }

    const assetGate = record(
      'asset-gates',
      pnpmCommand(['content:pipeline', 'launch:assets', config.slugArg], config.appRoot),
    );
    assertCommandOk(assetGate, 'Local content/audio/transcript launch gate failed');

    const fetchMain = record(
      'git-readiness',
      gitCommand([
        'fetch',
        config.remote,
        `${config.targetRef}:${remoteTrackingRef(config)}`,
      ], config.appRoot),
    );
    assertCommandOk(fetchMain, `Unable to fetch ${remoteTrackingName(config)}`);

    const ancestor = record(
      'git-readiness',
      gitCommand(['merge-base', '--is-ancestor', remoteTrackingName(config), 'HEAD'], config.appRoot),
    );
    assertCommandOk(
      ancestor,
      `${remoteTrackingName(config)} is not an ancestor of HEAD; refusing non-fast-forward promotion`,
    );

    const pushMain = record(
      'promote-main',
      gitCommand(['push', config.remote, `HEAD:${config.targetRef}`], config.appRoot),
    );
    assertCommandOk(pushMain, `Unable to promote HEAD to ${config.remote}/${config.targetRef}`);
    git.promotedRef = `${config.remote}/${config.targetRef}`;

    if (git.branch !== config.targetRef) {
      const refreshLocalMain = record(
        'promote-main',
        gitCommand([
          'fetch',
          config.remote,
          `${config.targetRef}:refs/heads/${config.targetRef}`,
        ], config.appRoot),
      );
      assertCommandOk(refreshLocalMain, `Unable to refresh local ${config.targetRef} after promotion`);
    }

    deployments.staging = runRemoteDeploy(config, config.staging, git.targetSha);
    checks.staging = verifyLiveSurface(config.staging, config);
    assertLiveSurface(checks.staging, 'staging');

    deployments.production = runRemoteDeploy(config, config.production, git.targetSha);
    checks.production = verifyLiveSurface(config.production, config);
    assertLiveSurface(checks.production, 'production');

    for (const slug of config.slugs) {
      const statusResult = record(
        'release-status',
        pnpmCommand(['content:pipeline', 'site:release-status', '--live', `--slug=${slug}`], config.appRoot),
      );
      assertCommandOk(statusResult, `Release status failed for ${slug}`);
      releaseStatus.push({
        slug,
        stdout: statusResult.stdout,
      });
    }

    const receipt = buildSiteReleaseReceipt({
      config,
      plan,
      status: 'passed',
      git,
      deployments,
      checks,
      commandLog,
      releaseStatus,
    });
    writeReceipt(receipt);
    return receipt;
  } catch (error) {
    errors.push(error.message);
    const receipt = buildSiteReleaseReceipt({
      config,
      plan,
      status: 'failed',
      git,
      deployments,
      checks,
      commandLog,
      releaseStatus,
      errors,
    });
    writeReceipt(receipt);
    throw errorWithPayload(`${error.message}. Release receipt: ${config.receiptPath}`, receipt);
  }
}
