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
  link,
  IconComponent
}) => {
  // Check if description contains the break sequence
  const shouldBreak = description.includes('&<br />');
  const descriptionParts = shouldBreak ? description.split('&<br />') : [description];

  return (
    <Link href={link} style={{ textDecoration: 'none' }}>
      <PersonaCardContainer className="persona-card">
        <PersonaIcon>
          {IconComponent ? (
            <IconComponent size={24} color="#4361ee" />
          ) : (
            icon
          )}
        </PersonaIcon>
        <PersonaTitle>{title}</PersonaTitle>
        <PersonaDescription className="persona-description">
          {shouldBreak ? (
            <>{descriptionParts[0]}&<br />{descriptionParts[1]}</>
          ) : (
            descriptionParts[0]
          )}
        </PersonaDescription>
      </PersonaCardContainer>
    </Link>
  );
};

export default PersonaCard; 