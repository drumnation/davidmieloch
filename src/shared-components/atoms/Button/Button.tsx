import React from 'react';
import { ButtonProps } from './Button.types';
import { StyledButton } from './Button.styles';

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
}; 