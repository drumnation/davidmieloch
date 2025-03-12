import React from 'react';
import { CardProps } from './Card.types';
import { StyledCard } from './Card.styles';

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverable = false,
  className,
  style,
  onClick
}) => {
  return (
    <StyledCard
      $variant={variant}
      $hoverable={hoverable}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </StyledCard>
  );
}; 