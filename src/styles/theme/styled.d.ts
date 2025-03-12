import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      text: {
        primary: string;
        secondary: string;
        light: string;
      };
      background: {
        light: string;
        dark: string;
        paper: string;
      };
      primary: {
        main: string;
        light: string;
        dark: string;
      };
      secondary: {
        main: string;
        light: string;
        dark: string;
      };
      accent: {
        light: string;
        dark: string;
        red: string;
        green: string;
        blue: string;
      };
      border: {
        light: string;
        dark: string;
      };
      gradient: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
    radius: {
      sm: string;
      md: string;
      lg: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      card: string;
      elevation1: string;
      elevation2: string;
      [key: string]: string;
    };
    fontWeights: {
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    space: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      [key: string]: string;
    };
    transitions: {
      default: string;
      fast: string;
      slow: string;
    };
  }
} 