"use client";

import React from 'react';
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
  return (
    <CategoryCardContainer
      initial="visible"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
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