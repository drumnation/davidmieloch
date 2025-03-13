import React from 'react'
import type { Preview } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { Container } from '@mantine/core'
import '@mantine/core/styles.css'
import { theme as styledTheme } from '../src/styles/theme/styled-theme'
import { theme as mantineTheme } from '../src/styles/theme'
import { viewports } from '../src/styles/theme/viewports'

// Add global styles for fonts
import './storybook.css'
import '../src/styles/globals.css'

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
    // Add storySort parameter to sort stories numerically
    storySort: {
      method: 'numeric',
      order: ['Sections', ['01-*', '02-*', '03-*', '04-*', '05-*', '06-*', '07-*', '08-*', '09-*', '10-*', '*'], '*'],
      locales: 'en-US',
    },
  },
  decorators: [
    (Story) => (
      <StyledThemeProvider theme={styledTheme}>
        <MantineProvider theme={mantineTheme}>
          <GlobalStyles />
          <div className="storybook-container" style={{ minHeight: '100vh', width: '100%' }}>
            <Container size="lg" py="xl">
              <Story />
            </Container>
          </div>
        </MantineProvider>
      </StyledThemeProvider>
    ),
  ],
}

export default preview