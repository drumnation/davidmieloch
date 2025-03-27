import React from 'react';
import { StyledSkillsList, SkillItem } from './SkillsList.styles';
import { Skill, SkillsListProps } from './SkillsList.types';
import { TechIcon } from '../../../../shared-components/atoms/TechIcon';

export const SkillsList: React.FC<SkillsListProps> = ({ skills, showIcons = true }) => {
  return (
    <StyledSkillsList>
      {skills.map((skill: string | Skill, index: number) => {
        // Handle both string skills and object skills
        const isSkillObject = typeof skill !== 'string';
        const skillName = isSkillObject ? (skill as Skill).name : skill;
        const shouldShowIcon = showIcons && isSkillObject && (skill as Skill).icon;
        
        return (
          <SkillItem key={index}>
            {shouldShowIcon && (
              <TechIcon
                name={skillName}
                size={16}
                color={(skill as Skill).color}
                showLabel={false}
                showTooltip={true}
                className="skill-icon"
              />
            )}
            <span className="skill-name">{skillName}</span>
          </SkillItem>
        );
      })}
    </StyledSkillsList>
  );
}; 