import React from 'react';
import { SectionHeadingProps } from './SectionHeading.types';
import { HeadingContainer, Icon, Title } from './SectionHeading.styles';

/**
 * Section Heading Component
 * Used for creating consistent section headings with icons
 */
export function SectionHeading({
  icon,
  title,
  className
}: SectionHeadingProps) {
  return (
    <HeadingContainer className={className}>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
    </HeadingContainer>
  );
} 