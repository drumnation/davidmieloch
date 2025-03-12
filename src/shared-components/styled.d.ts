import 'styled-components';

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
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
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
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
} 