# React Spring Domain Knowledge

## Overview

This document captures critical knowledge about React Spring, common anti-patterns leading to Maximum Call Stack Size Exceeded errors, and best practices for animation implementation in our application.

## Anti-Patterns Identified

### Direct Spring Value Access

The most significant anti-pattern causing infinite recursion errors is directly accessing spring values using `.get()` in render methods:

```tsx
// ❌ PROBLEMATIC CODE
const springToCss = (springObj: any) => {
  const result = {};
  if (springObj.opacity) {
    result.opacity = springObj.opacity.get(); // This causes infinite recursion
  }
  return result;
};

return <div style={springToCss(animationSpring)}>{children}</div>;
```

This creates a circular dependency where:
1. Calling `.get()` triggers the `eventObserved` method
2. This updates the animation priority
3. Which triggers additional observer notifications
4. Leading to an infinite recursion cycle

### Utility Functions Causing Recursion

We identified utility functions that encapsulate this anti-pattern:
- `src/utils/animations/typed-components.tsx` - `springToCss` function
- `src/utils/animations/migration-helpers.tsx` - `springToCss` function
- Inline implementations in various components

### Proper React Spring Usage

The correct approach is to use animated components and apply spring values directly:

```tsx
// ✅ CORRECT PATTERN
import { animated } from '@react-spring/web';

// Create animated version of component
const AnimatedDiv = animated.div;

// Apply spring values directly
return (
  <AnimatedDiv style={animationSpring}>
    {children}
  </AnimatedDiv>
);
```

For transform properties, use the `.to()` method for interpolation:

```tsx
// ✅ CORRECT TRANSFORM HANDLING
<AnimatedDiv 
  style={{
    ...springValues,
    transform: springValues.y.to(y => `translateY(${y}px)`)
  }}
>
  {children}
</AnimatedDiv>
```

## Implementation Guide

### 1. Converting Utility Functions

Replace utility functions like `springToCss` with proper animated components:

```tsx
// ❌ BEFORE
export const springToCss = (springStyles) => {
  if (!springStyles) return {};
  
  const cssStyles = {};
  Object.entries(springStyles).forEach(([key, value]) => {
    if (typeof value === 'object' && 'get' in value) {
      cssStyles[key] = value.get();
    }
  });
  
  return cssStyles;
};

// Component usage
<div style={springToCss(springStyles)}>{children}</div>

// ✅ AFTER
export const AnimatedDiv = animated.div;

// Component usage
<AnimatedDiv style={springStyles}>{children}</AnimatedDiv>
```

### 2. Handling Transform Properties

For transform properties, use the `.to()` method:

```tsx
// ❌ BEFORE
if (springObj.y) {
  result.transform = `translateY(${springObj.y.get()}px)`;
}

// ✅ AFTER
<AnimatedDiv 
  style={{ 
    ...springObj,
    transform: springObj.y.to(y => `translateY(${y}px)`)
  }} 
/>
```

### 3. Working with Multiple Transforms

Combine multiple transforms using interpolation:

```tsx
// ✅ MULTIPLE TRANSFORMS
<AnimatedDiv 
  style={{ 
    ...springObj,
    transform: to(
      [springObj.x, springObj.y, springObj.scale], 
      (x, y, s) => `translateX(${x}px) translateY(${y}px) scale(${s})`
    )
  }} 
/>
```

## Testing Guidelines

### Visual Testing

For each component fix:
1. Check animations work with proper timing and easing
2. Verify that animations trigger correctly (on scroll, on hover, etc.)
3. Ensure no visual regression compared to the original implementation

### Console Error Testing

For each fix:
1. Open browser console
2. Scroll/interact with the component
3. Verify no "Maximum call stack size exceeded" errors appear
4. Check for other related errors

## Component Migration Checklist

For each component requiring fixes:

- [ ] Identify all spring animations in the component
- [ ] Add necessary imports from `@react-spring/web`
- [ ] Create animated versions of styled components if needed
- [ ] Replace any `springToCss` or direct `.get()` calls
- [ ] Test the component visually
- [ ] Verify no console errors occur

## <TO_FILL> Additional Discoveries During Implementation

This section will be filled as we discover more patterns during the implementation phase.

## <TO_FILL> Lessons Learned

This section will capture important lessons and insights after completing the react-spring fixes. 