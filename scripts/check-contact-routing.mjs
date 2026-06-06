#!/usr/bin/env node
import path from "node:path";

import { loadDotEnvFile } from "./lib/load-dotenv.mjs";
import {
  checksumPayload,
  readRecentObservations,
  writeObservation,
} from "./lib/observability.mjs";

const appRoot = process.cwd();
const envPath = path.join(appRoot, ".env.local");

function requireEnv(names) {
  const missing = names.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }
}

function marker() {
  return `[BG-OPPORTUNITY-ROUTING-TEST ${new Date().toISOString()}]`;
}

function observeContactCheck(statusValue, data = {}) {
  const primary = writeObservation(appRoot, {
    source: "contact-routing-check",
    observer_id: "contact-routing-check.primary",
    event: statusValue === "PASS" ? "OBSERVER_FIRED" : "FAILURE",
    claim:
      "contact routing configuration is observable before sending opportunity email",
    status: statusValue,
    recursion_depth: 0,
    fallback_chain_index: 0,
    data: {
      fallback_chain: [
        "structured contact-check JSON output",
        "SMTP send test after confirmation",
        "ROM heartbeat",
      ],
      ...data,
    },
  });
  const { heartbeatPath, records, corruptLines } = readRecentObservations(
    appRoot,
    25,
  );
  const foundPrimary = records.some(
    (record) => record.checksum === primary.record.checksum,
  );
  const readback = writeObservation(appRoot, {
    source: "contact-routing-check-readback",
    observer_id: "contact-routing-check.readback",
    event: foundPrimary ? "OBSERVER_FIRED" : "FAILURE",
    claim:
      "contact routing heartbeat readback observed contact-routing-check.primary",
    status: foundPrimary ? "PASS" : "FAIL",
    recursion_depth: 1,
    fallback_chain_index: 1,
    data: {
      heartbeatPath,
      observed_checksum: primary.record.checksum,
      records_checked: records.length,
      corrupt_lines: corruptLines,
    },
  });
  writeObservation(appRoot, {
    source: "contact-routing-check-readback-cross-check",
    observer_id: "contact-routing-check.readback-cross-check",
    event: readback.record.status === "PASS" ? "OBSERVER_FIRED" : "FAILURE",
    claim: "contact routing readback observer is itself observable",
    status: readback.record.status,
    recursion_depth: 2,
    fallback_chain_index: 2,
    data: {
      observed_observer_id: readback.record.observer_id,
      observed_checksum: readback.record.checksum,
    },
  });
}

async function main() {
  loadDotEnvFile(envPath);

  const shouldSend = process.argv.includes("--send");
  const required = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "CONTACT_FORM_RECEIVER_EMAIL",
  ];

  const state = {
    mode: shouldSend ? "send-test-email" : "read-only",
    configured: Object.fromEntries(
      required.map((name) => [name, Boolean(process.env[name])]),
    ),
    leadIntake: {
      supabaseConfigured: Boolean(
        (process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL) &&
          (process.env.SUPABASE_SERVICE_ROLE_KEY ??
            process.env.SUPABASE_SECRET_KEY),
      ),
      alertWebhookConfigured: Boolean(process.env.LEAD_ALERT_WEBHOOK_URL),
      twentyConfigured: Boolean(
        process.env.TWENTY_API_BASE_URL && process.env.TWENTY_API_KEY,
      ),
      mailerLiteConfigured: Boolean(process.env.MAILERLITE_API_KEY),
      mailerLiteGroupConfigured: Boolean(process.env.MAILERLITE_GROUP_ID),
    },
    receiver: process.env.CONTACT_FORM_RECEIVER_EMAIL ?? null,
    triageConfigured: Boolean(process.env.OPPORTUNITY_TRIAGE_EMAIL),
    triageReceiver: process.env.OPPORTUNITY_TRIAGE_EMAIL ?? null,
  };

  if (!shouldSend) {
    const payload = {
      ...state,
      nextStep:
        "Run `node scripts/check-contact-routing.mjs --send` only after confirming the test email destination.",
    };
    observeContactCheck("PASS", {
      mode: payload.mode,
      output_checksum: checksumPayload(payload),
    });
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  requireEnv(required);
  const nodemailer = await import("nodemailer");

  const testMarker = marker();
  const transporter = nodemailer.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT ?? "465", 10),
    secure: Number.parseInt(process.env.SMTP_PORT ?? "465", 10) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const to = [
    process.env.CONTACT_FORM_RECEIVER_EMAIL,
    process.env.OPPORTUNITY_TRIAGE_EMAIL,
  ]
    .filter(Boolean)
    .join(",");

  const info = await transporter.sendMail({
    from: `"David Mieloch Site Test" <${process.env.SMTP_USER}>`,
    to,
    subject: `${testMarker} Contact routing verification`,
    text: `${testMarker}\n\nThis is a marked routing test for davidmieloch.com opportunity email delivery.`,
  });

  const payload = {
    ...state,
    marker: testMarker,
    messageId: info.messageId,
    sentTo: to,
  };
  observeContactCheck("PASS", {
    mode: payload.mode,
    output_checksum: checksumPayload(payload),
  });
  console.log(JSON.stringify(payload, null, 2));
}

main().catch((error) => {
  observeContactCheck("FAIL", { error: error.message });
  console.error(error.message);
  process.exit(1);
});
