import React from 'react'
import type { Preview } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { ThemeProvider } from 'styled-components'
import '@mantine/core/styles.css'
import { theme as styledTheme } from '../src/shared-components/theme'

// Add global styles for fonts
import './storybook.css'
import { defaultFont } from '../src/styles/fonts'

// Styled-components theme
const styledComponentsTheme = {
  colors: {
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#0d47a1',
      900: '#002171'
    },
    blue: [
      '#e3f2fd', // lightest
      '#bbdefb',
      '#90caf9',
      '#64b5f6',
      '#42a5f5',
      '#2196f3', // primary
      '#1e88e5',
      '#1976d2',
      '#0d47a1',
      '#002171'  // darkest
    ],
  },
  fonts: {
    default: defaultFont,
  }
};

// Viewport presets for responsive testing
const VIEWPORTS = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '360px',
      height: '640px',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1280px',
      height: '800px',
    },
  },
  wide: {
    name: 'Wide Desktop',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
}

// App shell wrapper for consistent layout testing
const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div 
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        fontFamily: defaultFont,
      }}
      className="storybook-fonts"
    >
      {children}
    </div>
  )
}

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: VIEWPORTS,
      defaultViewport: 'desktop',
    },
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={styledTheme}>
        <MantineProvider>
          <Story />
        </MantineProvider>
      </ThemeProvider>
    ),
  ],
}

export default preview 