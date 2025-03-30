import React from 'react';
import { StyledExperienceList } from './ExperienceList.styles';
import { ExperienceListProps } from './ExperienceList.types';

export const ExperienceList: React.FC<ExperienceListProps> = ({ children }) => {
  return <StyledExperienceList>{children}</StyledExperienceList>;
}; 