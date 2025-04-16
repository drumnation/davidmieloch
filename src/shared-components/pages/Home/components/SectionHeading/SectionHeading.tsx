'use client';

import React from 'react';
import { HeadingContainer } from './SectionHeading.styles';
import { Typography } from '../../../../atoms/Typography';
import { SectionHeadingProps } from './SectionHeading.types';

export const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  children, 
  className,
  icon,
  title
}) => {
  const headingContent = title || children;
  
  return (
    <HeadingContainer className={className}>
      <Typography variant="h3" color="primary" mb="1rem" className="section-heading">
        {icon && <span className="section-icon" style={{ marginRight: '0.5rem' }}>{icon}</span>}
        {headingContent}
      </Typography>
    </HeadingContainer>
  );
};

export default SectionHeading; 