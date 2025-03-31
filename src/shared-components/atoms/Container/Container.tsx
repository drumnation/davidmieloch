import React from 'react';
import styled from 'styled-components';
import { ContainerProps } from './Container.types';

const StyledContainer = styled.div<{
  $maxWidth?: string;
  $padding?: string;
}>`
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth || '1200px'};
  margin: 0 auto;
  padding: ${({ $padding }) => $padding || '0 20px'};
  box-sizing: border-box;
`;

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  maxWidth,
  padding,
}) => {
  return (
    <StyledContainer 
      className={className} 
      $maxWidth={maxWidth} 
      $padding={padding}
    >
      {children}
    </StyledContainer>
  );
}; 