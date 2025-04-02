/**
 * EMERGENCY FIX: Complete React Spring Override
 * 
 * This file completely disables react-spring by replacing its core functionality
 * with non-functional stubs that don't trigger any animations or callbacks.
 */
import React from 'react';

// Create mock spring components that render children without animation
const createMockComponent = (tag: string) => {
  return React.forwardRef(({ children, style = {}, ...props }: any, ref) => {
    // Clean the style object of any spring values
    const cleanStyle: Record<string, any> = { ...style };
    
    // Handle any potential spring values in style
    for (const key in cleanStyle) {
      if (
        cleanStyle[key] && 
        typeof cleanStyle[key] === 'object' && 
        (typeof cleanStyle[key].to === 'function' || typeof cleanStyle[key].get === 'function')
      ) {
        // Replace with fixed value
        cleanStyle[key] = 0;
      }
    }
    
    // Create the element with React createElement directly
    return React.createElement(tag, { ...props, style: cleanStyle, ref }, children);
  });
};

// Create mock animated object with all HTML elements
export const animated: any = {};
const tags = [
  'div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p',
  'a', 'ul', 'ol', 'li', 'img', 'button', 'section', 'article',
  'main', 'header', 'footer', 'nav', 'form', 'input', 'label'
];

// Add all HTML tags to animated
tags.forEach(tag => {
  animated[tag] = createMockComponent(tag);
});

// Mock spring hooks with empty implementations
export const useSpring = (config: any) => {
  return {};
};

export const useSprings = (count: number, config: any) => {
  return Array(count).fill({});
};

export const useTrail = (count: number, config: any) => {
  return Array(count).fill({});
};

export const useChain = () => {};

export const useTransition = () => [];

// Mock spring config
export const config = {
  default: {},
  gentle: {},
  wobbly: {},
  stiff: {},
  slow: {},
  molasses: {}
};

// Mock "to" helper
export const to = (...args: any[]) => 0;

// Make sure we don't export default
export default null;

// Mock SpringValue class
export class SpringValue {
  constructor(initialValue: any) {
    // Do nothing
  }
  
  // All methods return fixed values or this for chaining
  get() { return 0; }
  set() { return this; }
  to() { return 0; }
  start() { return Promise.resolve(this); }
  stop() { return this; }
  reset() { return this; }
  finish() { return this; }
  update() { return Promise.resolve(this); }
  
  // Add all standard properties
  value = 0;
  animation = null;
  queue = [];
  defaultProps = {};
  key = '';
  
  // Make sure we're not an observable that can trigger stack overflow
  get idle() { return true; }
}

// Mock Globals
export const Globals = {
  assign: () => {},
  get: () => ({}),
  skipAnimation: true,
}; 