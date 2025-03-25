import React from 'react';
import { SpinnerProps } from './Spinner.types';
import { SpinnerContainer } from './Spinner.styles';

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'medium',
  color,
  className
}) => {
  return <SpinnerContainer $size={size} $color={color} className={className} />;
}; 