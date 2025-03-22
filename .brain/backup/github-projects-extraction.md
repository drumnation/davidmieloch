# GitHub Projects Feature Extraction Plan

This document outlines the strategy for extracting the GitHub Projects feature implementation into its own dedicated PR.

## Feature Overview

The GitHub Projects feature displays a user's GitHub repositories with filtering and sorting capabilities, showcasing projects with details like:
- Repository name and description
- Stars, forks, and issues count
- Primary language used
- Last update date
- README content preview

## Components to Extract

### Core Components

| Component | Purpose | Dependencies | Status |
|-----------|---------|--------------|--------|
| RepoCard | Display individual repository | styled-components, React | To be extracted |
| RepoGrid | Layout for multiple repositories | RepoCard, styled-components | To be extracted |
| RepoFilter | Filter repositories by criteria | styled-components, React hooks | To be extracted |
| RepoSearch | Search through repositories | styled-components, React hooks | To be extracted |
| RepoDetails | Expanded repository information | styled-components, React Markdown | To be extracted |

### Supporting Utilities

| Utility | Purpose | Dependencies | Status |
|---------|---------|--------------|--------|
| githubApi.ts | API calls to GitHub | fetch/axios | To be extracted |
| repoTypes.ts | TypeScript interfaces for repos | None | To be extracted |
| repoHelpers.ts | Helper functions for repo data | repoTypes.ts | To be extracted |

## Data Model

```typescript
// Core repository interface
interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string;
  updated_at: string;
  homepage: string;
  topics: string[];
  // Additional fields as needed
}

// Filter options interface
interface FilterOptions {
  language: string | null;
  minStars: number;
  sortBy: 'stars' | 'updated' | 'name';
  sortDirection: 'asc' | 'desc';
  searchQuery: string;
}
```

## Routes to Extract

| Route | Purpose | Components Used | Status |
|-------|---------|-----------------|--------|
| /github-projects | Main GitHub projects page | RepoGrid, RepoFilter | To be extracted |
| /github-projects/[repoName] | Individual repository details | RepoDetails | To be extracted |

## API Integration

1. GitHub API endpoints used:
   - `GET /users/{username}/repos` - Get user repositories
   - `GET /repos/{owner}/{repo}` - Get specific repository details
   - `GET /repos/{owner}/{repo}/readme` - Get repository README

2. Authentication approach:
   - Initially using public API access (limited rate)
   - Future: GitHub OAuth for higher rate limits

## Extraction Process

### Step 1: Identify and Isolate Code
- [ ] Identify all components related to GitHub Projects feature
- [ ] Trace dependencies between components
- [ ] Identify shared utilities and styles

### Step 2: Create Feature Branch
- [ ] Create new branch from main: `feature/github-projects`
- [ ] Set up basic structure for components and utilities

### Step 3: Extract Components
- [ ] Extract each component with its styles and tests
- [ ] Ensure component interfaces remain consistent
- [ ] Update imports and exports

### Step 4: Extract Utilities and Data Models
- [ ] Extract API utilities
- [ ] Extract type definitions
- [ ] Extract helper functions

### Step 5: Create Routes
- [ ] Implement route components
- [ ] Set up navigation links
- [ ] Ensure proper routing between pages

### Step 6: Test Integration
- [ ] Test component integration
- [ ] Test API integration
- [ ] Test route navigation
- [ ] Cross-browser testing

## Dependencies

The GitHub Projects feature requires:
- React 18 (does not use React 19 specific features)
- styled-components for styling (no conflicts with migration)
- Next.js router

## Testing Strategy

1. **Unit Tests**:
   - Test each component in isolation
   - Mock API responses
   - Test filtering and sorting logic

2. **Integration Tests**:
   - Test component composition
   - Test data flow between components

3. **E2E Tests**:
   - Test full repository browsing flow
   - Test filtering and searching
   - Test navigation between list and details

## Implementation Timeline

1. Component extraction: 1-2 days
2. API integration: 1 day
3. Route implementation: 1 day
4. Testing and refinement: 1-2 days

## Known Challenges

1. Ensuring styling consistency if shared styles are modified
2. Managing API rate limits during development
3. Handling loading states and error boundaries
4. Ensuring responsive design across device sizes

## Post-Extraction Verification

- [ ] All GitHub Projects components function correctly
- [ ] API calls are properly implemented
- [ ] Routes navigate correctly
- [ ] Styling is consistent
- [ ] No regression in other features
- [ ] Performance benchmarks meet standards 