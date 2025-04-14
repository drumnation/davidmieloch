import React from 'react';
import { motion } from 'framer-motion';
import { 
  BioSection, 
  BioSectionTitle
} from '../../Bio.styles';
import { SKILL_CATEGORIES } from '../../Bio.constants';
import { TechnicalExpertiseProps } from './TechnicalExpertise.types';
import { 
  CategoryGrid,
  CategoryContainer,
  CategoryTitle,
  CategorySkills,
} from './TechnicalExpertise.styles';
import { TechIcon } from '../../../../atoms/TechIcon';

// Framer Motion variants for animations
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  }
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    } 
  }
};

export const TechnicalExpertise: React.FC<TechnicalExpertiseProps> = ({ className }) => {
  return (
    <BioSection className={className} id="technical-expertise">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px 0px" }}
        variants={fadeInVariants}
      >
        <BioSectionTitle>
          Technical Expertise
        </BioSectionTitle>
      </motion.div>
      
      <CategoryGrid>
        {SKILL_CATEGORIES.map((category, index) => (
          <motion.div
            key={category.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px 0px" }}
            variants={scaleInVariants}
            transition={{ delay: index * 0.1 }}
          >
            <CategoryContainer>
              <CategoryTitle>{category.name}</CategoryTitle>
              <CategorySkills>
                {category.skills.map((skill) => (
                  <TechIcon 
                    key={skill} 
                    name={skill} 
                    size={20}
                    showLabel={false}
                    showTooltip={true}
                  />
                ))}
              </CategorySkills>
            </CategoryContainer>
          </motion.div>
        ))}
      </CategoryGrid>
    </BioSection>
  );
};

export default TechnicalExpertise; 