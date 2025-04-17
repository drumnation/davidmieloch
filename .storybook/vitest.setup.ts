import { beforeAll, vi, expect } from 'vitest';
import { setProjectAnnotations } from '@storybook/react';
import * as previewAnnotations from './preview';

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/mock-path',
  useSearchParams: () => new URLSearchParams('foo=bar'),
  useParams: () => ({}),
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

// Mock Next.js font system
vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'mocked-inter-class',
    style: { fontFamily: 'Inter' },
    variable: '--font-inter',
  }),
  Manrope: () => ({
    className: 'mocked-manrope-class',
    style: { fontFamily: 'Manrope' },
    variable: '--font-manrope',
  }),
  Lexend: () => ({
    className: 'mocked-lexend-class',
    style: { fontFamily: 'Lexend' },
    variable: '--font-lexend',
  }),
  IBM_Plex_Sans: () => ({
    className: 'mocked-ibm-plex-class',
    style: { fontFamily: 'IBM Plex Sans' },
    variable: '--font-ibm-plex',
  }),
  Work_Sans: () => ({
    className: 'mocked-work-sans-class',
    style: { fontFamily: 'Work Sans' },
    variable: '--font-work-sans',
  }),
}));

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