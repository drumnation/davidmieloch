import styled from 'styled-components';
import { Button as MantineButton } from '@mantine/core';
import { ButtonProps } from './Button.types';

const variantStyles = {
  primary: () => `
    background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
    color: white;
    &:hover {
      background: linear-gradient(135deg, #4F46E5 0%, #4338CA 100%);
    }
  `,
  secondary: () => `
    background: white;
    color: #4F46E5;
    border: 2px solid #4F46E5;
    &:hover {
      background: #F3F4F6;
    }
  `,
  ghost: () => `
    background: transparent;
    color: #4F46E5;
    &:hover {
      background: #F3F4F6;
    }
  `
};

const sizeStyles = {
  sm: `
    height: 32px;
    padding: 0 16px;
    font-size: 14px;
  `,
  md: `
    height: 40px;
    padding: 0 20px;
    font-size: 16px;
  `,
  lg: `
    height: 48px;
    padding: 0 24px;
    font-size: 18px;
  `
};

export const StyledButton = styled(MantineButton)<ButtonProps>`
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  
  ${({ variant = 'primary' }) => variantStyles[variant]}
  ${({ size = 'md' }) => sizeStyles[size]}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`; 