# Port Conflict Resolution Plan

This document outlines a comprehensive approach to resolve the port conflict issues that are causing "address already in use" errors when starting the development server.

## Current Issues

From the logs:
```
Error: listen EADDRINUSE: address already in use :::4000
    at <unknown> (Error: listen EADDRINUSE: address already in use :::4000)
    at new Promise (<anonymous>) {
  code: 'EADDRINUSE',
  errno: -48,
  syscall: 'listen',
  address: '::',
  port: 4000
}
```

The application is consistently encountering port conflicts when trying to use port 4000, suggesting:
1. A previous instance of the app may still be running
2. Another application is using port 4000
3. The port may be in a TIME_WAIT state after a recent shutdown

## Immediate Solutions

### 1. Find and Kill Existing Processes

Add script to check and kill processes using port 4000:

```bash
# For macOS and Linux
function killport() {
  local port=$1
  local pid=$(lsof -i :$port -t)
  if [ -n "$pid" ]; then
    echo "Killing process $pid using port $port"
    kill -9 $pid
  else
    echo "No process found using port $port"
  fi
}

# For Windows
function killport() {
  local port=$1
  local pid=$(netstat -ano | findstr :$port | awk '{print $5}')
  if [ -n "$pid" ]; then
    echo "Killing process $pid using port $port"
    taskkill /F /PID $pid
  else
    echo "No process found using port $port"
  fi
}
```

### 2. Update Package.json Scripts

Modify the development scripts to use alternative ports:

```json
"scripts": {
  "dev": "next dev -p 3001",
  "dev:alt": "next dev -p 3002",
  "storybook": "storybook dev -p 6006",
  "storybook:alt": "storybook dev -p 6007",
  "killports": "kill-port 3000 3001 3002 3003 3004 6006 6007 7000 4000 || true",
  "dev:safe": "npm run killports && next dev -p 3001"
}
```

### 3. Install Kill-Port Utility

Ensure the kill-port utility is installed to make port management easier:

```bash
pnpm add -D kill-port
```

## Long-Term Solutions

### 1. Port Utility Module

Create a utility module that automatically finds an available port:

```typescript
// utils/port-utils.ts
import { exec } from 'child_process';
import { promisify } from 'util';
import * as net from 'net';

const execAsync = promisify(exec);

/**
 * Check if a port is in use
 */
export const isPortInUse = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', () => {
        // Port is in use
        resolve(true);
      })
      .once('listening', () => {
        // Port is free
        server.close();
        resolve(false);
      })
      .listen(port);
  });
};

/**
 * Find an available port starting from the given port
 */
export const findAvailablePort = async (
  startPort: number,
  maxAttempts = 10
): Promise<number> => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const port = startPort + attempt;
    const inUse = await isPortInUse(port);
    if (!inUse) {
      return port;
    }
  }
  throw new Error(`Could not find an available port after ${maxAttempts} attempts`);
};

/**
 * Kill process using a specific port
 */
export const killProcessOnPort = async (port: number): Promise<boolean> => {
  try {
    if (process.platform === 'win32') {
      await execAsync(`netstat -ano | findstr :${port}`);
    } else {
      await execAsync(`lsof -i:${port} -t | xargs kill -9`);
    }
    return true;
  } catch (err) {
    return false;
  }
};
```

### 2. Dynamic Development Server Script

Create a custom server script that automatically finds and uses an available port:

```typescript
// scripts/dev-server.js
const { findAvailablePort, killProcessOnPort } = require('../utils/port-utils');
const spawn = require('cross-spawn');

async function startDevServer() {
  try {
    // First try to kill any process on our preferred ports
    await killProcessOnPort(3001);
    await killProcessOnPort(4000);
    
    // Find an available port starting from 3001
    const port = await findAvailablePort(3001);
    console.log(`Starting development server on port ${port}`);
    
    // Start Next.js on the available port
    const nextProcess = spawn('next', ['dev', '-p', port.toString()], {
      stdio: 'inherit',
      shell: true
    });
    
    // Handle process exit
    nextProcess.on('close', (code) => {
      process.exit(code);
    });
    
    // Handle SIGINT (Ctrl+C)
    process.on('SIGINT', () => {
      console.log('Shutting down development server...');
      nextProcess.kill('SIGINT');
    });
  } catch (err) {
    console.error('Failed to start development server:', err);
    process.exit(1);
  }
}

startDevServer();
```

### 3. Environment-Based Configuration

Update `next.config.ts` to use environment variables for port configuration:

```typescript
const nextConfig = {
  // ... other configuration options
  
  // Set up environment for development server
  serverRuntimeConfig: {
    port: process.env.PORT || 3001,
  },
  
  // Additional configuration
};

module.exports = nextConfig;
```

### 4. Add a Pre-Start Hook

Ensure ports are free before starting the server:

```json
"scripts": {
  "predev": "node scripts/check-ports.js",
  "dev": "next dev -p 3001",
  // ... other scripts
}
```

```javascript
// scripts/check-ports.js
const { killProcessOnPort } = require('../utils/port-utils');

async function checkPorts() {
  const portsToCheck = [3000, 3001, 4000, 6006];
  
  for (const port of portsToCheck) {
    console.log(`Checking port ${port}...`);
    const killed = await killProcessOnPort(port);
    if (killed) {
      console.log(`Killed process using port ${port}`);
    }
  }
}

checkPorts().catch(console.error);
```

## Implementation Steps

1. **Immediate Fix:**
   - [ ] Update package.json scripts to use different default ports
   - [ ] Add killports script to package.json
   - [ ] Add dev:safe script that runs killports before starting

2. **Port Utility Implementation:**
   - [ ] Create port-utils.ts with isPortInUse and findAvailablePort functions
   - [ ] Add killProcessOnPort function
   - [ ] Test utility functions

3. **Dynamic Server Script:**
   - [ ] Create dev-server.js using the port utility
   - [ ] Update package.json to use the new script
   - [ ] Test automatic port selection

4. **Documentation:**
   - [ ] Document port usage in README.md
   - [ ] Add troubleshooting section for port conflicts

## Testing the Solution

To verify the solution works:

1. Start multiple instances of the dev server to test port fallback
2. Intentionally block ports to ensure the fallback mechanism works
3. Test killports script to ensure it properly terminates processes
4. Verify all scripts fail gracefully with clear error messages 