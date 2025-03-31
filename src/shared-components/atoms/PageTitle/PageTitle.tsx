import React from 'react';
import styled from 'styled-components';
import { PageTitleProps } from './PageTitle.types';

const StyledPageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 60px;
    height: 4px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const PageTitle: React.FC<PageTitleProps> = ({ 
  children, 
  className 
}) => {
  return (
    <StyledPageTitle className={className}>
      {children}
    </StyledPageTitle>
  );
}; 