#!/usr/bin/env node
import path from 'node:path';

import { loadDotEnvFile } from './lib/load-dotenv.mjs';

const appRoot = process.cwd();
const envPath = path.join(appRoot, '.env.local');

function requireEnv(names) {
  const missing = names.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }
}

function marker() {
  return `[BG-OPPORTUNITY-ROUTING-TEST ${new Date().toISOString()}]`;
}

async function main() {
  loadDotEnvFile(envPath);

  const shouldSend = process.argv.includes('--send');
  const required = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'CONTACT_FORM_RECEIVER_EMAIL',
  ];

  const state = {
    mode: shouldSend ? 'send-test-email' : 'read-only',
    configured: Object.fromEntries(required.map((name) => [name, Boolean(process.env[name])])),
    receiver: process.env.CONTACT_FORM_RECEIVER_EMAIL ?? null,
    triageConfigured: Boolean(process.env.OPPORTUNITY_TRIAGE_EMAIL),
    triageReceiver: process.env.OPPORTUNITY_TRIAGE_EMAIL ?? null,
  };

  if (!shouldSend) {
    console.log(JSON.stringify({
      ...state,
      nextStep: 'Run `node scripts/check-contact-routing.mjs --send` only after confirming the test email destination.',
    }, null, 2));
    return;
  }

  requireEnv(required);
  const nodemailer = await import('nodemailer');

  const testMarker = marker();
  const transporter = nodemailer.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT ?? '465', 10),
    secure: Number.parseInt(process.env.SMTP_PORT ?? '465', 10) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const to = [
    process.env.CONTACT_FORM_RECEIVER_EMAIL,
    process.env.OPPORTUNITY_TRIAGE_EMAIL,
  ].filter(Boolean).join(',');

  const info = await transporter.sendMail({
    from: `"David Mieloch Site Test" <${process.env.SMTP_USER}>`,
    to,
    subject: `${testMarker} Contact routing verification`,
    text: `${testMarker}\n\nThis is a marked routing test for davidmieloch.com opportunity email delivery.`,
  });

  console.log(JSON.stringify({
    ...state,
    marker: testMarker,
    messageId: info.messageId,
    sentTo: to,
  }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
