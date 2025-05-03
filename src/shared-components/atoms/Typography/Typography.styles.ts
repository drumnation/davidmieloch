'use client';

import { MantineTheme, MantineSpacing, rem, MantineGradient } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { getPageThemeMode, lightModeColors, darkModeColors } from '@/utils/theme-utils';

// Define the types for the parameters
export interface TypographyStylesProps {
  variant: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  weight: 'regular' | 'medium' | 'semibold' | 'bold';
  color: 'primary' | 'secondary' | 'light' | 'gradient' | 'inherit' | 'dimmed';
  mt?: MantineSpacing | (string & {}) | number; // Updated type
  mb?: MantineSpacing | (string & {}) | number; // Updated type
  ml?: MantineSpacing | (string & {}) | number; // Updated type
  mr?: MantineSpacing | (string & {}) | number; // Updated type
  mx?: MantineSpacing | (string & {}) | number; // Updated type
  my?: MantineSpacing | (string & {}) | number; // Updated type
  pathname?: string | null; // Add pathname for theme determination
}

// Helper to resolve spacing values
const resolveSpacing = (
  value: MantineSpacing | (string & {}) | number | undefined,
  theme: MantineTheme
): string | undefined => {
  if (value === undefined) return undefined;
  // Check if it's a theme spacing key first
  if (typeof value === 'string' && value in theme.spacing) {
    return theme.spacing[value as keyof typeof theme.spacing];
  }
  // Otherwise, treat as a literal value (number or string like '10px')
  return rem(value);
};

// Function to generate the style object
export const getTypographyStyles = (
  theme: MantineTheme,
  {
    variant,
    weight,
    color,
    mt,
    mb,
    ml,
    mr,
    mx,
    my,
    pathname
  }: TypographyStylesProps
): Record<string, any> => {
  // Determine page theme mode
  const pathValue = pathname || '/'; // Default to root if no pathname provided
  const pageMode = getPageThemeMode(pathValue);
  const isDarkMode = pageMode === 'dark';

  // Select hardcoded color palette based on page type
  const colors = isDarkMode ? darkModeColors : lightModeColors;

  const styles: Record<string, any> = {
    fontFamily: theme.fontFamily || 'Inter, sans-serif',
    margin: 0,
    // Default text color based on page theme mode
    color: colors.text.primary,
  };

  // Variant styles (font size, line height, responsive)
  switch (variant) {
    case 'h1':
      styles.fontSize = rem(48);
      styles.lineHeight = 1.2;
      styles[`@media (max-width: ${theme.breakpoints.sm})`] = {
        fontSize: rem(36),
      };
      break;
    case 'h2':
      styles.fontSize = rem(36);
      styles.lineHeight = 1.3;
      styles[`@media (max-width: ${theme.breakpoints.sm})`] = {
        fontSize: rem(28),
      };
      break;
    case 'h3':
      styles.fontSize = rem(30);
      styles.lineHeight = 1.4;
      styles[`@media (max-width: ${theme.breakpoints.sm})`] = {
        fontSize: rem(24),
      };
      break;
    case 'body':
      styles.fontSize = rem(18);
      styles.lineHeight = 1.6;
      styles[`@media (max-width: ${theme.breakpoints.sm})`] = {
        fontSize: rem(16),
      };
      break;
    case 'caption':
      styles.fontSize = rem(14);
      styles.lineHeight = 1.5;
      styles[`@media (max-width: ${theme.breakpoints.sm})`] = {
        fontSize: rem(12),
      };
      break;
  }

  // Weight styles
  const weightMap = {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  };
  styles.fontWeight = weightMap[weight] || 400;

  // Color styles - override the default based on 'color' prop and page mode
  switch (color) {
    case 'primary':
      // Use hardcoded colors instead of theme
      styles.color = colors.text.primary;
      break;
    case 'secondary':
      styles.color = colors.text.secondary;
      break;
    case 'light':
      styles.color = isDarkMode ? '#A6A7AB' : '#909296';
      break;
    case 'dimmed':
      styles.color = colors.text.muted;
      break;
    case 'gradient':
      // For gradients, we'll still use theme colors but with consistent results
      const fromColor = isDarkMode ? '#4361ee' : '#4361ee'; // Same accent colors for consistency
      const toColor = isDarkMode ? '#7209b7' : '#7209b7';

      styles.backgroundImage = `linear-gradient(45deg, ${fromColor} 0%, ${toColor} 100%)`;
      styles.WebkitBackgroundClip = 'text';
      styles.backgroundClip = 'text';
      styles.WebkitTextFillColor = 'transparent';
      delete styles.color;
      break;
    case 'inherit':
      styles.color = 'inherit';
      break;
  }

  // Margin styles
  const marginTop = resolveSpacing(my ?? mt, theme);
  const marginBottom = resolveSpacing(my ?? mb, theme);
  const marginLeft = resolveSpacing(mx ?? ml, theme);
  const marginRight = resolveSpacing(mx ?? mr, theme);

  if (marginTop) styles.marginTop = marginTop;
  if (marginBottom) styles.marginBottom = marginBottom;
  if (marginLeft) styles.marginLeft = marginLeft;
  if (marginRight) styles.marginRight = marginRight;

  return styles;
};

// No default export needed for createStyles pattern 