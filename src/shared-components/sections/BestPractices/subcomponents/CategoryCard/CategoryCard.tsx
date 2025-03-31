"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  CategoryCardContainer,
  CategoryTitle,
  CategoryDescription,
  ItemsList,
  Item,
  ItemIcon,
  ItemContent,
  ItemTitle,
  ItemDescription
} from './CategoryCard.styles';
import { CategoryCardProps } from './CategoryCard.types';

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title,
  description,
  items
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    // Store a reference to the current value of cardRef
    const currentCardRef = cardRef.current;
    
    if (currentCardRef) {
      observer.observe(currentCardRef);
    }
    
    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []);

  return (
    <CategoryCardContainer
      ref={cardRef}
      className={isVisible ? 'visible' : 'hidden'}
    >
      <CategoryTitle>{title}</CategoryTitle>
      <CategoryDescription>{description}</CategoryDescription>
      <ItemsList>
        {items.map((item) => (
          <Item key={item.key}>
            <ItemIcon>{item.icon}</ItemIcon>
            <ItemContent>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDescription>{item.description}</ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemsList>
    </CategoryCardContainer>
  );
}; 