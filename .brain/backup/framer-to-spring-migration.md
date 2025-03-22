# Framer Motion to React Spring Migration Plan

## Overview
This document outlines the steps to migrate animated components from Framer Motion to React Spring to ensure compatibility with React 19 and Next.js 15. The migration will be done gradually, component by component, starting with the most critical ones.

## Why Migrate?
- Framer Motion has compatibility issues with React 19
- React Spring offers better performance with physics-based animations
- Improved flexibility with imperative API options
- Better TypeScript support

## Migration Strategy
1. Install React Spring package
2. Create common animation presets to maintain consistency
3. Migrate components one by one, starting with the most critical ones
4. Test animations after each migration
5. Create simple examples for future reference

## Migration Challenges

### Complex Components with Many Animations
For complex components with extensive animations like RealWorldImpact:

1. **Gradual Migration Approach**:
   - First, import and set up React Spring utilities alongside Framer Motion
   - Update styled components to support both libraries
   - Migrate one section/component at a time
   - Test thoroughly after each migration step

2. **TypeScript Integration Challenges**:
   - React Spring has different TypeScript patterns than Framer Motion
   - For complex components, create properly typed utility components
   - Use proper type definitions for animated components

3. **AnimatePresence Replacement**:
   - Replace AnimatePresence with useTransition
   - May require restructuring component hierarchies

4. **Variants Pattern Replacement**:
   - Framer Motion's variants pattern needs complete restructuring
   - Consider creating Spring-specific animation helper functions

## Components to Migrate

### Priority 1: Core UI Components
- [x] Hero (src/shared-components/organisms/Hero/Hero.tsx)
- [✓] Button (src/shared-components/atoms/Button/Button.tsx) - *Using CSS transitions, no migration needed*
- [x] ProcessFlow (src/shared-components/organisms/ProcessFlow/ProcessFlow.tsx)
- [x] TechnicalImplementation (src/shared-components/sections/TechnicalImplementation/TechnicalImplementation.tsx) - *Migration completed, TypeScript issues fixed*

### Priority 2: Content Components
- [x] StatsComparison (src/shared-components/organisms/StatsComparison/StatsComparison.tsx)
- [x] ImpactGrid (src/shared-components/organisms/ImpactGrid/ImpactGrid.tsx) 
- [x] PageTemplate (src/shared-components/templates/PageTemplate/PageTemplate.tsx)
- [ ] RealWorldImpact (src/shared-components/sections/RealWorldImpact/RealWorldImpact.tsx) - Special strategy required

### Priority 3: Less Critical Components
- [x] FeatureGrid (src/shared-components/organisms/FeatureGrid/FeatureGrid.tsx)
- [ ] SideNavigation (src/shared-components/organisms/SideNavigation/SideNavigation.tsx)
- [x] ComparisonGrid (src/shared-components/organisms/ComparisonGrid/ComparisonGrid.tsx)
- [x] ProblemOverview (src/shared-components/organisms/ProblemOverview/ProblemOverview.tsx)
- [x] NavigationCard (src/shared-components/organisms/NavigationCard/NavigationCard.tsx)

## Animation Patterns to Standardize

### 1. Basic Fade In
```jsx
// Framer Motion (before)
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

<motion.div initial="hidden" animate="visible" variants={fadeIn}>
  Content
</motion.div>

// React Spring (after)
const fadeAnimation = useSpring({
  from: { opacity: 0 },
  to: { opacity: 1 },
  config: { duration: 500 }
});

<animated.div style={fadeAnimation}>
  Content
</animated.div>
```

### 2. Fade Up Animation
```jsx
// Framer Motion (before)
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

<motion.div initial="hidden" animate="visible" variants={fadeUp}>
  Content
</motion.div>

// React Spring (after)
const fadeUpAnimation = useSpring({
  from: { opacity: 0, transform: 'translateY(20px)' },
  to: { opacity: 1, transform: 'translateY(0px)' },
  config: { duration: 600 }
});

<animated.div style={fadeUpAnimation}>
  Content
</animated.div>
```

### 3. Staggered Children Animation
```jsx
// Framer Motion (before)
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

<motion.div variants={container} initial="hidden" animate="visible">
  <motion.div variants={item}>Item 1</motion.div>
  <motion.div variants={item}>Item 2</motion.div>
</motion.div>

// React Spring (after)
const containerAnimation = useSpring({
  from: { opacity: 0 },
  to: { opacity: 1 }
});

const itemAnimations = useTrail(2, {
  from: { opacity: 0, transform: 'translateY(20px)' },
  to: { opacity: 1, transform: 'translateY(0px)' },
  config: { tension: 280, friction: 20 }
});

<animated.div style={containerAnimation}>
  <animated.div style={itemAnimations[0]}>Item 1</animated.div>
  <animated.div style={itemAnimations[1]}>Item 2</animated.div>
</animated.div>
```

### 4. Enter/Exit Animations
```jsx
// Framer Motion (before)
const variants = {
  initial: { opacity: 0, height: 0 },
  enter: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 }
};

<AnimatePresence>
  {isVisible && (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>

// React Spring (after)
const transitions = useTransition(isVisible, {
  from: { opacity: 0, height: 0 },
  enter: { opacity: 1, height: 'auto' },
  leave: { opacity: 0, height: 0 },
  config: { tension: 280, friction: 20 }
});

{transitions((style, item) => 
  item && <animated.div style={style}>Content</animated.div>
)}
```

## Special Case: React Spring TypeScript Integration

For components with TypeScript errors when migrating to React Spring:

```tsx
// Create properly typed animated components
import { animated, SpringValue, Interpolation } from '@react-spring/web';

// Basic typed animated div
type AnimatedProps = {
  style?: {
    opacity?: SpringValue<number>;
    transform?: SpringValue<string>;
    // Add other props as needed
  };
  children?: React.ReactNode;
  className?: string;
};

export const AnimatedDiv: React.FC<AnimatedProps> = ({ children, ...props }) => (
  <animated.div {...props}>{children}</animated.div>
);

// For more complex animations with interpolation
type AnimatedDivWithInterpolation = {
  style?: {
    opacity?: SpringValue<number> | Interpolation<number>;
    transform?: SpringValue<string> | Interpolation<string>;
    // Add other props as needed
  };
  children?: React.ReactNode;
  className?: string;
};

export const AnimatedDivWithInterpolation: React.FC<AnimatedDivWithInterpolation> = ({ 
  children, 
  ...props 
}) => (
  <animated.div {...props}>{children}</animated.div>
);
```

## Common Animation Presets

Create a file of reusable animations:

```tsx
// src/utils/animations.ts
import { config } from '@react-spring/web';

export const springPresets = {
  // Standard fade in
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 }
  },
  
  // Fade up animation
  fadeUp: {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { ...config.gentle }
  },
  
  // Bounce effect
  bounce: {
    from: { transform: 'scale(0.9)' },
    to: { transform: 'scale(1)' },
    config: { tension: 300, friction: 10 }
  },
  
  // Slow reveal
  reveal: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 800 }
  }
};
```

## Strategy for Complex Components Like RealWorldImpact

1. **Create Separate Animation File**:
   - Migrate all animation constants to React Spring
   - Keep both Framer and Spring versions temporarily

2. **Update Styled Components**:
   - Import animated from React Spring
   - Create alternate components for gradual migration

3. **Incremental Migration**:
   - Migrate one section at a time
   - For complex sections with many animations, break into smaller components

4. **TypeScript Error Resolution**:
   - Create properly typed animation components 
   - Add types for specific animation properties

## Testing Requirements

1. Verify animations work in:
   - Desktop browsers
   - Mobile browsers
   - Different screen sizes
   
2. Check for:
   - Smooth transitions
   - No flickering or janky movements
   - Consistent timing
   - Proper interaction with scroll-based animations

## Additional Resources

- [React Spring Documentation](https://www.react-spring.dev/)
- [React Spring API Reference](https://www.react-spring.dev/docs/advanced/api)
- [Migration Examples](https://www.react-spring.dev/docs/getting-started/migration-guide)
- [TypeScript Configuration](https://www.react-spring.dev/docs/getting-started/typescript) 