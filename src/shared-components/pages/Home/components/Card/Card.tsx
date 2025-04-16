'use client';

import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

// Theme colors for consistency
const theme = {
  background: {
    primary: '#0a0c1e',
    card: '#1b1d3a',
    cardHover: '#21254a'
  },
  text: {
    primary: '#ffffff',
    secondary: '#c8d2f0',
    muted: '#94a3b8'
  },
  accent: {
    primary: '#4361ee',
    secondary: '#7209b7',
    gradient: 'linear-gradient(90deg, #4361ee, #7209b7)'
  }
};

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
   */
  icon?: string;
  
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

const CardContainer = styled.div<{ variant?: string }>`
  display: flex;
  flex-direction: column;
  flex: 1 1 280px;
  min-width: 280px;
  background: ${theme.background.card};
  color: ${theme.text.primary};
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  padding: 28px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
    background: ${theme.background.cardHover};
  }
  
  ${props => props.variant === 'persona' && css`
    text-align: center;
    background: linear-gradient(145deg, #212346, #171933);
    border: 1px solid rgba(255, 255, 255, 0.05);
  `}
  
  ${props => props.variant === 'framework' && css`
    background: linear-gradient(145deg, #1e214a, #191b38);
    border-left: 4px solid ${theme.accent.primary};
  `}
  
  ${props => props.variant === 'project' && css`
    background: linear-gradient(145deg, #232752, #1a1d3d);
    border-left: 4px solid ${theme.accent.secondary};
  `}
`;

const CardIcon = styled.div`
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const CardTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: ${theme.text.primary};
  letter-spacing: -0.01em;
`;

const CardDescription = styled.div`
  font-size: 1rem;
  color: ${theme.text.secondary};
  margin-bottom: 1.5rem;
  flex-grow: 1;
  line-height: 1.6;
`;

const CardContent = styled.div`
  flex-grow: 1;
  margin-bottom: 1.25rem;
`;

const CardAction = styled.div`
  margin-top: auto;
`;

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

export default Card; 