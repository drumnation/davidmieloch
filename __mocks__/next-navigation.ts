import { vi } from 'vitest';

// Create a shared router instance
const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn(),
  pathname: '/mock-path',
  // App Router specific properties
  basePath: '',
  appPaths: [],
  route: '/',
  asPath: '/mock-path',
  query: {},
  isFallback: false,
  isReady: true,
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn()
  }
};

// Helper to create URL objects
const createUrlObject = (path: string = '/mock-path') => {
  const url = new URL(`http://localhost${path}`);
  return {
    ...url,
    toString: () => url.toString(),
    toJSON: () => url.toString(),
    origin: url.origin,
    protocol: url.protocol,
    hostname: url.hostname,
    pathname: url.pathname,
    search: url.search,
    hash: url.hash
  };
};

// Hooks
export const useRouter = () => mockRouter;
export const usePathname = () => '/mock-path';
export const useSearchParams = () => new URLSearchParams('foo=bar');
export const useParams = () => ({});

// Specialized context hooks
export const useSelectedLayoutSegment = () => null;
export const useSelectedLayoutSegments = () => [];
export const useIsomorphicLayoutEffect = (cb: () => void) => { cb(); };
export const useFormStatus = () => ({ pending: false });
export const useFormState = <T>(fn: any, initialState: T) => [initialState, vi.fn()];

// Navigation actions
export const redirect = vi.fn();
export const notFound = vi.fn();
export const revalidatePath = vi.fn();
export const revalidateTag = vi.fn();
export const permanentRedirect = vi.fn();

// URL utilities
export const headers = vi.fn().mockReturnValue(new Headers());
export const cookies = vi.fn().mockReturnValue({
  get: vi.fn(),
  getAll: vi.fn().mockReturnValue([]),
  set: vi.fn(),
  delete: vi.fn(),
  has: vi.fn().mockReturnValue(false),
  clear: vi.fn()
});

// App Router only functions
export const createSearchParams = (init?: any) => new URLSearchParams(init);
export const useNavigation = () => ({ 
  state: 'idle', 
  location: null, 
  formMethod: undefined, 
  formAction: undefined, 
  formData: undefined 
});

// Handle context creation
export function createRouter() {
  return {
    basePath: '',
    pathname: '/mock-path',
    route: '/',
    query: {},
    asPath: '/mock-path',
    push: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn()
    },
    isFallback: false,
    isReady: true,
    isPreview: false,
    // Critical for forEach operation
    routes: [{ pathname: '/mock-path', query: {}, name: 'mock-route' }]
  };
}

// Default export for dynamic imports
export default {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
  createSearchParams,
  redirect,
  notFound,
  headers,
  cookies,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
  useNavigation,
  useFormStatus,
  useFormState,
  revalidatePath,
  revalidateTag,
  permanentRedirect,
  createRouter
}; 