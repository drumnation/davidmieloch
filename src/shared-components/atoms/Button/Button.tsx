'use client';

import React, { useState } from 'react';
import { ButtonProps } from './Button.types';
import { StyledButton, IconWrapper } from './Button.styles';
import styled from 'styled-components';

// Create a styled wrapper to handle hover effects
const HoverWrapper = styled.div<{ $animate: boolean }>`
  display: inline-block;
  transition: transform 0.2s ease;
  
  ${({ $animate }) => $animate && `
    &:hover {
      transform: scale(1.03);
    }
  `}
`;

const VerticalHoverWrapper = styled.div<{ $animate: boolean }>`
  display: inline-block;
  transition: transform 0.2s ease;
  
  ${({ $animate }) => $animate && `
    &:hover {
      transform: translateY(-2px);
    }
  `}
`;

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  icon, 
  iconPosition = 'left',
  disabled = false,
  ...props 
}) => {
  const content = (
    <>
      {icon && iconPosition === 'left' && <IconWrapper position="left">{icon}</IconWrapper>}
      {children}
      {icon && iconPosition === 'right' && <IconWrapper position="right">{icon}</IconWrapper>}
    </>
  );

  // Determine which type of animation to use based on variant
  const useVerticalAnimation = props.variant === 'ghost' || props.variant === 'repo-action';
  const shouldAnimate = !disabled && props.variant !== 'repo-link';

  // For buttons that don't need animation, render directly
  if (!shouldAnimate) {
    return <StyledButton {...props} disabled={disabled}>{content}</StyledButton>;
  }

  // For buttons that need vertical movement on hover
  if (useVerticalAnimation) {
    return (
      <VerticalHoverWrapper $animate={shouldAnimate}>
        <StyledButton {...props} disabled={disabled}>
          {content}
        </StyledButton>
      </VerticalHoverWrapper>
    );
  }

  // For buttons that need scale animation on hover
  return (
    <HoverWrapper $animate={shouldAnimate}>
      <StyledButton {...props} disabled={disabled}>
        {content}
      </StyledButton>
    </HoverWrapper>
  );
}; 