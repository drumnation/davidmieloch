import React, { useEffect } from 'react'
import type { Preview } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { Container } from '@mantine/core'
import mermaid from 'mermaid'
import '@mantine/core/styles.css'
import { theme as styledTheme } from '../src/styles/theme/styled-theme'
import { theme as mantineTheme } from '../src/styles/theme'
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
    `}
  </style>
)

// Mermaid configuration for better readability
const mermaidConfig = {
  startOnLoad: true,
  theme: 'default' as const,
  securityLevel: 'loose' as const,
  fontSize: 16,
  fontFamily: 'Inter, sans-serif',
  flowchart: {
    htmlLabels: true,
    curve: 'basis' as const,
    nodeSpacing: 80,
    rankSpacing: 100,
    padding: 20,
    useMaxWidth: true
  },
  themeVariables: {
    nodeBorder: '2px',
    fontSize: '16px',
    fontFamily: 'Inter, sans-serif',
    mainBkg: '#4a6bff',
    secondaryBkg: '#9c6ade',
    tertiaryBkg: '#f4f4f4',
    primaryTextColor: '#ffffff',
    secondaryTextColor: '#333333',
    lineColor: '#666666',
    clusterBkg: '#f8f9fa',
    clusterBorder: 'rgba(0,0,0,0.2)',
    labelBackground: '#ffffff',
    labelBorder: '#e9ecef',
    edgeLabelBackground: '#ffffff'
  }
} as const;

const MermaidInitializer = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    mermaid.initialize(mermaidConfig);
  }, []);

  return <>{children}</>;
};

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
    (Story) => (
      <StyledThemeProvider theme={styledTheme}>
        <MantineProvider theme={mantineTheme}>
          <MermaidInitializer>
            <GlobalStyles />
            <div className="storybook-container" style={{ minHeight: '100vh', width: '100%' }}>
              <Container size="lg" py="xl">
                <Story />
              </Container>
            </div>
          </MermaidInitializer>
        </MantineProvider>
      </StyledThemeProvider>
    ),
  ],
}

export default preview