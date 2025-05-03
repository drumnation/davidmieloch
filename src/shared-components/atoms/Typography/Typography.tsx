'use client';

import React, { FC } from 'react';
import { Text, useMantineTheme, Box } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { TypographyProps } from './Typography.types';
import { getTypographyStyles, TypographyStylesProps } from './Typography.styles';

export const Typography: FC<TypographyProps> = ({
  children,
  variant = 'body',
  weight = 'regular',
  color = 'primary',
  className,
  as,
  mt,
  mb,
  ml,
  mr,
  mx,
  my,
  ...rest
}) => {
  const theme = useMantineTheme();
  const pathname = usePathname();

  // Determine the HTML element based on variant if 'as' prop is not provided
  const getDefaultElement = () => {
    switch (variant) {
      case 'h1': return 'h1';
      case 'h2': return 'h2';
      case 'h3': return 'h3';
      case 'body': return 'p';
      case 'caption': return 'span';
      default: return 'p';
    }
  };

  // Prepare props for the style function
  const styleProps: TypographyStylesProps = {
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
  };

  // Generate styles using the new function
  const styles = getTypographyStyles(theme, styleProps);

  // Determine the component to render (either provided 'as' or default)
  const Component = as || getDefaultElement();

  return (
    <Box
      component={Component as any}
      sx={styles}
      className={className}
      {...rest}
    >
      {children}
    </Box>
  );
};

// Export named components for convenience
export const H1: FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h1" {...props} />
);

export const H2: FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h2" {...props} />
);

export const H3: FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h3" {...props} />
);

export const Body: FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="body" {...props} />
);

export const Caption: FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="caption" {...props} />
);

export default Typography; 