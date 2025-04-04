import React from 'react';
import { Typography } from '../../../atoms/Typography';
import type { TypographyColor } from '../../../atoms/Typography/Typography.types';

export const SectionTitle: React.FC<{
  title: string;
  className?: string;
}> = ({ title, className = "mb-4" }) => (
  <Typography 
    variant="h2" 
    weight="bold"
    className={className}
  >
    {title}
  </Typography>
);

export const SectionSubtitle: React.FC<{
  title: string;
  className?: string;
  color?: TypographyColor;
}> = ({ title, className = "mb-4", color }) => (
  <Typography 
    variant="h3" 
    color={color}
    className={className}
  >
    {title}
  </Typography>
);

export const SectionParagraph: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "mb-0" }) => (
  <Typography 
    variant="body" 
    className={className}
  >
    {children}
  </Typography>
); 