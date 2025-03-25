import React from 'react'
import type { Preview } from '@storybook/react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { theme as styledTheme } from '../src/styles/theme/styled-theme'
import { viewports } from '../src/styles/theme/viewports'

// Add global styles for fonts
import './storybook.css'
import '../src/styles/globals.css'

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
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['01-', '02-', '03-', '04-', '05-', '*'],
        includeNames: true,
        locales: 'en-US',
      },
    },
  },
  decorators: [
    // Main theme decorator
    (Story) => (
      <StyledThemeProvider theme={styledTheme}>
        <GlobalStyles />
        <div className="storybook-container" style={{ minHeight: '100vh', width: '100%' }}>
          <Story />
        </div>
      </StyledThemeProvider>
    ),
  ],
}

export default preview