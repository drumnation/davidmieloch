#!/usr/bin/env node

// This script runs Storybook with optimized settings to prevent rendering issues
// with Next.js App Router components
// Usage: node run-storybook.js

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if we need to be in debug mode
const isDebug = process.argv.includes('--debug');
const clearCache = process.argv.includes('--clear-cache');

// Default port
const port = process.env.PORT || '7011';

// Pre-run cleanup (optional)
if (clearCache) {
  console.log('🧹 Clearing Storybook cache...');
  const cachePaths = [
    path.join(__dirname, 'node_modules/.cache/storybook'),
    path.join(__dirname, '.cache'),
    path.join(__dirname, '.storybook-static')
  ];
  
  cachePaths.forEach(cachePath => {
    try {
      if (fs.existsSync(cachePath)) {
        fs.rmSync(cachePath, { recursive: true, force: true });
        console.log(`  ✓ Removed ${cachePath}`);
      }
    } catch (e) {
      console.warn(`  ✗ Failed to remove ${cachePath}:`, e.message);
    }
  });
}

// Run storybook with specific flags
console.log(`
🚀 Starting Storybook with Next.js App Router support...
🔧 Configuration:
   - Port: ${port}
   - Debug Mode: ${isDebug ? 'ON' : 'OFF'}
   - Cache Cleared: ${clearCache ? 'YES' : 'NO'}
`);

// Environment variables to help prevent rendering issues
const env = {
  ...process.env,
  // Tell webpack we're in development mode
  NODE_ENV: 'development',
  // Tell Next.js we're in a Storybook environment
  STORYBOOK: 'true',
  NEXT_PUBLIC_IS_STORYBOOK: 'true',
  // Skip certain plugins that might cause issues
  SKIP_PLUGIN_NX: 'true',
  // Set the Storybook port
  STORYBOOK_PORT: port,
  // Use the CommonJS version of the configuration
  STORYBOOK_MAIN_FILE: 'main.js',
  // Add debug flags
  DEBUG: isDebug ? '*' : '',
  STORYBOOK_DEBUG: isDebug ? 'true' : 'false',
  // Increase memory limit to prevent crashes
  NODE_OPTIONS: '--max-old-space-size=4096',
};

// Add debug flags if needed
const storyArgs = [
  'exec',
  'storybook',
  'dev',
  '-p',
  port,
  '--no-open',
  '--no-version-updates',
  '--config-dir',
  '.storybook',
];

// Add debug flag if needed
if (isDebug) {
  storyArgs.push('--debug-webpack');
}

// Run storybook
const storybookProcess = spawn('pnpm', storyArgs, {
  stdio: 'inherit',
  env,
});

// Handle process events
storybookProcess.on('error', (error) => {
  console.error(`❌ Error starting Storybook: ${error.message}`);
  process.exit(1);
});

storybookProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ Storybook process exited with code ${code}`);
    process.exit(code);
  }
});

// Add help text for debugging
console.log(`
💡 Troubleshooting Tips:
   - If you still see infinite loading, try: node run-storybook.js --clear-cache
   - For webpack debugging, try: node run-storybook.js --debug
   - Check browser console for detailed error messages
`);

// Print usage if --help
if (process.argv.includes('--help')) {
  console.log(`
Usage: node run-storybook.js [options]

Options:
  --debug         Enable debug mode with additional logging
  --clear-cache   Clear Storybook cache before starting
  --help          Show this help
`);
  process.exit(0);
} 