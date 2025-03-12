import styled, { css } from 'styled-components';
import { CardProps, CardVariant } from './Card.types';

const variantStyles = {
  default: css`
    background: white;
    border: 1px solid #E2E8F0;
  `,
  gradient: css`
    background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
    color: white;
  `,
  accent: css`
    background: rgba(99, 102, 241, 0.05);
    border: 1px solid rgba(99, 102, 241, 0.1);
  `
};

const hoverStyles = css`
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -8px rgba(99, 102, 241, 0.25);
  }
`;

export const StyledCard = styled.div<{ $variant: CardVariant; $hoverable: boolean }>`
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 0.05);

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $hoverable }) => $hoverable && hoverStyles}
`; 