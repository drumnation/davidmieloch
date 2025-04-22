'use client';

import React from 'react';
import {
  CardContainer,
  IconWrapper,
  Title,
  Description
} from './CharacteristicCard.styles';
import { CharacteristicCardProps } from '../../Home.types';
import { IconType } from 'react-icons';

/**
 * Characteristic Card Component
 * Displays a card with an icon, title and description.
 * Used in the Full-Stack Business Person section.
 */
export const CharacteristicCard: React.FC<
  CharacteristicCardProps & {
    style?: React.CSSProperties;
    IconComponent?: React.ComponentType<{ size?: number; color?: string }>;
  }
> = ({
  icon,
  title,
  description,
  style,
  IconComponent
}) => {
    return (
      <CardContainer className="characteristic-card" style={style}>
        <IconWrapper>
          {IconComponent ? (
            <IconComponent size={36} color="#4361ee" />
          ) : (
            icon
          )}
        </IconWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </CardContainer>
    );
  };

export default CharacteristicCard; 