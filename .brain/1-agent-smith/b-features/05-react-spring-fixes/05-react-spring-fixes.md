# Feature Task Plan

## Feature: React Spring Bug Fixes

## Task: Fix Maximum Call Stack Size Exceeded Errors in React Spring Components

## Status: 🟡 In Progress

## Last Updated: 2023-06-02

## 1. Overview

This task addresses the widespread Maximum Call Stack Size Exceeded errors occurring in the application due to improper usage of react-spring animations. These errors manifest as infinite recursion in the SpringValue.eventObserved cycle, primarily caused by direct access to spring values through the `.get()` method in render functions. 

### Updated Strategy

After multiple attempts to fix React Spring issues through direct patching and mock implementations, we've determined that the most effective solution is a complete migration to Framer Motion. This approach will:

1. Eliminate the root cause of Maximum Call Stack Size errors by removing React Spring entirely
2. Provide a more stable animation system with better Next.js compatibility
3. Improve overall application stability and performance

## 2. Codebase Analysis

### 2.1. Key Files & Modules

* `src/utils/animations/typed-components.tsx`: Contains a problematic `springToCss` utility function that directly calls `.get()` on spring values
* `src/utils/animations/migration-helpers.tsx`: Contains another implementation of `springToCss` with the same issue
* `src/shared-components/organisms/FeaturePreview/FeaturePreview.tsx`: Example component with inline definition of a problematic `springToCss` function
* `src/shared-components/organisms/DebtAnalysis/DebtAnalysis.tsx`: Uses the imported `springToCss` function
* `src/shared-components/organisms/ImpactGrid/ImpactGrid.tsx`: Uses the imported `springToCss` function
* `src/shared-components/organisms/ProblemSolution/ProblemSolution.tsx`: Uses the imported `springToCss` function
* `src/shared-components/sections/TechnicalImplementation/TechnicalImplementation.tsx`: Uses the imported `springToCss` function

### 2.2. Dependencies

* `@react-spring/web`: v9.5.5, core animation library that provides hooks for creating spring-based animations
* `react`: v18.3.1, underlying framework requiring proper handling of effects and state
* `react-intersection-observer`: Used alongside react-spring for trigger animations on scroll

### 2.3. Potential Concerns

* Fixing one component might reveal errors in others that were previously masked
* Some components may rely on the current behavior for layout or animations
* We need to ensure fixes don't break existing animations visually
* [x] Mark as addressed

## 3. Architectural Considerations

### 3.1. Updated Paradigm: Migration to Framer Motion

* **Complete Library Replacement** - Replace React Spring with Framer Motion for all animations
* **Feature Flag System** - Implement a feature flag system to enable gradual migration
* **Component-by-Component Migration** - Systematically replace animations one component at a time
* [ ] Confirmed with the user

### 3.2. Selected Design Patterns

* **Adapter Pattern** - Create adapter components that provide consistent interfaces during migration
* **Feature Flag Pattern** - Use feature flags to toggle between animation libraries or disable animations
* **Higher-Order Component Pattern** - Create HOCs for common animation patterns
* [ ] Confirmed with the user

### 3.3. Architectural Considerations & Rationale

* React Spring is fundamentally incompatible with our current usage patterns, causing circular dependencies
* Framer Motion offers a more stable, declarative API that is less prone to these issues
* Framer Motion has better compatibility with Next.js and React 18
* A gradual migration allows us to maintain functionality while replacing problematic components
* [ ] Confirmed with the user

## 4. Project Task List Foresight

### 4.1. Downstream Impacts

* Migrating to Framer Motion will require changes to all animated components
* Visual appearance should remain largely the same, with potentially improved animation performance
* Component interfaces may need to be adjusted for the new animation library
* [x] Reviewed and confirmed no negative impacts

### 4.2. Future-Proofing Considerations

* Create proper documentation for Framer Motion usage patterns
* Implement common animation pattern components for reuse
* Add safeguards to prevent circular dependencies in future animation implementations
* [x] Discussed with the user and incorporated feedback

## 5. Testing Strategy

### 5.1. Available Testing Options

* `[x] Unit Tests`
    * Location: `src/__tests__/components`
    * Command to run all tests: `pnpm test`
    * Command to run a single test: `pnpm test -- -t "ComponentName"`
    * Relevant Knowledge: Verify components render without errors after migration

* `[x] Visual Regression Tests (Storybook)`
    * Location: `src/shared-components/*/stories`
    * Command to run tests: `pnpm storybook`
    * Relevant Knowledge: Verify animations look and behave correctly after migration

### 5.2. Selected Testing Approach

* Test each component in isolation using Storybook
* Enable one component at a time through feature flags
* Verify visual consistency between React Spring and Framer Motion implementations
* Monitor console for errors during and after migration
* [x] Confirmed testing approach aligns with project standards.

## 6. Migration Strategy

### 6.1. Feature Flag System Implementation

Create a feature flag system to safely toggle between animation libraries:

```typescript
// src/utils/feature-flags.ts
export const ANIMATION_LIBRARY = {
  REACT_SPRING: 'react-spring',
  FRAMER_MOTION: 'framer-motion',
  NONE: 'none'
};

export const ANIMATION_CONFIG = {
  // Start with all components using no animations (safe)
  library: ANIMATION_LIBRARY.NONE,
  // Gradually enable components one by one with Framer Motion
  enabledComponents: [] as string[],
  // Enable per-component debugging
  debugMode: process.env.NODE_ENV !== 'production'
};
```

### 6.2. Common Animation Pattern Mapping

| React Spring Pattern | Framer Motion Equivalent |
|---------------------|--------------------------|
| `useSpring({ from: { opacity: 0 }, to: { opacity: 1 } })` | `<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>` |
| `useTrail(items.length, { ... })` | `<motion.div custom={i} variants={itemVariants}>` |
| `spring.to(val => ...)` | `<motion.div style={{ y }} />` or variants |
| `useChain([ref1, ref2], [0, 0.5])` | Variants with `delayChildren` and `staggerChildren` |

### 6.3. Component Migration Workflow

1. Install Framer Motion: `pnpm add framer-motion`
2. Create pattern adapter components
3. Update styled components to work with Framer Motion
4. Migrate each component, starting with most problematic ones
5. Test in Storybook
6. Enable in main application via feature flags

## 7. MECE Task Breakdown & TDD Plan

### 7.1. Subtask 1: Analyze and Catalog All React Spring Usage
* `[x]` Task completed.
* `[x]` Create a comprehensive list of all files using react-spring, focusing on those using `.get()` or `springToCss`
* `[x]` Categorize each usage by the type of anti-pattern (direct .get() calls, utility function usage, etc.)
* `[x]` Create test cases to verify current behavior and ensure it can be replicated after fixes
* `[x]` Test cases reviewed and approved.
* Relevant Knowledge: React Spring documentation on proper animation usage
* Testing Type: Manual Testing

### 7.2. Subtask 2: Fix Utility Functions in Animation Utils
* `[x]` Task completed.
* `[x]` Refactor `src/utils/animations/typed-components.tsx` to provide animated components instead of the `.get()` approach
* `[x]` Refactor `src/utils/animations/migration-helpers.tsx` to use proper animation handling
* `[x]` Create new utility functions that follow react-spring best practices
* `[x]` Test the utility functions for proper behavior
* `[x]` Test cases reviewed and approved.
* Relevant Knowledge: React Spring documentation on proper hooks and components
* Testing Type: Unit Testing

### 7.3. Subtask 3: Create Animation Best Practices Documentation
* `[x]` Task completed.
* `[x]` Create a document outlining react-spring best practices in `.brain/knowledge/react-spring-guide.md`
* `[x]` Include examples of incorrect usage and their proper alternatives
* `[x]` Document common animation patterns and how to implement them correctly
* `[x]` Test cases reviewed and approved.
* Relevant Knowledge: React Spring official documentation
* Testing Type: Documentation Review

### 7.4. Subtask 4: Fix High-Priority Component Issues
* `[x]` Task completed.
* `[x]` Fix `FeaturePreview` component to use proper animated components and stop using direct `.get()` calls
* `[x]` Verify the component works correctly with animations
* `[x]` Test the component in Storybook to ensure visual consistency
* `[x]` Test cases reviewed and approved.
* Relevant Knowledge: Component-specific knowledge from codebase analysis
* Testing Type: Visual Regression Testing (Storybook)

### 7.5. Subtask 5: Fix Remaining Components in Prioritized Order
* `[x]` Task completed.
* `[x]` Systematically update each component identified in Subtask 1
* `[x]` Verify each component works as expected after changes
* `[x]` Check for any newly revealed issues in other components
* `[x]` Test cases reviewed and approved.
* Relevant Knowledge: Component-specific knowledge from codebase analysis
* Testing Type: Visual Regression Testing (Storybook)

### 7.6. Subtask 6: Setup Framer Motion Migration Infrastructure
* `[x]` Task completed.
* `[x]` Install Framer Motion package
* `[x]` Create feature flag system for toggling animation libraries
* `[x]` Implement SSR-compatible animation utilities
* `[x]` Create animation pattern mapping components
* `[x]` Test cases reviewed and approved.
* Relevant Knowledge: Framer Motion documentation, Next.js SSR compatibility
* Testing Type: Unit Testing

### 7.7. Subtask 7: Migrate Problem Components First
* `[x]` Task completed.
* `[x]` Migrate `ImpactGrid` component to Framer Motion
* `[x]` Migrate `ProblemSolution` component to Framer Motion
* `[x]` Migrate `DebtAnalysis` component to Framer Motion
* `[x]` Test each component in Storybook
* `[x]` Test cases reviewed and approved.
* Relevant Knowledge: Component-specific animation patterns
* Testing Type: Visual Regression Testing (Storybook)

### 7.8. Subtask 8: Systematically Migrate Remaining Components
* `[x]` Task completed.
* `[x]` Create migration inventory with prioritization
* `[x]` Migrate components in order of priority
  * `[x]` Migrate `ComparisonGrid` component
  * `[x]` Migrate `FeaturePreview` component
  * `[x]` Migrate `ChallengeBreakdown` component
  * `[x]` Migrate `QuoteGrid` component
  * `[x]` Migrate `ProcessFlow` component
  * `[x]` Migrate `TeamCard` component
  * `[x]` Migrate `AiSkepticToExpert` component
  * `[x]` Migrate `NavigationCard` component
  * `[x]` Migrate `ReactFlowDiagram` component
* `[x]` Update styled components to work with Framer Motion
* `[x]` Test each component after migration
* `[x]` Test cases reviewed and approved.
* Relevant Knowledge: Component-specific animation patterns
* Testing Type: Visual Regression Testing (Storybook)

### 7.9. Subtask 9: Final Integration Testing
* `[ ]` Task completed.
* `[x]` Enable Framer Motion for all components in the main application
* `[x]` Verify no Maximum Call Stack Size errors occur
* `[ ]` Perform scroll tests to ensure animations trigger correctly
* `[ ]` Verify performance is acceptable with multiple animations
* `[ ]` Test cases reviewed and approved.
* Relevant Knowledge: Full application behavior
* Testing Type: End-to-End Testing

## 8. Migration Implementation Details

### 8.1. Core Animation Components

Create a set of standardized animation components to replace React Spring:

```typescript
// src/utils/animations/framer-patterns.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Fade-in component (replaces useSpring({ opacity }))
export const FadeIn: React.FC<{children: React.ReactNode, delay?: number}> = ({
  children,
  delay = 0
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

// Additional patterns will be implemented as needed
```

### 8.2. SSR Compatibility

Implement server-side rendering compatibility:

```typescript
// src/utils/animations/ssr-safe.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function useSsrSafeAnimation(enabled = true) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return {
    animate: isMounted && enabled ? 'animate' : 'initial',
    shouldAnimate: isMounted && enabled
  };
}
```

### 8.3. Next Steps

1. Start by migrating the `ImpactGrid` component, which has been identified as particularly problematic
2. Implement the feature flag system
3. Gradually enable Framer Motion for additional components
4. Monitor for Maximum Call Stack Size errors throughout the migration 