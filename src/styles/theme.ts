import { MantineThemeOverride } from '@mantine/core';

// Define a masculine, powerful theme with dark mode focus
export const theme: MantineThemeOverride = {
  // Primary color - deep electric blue
  primaryColor: 'blue',
  
  // Custom color palettes
  colors: {
    // Electric blue palette - powerful, tech-forward, masculine
    blue: [
      '#e3f2fd', // lightest
      '#bbdefb',
      '#90caf9',
      '#64b5f6',
      '#42a5f5',
      '#2196f3', // primary
      '#1e88e5',
      '#1976d2',
      '#0d47a1',
      '#002171'  // darkest
    ],
    // Cyan accent palette - for energy and tech feel
    cyan: [
      '#e0f7fa',
      '#b2ebf2',
      '#80deea',
      '#4dd0e1',
      '#26c6da',
      '#00bcd4',
      '#00acc1',
      '#0097a7',
      '#00838f',
      '#006064'
    ],
    // Dark mode backgrounds
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5c5f66',
      '#373A40',
      '#2C2E33',
      '#25262b',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
  },
  
  // Typography
  fontFamily: 'Lexend, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: {
    fontFamily: 'Lexend, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '700',
  },
  
  // Component styling
  defaultRadius: 'md',
  
  // Custom theme properties
  other: {
    heroGradient: 'linear-gradient(45deg, #002171 0%, #00bcd4 100%)',
    accentGradient: 'linear-gradient(90deg, #1976d2, #00bcd4)',
    cardBg: 'rgba(26, 27, 30, 0.8)',
    glassMorphism: {
      background: 'rgba(26, 27, 30, 0.7)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(0, 188, 212, 0.1)',
    },
  },
  
  // Component-specific overrides
  components: {
    Button: {
      defaultProps: {
        variant: 'gradient',
        gradient: { from: 'blue', to: 'cyan', deg: 45 },
      },
    },
    Card: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
        p: 'lg',
      },
    },
    Container: {
      defaultProps: {
        size: 'lg',
      },
    },
  },
};

export default theme; 