import React, { ElementType } from 'react';
import { TypographyProps, TypographyVariant } from './Typography.types';
import { StyledTypography } from './Typography.styles';

// Map legacy variants to current ones
const mapVariant = (variant: string): TypographyVariant => {
  if (variant === 'body1' || variant === 'body2') {
    return 'body';
  }
  return variant as TypographyVariant;
};

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  weight = 'regular',
  color = 'primary',
  className,
  as,
  // Margin props
  mt,
  mb,
  ml,
  mr,
  mx,
  my,
}) => {
  // Map legacy variants to current ones
  const mappedVariant = mapVariant(variant);

  // Default HTML element based on variant
  const defaultElement = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    body: 'p',
    caption: 'span',
  }[mappedVariant] as ElementType;

  // Create the element with the correct props
  return (
    <StyledTypography
      forwardedAs={as || defaultElement}
      $variant={mappedVariant}
      $weight={weight}
      $color={color}
      className={className}
      // Pass margin props
      $mt={mt}
      $mb={mb}
      $ml={ml}
      $mr={mr}
      $mx={mx}
      $my={my}
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