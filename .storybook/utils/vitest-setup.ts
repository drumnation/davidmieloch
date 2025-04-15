import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { configure } from '@testing-library/react';

// Configure testing-library
configure({
  testIdAttribute: 'data-testid',
});

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock for matchMedia - required for responsive styled-components tests
if (typeof window !== 'undefined') {
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
      addEventListener: function() {},
      removeEventListener: function() {},
      dispatchEvent: function() {
        return false;
      },
    };
  };

  // Mock IntersectionObserver if not already defined
  if (!window.IntersectionObserver) {
    window.IntersectionObserver = class MockIntersectionObserver {
      root: Element | Document | null = null;
      rootMargin = '';
      thresholds: number[] = [];
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn(() => []);
      
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        if (options) {
          this.root = options.root || null;
          this.rootMargin = options.rootMargin || '';
          this.thresholds = Array.isArray(options.threshold) 
            ? options.threshold 
            : [options.threshold || 0];
        }
      }
    };
  }

  // Mock ResizeObserver if not already defined
  if (!window.ResizeObserver) {
    window.ResizeObserver = class MockResizeObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      
      constructor() {
        // Empty constructor
      }
    };
  }
}

// Extend Vitest's expect with @testing-library/jest-dom matchers
// This allows for more intuitive DOM assertions when testing
// Example: expect(element).toBeInTheDocument()
expect.extend({
  // Additional custom matchers could be added here
}); 