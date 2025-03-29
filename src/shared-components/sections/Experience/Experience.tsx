"use client";

import React, { useEffect, useState } from 'react';
import { 
  ExperienceContainer,
  GlobalStyles,
  fadeIn
} from './Experience.styles';
import { ExperienceProps } from './Experience.types';
import { TransitionDiv, TransitionContainer } from '../../../utils/animations/migration-helpers';

// Import our subcomponents
import { 
  ProfileSection, 
  ExperienceSection, 
  EducationSection, 
  SkillsSection,
  SideProjectsSection
} from './components';

// Import constants
import { PROFILE } from './components/ProfileSection/ProfileSection.constants';
import { SECTION_TITLE as EXPERIENCE_TITLE, WORK_EXPERIENCE, OLDER_EXPERIENCE } from './components/ExperienceSection/ExperienceSection.constants';
import { 
  SECTION_TITLE as EDUCATION_TITLE, 
  FORMAL_EDUCATION, 
  TECHNICAL_EDUCATION, 
  CONTINUOUS_LEARNING 
} from './components/EducationSection/EducationSection.constants';
import { 
  SECTION_TITLE as SKILLS_TITLE, 
  SKILL_CATEGORIES,
  ADDITIONAL_SKILL_CATEGORIES,
  TOOLING_SKILL_CATEGORIES,
  QUALITY_SKILL_CATEGORIES,
  INFRASTRUCTURE_SKILL_CATEGORIES
} from './components/SkillsSection/SkillsSection.constants';
import { SIDE_PROJECTS } from './components/SideProjectsSection/SideProjectsSection.constants';

export const Experience: React.FC<ExperienceProps> = ({ 
  id = 'experience', 
  className,
  sideProjects = SIDE_PROJECTS 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Use useEffect to trigger animations after mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Create profile actions for the profile section
  const profileActions = (
    <>
      <a href={PROFILE.SOCIAL_LINKS.LINKEDIN.URL} target="_blank" rel="noopener noreferrer" className="primary">
        {PROFILE.SOCIAL_LINKS.LINKEDIN.LABEL}
      </a>
      <a href={PROFILE.SOCIAL_LINKS.GITHUB.URL} target="_blank" rel="noopener noreferrer" className="secondary">
        {PROFILE.SOCIAL_LINKS.GITHUB.LABEL}
      </a>
      <a href={PROFILE.SOCIAL_LINKS.RESUME.URL} target="_blank" rel="noopener noreferrer" className="secondary">
        {PROFILE.SOCIAL_LINKS.RESUME.LABEL}
      </a>
    </>
  );

  // Combine education items
  const allEducationItems = [...FORMAL_EDUCATION, ...TECHNICAL_EDUCATION, ...CONTINUOUS_LEARNING];
  
  // Combine skill categories
  const allSkillCategories = [
    ...SKILL_CATEGORIES,
    ...ADDITIONAL_SKILL_CATEGORIES,
    ...TOOLING_SKILL_CATEGORIES,
    ...QUALITY_SKILL_CATEGORIES,
    ...INFRASTRUCTURE_SKILL_CATEGORIES
  ];

  // We only show WORK_EXPERIENCE in the main list
  // OLDER_EXPERIENCE will be displayed in an accordion by the ExperienceSection component
  const allExperiences = [...WORK_EXPERIENCE];

  return (
    <ExperienceContainer id={id} className={className}>
      <GlobalStyles />
      
      {/* Content Section */}
      <TransitionDiv
        variants={fadeIn}
        animate="visible"
        initial="visible"
        className="experience-content-section"
        style={{ opacity: 1 }}
      >
        <TransitionContainer
          className="experience-content-container"
          style={{ opacity: 1 }}
        >
          {/* Profile Section */}
          <ProfileSection 
            photoUrl={PROFILE.PHOTO.URL}
            name={PROFILE.BASIC_INFO.FULL_NAME}
            headline={PROFILE.BASIC_INFO.HEADLINE}
            summary={`${PROFILE.SUMMARY.INTRO} ${PROFILE.SUMMARY.EXPERIENCE} ${PROFILE.SUMMARY.SKILLS_OVERVIEW}`}
          />

          {/* Experience Section */}
          <ExperienceSection 
            experiences={allExperiences}
            title={EXPERIENCE_TITLE}
          />

          {/* Side Projects Section */}
          <SideProjectsSection 
            projects={sideProjects}
          />

          {/* Education Section */}
          <EducationSection 
            educationItems={allEducationItems}
            title={EDUCATION_TITLE}
          />

          {/* Skills Section */}
          <SkillsSection 
            skillCategories={allSkillCategories}
            title={SKILLS_TITLE}
          />
        </TransitionContainer>
      </TransitionDiv>
    </ExperienceContainer>
  );
};

export default Experience; 