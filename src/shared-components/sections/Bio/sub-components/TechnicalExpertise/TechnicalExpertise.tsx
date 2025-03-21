import React from 'react';
import { 
  BioSection, 
  BioSectionTitle,
  fadeIn,
  scaleIn
} from '../../Bio.styles';
import { SKILL_CATEGORIES } from '../../Bio.constants';
import { TechnicalExpertiseProps } from './TechnicalExpertise.types';
import { 
  CategoryGrid,
  CategoryContainer,
  CategoryTitle,
  CategorySkills,
  CompactSkillTag
} from './TechnicalExpertise.styles';

export const TechnicalExpertise: React.FC<TechnicalExpertiseProps> = ({ className }) => {
  return (
    <BioSection className={className} id="technical-expertise">
      <BioSectionTitle variants={fadeIn}>Technical Expertise</BioSectionTitle>
      <CategoryGrid>
        {SKILL_CATEGORIES.map((category, categoryIndex) => (
          <CategoryContainer 
            key={`category-${categoryIndex}`}
            variants={fadeIn}
          >
            <CategoryTitle>{category.name}</CategoryTitle>
            <CategorySkills>
              {category.skills.map((skill, skillIndex) => (
                <CompactSkillTag 
                  key={`skill-${categoryIndex}-${skillIndex}`}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </CompactSkillTag>
              ))}
            </CategorySkills>
          </CategoryContainer>
        ))}
      </CategoryGrid>
    </BioSection>
  );
};

export default TechnicalExpertise; 