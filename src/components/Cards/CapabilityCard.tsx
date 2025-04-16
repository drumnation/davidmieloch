import React from 'react';
import { 
  CapabilityCardContainer, 
  IconWrapper, 
  CardTitle, 
  CardDescription 
} from './CapabilityCard.styles';

interface CapabilityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

/**
 * CapabilityCard component displays a capability with an icon, title, and description
 */
export const CapabilityCard: React.FC<CapabilityCardProps> = ({ 
  title, 
  description, 
  icon 
}) => {
  return (
    <CapabilityCardContainer>
      <IconWrapper>{icon}</IconWrapper>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CapabilityCardContainer>
  );
}; 