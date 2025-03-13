"use client";

import { createContext, useContext, useEffect, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import '@mantine/core/styles.css'
import { MantineProvider } from './MantineProvider'
import { theme as styledTheme } from '../styles/theme/styled-theme'

type ThemeContextType = {
  colorScheme: 'dark' | 'light'
  toggleColorScheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  colorScheme: 'light',
  toggleColorScheme: () => null,
})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to light mode for server-side rendering
  const [colorScheme, setColorScheme] = useState<'dark' | 'light'>('light')

  // This effect will only run on the client
  useEffect(() => {
    // Check if user has a saved preference
    const savedScheme = localStorage.getItem('color-scheme')
    if (savedScheme === 'light' || savedScheme === 'dark') {
      setColorScheme(savedScheme)
    } else {
      // If no preference, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const systemScheme = prefersDark ? 'dark' : 'light'
      setColorScheme(systemScheme)
      localStorage.setItem('color-scheme', systemScheme)
    }
  }, [])

  const toggleColorScheme = () => {
    const newColorScheme = colorScheme === 'dark' ? 'light' : 'dark'
    setColorScheme(newColorScheme)
    if (typeof window !== 'undefined') {
      localStorage.setItem('color-scheme', newColorScheme)
    }
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
        <MantineProvider colorScheme={colorScheme}>
          {children}
        </MantineProvider>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
} 