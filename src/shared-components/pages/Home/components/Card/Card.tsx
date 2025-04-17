'use client';

import React, { ReactNode } from 'react';
import {
  CardContainer,
  CardIcon,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction
} from './Card.styles';

export interface CardProps {
  /**
   * Card content
   */
  children?: ReactNode;
  
  /**
   * Optional card title
   */
  title?: string;
  
  /**
   * Optional card description
   */
  description?: string;
  
  /**
   * Icon to display at the top of the card
   * Can be a string (emoji) or a ReactNode (component)
   */
  icon?: ReactNode;
  
  /**
   * Card variant
   */
  variant?: 'persona' | 'framework' | 'project';
  
  /**
   * Action element (button, link) to display at the bottom
   */
  action?: ReactNode;
  
  /**
   * Optional CSS class name
   */
  className?: string;
  
  /**
   * Additional styled custom styling
   */
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  description,
  icon,
  variant = 'framework',
  action,
  className,
  style
}) => {
  return (
    <CardContainer variant={variant} className={className} style={style}>
      {icon && <CardIcon>{icon}</CardIcon>}
      
      {title && <CardTitle>{title}</CardTitle>}
      
      {description && <CardDescription>{description}</CardDescription>}
      
      {children && <CardContent>{children}</CardContent>}
      
      {action && <CardAction>{action}</CardAction>}
    </CardContainer>
  );
}; 