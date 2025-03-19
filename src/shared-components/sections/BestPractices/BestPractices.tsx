"use client";

import React, { useMemo } from 'react';
import { Hero } from '../../organisms/Hero';
import { 
  ContentSection,
  ContentContainer,
  Container,
  GlobalStyles
} from './BestPractices.styles';
import { BestPracticesProps } from './BestPractices.types';
import { PRACTICE_CATEGORIES } from './BestPractices.constants';
import { renderCategory } from './BestPractices.logic';
import {
  DetailedContent,
  Categories,
  Conclusion
} from './subcomponents';

export const BestPractices: React.FC<BestPracticesProps> = ({ id = 'best-practices', className }) => {
  // Hero props
  const heroProps = {
    title: "Best Practices",
    subtitle: "Modern Development Approaches",
    background: 'image' as const,
    backgroundImage: '/monitors.jpg',
    pattern: 'none' as const,
    textColor: 'light' as const,
    animation: 'fade-up' as const,
    className: 'best-practices-hero',
    initialAnimation: 'visible' as 'visible' | 'hidden',
    overlay: true,
    overlayOpacity: 0.6
  };

  const categories = useMemo(() => {
    return PRACTICE_CATEGORIES.map((category, index) => renderCategory(category, index));
  }, []);

  return (
    <Container id={id} className={className}>
      <GlobalStyles />
      
      <Hero {...heroProps} />
      
      <ContentSection>
        <ContentContainer>
          <DetailedContent />
          <Categories categories={categories} />
          <Conclusion />
        </ContentContainer>
      </ContentSection>
    </Container>
  );
};

export default BestPractices; 