import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
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
      dark: '#2C5282',
      red: '#E53E3E',
      green: '#38A169',
      blue: '#3182CE',
    },
    border: {
      light: '#E2E8F0',
      dark: '#2D3748',
    },
    gradient: 'linear-gradient(135deg, #2196f3 0%, #00bcd4 100%)',
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
  }
}; 