"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  CategoriesContainer,
  SectionTitle,
  SectionDescription,
  CategoriesWrapper,
  fadeIn,
  staggerContainer
} from './Categories.styles';
import { CategoriesProps } from './Categories.types';
import { CategoryCard } from '../CategoryCard';

export const Categories: React.FC<CategoriesProps> = ({ 
  className,
  categories 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "-100px", threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <CategoriesWrapper 
      className={`${className} fade-in ${isVisible ? 'visible' : ''}`}
      ref={containerRef}
    >
      <SectionTitle className={isVisible ? 'visible' : ''}>
        Key Development Practices
      </SectionTitle>
      <SectionDescription className={isVisible ? 'visible' : ''}>
        A comprehensive approach to modern software development
      </SectionDescription>
      
      <CategoriesContainer>
        {categories.map((category) => (
          <CategoryCard 
            key={category.key}
            title={category.title}
            description={category.description}
            items={category.items}
          />
        ))}
      </CategoriesContainer>
    </CategoriesWrapper>
  );
}; 