'use client';

import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors[theme.primaryColor][7]};
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
  
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors[theme.primaryColor][4]};
  }
`;

interface SectionTitleProps {
    children: React.ReactNode;
    className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, className }) => {
    return <StyledTitle className={className}>{children}</StyledTitle>;
};

export default SectionTitle; 