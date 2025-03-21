import styled from 'styled-components';
import { BadgeProps } from './Badge.types';

const variantStyles = {
  default: (theme: any) => `
    background-color: ${theme.colors.background.light};
    color: ${theme.colors.text.secondary};
    border: 1px solid ${theme.colors.border.default};
  `,
  stars: (theme: any) => `
    background-color: ${theme.colors.accent.yellow}10;
    color: ${theme.colors.accent.yellow};
    border: 1px solid ${theme.colors.accent.yellow}20;
  `,
  forks: (theme: any) => `
    background-color: ${theme.colors.accent.blue}10;
    color: ${theme.colors.accent.blue};
    border: 1px solid ${theme.colors.accent.blue}20;
  `,
  issues: (theme: any) => `
    background-color: ${theme.colors.accent.green}10;
    color: ${theme.colors.accent.green};
    border: 1px solid ${theme.colors.accent.green}20;
  `,
  prs: (theme: any) => `
    background-color: ${theme.colors.accent.purple}10;
    color: ${theme.colors.accent.purple};
    border: 1px solid ${theme.colors.accent.purple}20;
  `
};

const sizeStyles = {
  sm: `
    height: 22px;
    padding: 0 6px;
    font-size: 12px;
    border-radius: 4px;
    
    svg {
      width: 12px;
      height: 12px;
      margin-right: 4px;
    }
  `,
  md: `
    height: 26px;
    padding: 0 8px;
    font-size: 14px;
    border-radius: 6px;
    
    svg {
      width: 14px;
      height: 14px;
      margin-right: 6px;
    }
  `,
  lg: `
    height: 30px;
    padding: 0 10px;
    font-size: 16px;
    border-radius: 8px;
    
    svg {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  `
};

export const StyledBadge = styled.span<Partial<BadgeProps>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;
  
  ${({ theme, variant = 'default' }) => variantStyles[variant](theme)}
  ${({ size = 'md' }) => sizeStyles[size]}
`; 