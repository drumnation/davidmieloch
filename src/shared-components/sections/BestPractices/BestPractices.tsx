"use client";

import React, { useMemo, useState, useEffect, useRef } from 'react';
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
  const [isVisible, setIsVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "-100px", threshold: 0.1 }
    );
    
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    
    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);
  
  // Hero props
  const heroProps = {
    title: "Best Practices",
    subtitle: "Modern Approaches for Enterprise React and React Native Applications",
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
      
      <ContentSection 
        ref={contentRef}
        className="best-practices-content-section visible"
        style={{
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible'
        }}
      >
        <ContentContainer className="best-practices-content-container">
          <DetailedContent />
          <Categories categories={categories} />
          <Conclusion />
        </ContentContainer>
      </ContentSection>
    </Container>
  );
};

export default BestPractices; 