import React from 'react';
import { CardProps } from './Card.types';
import { StyledCard } from './Card.styles';

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'gradient',
  padding = 'md',
  className,
  onClick,
  fullWidth = false,
}) => {
  return (
    <StyledCard
      $variant={variant}
      $padding={padding}
      $fullWidth={fullWidth}
      className={className}
      onClick={onClick}
    >
      {children}
    </StyledCard>
  );
}; 