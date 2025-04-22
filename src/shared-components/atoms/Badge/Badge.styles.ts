import styled from 'styled-components';
import { MantineTheme } from '@mantine/core';
import { BadgeProps } from './Badge.types';

const variantStyles = {
  default: (theme: MantineTheme) => `
    background-color: ${theme.colors.gray[1]};
    color: ${theme.colors.gray[7]};
    border: 1px solid ${theme.colors.gray[3]};
  `,
  stars: (theme: MantineTheme) => `
    background-color: ${theme.colors.yellow[0]};
    color: ${theme.colors.yellow[7]};
    border: 1px solid ${theme.colors.yellow[2]};
  `,
  forks: (theme: MantineTheme) => `
    background-color: ${theme.colors.blue[0]};
    color: ${theme.colors.blue[7]};
    border: 1px solid ${theme.colors.blue[2]};
  `,
  issues: (theme: MantineTheme) => `
    background-color: ${theme.colors.green[0]};
    color: ${theme.colors.green[7]};
    border: 1px solid ${theme.colors.green[2]};
  `,
  prs: (theme: MantineTheme) => `
    background-color: ${theme.colors.red[0]};
    color: ${theme.colors.red[7]};
    border: 1px solid ${theme.colors.red[2]};
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
  
  ${({ theme, variant = 'default' }) => variantStyles[variant](theme as MantineTheme)}
  ${({ size = 'md' }) => sizeStyles[size]}
`; 