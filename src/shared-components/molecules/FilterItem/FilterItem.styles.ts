import styled, { css } from 'styled-components';
import { FilterItemProps } from './FilterItem.types';

const variantStyles = {
  language: css`
    background: #E5F0FF;
    border: none;
    color: #1E40AF;
    &:hover {
      background: #D1E2FF;
    }
  `,
  topic: css`
    background: #E5F0FF;
    border: none;
    color: #1E40AF;
    &:hover {
      background: #D1E2FF;
    }
  `,
  type: css`
    background: #E5F0FF;
    border: none;
    color: #1E40AF;
    &:hover {
      background: #D1E2FF;
    }
  `
};

export const FilterContainer = styled.button<{ $isSelected?: boolean; variant?: FilterItemProps['variant'] }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ variant = 'language' }) => variantStyles[variant]}
  
  ${({ $isSelected }) => $isSelected && css`
    background: #2563EB;
    color: white;
    &:hover {
      background: #1D4ED8;
    }
  `}
`;

export const Count = styled.span`
  font-size: 12px;
  font-weight: 400;
  opacity: 0.75;
  color: inherit;
`; 