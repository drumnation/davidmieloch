# React Downgrade Plan (19 to 18)

This document outlines the strategy and steps for downgrading from React 19 to React 18 while preserving valuable improvements made in the current branch.

## Rationale

Downgrading to React 18 will:
1. Eliminate compatibility issues with various libraries (especially animation libraries)
2. Provide a more stable foundation for further development
3. Allow us to split our large PR into more manageable pieces
4. Reduce the number of concurrent changes being made

## Package Changes

### Core Packages to Update

| Package | Current Version | Target Version | Notes |
|---------|----------------|---------------|-------|
| react | ^19.0.0 | ^18.2.0 | Core React library |
| react-dom | ^19.0.0 | ^18.2.0 | React DOM renderer |
| @types/react | ^19.0.0 | ^18.2.45 | TypeScript definitions |
| @types/react-dom | ^19.0.0 | ^18.2.18 | DOM TypeScript definitions |

### Other Potentially Affected Packages

| Package | Current | Target | Notes |
|---------|---------|--------|-------|
| framer-motion | 12.5.0 | 10.18.0 | Compatible with React 18 |
| @react-spring/web | ^9.7.3 | ^9.5.5 | Verify compatibility |
| styled-components | ^6.1.15 | ^6.1.15 | Should be compatible with both |
| next | ^15.2.1 | ^15.2.1 | Supports both React 18 and 19 |

## Implementation Steps

### 1. Create New Branch

```bash
git checkout main
git checkout -b react-18-downgrade
```

### 2. Update Package.json

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

### 3. Identify React 19 Specific Features

Areas to check:
- Use of React hooks that changed in React 19
- React.cache usage
- use client/use server directives
- Changes to error boundaries
- React.use() usage

### 4. Update Component Code

#### React.use() Replacement
```tsx
// BEFORE (React 19)
function MyComponent() {
  const data = React.use(somePromise);
  return <div>{data}</div>;
}

// AFTER (React 18)
function MyComponent() {
  const [data, setData] = React.useState(null);
  
  React.useEffect(() => {
    let isMounted = true;
    somePromise.then(result => {
      if (isMounted) setData(result);
    });
    return () => { isMounted = false; };
  }, []);
  
  if (!data) return <div>Loading...</div>;
  return <div>{data}</div>;
}
```

#### React.cache Replacement
```tsx
// BEFORE (React 19)
const cachedFn = React.cache(async (id) => {
  const data = await fetchData(id);
  return data;
});

// AFTER (React 18)
// Using a simple memoization pattern
const createCachedFn = () => {
  const cache = new Map();
  return async (id) => {
    if (cache.has(id)) {
      return cache.get(id);
    }
    const data = await fetchData(id);
    cache.set(id, data);
    return data;
  };
};

const cachedFn = createCachedFn();
```

### 5. Update NextJS Configuration (if needed)

Check for any React 19 specific Next.js configuration options that need adjustment.

### 6. Test Application Functionality

1. Start with core navigation and UI components
2. Test all routes and page loads
3. Test interactive components (forms, buttons, etc.)
4. Test animations and transitions
5. Check for console errors or warnings

### 7. Verify Third-Party Library Compatibility

Ensure all third-party libraries work correctly with React 18.

## Preserving Valuable Changes

### Identify High-Value Improvements

Review the current codebase to identify valuable improvements that should be preserved:

1. **Code Quality Improvements**
   - Better typing
   - Code organization
   - Performance optimizations

2. **Component Refactoring**
   - Component splits for better maintainability
   - Higher-order components or custom hooks

3. **New Features**
   - GitHub Projects feature
   - Enhanced routing
   - UI improvements

### Preservation Strategy

1. **Cherry-picking**: For isolated, valuable changes
   ```bash
   git cherry-pick <commit-hash>
   ```

2. **Manual Recreation**: For complex features that need significant adjustment
   - Document the feature's core functionality
   - Implement with React 18 compatible code

3. **Baseline Feature Port**: For new features like GitHub Projects
   - Implement the core feature without React 19 specific code

## Testing Strategy

### Automated Testing
- Update unit tests to work with React 18
- Create regression tests for critical application flows
- Test performance metrics to ensure no degradation

### Manual Testing Checklist
- [ ] Navigation functions correctly
- [ ] All routes render correctly  
- [ ] Animations work as expected
- [ ] Forms submit properly
- [ ] No visual regressions in components
- [ ] Responsive layouts work on all target devices

## Roll-out Plan

1. Complete the React 18 downgrade
2. Fix any critical issues
3. Create a PR with minimal scope (just the React version change)
4. Add GitHub Projects and other features in subsequent PRs

## Fallback Strategy

If significant issues are encountered:
1. Document exact issues
2. Consider targeted fixes instead of full downgrade
3. Evaluate library alternatives that work with React 19 