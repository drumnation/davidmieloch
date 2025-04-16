'use client';

import React, { ReactNode } from 'react';
import { HeadingContainer } from './SectionHeading.styles';
import { Typography } from '../../../../atoms/Typography';

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  children, 
  className 
}) => {
  return (
    <HeadingContainer className={className}>
      <Typography variant="h3" color="primary" mb="1rem" className="section-heading">
        {children}
      </Typography>
    </HeadingContainer>
  );
};

export default SectionHeading; 