/**
 * This module provides specific mocks for router-related functionality
 * Used to solve Mantine integration issues with Storybook
 */

// Create mock routes array that Mantine's createRouter expects
const mockRoutes = [
  {
    path: '/',
    element: null,
    id: 'root',
    children: [
      { path: '', element: null, id: 'home' },
      { path: 'about', element: null, id: 'about' },
      { path: 'contact', element: null, id: 'contact' }
    ]
  }
];

// Mock for DataRouterContext
const dataRouterContext = {
  router: {
    basename: '',
    state: {
      location: {
        pathname: '/',
        search: '',
        hash: '',
        state: null,
        key: 'default'
      },
      matches: [
        {
          params: {},
          pathname: '/',
          pathnameBase: '/',
          route: {
            id: 'root',
            path: '/'
          }
        }
      ],
      initialized: true,
      navigation: { state: 'idle' }
    },
    routes: mockRoutes,
    future: {},
    navigate: () => {},
    createHref: (to) => typeof to === 'string' ? to : to.pathname || '/'
  }
};

// Mock for locationContext
const locationContext = {
  location: {
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: 'default'
  },
  navigationType: 'POP'
};

// Mock createRouter function with comprehensive implementation
exports.createRouter = () => {
  return {
    routes: mockRoutes,
    basename: '',
    state: {
      location: {
        pathname: '/',
        search: '',
        hash: '',
        state: null,
        key: 'default'
      },
      initialized: true,
      navigation: { state: 'idle' },
      matches: [
        {
          params: {},
          pathname: '/',
          pathnameBase: '/',
          route: {
            id: 'root',
            path: '/'
          }
        }
      ]
    },
    future: {},
    navigate: () => {},
    createHref: (to) => typeof to === 'string' ? to : to.pathname || '/',
    // Ensure forEach works on routes
    flattenedRoutes: [
      { id: 'root', path: '/' },
      { id: 'home', path: '' },
      { id: 'about', path: 'about' },
      { id: 'contact', path: 'contact' }
    ]
  };
};

// Mock createBrowserRouter function
exports.createBrowserRouter = (routes = []) => {
  // Ensure routes has a default value that's iterable
  const routesToUse = routes.length ? routes : mockRoutes;
  
  // Create a flattened array of all routes for forEach operations
  const flattenedRoutes = [];
  const flattenRoutes = (routeArray) => {
    routeArray.forEach(route => {
      flattenedRoutes.push({ id: route.id, path: route.path });
      if (route.children && route.children.length) {
        flattenRoutes(route.children);
      }
    });
  };
  flattenRoutes(routesToUse);

  return {
    routes: routesToUse,
    basename: '',
    state: {
      location: {
        pathname: '/',
        search: '',
        hash: '',
        state: null,
        key: 'default'
      },
      initialized: true,
      navigation: { state: 'idle' },
      matches: [
        {
          params: {},
          pathname: '/',
          pathnameBase: '/',
          route: {
            id: 'root',
            path: '/'
          }
        }
      ]
    },
    future: {},
    navigate: () => {},
    createHref: (to) => typeof to === 'string' ? to : to.pathname || '/',
    // Ensure forEach works on routes
    flattenedRoutes
  };
};

// Mirror the same functionality for memory router
exports.createMemoryRouter = exports.createBrowserRouter;

// Export a router instance for direct use
exports.router = exports.createRouter();

// Export context providers
exports.DataRouterContext = {
  Provider: ({ children }) => children,
  Consumer: ({ children }) => children(dataRouterContext)
};

exports.LocationContext = {
  Provider: ({ children }) => children,
  Consumer: ({ children }) => children(locationContext)
};

// Export as module
module.exports = {
  createRouter: exports.createRouter,
  createBrowserRouter: exports.createBrowserRouter,
  createMemoryRouter: exports.createMemoryRouter,
  router: exports.router,
  DataRouterContext: exports.DataRouterContext,
  LocationContext: exports.LocationContext
}; 