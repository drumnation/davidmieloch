'use client';

import React, { ReactNode } from 'react';
import styled from 'styled-components';

// Theme colors for consistency
const theme = {
  background: {
    primary: '#0a0c1e',
    card: '#1b1d3a',
    cardHover: '#21254a'
  },
  text: {
    primary: '#ffffff',
    secondary: '#c8d2f0',
    muted: '#94a3b8'
  },
  accent: {
    primary: '#4361ee',
    secondary: '#7209b7',
    gradient: 'linear-gradient(90deg, #4361ee, #7209b7)'
  }
};

interface GenericSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const SectionContainer = styled.section`
  padding: 4rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  
  p {
    font-size: 1.125rem;
    line-height: 1.7;
    color: ${theme.text.secondary};
    margin-bottom: 1.5rem;
  }
  
  strong {
    color: ${theme.text.primary};
    font-weight: 600;
  }
  
  @media (min-width: 768px) {
    padding: 5rem 2rem;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 20%;
    right: 20%;
    height: 1px;
    background: linear-gradient(90deg, 
      rgba(255,255,255,0), 
      rgba(255,255,255,0.1), 
      rgba(255,255,255,0)
    );
  }
`;

const SectionContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const GenericSection: React.FC<GenericSectionProps> = ({ 
  children, 
  className,
  id
}) => {
  return (
    <SectionContainer id={id} className={className}>
      <SectionContent>
        {children}
      </SectionContent>
    </SectionContainer>
  );
};

export default GenericSection; 