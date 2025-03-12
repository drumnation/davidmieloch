import { Inter, Manrope, Lexend, IBM_Plex_Sans, Work_Sans } from 'next/font/google';

// Load fonts
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

export const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
});

export const ibmPlex = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex',
  display: 'swap',
});

// Font family CSS variables
export const fontFamilies = {
  inter: 'var(--font-inter)',
  manrope: 'var(--font-manrope)',
  lexend: 'var(--font-lexend)',
  'work-sans': 'var(--font-work-sans)',
  'ibm-plex': 'var(--font-ibm-plex)',
};

// Default font
export const defaultFont = fontFamilies.lexend; 