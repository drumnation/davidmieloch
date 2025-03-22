# Simplified PR Plan

This document outlines our streamlined approach to breaking up the large PR into three focused PRs.

## Overview

We will split our work into three distinct PRs:

1. **React 18 Downgrade PR** - Foundation for everything else
2. **Route System Fixes PR** - Improve navigation and fix port conflicts
3. **GitHub Projects Feature PR** - Add the new feature

## PR 1: React 18 Downgrade

**Goal:** Revert to React 18 compatibility to avoid React Spring migration entirely.

**Key Changes:**

- [x] Update package.json to use React 18.2.0
- [x] Keep using Framer Motion 10.x.x (compatible with React 18)
- [x] Fix any React 19-specific code

**Steps:**

- [x] 1. Create branch `react-18-downgrade` from main
- [x] 2. Update dependencies in package.json:

   ```diff
   {
     "dependencies": {
   -   "react": "^19.0.0",
   -   "react-dom": "^19.0.0",
   +   "react": "^18.2.0",
   +   "react-dom": "^18.2.0",
       // Other dependencies...
   -   "framer-motion": "12.5.0",
   +   "framer-motion": "10.18.0",
     },
     "devDependencies": {
   -   "@types/react": "^19.0.0",
   -   "@types/react-dom": "^19.0.0",
   +   "@types/react": "^18.2.45",
   +   "@types/react-dom": "^18.2.18",
       // Other dev dependencies...
     }
   }
   ```

- [x] 3. Run `pnpm install` to update lock file
- [x] 4. Fix React 19-specific code (e.g., React.use(), React.cache)
- [x] 5. Test all core functionality and animations
- [x] 6. Submit PR

## PR 2: Route System Fixes

**Goal:** Fix routing issues, port conflicts, and improve navigation.

**Key Changes:**

- [x] Add a simple killports script to prevent "address already in use" errors
- [x] Fix inconsistent redirects from root path
- [x] Fix broken navigation links

**Steps:**

- [x] 1. Create branch `fix/route-system` from main (after PR 1 is merged)
- [x] 2. Update package.json scripts:

   ```json
   "scripts": {
     "dev": "next dev -p 3001",
     "killports": "kill-port 3000 3001 3002 3003 3004 6006 6007 7000 4000 || true",
     "dev:safe": "npm run killports && next dev -p 3001"
   }
   ```

- [x] 3. Update next.config.ts with proper redirects
- [x] 4. Fix navigation component paths
- [x] 5. Test all routes and navigation
- [x] 6. Submit PR

## PR 3: GitHub Projects Feature

**Goal:** Implement the GitHub Projects feature in isolation.

**Key Components:**

- [ ] RepoCard - Display individual repository
- [ ] RepoGrid - Layout for multiple repositories
- [ ] RepoFilter - Filter repositories by criteria
- [ ] RepoSearch - Search through repositories
- [ ] RepoDetails - Expanded repository information

**Steps:**

- [ ] 1. Create branch `feature/github-projects` from main (after PR 2 is merged)
- [ ] 2. Create repository type definitions
- [ ] 3. Set up GitHub API utilities
- [ ] 4. Implement UI components
- [ ] 5. Create routes for GitHub Projects pages
- [ ] 6. Test feature thoroughly
- [ ] 7. Submit PR

## Implementation Checklist

### PR 1: React 18 Downgrade

- [x] Create branch from main
- [x] Update package.json
- [x] Fix React 19-specific code
- [x] Test all core functionality
- [x] Update CHANGELOG.md

### PR 2: Route System Fixes

- [x] Create branch after PR 1 is merged
- [x] Update package.json scripts
- [x] Fix route configuration
- [x] Fix navigation links
- [x] Test all routes
- [x] Update CHANGELOG.md

### PR 3: GitHub Projects Feature

- [ ] Create branch after PR 2 is merged
- [ ] Implement repository types and API
- [ ] Create UI components
- [ ] Implement routes
- [ ] Test feature thoroughly
- [ ] Update CHANGELOG.md

## Key Benefits of This Approach

1. **Simplicity** - Each PR has a clear, focused purpose
2. **Avoid Migration** - No need to migrate to React Spring
3. **Incremental Progress** - Build on stable foundation
4. **Easier Review** - Smaller, focused PRs are easier to review
5. **Reduced Risk** - Smaller changes mean lower risk of regressions
