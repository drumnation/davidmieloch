'use client';

import React from 'react';
import Link from 'next/link';
import { 
  PersonaCardContainer, 
  PersonaIcon, 
  PersonaTitle, 
  PersonaDescription 
} from './PersonaCard.styles';
import { PersonaCardProps } from './PersonaCard.types';

export const PersonaCard: React.FC<PersonaCardProps> = ({
  icon,
  title,
  description,
  link
}) => {
  return (
    <Link href={link} style={{ textDecoration: 'none' }}>
      <PersonaCardContainer className="persona-card">
        <PersonaIcon>{icon}</PersonaIcon>
        <PersonaTitle>{title}</PersonaTitle>
        <PersonaDescription className="persona-description">{description}</PersonaDescription>
      </PersonaCardContainer>
    </Link>
  );
};

export default PersonaCard; 