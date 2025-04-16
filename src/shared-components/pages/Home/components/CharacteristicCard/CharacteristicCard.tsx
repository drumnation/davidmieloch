'use client';

import React from 'react';
import { 
  CardContainer, 
  IconWrapper, 
  Title, 
  Description 
} from './CharacteristicCard.styles';
import { CharacteristicCardProps } from '../../Home.types';

/**
 * Characteristic Card Component
 * Displays a card with an icon, title and description.
 * Used in the Full-Stack Business Person section.
 */
export const CharacteristicCard: React.FC<CharacteristicCardProps & { style?: React.CSSProperties }> = ({
  icon,
  title,
  description,
  style
}) => {
  return (
    <CardContainer className="characteristic-card" style={style}>
      <IconWrapper>{icon}</IconWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </CardContainer>
  );
};

export default CharacteristicCard; 