#!/usr/bin/env node

/**
 * This script normalizes styled-components class names in snapshot files
 * to avoid unnecessary snapshot failures due to random hash generation.
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

// Configuration
const SNAPSHOTS_DIR = path.join(__dirname, '../src/__snapshots__');
const HASH_PATTERN = /sc-[a-zA-Z0-9-]+/g;
const REPLACEMENT = 'sc-NORMALIZED';
const CLASS_PATTERN = /(?:class|className)="([^"]*)"/g;

// Function to normalize a snapshot file
async function normalizeSnapshotFile(filePath) {
  console.log(`Processing ${path.relative(__dirname, filePath)}`);
  
  // Read the file content
  const content = await readFile(filePath, 'utf8');
  
  // Replace all styled-component class names with a placeholder
  let normalizedContent = content.replace(HASH_PATTERN, REPLACEMENT);
  
  // Normalize class attributes (sort classes alphabetically)
  normalizedContent = normalizedContent.replace(CLASS_PATTERN, (match, classContent) => {
    const normalizedClasses = classContent
      .split(/\s+/)
      .filter(Boolean)
      .map(cls => cls.replace(HASH_PATTERN, REPLACEMENT))
      .sort()
      .join(' ');
    
    return `class="${normalizedClasses}"`;
  });
  
  // Write the normalized content back to the file
  if (content !== normalizedContent) {
    await writeFile(filePath, normalizedContent, 'utf8');
    console.log(`  ✓ Updated`);
    return true;
  }
  
  console.log(`  ✓ Already normalized`);
  return false;
}

// Find all snapshot files recursively
async function findSnapshotFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      files.push(...await findSnapshotFiles(fullPath));
    } else if (entry.name.endsWith('.snap')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Main function
async function main() {
  console.log('Normalizing styled-components class names in snapshot files...');
  
  try {
    // Ensure the snapshots directory exists
    try {
      await stat(SNAPSHOTS_DIR);
    } catch (err) {
      console.log(`No snapshots directory found at ${SNAPSHOTS_DIR}`);
      console.log('Run tests to generate snapshots first.');
      process.exit(0);
    }
    
    // Find all snapshot files
    const snapshotFiles = await findSnapshotFiles(SNAPSHOTS_DIR);
    console.log(`Found ${snapshotFiles.length} snapshot files.`);
    
    // Normalize each file
    let updatedCount = 0;
    for (const file of snapshotFiles) {
      const updated = await normalizeSnapshotFile(file);
      if (updated) updatedCount++;
    }
    
    console.log(`\nDone! Updated ${updatedCount} of ${snapshotFiles.length} files.`);
    
    if (updatedCount > 0) {
      console.log('\nTip: Re-run your tests to make sure the normalized snapshots pass.');
    }
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

// Run the script
main(); 