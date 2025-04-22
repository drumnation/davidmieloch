import React from 'react'
import type { Preview } from '@storybook/react'
import { viewports } from '../src/styles/theme/viewports'
import { MantineProvider } from '@mantine/core'
import { theme as mantineTheme } from '../src/styles/theme'
import '@mantine/core/styles.css'
import { ReactFlowProvider } from 'reactflow'
import 'reactflow/dist/style.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Add global styles for fonts
import './storybook.css'
import '../src/styles/globals.css'

// Import our page structure decorators
import {
  brainGardenPageDecorator,
  technicalImplementationDecorator,
  aiIntegrationDecorator,
  genericPageDecorator
} from '../src/components/Diagrams/.storybook/decorators/PageStructureDecorator';

// Import App Router safety wrapper
import { withAppRouterSafety } from './decorators/AppRouterSafetyWrapper';

// Create a new QueryClient instance for each story
const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
  },
});

// Add CSS variables for the Hero component
const GlobalStyles = () => (
  <style>
    {`
      :root {
        --bg-gradient: linear-gradient(45deg, #1a1b1e, #2c2e33);
        --bg-light: #ffffff;
        --bg-dark: #1a1b1e;
        --text-light: #ffffff;
        --text-primary: #1a1b1e;
        --primary-blue: #228be6;
        --accent-blue: #4dabf7;
        --accent-red: #fa5252;
        --accent-green: #40c057;
      }

      /* Add icon-specific styles */
      .icon-wrapper {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .icon-wrapper svg {
        width: 100%;
        height: 100%;
      }

      /* Add React Flow specific styles */
      .react-flow__container {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }

      .react-flow__node {
        cursor: default;
      }
    `}
  </style>
)

// Main decorator that wraps all providers
const MainDecorator = (Story: React.ComponentType) => {
  const queryClient = React.useMemo(() => createQueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={mantineTheme}>
        <ReactFlowProvider>
          <GlobalStyles />
          <div className="storybook-container" style={{ minHeight: '100vh', width: '100%' }}>
            <Story />
          </div>
        </ReactFlowProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

// Create a context-aware decorator that ensures consistent styling
const preview: Preview = {
  parameters: {
    viewport: {
      viewports,
      defaultViewport: 'desktop',
    },
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      autodocs: false,
      disabled: true
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['01-', '02-', '03-', '04-', '05-', '*'],
        includeNames: true,
        locales: 'en-US',
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'garden-light-green', value: '#f0fff4' },
        { name: 'technical-light-blue', value: 'rgba(74, 158, 255, 0.05)' },
      ],
    },
  },
  decorators: [
    // App Router safety wrapper to prevent crashes
    withAppRouterSafety,
    // Main theme decorator with all providers
    MainDecorator,
    // Apply React Flow decorator to all Diagram stories
    (Story, context) => {
      if (context.kind.includes('Diagrams/')) {
        return (
          <div style={{ height: '100%', width: '100%', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
            <Story />
          </div>
        );
      }
      return <Story />;
    },
    // Apply page structure decorator based on selection
    (Story, context) => {
      const pageStructure = context.globals.pageStructure;

      switch (pageStructure) {
        // case 'garden':
        //   return brainGardenPageDecorator(Story);
        // case 'technical':
        //   return technicalImplementationDecorator(Story);
        // case 'integration':
        //   return aiIntegrationDecorator(Story);
        // case 'generic':
        //   return genericPageDecorator(Story);
        default:
          return <Story />;
      }
    },
  ],
};

// Add global decorators that can be used in stories
export const globalTypes = {
  pageStructure: {
    name: 'Page Structure',
    description: 'Structure of the page where the diagram is used',
    defaultValue: 'none',
    toolbar: {
      icon: 'browser',
      items: [
        { value: 'none', title: 'None' },
        { value: 'garden', title: 'Brain Garden Overview' },
        { value: 'technical', title: 'Technical Implementation' },
        { value: 'integration', title: 'AI Integration Process' },
        { value: 'generic', title: 'Generic Page' },
      ],
    },
  },
};

export default preview