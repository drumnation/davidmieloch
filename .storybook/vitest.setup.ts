import { beforeAll, vi } from 'vitest';
import { setProjectAnnotations } from '@storybook/react';
import * as previewAnnotations from './preview';

// Setup DOM environment for testing
if (typeof global !== 'undefined') {
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
  }
  
  // Assign mocks to the global object
  // @ts-expect-error assigning mock implementation
  (global as any).IntersectionObserver = MockIntersectionObserver;
  
  // Mock ResizeObserver for components using it
  class MockResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    
    constructor( ) {
      // Nothing to do with the callback in the mock
    }
  }
  
  // Assign mocks to the global object
  // @ts-expect-error assigning mock implementation
  (global as any).ResizeObserver = MockResizeObserver;
  
  // Mock DOMMatrix for PDF.js
  class MockDOMMatrix {
    a = 1;
    b = 0;
    c = 0;
    d = 1;
    e = 0;
    f = 0;
    constructor(transform?: string) {
      if (transform) {
        // Simple implementation - we're just mocking
        const values = transform.match(/matrix\((.*)\)/)?.[1]?.split(',').map(Number) || [];
        if (values.length === 6) {
          [this.a, this.b, this.c, this.d, this.e, this.f] = values;
        }
      }
    }
  }
  
  // Mock ImageData for PDF.js
  class MockImageData {
    data: Uint8ClampedArray;
    width: number;
    height: number;
    constructor(data: Uint8ClampedArray, width: number, height: number) {
      this.data = data;
      this.width = width;
      this.height = height;
    }
  }
  
  // Add missing DOM APIs needed by PDF.js
  // @ts-expect-error assigning mock implementation
  (global as any).DOMMatrix = MockDOMMatrix;
  // @ts-expect-error assigning mock implementation
  (global as any).ImageData = MockImageData;
}

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const annotations = setProjectAnnotations([previewAnnotations]);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);