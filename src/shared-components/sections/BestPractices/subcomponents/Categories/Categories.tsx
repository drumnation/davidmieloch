"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  CategoriesContainer,
  SectionTitle,
  SectionDescription,
  CategoriesWrapper,
  categoriesAnimations,
  CategoryGrid
} from './Categories.styles';
import { CategoriesProps, CategoryItem } from './Categories.types';
import { CategoryCard } from '../CategoryCard';
import { CategoryCardItemProps } from '../CategoryCard/CategoryCard.types';
import { ReactNativeFeature } from '../ReactNativeFeature';

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

  // Filter out the Modern Tooling category's Expo item for React Native feature section
  const filteredCategories = categories.map(category => {
    if (category.title === "Modern Tooling") {
      return {
        ...category,
        items: category.items.filter(item => item.title !== "Expo for Mobile Development")
      };
    }
    return category;
  });

  // Convert CategoryItem to CategoryCardItemProps by ensuring every item has a key
  const convertItemsToCardProps = (items: CategoryItem[], categoryKey: string): CategoryCardItemProps[] => {
    return items.map(item => ({
      ...item,
      key: item.key || `${categoryKey}-item-${item.title.toLowerCase().replace(/\s+/g, '-')}`
    }));
  };

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
        <CategoryGrid>
          {filteredCategories.map((category) => (
            <CategoryCard 
              key={category.key}
              title={category.title}
              description={category.description}
              items={convertItemsToCardProps(category.items, category.key)}
            />
          ))}
        </CategoryGrid>
        
        <ReactNativeFeature isVisible={isVisible} />
      </CategoriesContainer>
    </CategoriesWrapper>
  );
}; 