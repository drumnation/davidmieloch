# React Spring Best Practices Guide
# Last Updated: 2023-06-01

## Common Anti-Patterns to Avoid

### Direct Access to Spring Values with `.get()`

The most significant anti-pattern causing infinite recursion errors is directly accessing spring values using `.get()` in render methods:

```tsx
// ❌ BAD: Causes infinite recursion
const Component = () => {
  const springProps = useSpring({ opacity: 1, y: 0 });
  
  // Anti-pattern: directly accessing spring values
  return (
    <div style={{ 
      opacity: springProps.opacity.get(),
      transform: `translateY(${springProps.y.get()}px)`
    }}>
      Content
    </div>
  );
};
```

**Why this causes infinite recursion:**
1. Calling `.get()` triggers the `eventObserved` method
2. This updates the component state
3. Component re-renders
4. `.get()` is called again
5. The cycle repeats indefinitely

### Using Utility Functions That Call `.get()`

Another common anti-pattern is encapsulating the `.get()` calls in utility functions like `springToCss`:

```tsx
// ❌ BAD: Still causes infinite recursion
const springToCss = (springStyles) => {
  const cssStyles = {};
  Object.entries(springStyles).forEach(([key, value]) => {
    if (typeof value === 'object' && 'get' in value) {
      cssStyles[key] = value.get(); // Still problematic
    } else {
      cssStyles[key] = value;
    }
  });
  return cssStyles;
};

// Usage that still causes problems
<div style={springToCss(springStyles)}>{children}</div>
```

## Proper React Spring Implementation Patterns

### Use Animated Components Directly

The correct approach is to use react-spring's `animated` components and apply spring values directly:

```tsx
// ✅ GOOD: Uses animated components properly
import { animated, useSpring } from '@react-spring/web';

const Component = () => {
  const springProps = useSpring({ 
    opacity: 1, 
    y: 0,
    from: { opacity: 0, y: 20 } 
  });
  
  return (
    <animated.div 
      style={{ 
        opacity: springProps.opacity, // No .get() call here
        transform: springProps.y.to(y => `translateY(${y}px)`) // Use .to() for transformations
      }}
    >
      Content
    </animated.div>
  );
};
```

### Use the `.to()` Method for Complex Transforms

For complex transformations, use the `.to()` method:

```tsx
// ✅ GOOD: Uses .to() for complex transforms
return (
  <animated.div
    style={{
      transform: springProps.y.to(
        (y) => `translateY(${y}px)`
      ),
    }}
  >
    Content
  </animated.div>
);
```

### Combine Multiple Transform Properties

When you need to combine multiple transform properties:

```tsx
// ✅ GOOD: Combines multiple transforms
const springProps = useSpring({
  scale: 1,
  rotate: 0,
  y: 0,
  from: { scale: 0.8, rotate: -10, y: 20 }
});

return (
  <animated.div
    style={{
      transform: to(
        [springProps.scale, springProps.rotate, springProps.y],
        (scale, rotate, y) => 
          `scale(${scale}) rotate(${rotate}deg) translateY(${y}px)`
      ),
    }}
  >
    Content
  </animated.div>
);
```

### Using Animated Components with Styled Components

When using Styled Components, create animated versions of your styled components:

```tsx
// ✅ GOOD: Animating styled components
import styled from 'styled-components';
import { animated } from '@react-spring/web';

// Create animated version of a styled component
const AnimatedContainer = animated(styled.div`
  padding: 2rem;
  background: #fff;
`);

// Usage
const Component = () => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  
  return <AnimatedContainer style={props}>Content</AnimatedContainer>;
};
```

## Using React Spring with Intersection Observer

A common pattern is to trigger animations when elements come into view:

```tsx
// ✅ GOOD: Trigger animation on scroll with intersection observer
import { useInView } from 'react-intersection-observer';
import { animated, useSpring } from '@react-spring/web';

const Component = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const springProps = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 20,
    config: { tension: 280, friction: 60 }
  });
  
  return (
    <animated.div 
      ref={ref}
      style={{
        opacity: springProps.opacity,
        transform: springProps.y.to(y => `translateY(${y}px)`)
      }}
    >
      Content
    </animated.div>
  );
};
```

## Debugging React Spring Issues

If you encounter Maximum Call Stack Size Exceeded errors:

1. Look for any direct `.get()` calls in your render functions
2. Check for utility functions like `springToCss` that may be calling `.get()` internally
3. Ensure you're using proper `animated` components
4. Verify that you're applying spring values directly to the style props without accessing them imperatively
5. Use React DevTools to check for excessive re-renders

## Isolating React Spring Issues in Large Applications

If you're encountering Maximum Call Stack Size Exceeded errors in a large application and can't easily find the source:

### 1. Add Console Tracing to Deprecated Functions

Add `console.trace()` to any utility functions that use `.get()` to identify what's calling them:

```tsx
export const springToCss = (springStyles) => {
  console.warn('[DEPRECATED] springToCss causes infinite recursion issues');
  console.trace('springToCss called from:'); // Trace where it's called from
  
  // Rest of function...
}
```

### 2. Code Splitting / Binary Search Approach

Disable sections of your application to isolate where the error is occurring:

```jsx
{/* Comment out different sections to identify the problem area */}
{false && <ProblemComponent {...props} />}
{true && <WorkingComponent {...props} />}
```

### 3. Check for Syntax Errors in Transform Functions

Ensure all your transform functions have proper syntax:

```jsx
// ❌ INCORRECT:
transform: springProps.y.to(y => `translateY(${y}px`) // Missing closing )

// ✅ CORRECT:
transform: springProps.y.to(y => `translateY(${y}px)`)
```

### 4. Create Isolated Tests in Storybook

Create Storybook stories that isolate suspect components with minimal props to see if they cause errors in isolation.

### 5. Create a Debug Component

Create a debug component that wraps suspected components with error handling:

```jsx
const DebugAnimationWrapper = ({ component: Component, props, label }) => {
  console.log(`Rendering ${label}`);
  try {
    return <Component {...props} />
  } catch (e) {
    console.error(`Error in ${label}:`, e);
    return <div>Error in {label}</div>;
  }
};

// Usage:
<DebugAnimationWrapper 
  component={ProblematicComponent} 
  props={props} 
  label="ProblematicComponent" 
/>
```

## Performance Tips

1. Use the `config` parameter to adjust animation physics
2. Set `immediate: true` to skip animations when needed
3. Use `useTransition` for mount/unmount animations
4. Consider using `useTrail` for staggered animations of multiple elements
5. For lists, ensure proper `key` usage to prevent unnecessary re-animations 