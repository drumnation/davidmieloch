import React from 'react';
import { TypographyProps } from './Typography.types';
import { StyledTypography } from './Typography.styles';

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  weight = 'regular',
  color = 'primary',
  className,
  as,
}) => {
  // Default HTML element based on variant
  const defaultElement = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    body: 'p',
    caption: 'span',
  }[variant] as keyof JSX.IntrinsicElements;

  return (
    <StyledTypography
      as={as || defaultElement}
      $variant={variant}
      $weight={weight}
      $color={color}
      className={className}
    >
      {children}
    </StyledTypography>
  );
};

// Convenience components
export const H1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography {...props} variant="h1" weight={props.weight || 'bold'} />
);

export const H2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography {...props} variant="h2" weight={props.weight || 'semibold'} />
);

export const H3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography {...props} variant="h3" weight={props.weight || 'medium'} />
);

export const Body: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography {...props} variant="body" />
);

export const Caption: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography {...props} variant="caption" />
); 