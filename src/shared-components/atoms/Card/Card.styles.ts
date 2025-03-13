import styled, { css } from 'styled-components';
import { StyledCardProps } from './Card.types';

const variantStyles = {
  gradient: css`
    background: ${({ theme }) => theme.colors.gradient};
    color: ${({ theme }) => theme.colors.text.light};
  `,
  accent: css`
    background: ${({ theme }) => theme.colors.background.light};
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.text.primary};
  `,
};

const paddingStyles = {
  none: css`
    padding: 0;
  `,
  sm: css`
    padding: ${({ theme }) => theme.space.sm};
  `,
  md: css`
    padding: ${({ theme }) => theme.space.md};
  `,
  lg: css`
    padding: ${({ theme }) => theme.space.lg};
  `,
  xl: css`
    padding: ${({ theme }) => theme.space.xl};
  `,
};

export const StyledCard = styled.div<StyledCardProps>`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: ${({ theme }) => theme.transitions.default};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $variant }) => variantStyles[$variant]};
  ${({ $padding }) => paddingStyles[$padding]};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`; 