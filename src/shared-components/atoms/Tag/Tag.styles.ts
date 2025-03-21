import styled from 'styled-components';
import { TagProps } from './Tag.types';

const variantStyles = {
  default: (theme: any) => `
    background-color: ${theme.colors.background.light};
    color: ${theme.colors.text.primary};
    border: 1px solid ${theme.colors.border.default};
  `,
  primary: (theme: any) => `
    background-color: ${theme.colors.primary.main};
    color: #ffffff;
    border: 1px solid ${theme.colors.primary.main};
  `,
  secondary: (theme: any) => `
    background-color: ${theme.colors.secondary.light};
    color: ${theme.colors.secondary.main};
    border: 1px solid ${theme.colors.secondary.light};
  `,
  success: (theme: any) => `
    background-color: ${theme.colors.accent.green}20;
    color: ${theme.colors.accent.green};
    border: 1px solid ${theme.colors.accent.green}20;
  `,
  warning: (theme: any) => `
    background-color: ${theme.colors.accent.orange}20;
    color: ${theme.colors.accent.orange};
    border: 1px solid ${theme.colors.accent.orange}20;
  `,
  danger: (theme: any) => `
    background-color: ${theme.colors.accent.red}20;
    color: ${theme.colors.accent.red};
    border: 1px solid ${theme.colors.accent.red}20;
  `
};

const sizeStyles = {
  sm: `
    height: 20px;
    padding: 0 8px;
    font-size: 12px;
    border-radius: 4px;
  `,
  md: `
    height: 24px;
    padding: 0 10px;
    font-size: 14px;
    border-radius: 6px;
  `,
  lg: `
    height: 28px;
    padding: 0 12px;
    font-size: 16px;
    border-radius: 8px;
  `
};

export const StyledTag = styled.span<Partial<TagProps>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;
  
  ${({ theme, variant = 'default' }) => variantStyles[variant](theme)}
  ${({ size = 'md' }) => sizeStyles[size]}
  
  ${({ onClick }) => onClick && `
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      transform: scale(0.98);
    }
  `}
`; 