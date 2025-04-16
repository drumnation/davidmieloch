import React from 'react';
import { CharacteristicCardProps } from './CharacteristicCard.types';
import { Icon } from '../Icon';
import {
  CardContainer,
  IconContainer,
  Title,
  Description
} from './CharacteristicCard.styles';

/**
 * Characteristic Card Component
 * Displays a card with an icon, title and description.
 * Used in the Full-Stack Business Person section.
 */
export function CharacteristicCard({ 
  iconType, 
  title, 
  description,
  ...props
}: CharacteristicCardProps) {
  return (
    <CardContainer {...props}>
      <IconContainer>
        <Icon iconType={iconType} />
      </IconContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </CardContainer>
  );
} 