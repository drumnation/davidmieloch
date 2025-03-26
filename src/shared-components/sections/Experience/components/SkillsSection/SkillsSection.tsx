import React from 'react';
import * as TablerIcons from '@tabler/icons-react';
import { 
  SectionContainer,
  SkillsContainer, 
  SkillsCategoryColumn, 
  SkillsCategoryTitle, 
  SkillsGrid, 
  SkillTag 
} from './SkillsSection.styles';
import { SkillsSectionProps } from './SkillsSection.types';

export const SkillsSection: React.FC<SkillsSectionProps> = ({ 
  skillCategories,
  title = 'Skills',
  className,
  children,
  renderIcon
}) => {
  return (
    <SectionContainer className={className}>
      <h2>{title}</h2>
      
      {children}
      
      <SkillsContainer>
        {skillCategories.map((category, categoryIndex) => (
          <SkillsCategoryColumn key={`category-${categoryIndex}`}>
            <SkillsCategoryTitle style={{ color: category.color }}>
              {category.category}
            </SkillsCategoryTitle>
            <SkillsGrid>
              {category.skills.map((skill, skillIndex) => {
                // Get the icon component from Tabler Icons
                const iconName = skill.icon || '';
                const IconComponent = iconName in TablerIcons 
                  ? TablerIcons[iconName as keyof typeof TablerIcons] as React.FC<{ size: number; style: React.CSSProperties }>
                  : null;
                
                return (
                  <SkillTag key={`skill-${categoryIndex}-${skillIndex}`}>
                    {renderIcon ? (
                      renderIcon(iconName, category.color)
                    ) : IconComponent ? (
                      <IconComponent
                        size={18}
                        style={{ 
                          marginRight: '8px', 
                          color: category.color 
                        }}
                      />
                    ) : null}
                    {skill.name}
                  </SkillTag>
                );
              })}
            </SkillsGrid>
          </SkillsCategoryColumn>
        ))}
      </SkillsContainer>
    </SectionContainer>
  );
}; 