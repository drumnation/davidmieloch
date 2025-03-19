"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  CategoriesContainer,
  SectionTitle,
  SectionDescription,
  fadeIn,
  staggerContainer
} from './Categories.styles';
import { CategoriesProps } from './Categories.types';
import { CategoryCard } from '../CategoryCard';

export const Categories: React.FC<CategoriesProps> = ({ 
  className,
  categories 
}) => {
  return (
    <motion.div
      className={className}
      initial="visible"
      animate="visible"
      variants={staggerContainer}
    >
      <SectionTitle
        variants={fadeIn}
      >
        Key Development Practices
      </SectionTitle>
      <SectionDescription
        variants={fadeIn}
      >
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
    </motion.div>
  );
}; 