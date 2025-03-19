import React from 'react';
import { motion } from 'framer-motion';
import { 
  BioSection, 
  BioSectionTitle, 
  SkillsContainer, 
  SkillTag,
  fadeIn,
  scaleIn
} from '../../Bio.styles';
import { SKILLS } from '../../Bio.constants';
import { TechnicalExpertiseProps } from './TechnicalExpertise.types';

export const TechnicalExpertise: React.FC<TechnicalExpertiseProps> = ({ className }) => {
  return (
    <BioSection className={className} id="technical-expertise">
      <BioSectionTitle variants={fadeIn}>Technical Expertise</BioSectionTitle>
      <SkillsContainer>
        {SKILLS.map((skill, index) => (
          <SkillTag 
            key={`skill-${index}`}
            as={motion.span}
            variants={scaleIn}
            whileHover={{ scale: 1.05 }}
          >
            {skill}
          </SkillTag>
        ))}
      </SkillsContainer>
    </BioSection>
  );
};

export default TechnicalExpertise; 