#!/usr/bin/env node

// This script runs Storybook with HMR disabled to prevent infinite reloading issues
// Usage: node storybook-no-hmr.js

const { spawn } = require('child_process');

// Set environment variables to disable HMR
process.env.STORYBOOK_DISABLE_HMR = 'true';
process.env.NODE_ENV = 'production'; // Helps prevent some hot reload issues
process.env.STORYBOOK_CONFIG_DIR = '.storybook';

// Default port
const port = process.env.PORT || '7011';

// Run storybook with specific flags
const storybookProcess = spawn('pnpm', [
  'exec',
  'storybook',
  'dev',
  '-p',
  port,
  '--no-open',
  '--no-version-updates',
  '--config-dir',
  '.storybook',
], {
  stdio: 'inherit',
  env: {
    ...process.env,
    STORYBOOK_DISABLE_HMR: 'true',
    NODE_ENV: 'production',
    // Tell Storybook to use the .js file instead of .ts file
    STORYBOOK_MAIN_FILE: 'main.js',
  },
});

storybookProcess.on('error', (error) => {
  console.error(`Error starting Storybook: ${error.message}`);
  process.exit(1);
});

storybookProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Storybook process exited with code ${code}`);
    process.exit(code);
  }
});

console.log('Running Storybook with HMR disabled to prevent infinite reloading'); 