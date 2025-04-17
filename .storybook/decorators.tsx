import React from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { ReactFlowProvider } from 'reactflow';
import { StoryFn } from '@storybook/react';

// Mock Next.js router
const mockRouter = {
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  reload: () => {},
  back: () => {},
  prefetch: () => Promise.resolve(),
  beforePopState: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
};

// Create a theme for Mantine
const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    blue: [
      '#e6f7ff',
      '#bae7ff',
      '#91d5ff',
      '#69c0ff',
      '#40a9ff',
      '#1890ff',
      '#096dd9',
      '#0050b3',
      '#003a8c',
      '#002766',
    ],
  },
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  defaultRadius: 'md',
});

// Create a Next.js router context
export const RouterContext = React.createContext(mockRouter);

// Mock Next.js App Router context and hooks
// This creates a context to mock the App Router APIs
export const AppRouterContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  push: (_: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  replace: (_: string) => {},
  refresh: () => {},
  back: () => {},
  forward: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  prefetch: (_: string) => Promise.resolve(),
});

// Decorator for Next.js pages
export const withNextRouter = (StoryFn: React.ComponentType) => {
  return (
    <RouterContext.Provider value={mockRouter}>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <StoryFn />
      </MantineProvider>
    </RouterContext.Provider>
  );
};

export const ReactFlowDecorator = (Story: StoryFn) => (
  <ReactFlowProvider>
    <div style={{ 
      height: '100%', 
      width: '100%',
      minHeight: '500px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Story />
    </div>
  </ReactFlowProvider>
); 