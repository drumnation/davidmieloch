/**
 * This module mocks Next.js internals like navigation hooks
 * Used in .storybook/main.js webpackFinal to mock import of next/navigation
 */

try {
  // Try to import vi from vitest for test environments
  const { vi } = require('vitest');
  
  const mockRouter = {
    push: vi.fn(() => Promise.resolve(true)),
    replace: vi.fn(() => Promise.resolve(true)),
    prefetch: vi.fn(() => Promise.resolve()),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    // Additional router properties
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    // Add router properties needed by Mantine
    routes: [],
    state: {
      location: {
        pathname: '/'
      }
    },
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn()
    }
  };
  
  // Export mock hooks
  exports.useRouter = () => mockRouter;
  exports.usePathname = () => '/';
  exports.useParams = () => ({});
  exports.useSelectedLayoutSegment = () => null;
  exports.useSelectedLayoutSegments = () => [];
  exports.useSearchParams = () => new URLSearchParams();
  
  // Server actions and other navigation functions
  exports.redirect = vi.fn();
  exports.notFound = vi.fn();
  
  // Mock createMemoryHistory for Mantine
  exports.createMemoryHistory = () => ({
    listen: vi.fn(() => vi.fn()),
    createHref: vi.fn((to) => typeof to === 'string' ? to : to.pathname || '/'),
    location: { pathname: '/' },
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  });
  
} catch (e) {
  // Fallback for non-Vitest environments
  const mockRouter = {
    push: () => Promise.resolve(true),
    replace: () => Promise.resolve(true),
    prefetch: () => Promise.resolve(),
    refresh: () => {},
    back: () => {},
    forward: () => {},
    // Additional router properties
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    // Add router properties needed by Mantine
    routes: [],
    state: {
      location: {
        pathname: '/'
      }
    },
    events: {
      on: () => {},
      off: () => {},
      emit: () => {}
    }
  };
  
  // Export mock hooks
  exports.useRouter = () => mockRouter;
  exports.usePathname = () => '/';
  exports.useParams = () => ({});
  exports.useSelectedLayoutSegment = () => null;
  exports.useSelectedLayoutSegments = () => [];
  exports.useSearchParams = () => new URLSearchParams();
  
  // Server actions and other navigation functions
  exports.redirect = () => {};
  exports.notFound = () => {};
  
  // Mock createMemoryHistory for Mantine
  exports.createMemoryHistory = () => ({
    listen: () => () => {},
    createHref: (to) => typeof to === 'string' ? to : to.pathname || '/',
    location: { pathname: '/' },
    push: () => {},
    replace: () => {},
    go: () => {},
    back: () => {},
    forward: () => {},
  });
}

// For deeper imports like next/navigation or next/router
module.exports = {
  useRouter: exports.useRouter,
  usePathname: exports.usePathname,
  useParams: exports.useParams,
  useSelectedLayoutSegment: exports.useSelectedLayoutSegment,
  useSelectedLayoutSegments: exports.useSelectedLayoutSegments,
  useSearchParams: exports.useSearchParams,
  redirect: exports.redirect,
  notFound: exports.notFound,
  createMemoryHistory: exports.createMemoryHistory
}; 