#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const candidates = [
  path.join(root, 'node_modules/react-floater/dist/index.d.cts'),
  path.join(root, 'node_modules/.pnpm'),
];

function collectReactFloaterTypes(directory, results = []) {
  if (!fs.existsSync(directory)) return results;

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.startsWith('react-floater@')) {
        const declarationPath = path.join(
          entryPath,
          'node_modules/react-floater/dist/index.d.cts',
        );
        if (fs.existsSync(declarationPath)) {
          results.push(declarationPath);
        }
      }
      continue;
    }

    if (entry.isFile() && entryPath.endsWith('react-floater/dist/index.d.cts')) {
      results.push(entryPath);
    }
  }

  return results;
}

function patchDeclaration(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const patched = original.replace(
    /\n\/\/# sourceMappingURL=index\.d\.cts\.map\s+export \{[^}]+};\n}\n\nexport = ReactFloater;\s*$/s,
    '\nexport = ReactFloater;\n',
  );

  if (patched === original) {
    return false;
  }

  fs.writeFileSync(filePath, patched);
  return true;
}

const files = [
  ...new Set([
    ...(fs.existsSync(candidates[0]) ? [candidates[0]] : []),
    ...collectReactFloaterTypes(candidates[1]),
  ]),
];

let patchedCount = 0;
for (const file of files) {
  if (patchDeclaration(file)) {
    patchedCount += 1;
  }
}

if (patchedCount > 0) {
  console.log(`Patched ${patchedCount} react-floater declaration file(s).`);
}
