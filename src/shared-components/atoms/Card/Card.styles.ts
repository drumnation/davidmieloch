import styled, { css } from 'styled-components';
import { StyledCardProps } from './Card.types';

const variantStyles = {
  gradient: css`
    background: var(--bg-gradient);
    color: var(--text-light);
  `,
  accent: css`
    background: var(--bg-light);
    border: 1px solid var(--primary-blue);
    color: var(--text-primary);
  `,
};

const paddingStyles = {
  none: css`
    padding: 0;
  `,
  sm: css`
    padding: 1rem;
  `,
  md: css`
    padding: 1.5rem;
  `,
  lg: css`
    padding: 2rem;
  `,
  xl: css`
    padding: 3rem;
  `,
};

export const StyledCard = styled.div<StyledCardProps>`
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $variant }) => variantStyles[$variant]};
  ${({ $padding }) => paddingStyles[$padding]};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`; 