"use client";

import { createContext, useContext, useEffect, useState } from 'react'
import { MantineProvider } from '@mantine/core'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import '@mantine/core/styles.css'
import { theme as mantineTheme } from '../styles/theme'
import { theme as styledTheme } from '../styles/theme/styled-theme'

type ThemeContextType = {
  colorScheme: 'dark' | 'light'
  toggleColorScheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  colorScheme: 'dark',
  toggleColorScheme: () => null,
})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to dark mode
  const [colorScheme, setColorScheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    // Check if user has a saved preference
    const savedScheme = localStorage.getItem('color-scheme')
    if (savedScheme === 'light' || savedScheme === 'dark') {
      setColorScheme(savedScheme)
    } else {
      // If no preference, set dark mode as default
      localStorage.setItem('color-scheme', 'dark')
    }
  }, [])

  const toggleColorScheme = () => {
    const newColorScheme = colorScheme === 'dark' ? 'light' : 'dark'
    setColorScheme(newColorScheme)
    localStorage.setItem('color-scheme', newColorScheme)
  }

  // Adjust styled-components theme based on color scheme
  const currentStyledTheme = {
    ...styledTheme,
    colors: {
      ...styledTheme.colors,
      text: {
        ...styledTheme.colors.text,
        primary: colorScheme === 'dark' ? '#ffffff' : '#141517',
        secondary: colorScheme === 'dark' ? '#A6A7AB' : '#5c5f66',
      },
      background: {
        ...styledTheme.colors.background,
        paper: colorScheme === 'dark' ? '#25262b' : '#ffffff',
      },
    },
  }

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      <StyledThemeProvider theme={currentStyledTheme}>
        <MantineProvider 
          theme={mantineTheme} 
          forceColorScheme={colorScheme}
        >
          {children}
        </MantineProvider>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
} 