import React from 'react'
import type { Preview } from '@storybook/react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { theme as styledTheme } from '../src/styles/theme/styled-theme'
import { viewports } from '../src/styles/theme/viewports'
import { ThemeProvider } from 'styled-components'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import { GlobalStyle } from '../src/theme/GlobalStyle'
import { themes } from '../src/theme/theme'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../src/lib/react-query'
import { RootLayoutClient } from '../src/app/RootLayoutClient'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

// Add global styles for fonts
import './storybook.css'
import '../src/styles/globals.css'

// Import our page structure decorators
import {
  brainGardenPageDecorator,
  technicalImplementationDecorator,
  aiIntegrationDecorator,
  genericPageDecorator
} from '../src/components/diagrams/.storybook/decorators/PageStructureDecorator';

// Import our custom decorators
import { ReactFlowDecorator } from './decorators';

// Helper function to parse numeric prefixes
const getNumericPrefix = (title: string): number => {
  const match = title.match(/^(\d+)-/)
  return match ? parseInt(match[1], 10) : 999
}

// Add CSS variables for the Hero component
const GlobalStyles = () => (
  <style>
    {`
      :root {
        --bg-gradient: ${styledTheme.colors.gradient};
        --bg-light: ${styledTheme.colors.background.light};
        --bg-dark: ${styledTheme.colors.background.dark};
        --text-light: ${styledTheme.colors.text.light};
        --text-primary: ${styledTheme.colors.text.primary};
        --primary-blue: ${styledTheme.colors.primary.main};
        --accent-blue: ${styledTheme.colors.accent.blue};
        --accent-red: ${styledTheme.colors.accent.red};
        --accent-green: ${styledTheme.colors.accent.green};
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
    `}
  </style>
)

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
    // Main theme decorator
    (Story) => (
      <StyledThemeProvider theme={styledTheme}>
        <GlobalStyles />
        <div className="storybook-container" style={{ minHeight: '100vh', width: '100%' }}>
          <MantineProvider>
            <Story />
          </MantineProvider>
        </div>
      </StyledThemeProvider>
    ),
    // Apply React Flow decorator to all Diagram stories
    (Story, context) => {
      // Apply React Flow decorator for all diagram stories
      if (context.kind.includes('Diagrams/')) {
        return ReactFlowDecorator(Story);
      }
      return <Story />;
    },
    // Apply page structure decorator based on selection
    (Story, context) => {
      // Apply the appropriate page structure decorator based on the selection
      const pageStructure = context.globals.pageStructure;
      
      switch (pageStructure) {
        case 'garden':
          return brainGardenPageDecorator(Story);
        case 'technical':
          return technicalImplementationDecorator(Story);
        case 'integration':
          return aiIntegrationDecorator(Story);
        case 'generic':
          return genericPageDecorator(Story);
        default:
          return <Story />;
      }
    },
  ],
}

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