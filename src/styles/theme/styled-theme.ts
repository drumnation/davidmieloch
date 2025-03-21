import { DefaultTheme } from 'styled-components';
import { breakpoints as responsiveBreakpoints } from './responsive';

// Create a light mode theme for styled-components
export const theme: DefaultTheme = {
  colors: {
    text: {
      primary: '#141517', // Dark text for light mode
      secondary: '#5c5f66',
      light: '#ffffff'
    },
    background: {
      light: '#ffffff',
      dark: '#1A1B1E',
      paper: '#ffffff' // Light background for light mode
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
      yellow: '#F6E05E',
    },
    border: {
      light: '#E2E8F0',
      dark: '#2D3748',
    },
    gradient: 'linear-gradient(135deg, #2196f3 0%, #00bcd4 100%)',
    codeBackground: '#f5f5f5',
    codeBlockBackground: '#2d2d2d',
    blockquoteBackground: '#f8f9fa',
    blockquoteText: '#6c757d',
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
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
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
  breakpoints: responsiveBreakpoints
}; 