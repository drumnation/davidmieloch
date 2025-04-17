/**
 * This module provides a mock for the Header component
 * It resolves the "invariant expected app router to be mounted" error 
 * by intercepting the useRouter hook call in the Header component
 */

const React = require('react');

// Create mock router for the Header component
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
  locale: undefined,
  locales: undefined,
  defaultLocale: undefined,
  isReady: true,
  isFallback: false,
  isPreview: false,
  events: {
    on: () => {},
    off: () => {},
    emit: () => {}
  }
};

// Mock of the Header component that will be used in Storybook
function HeaderMock(props) {
  console.log('🔄 Mock Header rendering with props:', props);
  
  // Return a simple header representation
  return React.createElement(
    'header',
    {
      style: {
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    },
    [
      // Logo/Title section
      React.createElement(
        'div', 
        { key: 'logo', style: { fontWeight: 'bold' } },
        'HEADER'
      ),
      // Navigation links
      React.createElement(
        'nav',
        { key: 'nav', style: { display: 'flex', gap: '1rem' } },
        ['Home', 'About', 'Contact'].map(item => 
          React.createElement(
            'a',
            { 
              key: item, 
              href: '#', 
              style: { textDecoration: 'none', color: '#333' }
            },
            item
          )
        )
      )
    ]
  );
}

// Export the mock Header
exports.default = HeaderMock;
exports.Header = HeaderMock;
module.exports = HeaderMock; 