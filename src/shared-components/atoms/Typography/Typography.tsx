import React from 'react';
import { TypographyProps } from './Typography.types';
import { StyledTypography } from './Typography.styles';

const defaultElementMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
} as const;

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(({
  children,
  variant = 'body1',
  weight = 'regular',
  color = 'primary',
  className,
  as,
  ...props
}, ref) => {
  const element = as || defaultElementMap[variant];

  return (
    <StyledTypography
      ref={ref}
      as={element}
      $variant={variant}
      $weight={weight}
      $color={color}
      className={className}
      {...props}
    >
      {children}
    </StyledTypography>
  );
});

Typography.displayName = 'Typography'; 