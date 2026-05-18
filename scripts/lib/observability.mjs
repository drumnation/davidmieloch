import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export const OBSERVABILITY_PROTOCOL_VERSION = 'genesis-observability-v1';

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function writeableHeartbeatCandidate(filePath) {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.closeSync(fs.openSync(filePath, 'a'));
    return true;
  } catch {
    return false;
  }
}

function rotateHeartbeat(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lineCount = fs.readFileSync(filePath, 'utf8').split('\n').filter(Boolean).length;
  if (lineCount < 1000) return;

  for (let index = 9; index >= 1; index -= 1) {
    const current = `${filePath}.${index}`;
    const next = `${filePath}.${index + 1}`;
    if (fs.existsSync(current)) {
      fs.renameSync(current, next);
    }
  }

  fs.renameSync(filePath, `${filePath}.1`);
}

export function resolveHeartbeatPath(appRoot) {
  const candidates = [
    process.env.OBSERVABILITY_HEARTBEAT_PATH,
    '/var/brain-garden/observability/heartbeat.jsonl',
    path.join(
      process.env.XDG_DATA_HOME ?? path.join(os.homedir(), '.local/share'),
      'brain-garden/observability/heartbeat.jsonl',
    ),
    path.join(appRoot, '.brain/observability/heartbeat.jsonl'),
  ].filter(Boolean);

  const match = candidates.find((candidate) => writeableHeartbeatCandidate(candidate));
  if (!match) {
    throw new Error('No writable observability heartbeat path found.');
  }

  return match;
}

export function writeObservation(appRoot, observation) {
  const heartbeatPath = resolveHeartbeatPath(appRoot);
  const observedEventTime = observation.observed_event_time ?? new Date().toISOString();
  const observationRecordedTime = new Date().toISOString();
  const record = {
    protocol_version: OBSERVABILITY_PROTOCOL_VERSION,
    ts: observationRecordedTime,
    observed_event_time: observedEventTime,
    observation_recorded_time: observationRecordedTime,
    source: observation.source,
    observer_id: observation.observer_id ?? observation.source,
    event: observation.event,
    claim: observation.claim,
    status: observation.status,
    recursion_depth: observation.recursion_depth ?? 0,
    fallback_chain_index: observation.fallback_chain_index ?? 0,
    expected_fire_interval: observation.expected_fire_interval ?? 'on-command',
    model_version: observation.model_version ?? 'codex-local-cli',
    runtime_version: `node-${process.version}`,
    observation_strength: observation.observation_strength ?? 3,
    entropy_or_variance_metric: observation.entropy_or_variance_metric ?? null,
    data: observation.data ?? {},
  };

  record.checksum = sha256(JSON.stringify(record));
  rotateHeartbeat(heartbeatPath);
  fs.appendFileSync(heartbeatPath, `${JSON.stringify(record)}\n`);

  return { heartbeatPath, record };
}

export function readRecentObservations(appRoot, limit = 20) {
  const heartbeatPath = resolveHeartbeatPath(appRoot);
  if (!fs.existsSync(heartbeatPath)) {
    return { heartbeatPath, records: [], corruptLines: 0 };
  }

  const lines = fs
    .readFileSync(heartbeatPath, 'utf8')
    .split('\n')
    .filter(Boolean)
    .slice(-limit);
  const records = [];
  let corruptLines = 0;

  for (const line of lines) {
    try {
      records.push(JSON.parse(line));
    } catch {
      corruptLines += 1;
    }
  }

  return { heartbeatPath, records, corruptLines };
}

export function checksumPayload(payload) {
  return sha256(JSON.stringify(payload));
}
