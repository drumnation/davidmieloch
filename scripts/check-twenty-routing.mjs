#!/usr/bin/env node
import path from "node:path";

import { loadDotEnvFile } from "./lib/load-dotenv.mjs";
import {
  checksumPayload,
  readRecentObservations,
  writeObservation,
} from "./lib/observability.mjs";

const appRoot = process.cwd();
loadDotEnvFile(path.join(appRoot, ".env.local"));

const baseUrl = process.env.TWENTY_API_BASE_URL ?? process.env.TWENTY_BASE_URL;
const apiKey = process.env.TWENTY_API_KEY;
const shouldSend = process.argv.includes("--send");

function trimSlash(value) {
  return value.replace(/\/$/, "");
}

function observe(status, data = {}) {
  const primary = writeObservation(appRoot, {
    source: "twenty-routing-check",
    observer_id: "twenty-routing-check.primary",
    event: status === "PASS" ? "OBSERVER_FIRED" : "FAILURE",
    claim: "Twenty CRM contact sink is configured and observable",
    status,
    recursion_depth: 0,
    fallback_chain_index: 0,
    data: {
      fallback_chain: [
        "Twenty metadata/API probe",
        "contact route SMTP/lead-intake fallback",
        "ROM heartbeat",
      ],
      ...data,
    },
  });

  const { records } = readRecentObservations(appRoot, 25);
  const foundPrimary = records.some(
    (record) => record.checksum === primary.record.checksum,
  );

  writeObservation(appRoot, {
    source: "twenty-routing-check-readback",
    observer_id: "twenty-routing-check.readback",
    event: foundPrimary ? "OBSERVER_FIRED" : "FAILURE",
    claim: "Twenty routing heartbeat readback observed the primary probe",
    status: foundPrimary ? "PASS" : "FAIL",
    recursion_depth: 1,
    fallback_chain_index: 1,
    data: {
      observed_checksum: primary.record.checksum,
    },
  });
}

async function fetchJson(endpoint, options = {}) {
  const response = await fetch(`${trimSlash(baseUrl)}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const text = await response.text();

  return {
    ok: response.ok,
    status: response.status,
    body: parseJson(text),
    error: response.ok ? undefined : text || response.statusText,
  };
}

function parseJson(text) {
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function main() {
  const configured = Boolean(baseUrl && apiKey);

  if (!configured) {
    const payload = {
      configured,
      baseUrlConfigured: Boolean(baseUrl),
      apiKeyConfigured: Boolean(apiKey),
      mode: shouldSend ? "create-test-person" : "read-only",
      nextStep:
        "Set TWENTY_API_BASE_URL or TWENTY_BASE_URL and TWENTY_API_KEY in the runtime environment.",
    };
    observe("FAIL", { output_checksum: checksumPayload(payload) });
    console.log(JSON.stringify(payload, null, 2));
    process.exitCode = 1;
    return;
  }

  const metadata = await fetchJson("/rest/metadata/objects");

  if (!shouldSend) {
    const payload = {
      configured,
      mode: "read-only",
      baseUrl,
      metadataReachable: metadata.ok,
      metadataStatus: metadata.status,
      nextStep:
        "Run `pnpm contact:twenty:check -- --send` only when a marked test person may be created in Twenty.",
    };
    observe(metadata.ok ? "PASS" : "FAIL", {
      output_checksum: checksumPayload(payload),
    });
    console.log(JSON.stringify(payload, null, 2));
    process.exitCode = metadata.ok ? 0 : 1;
    return;
  }

  const marker = `BG Twenty routing test ${new Date().toISOString()}`;
  const created = await fetchJson("/rest/people", {
    method: "POST",
    body: JSON.stringify({
      name: {
        firstName: "Brain Garden",
        lastName: "Probe",
      },
      emails: {
        primaryEmail: "twenty-routing-probe@example.com",
      },
      jobTitle: marker,
    }),
  });

  const payload = {
    configured,
    mode: "create-test-person",
    baseUrl,
    metadataReachable: metadata.ok,
    metadataStatus: metadata.status,
    createStatus: created.status,
    created: created.ok,
    marker,
  };
  observe(created.ok ? "PASS" : "FAIL", {
    output_checksum: checksumPayload(payload),
  });
  console.log(JSON.stringify(payload, null, 2));
  process.exitCode = created.ok ? 0 : 1;
}

main().catch((error) => {
  observe("FAIL", { error: error.message });
  console.error(error.message);
  process.exit(1);
});
