import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    text: {
      primary: '#2D3748',
      secondary: '#4A5568',
      light: '#EDF2F7',
    },
    background: {
      light: '#FFFFFF',
      dark: '#1A202C',
      paper: '#F8FAFC',
    },
    primary: {
      main: '#0066FF',
      light: '#3385FF',
      dark: '#0047B3',
    },
    secondary: {
      main: '#6B46C1',
      light: '#8662D1',
      dark: '#4C3187',
    },
    accent: {
      light: '#EBF8FF',
      dark: '#2C5282',
      red: '#E53E3E',
      green: '#38A169',
      blue: '#3182CE',
    },
    border: {
      light: '#E2E8F0',
      dark: '#2D3748',
    },
    gradient: 'linear-gradient(135deg, #0066FF 0%, #6B46C1 100%)',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
}; 