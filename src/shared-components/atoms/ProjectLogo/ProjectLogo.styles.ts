import styled, { css } from 'styled-components';
import { LabelPosition } from './ProjectLogo.types';

interface ProjectLogoContainerProps {
  $labelPosition?: LabelPosition;
}

export const ProjectLogoContainer = styled.div<ProjectLogoContainerProps>`
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

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    border-radius: 8px;
    object-fit: contain;
  }
`;

interface ProjectLabelProps {
  $labelPosition?: LabelPosition;
}

export const ProjectLabel = styled.span<ProjectLabelProps>`
  font-size: 0.85rem;
  font-weight: 500;
  ${({ $labelPosition }) => {
    switch ($labelPosition) {
      case 'right':
        return css`
          margin-left: 8px;
        `;
      case 'left':
        return css`
          margin-right: 8px;
        `;
      case 'top':
        return css`
          margin-bottom: 8px;
        `;
      case 'bottom':
      default:
        return css`
          margin-top: 8px;
        `;
    }
  }}
  text-align: center;
  color: rgba(0, 0, 0, 0.75);
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface FallbackLogoProps {
  $bgColor?: string;
  $size: number;
  $textColor?: string;
}

export const FallbackLogo = styled.div<FallbackLogoProps>`
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background-color: ${props => props.$bgColor || '#f0f0f0'};
  color: ${props => props.$textColor || 'white'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.$size / 2.5}px;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
`; 