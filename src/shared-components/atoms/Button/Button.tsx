import React from 'react';
import { ButtonProps } from './Button.types';
import { StyledButton, IconWrapper } from './Button.styles';

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  icon, 
  iconPosition = 'left',
  ...props 
}) => {
  const content = (
    <>
      {icon && iconPosition === 'left' && <IconWrapper position="left">{icon}</IconWrapper>}
      {children}
      {icon && iconPosition === 'right' && <IconWrapper position="right">{icon}</IconWrapper>}
    </>
  );

  return <StyledButton {...props}>{content}</StyledButton>;
}; 