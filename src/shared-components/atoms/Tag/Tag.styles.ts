import styled from 'styled-components';
import { MantineTheme } from '@mantine/core';
import { TagProps } from './Tag.types';

const variantStyles = {
  default: (theme: MantineTheme) => `
    background-color: ${theme.colors.gray[1]};
    color: ${theme.black};
    border: 1px solid ${theme.colors.gray[3]};
  `,
  primary: (theme: MantineTheme) => `
    background-color: ${theme.colors[theme.primaryColor][6]};
    color: ${theme.white};
    border: 1px solid ${theme.colors[theme.primaryColor][6]};
  `,
  secondary: (theme: MantineTheme) => `
    background-color: ${theme.colors.gray[1]};
    color: ${theme.colors.gray[7]};
    border: 1px solid ${theme.colors.gray[3]};
  `,
  success: (theme: MantineTheme) => `
    background-color: ${theme.colors.green[0]};
    color: ${theme.colors.green[7]};
    border: 1px solid ${theme.colors.green[2]};
  `,
  warning: (theme: MantineTheme) => `
    background-color: ${theme.colors.yellow[0]};
    color: ${theme.colors.yellow[7]};
    border: 1px solid ${theme.colors.yellow[2]};
  `,
  danger: (theme: MantineTheme) => `
    background-color: ${theme.colors.red[0]};
    color: ${theme.colors.red[7]};
    border: 1px solid ${theme.colors.red[2]};
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
  
  ${({ theme, variant = 'default' }) => variantStyles[variant](theme as MantineTheme)}
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