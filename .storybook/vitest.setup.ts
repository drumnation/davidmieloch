import { beforeAll, vi, expect } from 'vitest';
import { setProjectAnnotations } from '@storybook/react';
import * as previewAnnotations from './preview';

// Setup styled-components to use deterministic IDs in tests
if (typeof global !== 'undefined') {
  // Configure styled-components for test mode
  (global as any).SC_DISABLE_SPEEDY = true;
  (global as any).__JEST__ = true;
  
  // Mock window.matchMedia for responsive components
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
  
  // Mock IntersectionObserver for components using it
  class MockIntersectionObserver {
    root = null;
    rootMargin = '';
    thresholds = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
    
    constructor() {
      // Empty constructor
    }
  }
  
  // Assign mock to global
  (global as any).IntersectionObserver = MockIntersectionObserver;
  
  // Mock ResizeObserver for components using it
  class MockResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    
    constructor() {
      // Empty constructor
    }
  }
  
  // Assign mock to global
  (global as any).ResizeObserver = MockResizeObserver;
  
  // Mock DOMMatrix for PDF.js
  class MockDOMMatrix {
    a = 1;
    b = 0;
    c = 0;
    d = 1;
    e = 0;
    f = 0;
    
    constructor() {
      // Empty constructor
    }
  }
  
  // Mock ImageData for PDF.js
  class MockImageData {
    data = new Uint8ClampedArray();
    width = 0;
    height = 0;
    
    constructor() {
      // Empty constructor
    }
  }
  
  // Add missing DOM APIs
  (global as any).DOMMatrix = MockDOMMatrix;
  (global as any).ImageData = MockImageData;
}

// Add custom serializer for strings to normalize styled-component classnames
expect.addSnapshotSerializer({
  test: (val: unknown) => typeof val === 'string',
  print: (val: unknown, _print: any, _indent: any, _options: any, _colors: any) => {
    if (typeof val !== 'string') return String(val);
    
    // Replace all styled-component classes with placeholder
    return val
      .replace(/sc-[a-zA-Z0-9-]+/g, 'sc-MOCK')
      .replace(/(?:class|className)="([^"]*)"/g, (match, classContent) => {
        // Normalize class attribute content
        const normalizedClasses = classContent
          .split(/\s+/)
          .filter(Boolean)
          .map((cls: string) => cls.replace(/sc-[a-zA-Z0-9-]+/g, 'sc-MOCK'))
          .sort()
          .join(' ');
        
        return `class="${normalizedClasses}"`;
      });
  }
});

// Set up Storybook annotations
const annotations = setProjectAnnotations([previewAnnotations]);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);