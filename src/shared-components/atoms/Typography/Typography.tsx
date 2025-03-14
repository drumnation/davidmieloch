import React, { FC } from 'react';
import { TypographyProps } from './Typography.types';
import { StyledTypography } from './Typography.styles';

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

  return (
    <StyledTypography
      as={as || getDefaultElement()}
      $variant={variant}
      $weight={weight}
      $color={color}
      $mt={mt}
      $mb={mb}
      $ml={ml}
      $mr={mr}
      $mx={mx}
      $my={my}
      className={className}
      {...rest}
    >
      {children}
    </StyledTypography>
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