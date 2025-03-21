import React from 'react';
import { useSpring, useInView, animated } from '@react-spring/web';
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
  CompactSkillTag
} from './TechnicalExpertise.styles';

// Create animated components
const AnimatedBioSectionTitle = animated(BioSectionTitle);
const AnimatedCategoryContainer = animated(CategoryContainer);

export const TechnicalExpertise: React.FC<TechnicalExpertiseProps> = ({ className }) => {
  // Heading animation
  const [headingRef, headingInView] = useInView({
    once: true,
    rootMargin: '0px 0px -100px 0px'
  });

  const headingAnimation = useSpring({
    opacity: headingInView ? 1 : 0,
    transform: headingInView ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 280, friction: 60 }
  });

  return (
    <BioSection className={className} id="technical-expertise">
      <AnimatedBioSectionTitle ref={headingRef} style={headingAnimation}>
        Technical Expertise
      </AnimatedBioSectionTitle>
      <CategoryGrid>
        {SKILL_CATEGORIES.map((category, index) => {
          const [ref, inView] = useInView({
            once: true,
            rootMargin: '0px 0px -50px 0px'
          });

          const animation = useSpring({
            opacity: inView ? 1 : 0,
            transform: inView ? 'scale(1)' : 'scale(0.95)',
            config: { tension: 280, friction: 60 },
            delay: index * 100
          });

          return (
            <AnimatedCategoryContainer 
              key={category.name}
              ref={ref}
              style={animation}
            >
              <CategoryTitle>{category.name}</CategoryTitle>
              <CategorySkills>
                {category.skills.map((skill) => (
                  <CompactSkillTag key={skill}>{skill}</CompactSkillTag>
                ))}
              </CategorySkills>
            </AnimatedCategoryContainer>
          );
        })}
      </CategoryGrid>
    </BioSection>
  );
};

export default TechnicalExpertise; 