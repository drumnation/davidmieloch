import React from 'react';
import styled from 'styled-components';
import { SEO } from '@/shared-components/SEO';
import { Container } from '@/shared-components/atoms/Container';
import { Header } from '@/shared-components/molecules/Header';
import { PageTitle } from '@/shared-components/atoms/PageTitle';
import { AnimatedPage } from '@/shared-components/atoms/AnimatedPage';
import { ExperienceList } from './components/ExperienceList';
import { ExperienceItem } from './components/ExperienceItem';
import { EducationItem } from './components/EducationItem';
import { SkillsList } from './components/SkillsList';
import { Accordion } from './components/Accordion';
import { Skill } from './components/SkillsList/SkillsList.types';

// Import LinkedIn data
import profileData from '@/data/profile.json';
import positionsData from '@/data/positions.json';
import educationData from '@/data/education.json';
import skillsData from '@/data/skills.json';

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

const StyledExperiencePage = styled(AnimatedPage)`
  .skills-section,
  .experience-section,
  .education-section {
    margin: 2rem 0;
  }

  h2 {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 50px;
      height: 3px;
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

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
  
  return (
    <>
      <SEO 
        title="Experience | David Mieloch" 
        description={`Professional background, work experience, and skills of ${profileData.fullName}`}
      />
      <StyledExperiencePage>
        <Header />
        <Container>
          <PageTitle>Experience</PageTitle>
          
          <section className="skills-section">
            <h2>Skills</h2>
            <SkillsList skills={enhancedSkills} showIcons={true} />
          </section>
          
          <section className="experience-section">
            <h2>Work Experience</h2>
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
                  media={position.media}
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
                        media={position.media}
                      />
                    ))}
                  </ExperienceList>
                </Accordion>
              )}
            </ExperienceList>
          </section>
          
          <section className="education-section">
            <h2>Education</h2>
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
                  media={education.media}
                />
              ))}
            </ExperienceList>
          </section>
        </Container>
      </StyledExperiencePage>
    </>
  );
}

export default ExperiencePage; 