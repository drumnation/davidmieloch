import styled, { css } from 'styled-components';
import { LabelPosition } from './TechIcon.types';

interface TechIconContainerProps {
  $labelPosition?: LabelPosition;
}

export const TechIconContainer = styled.div<TechIconContainerProps>`
  display: inline-flex;
  ${({ $labelPosition }) => {
    switch ($labelPosition) {
      case 'right':
        return css`
          flex-direction: row;
          align-items: center;
        `;
      case 'left':
        return css`
          flex-direction: row-reverse;
          align-items: center;
        `;
      case 'top':
        return css`
          flex-direction: column-reverse;
          align-items: center;
        `;
      case 'bottom':
      default:
        return css`
          flex-direction: column;
          align-items: center;
        `;
    }
  }}
  justify-content: center;
  padding: 4px;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface TechLabelProps {
  $labelPosition?: LabelPosition;
}

export const TechLabel = styled.span<TechLabelProps>`
  font-size: 0.75rem;
  ${({ $labelPosition }) => {
    switch ($labelPosition) {
      case 'right':
        return css`
          margin-left: 4px;
        `;
      case 'left':
        return css`
          margin-right: 4px;
        `;
      case 'top':
        return css`
          margin-bottom: 4px;
        `;
      case 'bottom':
      default:
        return css`
          margin-top: 4px;
        `;
    }
  }}
  text-align: center;
  color: rgba(0, 0, 0, 0.75);
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface FallbackContainerProps {
  $bgColor?: string;
  $size?: number;
}

export const FallbackContainer = styled.div<FallbackContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $bgColor }) => $bgColor || '#3498DB'}; /* Default to blue if no color provided */
  color: white;
  border-radius: 6px;
  font-size: ${props => Math.max(props.$size || 24, 24) * 0.4}px;
  font-weight: 600;
  width: ${props => props.$size || 24}px;
  height: ${props => props.$size || 24}px;
  text-transform: uppercase;
  margin-right: ${props => props.$size ? props.$size * 0.2 : 4}px;
`; 