/**
 * This module provides mocks for Mantine components that use Next.js App Router hooks
 * Add this to webpack aliases to catch Mantine imports that use Next.js navigation
 */

// Create a router mock object
const mockRouter = {
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  prefetch: () => Promise.resolve(),
  refresh: () => {},
  back: () => {},
  forward: () => {},
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  basePath: '',
  isReady: true,
  isFallback: false,
  isPreview: false,
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

// Mock hooks for Next.js App Router
const useRouter = () => mockRouter;
const usePathname = () => '/';
const useParams = () => ({});
const useSelectedLayoutSegment = () => null;
const useSelectedLayoutSegments = () => [];
const useSearchParams = () => new URLSearchParams();

// Export for direct use
exports.useRouter = useRouter;
exports.usePathname = usePathname;
exports.useParams = useParams;
exports.useSelectedLayoutSegment = useSelectedLayoutSegment;
exports.useSelectedLayoutSegments = useSelectedLayoutSegments;
exports.useSearchParams = useSearchParams;

// For NextJS Link component mock
exports.Link = ({ href, children, ...props }) => {
  return {
    type: 'a',
    props: {
      ...props,
      href,
      children,
      onClick: (e) => {
        e.preventDefault();
        console.log(`Link clicked: ${href}`);
      }
    }
  };
};

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

// Export as both CommonJS and ESM compatible module
module.exports = {
  useRouter,
  usePathname,
  useParams,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
  useSearchParams,
  Link: exports.Link,
  createMemoryHistory: exports.createMemoryHistory,
  // Add any additional mocks needed for Mantine components
};

// Log that this module was loaded
console.log('Mantine mocks for Next.js navigation loaded'); 