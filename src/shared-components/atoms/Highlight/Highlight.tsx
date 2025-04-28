'use client';

import React from 'react';
import styled from 'styled-components';

const StyledHighlight = styled.span`
  background-color: ${({ theme }) => `${theme.colors[theme.primaryColor][0]}`};
  padding: 0.2rem 0.4rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  
  [data-mantine-color-scheme="dark"] & {
    background-color: ${({ theme }) => `rgba(${theme.colors[theme.primaryColor][9]}, 0.15)`};
  }
`;

interface HighlightProps {
    children: React.ReactNode;
    className?: string;
}

export const Highlight: React.FC<HighlightProps> = ({ children, className }) => {
    return <StyledHighlight className={className}>{children}</StyledHighlight>;
};

export default Highlight; 