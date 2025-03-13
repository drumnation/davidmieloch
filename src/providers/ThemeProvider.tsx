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
  // Default to light mode
  const [colorScheme, setColorScheme] = useState<'dark' | 'light'>('light')

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Check if user has a saved preference
      const savedScheme = localStorage.getItem('color-scheme')
      if (savedScheme === 'light' || savedScheme === 'dark') {
        setColorScheme(savedScheme)
      } else {
        // If no preference, set light mode as default
        localStorage.setItem('color-scheme', 'light')
      }
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

  // On the server or during initial client render, use the default theme
  // This ensures consistent rendering between server and client
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