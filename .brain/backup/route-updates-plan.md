# Route System Updates Plan

This document outlines the approach to fix routing issues and port configuration problems in the application.

## Current Issues

1. **Port Conflicts**: "address already in use" errors with port 4000 for Next.js and port 7000 for Storybook
2. **Inconsistent Redirects**: Navigating to root path doesn't consistently redirect to `/enterprise-ai-development-framework`
3. **Broken Navigation Links**: Some links in the application don't navigate to the correct routes
4. **Route Rendering Errors**: Some routes may not render properly due to component issues

## Scope of Changes

### Port Configuration

1. Update development scripts to use configurable ports
2. Implement port fallback mechanism
3. Add port-killing utilities to package.json scripts

### Route Definition and Navigation

1. Fix Next.js route configuration
2. Update navigation components to use correct routes
3. Implement consistent redirects from root path

### Error Handling

1. Improve error boundaries for route components
2. Add fallback UI for route loading failures
3. Implement better error logging

## Implementation Plan

### 1. Port Configuration Updates

#### Update package.json Scripts

```diff
"scripts": {
-  "dev": "next dev -p 4000",
+  "dev": "next dev -p 3001",
+  "dev:alt": "next dev -p 3002",
-  "storybook": "storybook dev -p 7000",
+  "storybook": "storybook dev -p 6006",
+  "storybook:alt": "storybook dev -p 6007",
   "killports": "kill-port 3000 3001 3002 3003 3004 6006 6007 7000 4000 || true"
},
```

#### Create Port Utility

```typescript
// utils/port-utils.ts
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function isPortInUse(port: number): Promise<boolean> {
  try {
    // Check if port is in use using different commands based on platform
    if (process.platform === 'win32') {
      const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
      return !!stdout.trim();
    } else {
      const { stdout } = await execAsync(`lsof -i:${port} -t`);
      return !!stdout.trim();
    }
  } catch (error) {
    // If the command fails, it likely means the port is not in use
    return false;
  }
}

export async function findAvailablePort(startPort: number, maxTries = 10): Promise<number> {
  let port = startPort;
  let tries = 0;
  
  while (tries < maxTries) {
    const inUse = await isPortInUse(port);
    if (!inUse) {
      return port;
    }
    port++;
    tries++;
  }
  
  throw new Error(`Could not find available port after ${maxTries} attempts`);
}
```

#### Create Dev Script Helper

```typescript
// scripts/dev.js
const { findAvailablePort } = require('../utils/port-utils');
const { spawn } = require('child_process');

async function startDev() {
  try {
    const port = await findAvailablePort(3001);
    console.log(`Starting Next.js dev server on port ${port}`);
    
    const nextProcess = spawn('next', ['dev', '-p', port.toString()], {
      stdio: 'inherit',
      shell: true
    });
    
    // Handle process exit
    nextProcess.on('exit', (code) => {
      process.exit(code);
    });
  } catch (error) {
    console.error('Failed to start dev server:', error);
    process.exit(1);
  }
}

startDev();
```

### 2. Fix Route Definitions

#### Update next.config.ts for Route Configuration

```typescript
const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  // Add redirects for consistency
  async redirects() {
    return [
      {
        source: '/',
        destination: '/enterprise-ai-development-framework',
        permanent: true,
      },
      // Add other redirects as needed
    ];
  },
  // Add rewrites if needed
  async rewrites() {
    return [];
  }
};
```

#### Fix Navigation Component

```tsx
// src/shared-components/organisms/Navigation/Navigation.tsx

// Update link paths to ensure consistency
const navigationItems = [
  {
    label: 'Enterprise AI Framework',
    path: '/enterprise-ai-development-framework',
    icon: <CodeIcon />,
  },
  {
    label: 'Best Practices',
    path: '/best-practices-integration',
    icon: <ChecklistIcon />,
  },
  {
    label: 'Bio',
    path: '/bio',
    icon: <UserIcon />,
  },
  {
    label: 'Github Projects',
    path: '/github-projects',
    icon: <GithubIcon />,
  },
  // Other items...
];
```

### 3. Enhance Error Handling

#### Create Global Error Boundary Component

```tsx
// src/shared-components/atoms/ErrorBoundary/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const ErrorContainer = styled.div`
  padding: 20px;
  margin: 20px;
  border: 1px solid #f56565;
  border-radius: 5px;
  background-color: #fff5f5;
  color: #c53030;
`;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
    // Can add logging service here
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <ErrorContainer>
          <h2>Something went wrong.</h2>
          <p>Please try refreshing the page or navigate back.</p>
          {process.env.NODE_ENV !== 'production' && (
            <details>
              <summary>Error details</summary>
              <pre>{this.state.error?.toString()}</pre>
            </details>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

#### Update Route Components to Use Error Boundary

```tsx
// app/[route]/page.tsx
import ErrorBoundary from '@/shared-components/atoms/ErrorBoundary/ErrorBoundary';
import RouteComponent from '@/shared-components/templates/RouteComponent';

export default function Page() {
  return (
    <ErrorBoundary>
      <RouteComponent />
    </ErrorBoundary>
  );
}
```

### 4. Testing Routes

Create a route testing utility:

```typescript
// utils/route-tester.ts
import { NextRequest } from 'next/server';

export async function testRoutes(routes: string[]): Promise<{route: string, status: number}[]> {
  const results = [];
  
  for (const route of routes) {
    const mockRequest = new NextRequest(new URL(`http://localhost:3001${route}`));
    try {
      const response = await fetch(mockRequest.url);
      results.push({
        route,
        status: response.status
      });
    } catch (error) {
      results.push({
        route,
        status: 500
      });
    }
  }
  
  return results;
}
```

## Implementation Steps

1. **Port Configuration**
   - [ ] Update package.json scripts
   - [ ] Create port utility functions
   - [ ] Test port detection and allocation

2. **Route Definitions**
   - [ ] Update next.config.ts
   - [ ] Fix navigation component paths
   - [ ] Test redirects from root path

3. **Error Handling**
   - [ ] Implement error boundary component
   - [ ] Add error boundaries to route components
   - [ ] Test error recovery

4. **Testing**
   - [ ] Create route testing utility
   - [ ] Test all routes for proper rendering
   - [ ] Verify navigation between routes

## Success Criteria

- No "address already in use" errors when starting the application
- Consistent redirects from root path to `/enterprise-ai-development-framework`
- All navigation links work correctly
- Error boundaries catch and display errors gracefully
- All routes render properly without console errors 