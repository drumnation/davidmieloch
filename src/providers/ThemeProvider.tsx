"use client";

import React, { useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import '@mantine/core/styles.css';
import '@xyflow/react/dist/style.css';
import '../styles/globals.css';
import { MantineProvider } from './MantineProvider';
import { ThemeContext } from '../contexts/ThemeContext';
import { usePathname } from 'next/navigation';

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
  // Determine color scheme based on route
  const pathname = usePathname();
  // Set dark mode only for homepage, light mode for all other routes
  const colorScheme = pathname === '/' ? 'dark' : 'light';

  // Dummy toggle function (can be implemented later if needed)
  const toggleColorScheme = () => {
    console.warn('toggleColorScheme is not implemented for route-based theme');
  };

  // Apply theme class to body when component mounts or theme changes
  React.useEffect(() => {
    // Remove any existing theme classes
    document.body.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    
    // Add appropriate theme class
    const themeClass = colorScheme === 'dark' ? 'dark-theme' : 'light-theme';
    document.body.classList.add(themeClass);
    document.documentElement.classList.add(themeClass);
    
    // Setting the color-scheme attribute helps browsers with their own dark mode features
    document.documentElement.style.colorScheme = colorScheme;
    
    console.log('[ThemeProvider] Applied theme:', colorScheme);
  }, [colorScheme]);

  return (
    // Use the determined color scheme for context and Mantine
    <ThemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      <StyledThemeProvider theme={theme}>
        {/* Pass determined scheme to MantineProvider */}
        <MantineProvider colorScheme={colorScheme}> 
          {children}
        </MantineProvider>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}; 