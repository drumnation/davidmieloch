import fs from 'node:fs';

export function loadDotEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith('#')) continue;

    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key]) continue;

    const trimmed = rawValue.trim();
    process.env[key] = trimmed.startsWith('"') || trimmed.startsWith("'")
      ? trimmed.replace(/^['"]|['"]$/g, '')
      : trimmed.split(/\s+#/)[0].trim();
  }
}
