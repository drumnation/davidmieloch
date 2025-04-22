import styled, { css } from 'styled-components';
import { StyledCardProps } from './Card.types';

const variantStyles = {
  gradient: css<StyledCardProps>`
    background: ${({ theme }) => `linear-gradient(to right, ${theme.colors[theme.primaryColor]?.[6] || theme.colors.blue[6]}, ${theme.colors.cyan?.[6] || theme.colors.teal[6]})`};
    color: ${({ theme }) => theme.white};
  `,
  accent: css<StyledCardProps>`
    background: var(--mantine-color-body);
    border: 1px solid ${({ theme }) => theme.colors[theme.primaryColor]?.[6] || theme.colors.blue[6]};
    color: var(--mantine-color-text);
  `,
};

const paddingStyles = {
  none: css`
    padding: 0;
  `,
  sm: css<StyledCardProps>`
    padding: ${({ theme }) => theme.spacing.sm};
  `,
  md: css<StyledCardProps>`
    padding: ${({ theme }) => theme.spacing.md};
  `,
  lg: css<StyledCardProps>`
    padding: ${({ theme }) => theme.spacing.lg};
  `,
  xl: css<StyledCardProps>`
    padding: ${({ theme }) => theme.spacing.xl};
  `,
};

export const StyledCard = styled.div<StyledCardProps>`
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $variant = 'default' }) => {
    if ($variant === 'gradient' || $variant === 'accent') {
      return variantStyles[$variant];
    }
    return '';
  }}
  ${({ $padding = 'md' }) => paddingStyles[$padding]}

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`; 