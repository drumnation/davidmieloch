export const baseTokens = {
  colors: {
    primary: '#0070f3',
    secondary: '#7928ca',
    success: '#0070f3',
    error: '#ff0000',
    warning: '#f5a623',
    info: '#0070f3',
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease',
  },
}

export const lightTheme = {
  ...baseTokens,
  colors: {
    ...baseTokens.colors,
    background: '#ffffff',
    text: '#000000',
    surface: '#f5f5f5',
    border: '#e0e0e0',
  },
}

export const darkTheme = {
  ...baseTokens,
  colors: {
    ...baseTokens.colors,
    background: '#121212',
    text: '#ffffff',
    surface: '#1e1e1e',
    border: '#2e2e2e',
  },
} 