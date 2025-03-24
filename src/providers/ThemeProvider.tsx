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

const theme = {
  colors: {
    text: {
      primary: '#141517',
      secondary: '#5c5f66',
      light: '#ffffff'
    },
    background: {
      light: '#ffffff',
      dark: '#1A1B1E',
      paper: '#ffffff'
    },
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2'
    },
    secondary: {
      main: '#00bcd4',
      light: '#4dd0e1',
      dark: '#0097a7'
    },
    accent: {
      light: '#EBF8FF',
      dark: '#2D3748',
      red: '#E53E3E',
      green: '#38A169',
      blue: '#3182CE',
      yellow: '#F6E05E'
    },
    border: {
      light: '#E2E8F0',
      dark: '#2D3748'
    },
    gradient: 'linear-gradient(135deg, #2196f3 0%, #00bcd4 100%)',
    codeBackground: '#f5f5f5',
    codeBlockBackground: '#2d2d2d',
    blockquoteBackground: '#f8f9fa',
    blockquoteText: '#6c757d'
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
    card: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
    elevation1: '0 2px 4px rgba(0, 0, 0, 0.05)',
    elevation2: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem'
  },
  fonts: {
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  transitions: {
    default: '0.2s ease',
    fast: '0.1s ease',
    slow: '0.3s ease'
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px'
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    <StyledThemeProvider theme={theme}>
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