import React from 'react';
import { Typography } from '../../../atoms/Typography';
import type { TypographyColor } from '../../../atoms/Typography/Typography.types';

export const SectionTitle: React.FC<{
  title: string;
  className?: string;
}> = ({ title, className = "" }) => (
  <div style={{ marginBottom: '1rem' }}>
    <Typography 
      variant="h2" 
      weight="bold"
      className={className}
    >
      {title}
    </Typography>
  </div>
);

export const SectionSubtitle: React.FC<{
  title: string;
  className?: string;
  color?: TypographyColor;
}> = ({ title, className = "", color }) => (
  <div style={{ marginBottom: '1rem' }}>
    <Typography 
      variant="h3" 
      color={color}
      className={className}
    >
      {title}
    </Typography>
  </div>
);

export const SectionParagraph: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <Typography 
    variant="body" 
    className={className}
  >
    {children}
  </Typography>
); 