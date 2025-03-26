import React from 'react';
import { StyledSkillsList, SkillItem } from './SkillsList.styles';
import { SkillsListProps } from './SkillsList.types';

export const SkillsList: React.FC<SkillsListProps> = ({ skills }) => {
  return (
    <StyledSkillsList>
      {skills.map((skill, index) => (
        <SkillItem key={index}>{skill}</SkillItem>
      ))}
    </StyledSkillsList>
  );
}; 