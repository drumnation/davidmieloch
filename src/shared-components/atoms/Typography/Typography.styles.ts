'use client';

import { MantineTheme, MantineSpacing, rem, MantineGradient } from '@mantine/core';

// Define the types for the parameters
export interface TypographyStylesProps {
  variant: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  weight: 'regular' | 'medium' | 'semibold' | 'bold';
  color: 'primary' | 'secondary' | 'light' | 'gradient' | 'inherit';
  mt?: MantineSpacing | (string & {}) | number; // Updated type
  mb?: MantineSpacing | (string & {}) | number; // Updated type
  ml?: MantineSpacing | (string & {}) | number; // Updated type
  mr?: MantineSpacing | (string & {}) | number; // Updated type
  mx?: MantineSpacing | (string & {}) | number; // Updated type
  my?: MantineSpacing | (string & {}) | number; // Updated type
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
  }: TypographyStylesProps
): Record<string, any> => {

  const styles: Record<string, any> = {
    fontFamily: theme.fontFamily || 'Inter, sans-serif',
    margin: 0,
    // Default color assuming light mode, override below
    color: theme.colors.dark[7],
    // Apply dark mode override using data attribute selector
    '[data-mantine-color-scheme="dark"] &': {
      color: theme.colors.dark[0],
    },
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

  // Color styles - override the default based on 'color' prop
  switch (color) {
    case 'primary':
      // Already handled by default + dark mode selector above
      // styles.color = theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[7];
      break; // Keep default behavior
    case 'secondary':
      // Set light mode color, add specific dark mode override
      styles.color = theme.colors.gray[6];
      styles['[data-mantine-color-scheme="dark"] &'] = {
        color: theme.colors.dark[2],
      };
      break;
    case 'light':
      // Set light mode color, add specific dark mode override
      styles.color = theme.colors.gray[5];
      styles['[data-mantine-color-scheme="dark"] &'] = {
        color: theme.colors.gray[4],
      };
      break;
    case 'gradient':
      // Define gradient using theme tokens
      const gradient: MantineGradient = { from: theme.primaryColor, to: 'cyan', deg: 45 }; // Adjust 'cyan' if needed
      const fromColor = theme.colors[gradient.from]?.[6] || theme.colors.blue[6]; // Fallback color
      const toColor = theme.colors[gradient.to]?.[6] || theme.colors.cyan[6]; // Fallback color

      styles.backgroundImage = `linear-gradient(${gradient.deg}deg, ${fromColor} 0%, ${toColor} 100%)`;
      styles.WebkitBackgroundClip = 'text';
      styles.backgroundClip = 'text';
      styles.WebkitTextFillColor = 'transparent';
      // Ensure the default color override doesn't affect gradient text
      delete styles.color;
      delete styles['[data-mantine-color-scheme="dark"] &'];
      break;
    case 'inherit':
      styles.color = 'inherit';
      // Ensure the default color override doesn't affect inherit
      delete styles['[data-mantine-color-scheme="dark"] &'];
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