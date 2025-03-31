import React from 'react';
import styled from 'styled-components';
import { Container, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { SEO } from '@/shared-components/SEO';
import { PageTitle } from '@/shared-components/atoms/PageTitle/PageTitle';
import { AnimatedPage } from '@/shared-components/atoms/AnimatedPage/AnimatedPage';
import { Header } from '@/shared-components/molecules/Header';
import { ExperienceList } from './components/ExperienceList';
import { ExperienceItem } from './components/ExperienceItem';
import { EducationItem } from './components/EducationItem';
import { SkillsList } from './components/SkillsList';
import { Accordion } from './components/Accordion';
import { Skill } from './components/SkillsList/SkillsList.types';
import { MediaItem } from './components/ExperienceItem/ExperienceItem.types';

// Import LinkedIn data
import profileData from '@/data/profile.json';
import positionsData from '@/data/positions.json';
import educationData from '@/data/education.json';
import skillsData from '@/data/skills.json';

// Helper function to validate and transform media items
const validateMediaItems = (mediaItems: any[] | undefined): MediaItem[] | undefined => {
  if (!mediaItems) return undefined;
  
  return mediaItems.map(item => {
    // Ensure type is one of the allowed values
    const validType = ['image', 'pdf', 'embed', 'link'].includes(item.type) 
      ? (item.type as 'image' | 'pdf' | 'embed' | 'link') 
      : 'link';
      
    return {
      ...item,
      type: validType,
      // Ensure width and height are of the correct type
      width: item.width || '100%',
      height: typeof item.height === 'number' ? item.height : 300
    };
  });
};

// Transform string skills into enhanced skills objects with icon information
const enhancedSkills: Array<Skill | string> = skillsData.slice(0, 20).map(skill => {
  // Map the most common skills to their icons
  const skillIcons: Record<string, string> = {
    'React.js': 'React.js',
    'React Native': 'React Native',
    'TypeScript': 'TypeScript',
    'Node.js': 'Node.js',
    'JavaScript': 'JavaScript',
    'MongoDB': 'MongoDB',
    'Redux': 'Redux',
    'Next.js': 'Next.js',
    'Webpack': 'Webpack',
    'GraphQL': 'GraphQL',
    'PostgreSQL': 'PostgreSQL',
    'HTML5': 'HTML5',
    'CSS': 'CSS',
    'Git': 'Git',
    'GitHub': 'GitHub',
    'Jest': 'Jest',
    'Storybook': 'Storybook',
    'styled-components': 'styled-components'
  };
  
  // If we have an icon mapping for this skill, return an enhanced object
  if (skillIcons[skill as string]) {
    return {
      name: skill as string,
      icon: skillIcons[skill as string]
    };
  }
  
  // Otherwise return the original string
  return skill;
});

// Helper function to sort education items by date (most recent first)
const sortEducationByDate = (items: any[]) => {
  return [...items].sort((a, b) => {
    // Convert string years to numbers
    const endYearA = parseInt(a.endDate.split(' ')[0], 10) || 0;
    const endYearB = parseInt(b.endDate.split(' ')[0], 10) || 0;
    
    if (endYearA !== endYearB) {
      return endYearB - endYearA; // Most recent first
    }
    
    // If end years are the same, sort by start date
    const startYearA = parseInt(a.startDate.split(' ')[0], 10) || 0;
    const startYearB = parseInt(b.startDate.split(' ')[0], 10) || 0;
    return startYearB - startYearA;
  });
};

export function ExperiencePage() {
  const sortedEducationData = sortEducationByDate(educationData);
  
  // Split positions into recent dev experience and older sales/marketing experience
  const recentPositions = positionsData.filter(position => 
    ['Scala', 'DrayNow, Inc.', 'OTG Management', 'Gramercy Tech'].includes(position.company)
  );
  
  const olderPositions = positionsData.filter(position => 
    !['Scala', 'DrayNow, Inc.', 'OTG Management', 'Gramercy Tech'].includes(position.company)
  );
  
  // Extract profile and positions data
  const { headline, summary } = profileData;

  // Animation variants for page transitions
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: "easeInOut"
      } 
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      } 
    }
  };

  // Custom styles for section titles with simple styling
  const titleStyle = {
    marginBottom: "2rem",
    borderBottom: "3px solid var(--mantine-color-blue-6)",
    paddingBottom: "0.5rem",
    display: "inline-block"
  };

  return (
    <>
      <SEO 
        title="Experience | David Mieloch" 
        description={`Professional background, work experience, and skills of ${profileData.fullName}`}
      />
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageVariants}
      >
        <Header />
        <Container size="lg" py="md">
          <Title order={1} mt="xl" style={titleStyle}>Experience</Title>
          
          <section className="skills-section" style={{ margin: '2rem 0' }}>
            <Title order={2} style={titleStyle}>Skills</Title>
            <SkillsList skills={enhancedSkills} showIcons={true} />
          </section>
          
          <section className="experience-section" style={{ margin: '2rem 0' }}>
            <Title order={2} style={titleStyle}>Work Experience</Title>
            <ExperienceList>
              {recentPositions.map((position, index) => (
                <ExperienceItem
                  key={index}
                  title={position.title}
                  company={position.company}
                  period={`${position.startDate} - ${position.endDate}`}
                  location={position.location}
                  description={position.description}
                  bulletPoints={position.bulletPoints}
                  logo={position.logoPath}
                  media={validateMediaItems(position.media)}
                />
              ))}
              
              {olderPositions.length > 0 && (
                <Accordion
                  title="Previous Sales & Marketing Experience"
                  subtitle="Click to expand and see earlier positions"
                  initiallyOpen={false}
                >
                  <ExperienceList>
                    {olderPositions.map((position, index) => (
                      <ExperienceItem
                        key={`older-${index}`}
                        title={position.title}
                        company={position.company}
                        period={`${position.startDate} - ${position.endDate}`}
                        location={position.location}
                        description={position.description}
                        bulletPoints={position.bulletPoints}
                        logo={position.logoPath}
                        media={validateMediaItems(position.media)}
                      />
                    ))}
                  </ExperienceList>
                </Accordion>
              )}
            </ExperienceList>
          </section>
          
          <section className="education-section" style={{ margin: '2rem 0' }}>
            <Title order={2} style={titleStyle}>Education</Title>
            <ExperienceList>
              {sortedEducationData.map((education, index) => (
                <EducationItem
                  key={index}
                  school={education.school}
                  degree={education.degree}
                  fieldOfStudy={education.fieldOfStudy}
                  period={`${education.startDate} - ${education.endDate}`}
                  description={education.description}
                  activities={education.activities}
                  logo={education.logoPath}
                  mediaUrl={education.mediaUrl}
                  mediaType={education.mediaType}
                  media={validateMediaItems(education.media)}
                />
              ))}
            </ExperienceList>
          </section>
        </Container>
      </motion.div>
    </>
  );
}

export default ExperiencePage; 