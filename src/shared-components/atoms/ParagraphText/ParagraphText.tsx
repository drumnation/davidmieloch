'use client';

import React from 'react';
import styled from 'styled-components';

const StyledParagraph = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.gray[7]};
  
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors.gray[3]};
  }
`;

interface ParagraphTextProps {
    children: React.ReactNode;
    className?: string;
}

export const ParagraphText: React.FC<ParagraphTextProps> = ({ children, className }) => {
    return <StyledParagraph className={className}>{children}</StyledParagraph>;
};

export default ParagraphText; 