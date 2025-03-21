"use client";

import React, { useState, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import '@mantine/core/styles.css';
import { MantineProvider } from './MantineProvider';
import { theme as styledTheme } from '../styles/theme/styled-theme';
import '../styles/globals.css';
import ClientOnly from '../utils/ClientOnly';
import { ThemeContext } from '../contexts/ThemeContext';

// Export the useTheme hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Always start with light mode
  const [colorScheme, setColorScheme] = useState<'dark' | 'light'>('light');
  
  // Toggle function
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  // Always use light theme
  const defaultLightTheme = {
    ...styledTheme,
    colors: {
      ...styledTheme.colors,
    },
  };
  
  // Static content safe for both server and client 
  const content = (
    <StyledThemeProvider theme={defaultLightTheme}>
      <MantineProvider colorScheme="light">
        {children}
      </MantineProvider>
    </StyledThemeProvider>
  );
  
  // Wrap with ClientOnly to prevent hydration mismatch
  return (
    <ThemeContext.Provider value={{ colorScheme: 'light', toggleColorScheme }}>
      <ClientOnly fallback={content}>
        {content}
      </ClientOnly>
    </ThemeContext.Provider>
  );
}; 