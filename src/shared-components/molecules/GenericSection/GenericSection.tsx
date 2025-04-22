'use client';

import React from 'react';
import { SectionContainer, SectionContent } from './GenericSection.styles';
import { GenericSectionProps } from './GenericSection.types';

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