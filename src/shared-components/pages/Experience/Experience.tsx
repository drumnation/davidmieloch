"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { Grid, Box, useMantineTheme, Image, Avatar } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  ExperienceContainer,
  GlobalStyles,
  fadeIn,
} from './Experience.styles';
import { ExperienceProps } from './Experience.types';
import { TransitionDiv, TransitionContainer } from '@utils/animations/migration-helpers';
import { Hero } from '@shared-components/organisms/Hero';

import {
  ProfileSection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  SideProjectsSection
} from './components/index';

// Import constants
import { PROFILE } from './components/ProfileSection/ProfileSection.constants';
import {
  SECTION_TITLE as EXPERIENCE_TITLE,
  WORK_EXPERIENCE,
  OLDER_EXPERIENCE
} from './components/ExperienceSection/ExperienceSection.constants';
import { ExperienceItem } from './components/ExperienceSection/ExperienceSection.types';
import {
  SECTION_TITLE as EDUCATION_TITLE,
  FORMAL_EDUCATION,
  TECHNICAL_EDUCATION,
  CONTINUOUS_LEARNING
} from './components/EducationSection/EducationSection.constants';
import { EducationItem } from './components/EducationSection/EducationSection.types';
import {
  SECTION_TITLE as SKILLS_TITLE,
  SKILL_CATEGORIES,
  ADDITIONAL_SKILL_CATEGORIES,
  TOOLING_SKILL_CATEGORIES,
  QUALITY_SKILL_CATEGORIES,
  INFRASTRUCTURE_SKILL_CATEGORIES
} from './components/SkillsSection/SkillsSection.constants';
import {
  SIDE_PROJECTS,
  SECTION_TITLE as SIDE_PROJECTS_TITLE
} from './components/SideProjectsSection/SideProjectsSection.constants';
import { SideProject } from './components/SideProjectsSection/SideProjectsSection.types';

// Import SubNav components and utils
import { SubNavController, slugify, SubNavItem } from '@shared-components/navigation/PageSubNav';

// Import the sorting function
import { sortEducationByDate } from './components/EducationSection/EducationSection.utils';

// Import react-icons
import { FaUserCircle, FaCode, FaBullhorn, FaLightbulb, FaGraduationCap, FaTools } from 'react-icons/fa';

// Import Redux state and selector
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { selectIsPlayerMinimized } from '@store/slices/playerUiSlice';

// Define IDs for main sections AND new sub-sections
const PROFILE_SECTION_ID = 'profile-section';
const DEVELOPER_EXPERIENCE_SECTION_ID = 'developer-experience-section';
const SALES_MARKETING_EXPERIENCE_SECTION_ID = 'sales-marketing-experience-section';
const SIDE_PROJECTS_SECTION_ID = 'side-projects-section';
const EDUCATION_SECTION_ID = 'education-section';
const SKILLS_SECTION_ID = 'skills-section';

export const Experience: React.FC<ExperienceProps> = ({
  id = 'experience',
  className,
  sideProjects = SIDE_PROJECTS,
  heroProps,
  onReady
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const theme = useMantineTheme();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

  // Get player state from Redux store
  const isPlayerMinimized = useSelector((state: RootState) => selectIsPlayerMinimized(state));

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
  const combinedEducationItems = [...FORMAL_EDUCATION, ...TECHNICAL_EDUCATION, ...CONTINUOUS_LEARNING];
  // Sort the combined items using the *same logic* as the EducationSection component
  const allEducationItems = sortEducationByDate(combinedEducationItems);

  // --- DEBUGGING: Log the contents of the combined+sorted education items ---
  useEffect(() => {
    console.log('allEducationItems:', allEducationItems.map(item => item.school)); // Log just the school names for brevity
  }, [allEducationItems]); // Log when the array changes
  // --- END DEBUGGING ---

  // Combine skill categories
  const allSkillCategories = [
    ...SKILL_CATEGORIES,
    ...ADDITIONAL_SKILL_CATEGORIES,
    ...TOOLING_SKILL_CATEGORIES,
    ...QUALITY_SKILL_CATEGORIES,
    ...INFRASTRUCTURE_SKILL_CATEGORIES
  ];

  // Memoize the sorted experience arrays
  const devExperiences = useMemo(() => {
    return [...WORK_EXPERIENCE].sort((a, b) => {
      if (a.sortOrder !== undefined && b.sortOrder !== undefined) {
        return a.sortOrder - b.sortOrder;
      }
      const monthToNum: Record<string, number> = {
        'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
        'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
      };
      const aDateParts = a.startDate?.split(' ') ?? [];
      const bDateParts = b.startDate?.split(' ') ?? [];
      const aYear = parseInt(aDateParts[1] || '0', 10);
      const bYear = parseInt(bDateParts[1] || '0', 10);
      if (aYear !== bYear) {
        return bYear - aYear;
      }
      const aMonth = monthToNum[aDateParts[0]] || 0;
      const bMonth = monthToNum[bDateParts[0]] || 0;
      return bMonth - aMonth;
    });
  }, []); // Empty dependency array since WORK_EXPERIENCE is constant

  const salesExperiences = useMemo(() => {
    return [...OLDER_EXPERIENCE].sort((a, b) => {
      if (a.sortOrder !== undefined && b.sortOrder !== undefined) {
        return a.sortOrder - b.sortOrder;
      }
      const monthToNum: Record<string, number> = {
        'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
        'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
      };
      const aDateParts = a.startDate?.split(' ') ?? [];
      const bDateParts = b.startDate?.split(' ') ?? [];
      const aYear = parseInt(aDateParts[1] || '0', 10);
      const bYear = parseInt(bDateParts[1] || '0', 10);
      if (aYear !== bYear) {
        return bYear - aYear;
      }
      const aMonth = monthToNum[aDateParts[0]] || 0;
      const bMonth = monthToNum[bDateParts[0]] || 0;
      return bMonth - aMonth;
    });
  }, []); // Empty dependency array since OLDER_EXPERIENCE is constant

  // Sort side projects consistent with the hook's logic
  const sortedSideProjects = [...sideProjects].sort((a, b) => {
    const hasEndDateA = !!a.endDate;
    const hasEndDateB = !!b.endDate;
    if (hasEndDateA && !hasEndDateB) return -1;
    if (!hasEndDateA && hasEndDateB) return 1;
    if (hasEndDateA && hasEndDateB) {
      if (a.endDate === 'Present' && b.endDate !== 'Present') return -1;
      if (a.endDate !== 'Present' && b.endDate === 'Present') return 1;
      if (a.endDate !== 'Present' && b.endDate !== 'Present') {
        const yearA = parseInt(a.endDate || '0');
        const yearB = parseInt(b.endDate || '0');
        if (isNaN(yearA) || isNaN(yearB)) {
          return (a.endDate || '').localeCompare(b.endDate || '');
        }
        if (yearA !== yearB) return yearB - yearA;
      }
      return a.title.localeCompare(b.title);
    }
    return a.title.localeCompare(b.title);
  });

  // Generate Navigation Items including section icons
  const navItems: SubNavItem[] = [
    // Profile Section with Image Avatar
    {
      id: PROFILE_SECTION_ID,
      title: 'Profile',
      level: 0,
      icon: <Avatar src={PROFILE.PHOTO.URL} alt={PROFILE.BASIC_INFO.FULL_NAME} size={22} radius="xl" />
    },

    // Developer Experience Section
    {
      id: DEVELOPER_EXPERIENCE_SECTION_ID,
      title: 'Developer Experience',
      level: 0,
      icon: <Box style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaCode size={18} /></Box>
    },
    ...devExperiences.map(exp => {
      const id = slugify(`${exp.company}-${exp.title}`);
      let iconNode: React.ReactNode | undefined;
      const companyInitial = exp.company?.[0]?.toUpperCase() || '';
      if (exp.logoPath) { iconNode = <Box p={exp.showBorder ? 2 : 0} style={{ border: exp.showBorder ? '1px solid var(--mantine-color-gray-3)' : 'none', borderRadius: 'var(--mantine-radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22 }}><Image src={exp.logoPath} w={18} h={18} radius="xs" fit="contain" /></Box>; }
      else if (companyInitial) { const colorIndex = companyInitial.charCodeAt(0) % theme.colors[theme.primaryColor].length; const avatarColor = theme.colors[theme.primaryColor][colorIndex]; iconNode = <Box style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Avatar size={18} radius="sm" color={avatarColor}>{companyInitial}</Avatar></Box>; }
      return { id, title: exp.company, level: 1, icon: iconNode };
    }),

    // Add back Previous Sales & Marketing link pointing to the accordion
    {
      id: 'previous-sales-marketing-accordion',
      title: 'Tech Sales & Marketing Experience',
      level: 0,
      icon: <Box style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaBullhorn size={18} /></Box>
    },
    ...salesExperiences.map(exp => {
      const id = slugify(`${exp.company}-${exp.title}`);
      let iconNode: React.ReactNode | undefined;
      const companyInitial = exp.company?.[0]?.toUpperCase() || '';
      if (exp.logoPath) { iconNode = <Box p={exp.showBorder ? 2 : 0} style={{ border: exp.showBorder ? '1px solid var(--mantine-color-gray-3)' : 'none', borderRadius: 'var(--mantine-radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22 }}><Image src={exp.logoPath} w={18} h={18} radius="xs" fit="contain" /></Box>; }
      else if (companyInitial) { const colorIndex = companyInitial.charCodeAt(0) % theme.colors[theme.primaryColor].length; const avatarColor = theme.colors[theme.primaryColor][colorIndex]; iconNode = <Box style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Avatar size={18} radius="sm" color={avatarColor}>{companyInitial}</Avatar></Box>; }
      return { id, title: exp.company, level: 1, icon: iconNode };
    }),

    // Side Projects Section
    {
      id: SIDE_PROJECTS_SECTION_ID,
      title: SIDE_PROJECTS_TITLE,
      level: 0,
      icon: <Box style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaLightbulb size={18} /></Box>
    },
    ...sortedSideProjects.map(proj => {
      const id = slugify(proj.title);
      let iconNode: React.ReactNode | undefined;
      const projectInitial = proj.title?.[0]?.toUpperCase() || '';
      if (proj.logoPath) { iconNode = <Box p={proj.showBorder ? 2 : 0} style={{ border: proj.showBorder ? '1px solid var(--mantine-color-gray-3)' : 'none', borderRadius: 'var(--mantine-radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22 }}><Image src={proj.logoPath} w={18} h={18} radius="xs" fit="contain" /></Box>; }
      else if (projectInitial) { const colorIndex = projectInitial.charCodeAt(0) % theme.colors[theme.primaryColor].length; const avatarColor = theme.colors[theme.primaryColor][colorIndex]; iconNode = <Box style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Avatar size={18} radius="sm" color={avatarColor}>{projectInitial}</Avatar></Box>; }
      return { id, title: proj.title, level: 1, icon: iconNode };
    }),

    // Education Section
    {
      id: EDUCATION_SECTION_ID,
      title: EDUCATION_TITLE,
      level: 0,
      icon: <Box style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaGraduationCap size={18} /></Box>
    },
    ...allEducationItems.map(edu => {
      const id = slugify(`${edu.school}-${edu.fieldOfStudy || 'item'}`);
      let iconNode: React.ReactNode | undefined;
      const schoolInitial = edu.school?.[0]?.toUpperCase() || '';
      if (edu.logoPath) { iconNode = <Box style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Image src={edu.logoPath} w={18} h={18} radius="xs" fit="contain" /></Box>; }
      else if (schoolInitial) { const colorIndex = schoolInitial.charCodeAt(0) % theme.colors[theme.primaryColor].length; const avatarColor = theme.colors[theme.primaryColor][colorIndex]; iconNode = <Box style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Avatar size={18} radius="sm" color={avatarColor}>{schoolInitial}</Avatar></Box>; }
      return { id, title: edu.school, level: 1, icon: iconNode };
    }),

    // Skills Section
    {
      id: SKILLS_SECTION_ID,
      title: SKILLS_TITLE,
      level: 0,
      icon: <Box style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaTools size={18} /></Box>
    },
  ];

  return (
    <ExperienceContainer id={id} className={className}>
      <GlobalStyles />

      {/* Render Hero only if heroProps are provided */}
      {heroProps && (
        <Hero
          {...heroProps}
          onImageLoad={onReady}
        />
      )}

      {/* Content Section with Grid */}
      <TransitionDiv
        variants={fadeIn}
        animate="visible"
        className="experience-content-section"
        style={{ opacity: 1 }}
      >
        <Grid gutter="xl" style={{ width: '100%' }}>
          {/* Main Content Column */}
          <Grid.Col span={12}>
            <TransitionContainer
              className="experience-content-container"
              style={{ opacity: 1 }}
            >
              {/* Profile Section */}
              <Box id={PROFILE_SECTION_ID} style={{ scrollMarginTop: '100px' }}>
                <ProfileSection
                  photoUrl={PROFILE.PHOTO.URL}
                  name={PROFILE.BASIC_INFO.FULL_NAME}
                  headline={PROFILE.BASIC_INFO.HEADLINE}
                  summary={`${PROFILE.SUMMARY.INTRO} ${PROFILE.SUMMARY.EXPERIENCE} ${PROFILE.SUMMARY.SKILLS_OVERVIEW}`}
                />
              </Box>

              {/* Render Developer Experience */}
              <Box id={DEVELOPER_EXPERIENCE_SECTION_ID} style={{ scrollMarginTop: '100px' }}>
                <ExperienceSection
                  experiences={devExperiences}
                  title="Developer Experience"
                  generateId={(item: ExperienceItem) => slugify(`${item.company}-${item.title}`)}
                />
              </Box>

              {/* Side Projects Section */}
              <Box id={SIDE_PROJECTS_SECTION_ID} style={{ scrollMarginTop: '100px' }}>
                <SideProjectsSection
                  projects={sideProjects}
                  generateId={(item: SideProject) => slugify(item.title)}
                />
              </Box>

              {/* Education Section - receives the sorted items */}
              <Box id={EDUCATION_SECTION_ID} style={{ scrollMarginTop: '100px' }}>
                <EducationSection
                  educationItems={allEducationItems} // Pass the sorted items
                  title={EDUCATION_TITLE}
                  generateId={(item: EducationItem) => slugify(`${item.school}-${item.fieldOfStudy || 'item'}`)}
                />
              </Box>

              {/* Skills Section */}
              <Box id={SKILLS_SECTION_ID} style={{ scrollMarginTop: '100px' }}>
                <SkillsSection
                  skillCategories={allSkillCategories}
                  title={SKILLS_TITLE}
                />
              </Box>
            </TransitionContainer>
          </Grid.Col>

          {/* Navigation Controller - Renders Affix on Desktop, Burger/Drawer on Mobile */}
          {(isDesktop || isPlayerMinimized) && (
            <SubNavController items={navItems} title="Page Navigation" />
          )}
        </Grid>
      </TransitionDiv>
    </ExperienceContainer>
  );
};

export default Experience; 