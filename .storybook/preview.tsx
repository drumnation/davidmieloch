import React from 'react'
import type { Preview } from '@storybook/react'
import { MantineProvider } from '@mantine/core'
import { ThemeProvider } from 'styled-components'
import '@mantine/core/styles.css'
import { theme as styledTheme } from '../src/styles/theme/styled-theme'
import { viewports } from '../src/styles/theme/viewports'

// Add global styles for fonts
import './storybook.css'

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