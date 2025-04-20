"use client";

import React, { useEffect } from 'react';
import { Hero } from '../../organisms/Hero';
import {
  BioContainer,
  fadeIn,
  GlobalStyles
} from './Bio.styles';
import { BioPageProps } from './Bio.types';
import { TransitionDiv, TransitionContainer } from '@utils/animations/migration-helpers';
import { SubNavController } from '@shared-components/navigation/PageSubNav';
import { SubNavItem } from '@shared-components/navigation/PageSubNav/PageSubNav.types';
import {
  IconUser, IconMicrophone2, IconMessageCircle,
  IconCode, IconPlayerPlay, IconVolume,
  IconMusic, IconBusinessplan, IconTools,
  IconBrandReact, IconServer, IconDatabase, IconCloud,
  IconTestPipe, IconGauge, IconSettings,
  IconSchool, IconBrush, IconBuildingBridge, IconRoute, IconTargetArrow, IconEye
} from '@tabler/icons-react';
import { MEDIA_ITEMS, SKILL_CATEGORIES } from './Bio.constants';
import { TESTIMONIALS_DATA } from './components/Testimonials/testimonials.data';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { selectIsPlayerMinimized } from '@store/slices/playerUiSlice';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';

// Import components
import BioIntro from './components/BioIntro';
import TechnicalExpertise from './components/TechnicalExpertise';
import FeaturedMedia from './components/FeaturedMedia';
import Testimonials from './components/Testimonials';

// Helper to generate Level 1 items for media
const generateMediaNavItems = (): SubNavItem[] => {
  return MEDIA_ITEMS.map(item => ({
    id: `media-${item.title.toLowerCase().replace(/\s+/g, '-')}`,
    title: item.title,
    level: 1,
    icon: item.type === 'youtube' ? <IconPlayerPlay size={16} /> : <IconVolume size={16} />
  }));
};

// Helper to generate Level 1 items for testimonials
const generateTestimonialNavItems = (): SubNavItem[] => {
  const categoryIcons: Record<string, React.ReactNode> = {
    'Music': <IconMusic size={16} />,
    'Sales/Marketing': <IconBusinessplan size={16} />,
    'Software': <IconCode size={16} />
  };
  return TESTIMONIALS_DATA.map(category => ({
    id: `testimonials-${category.category.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}`,
    title: category.category,
    level: 1,
    icon: categoryIcons[category.category] || <IconMessageCircle size={16} />
  }));
};

// Helper to generate Level 1 items for expertise
const generateExpertiseNavItems = (): SubNavItem[] => {
  const categoryIcons: Record<string, React.ReactNode> = {
    'Frontend Development': <IconBrandReact size={16} />,
    'Backend & Infrastructure': <IconServer size={16} />,
    'Databases & Storage': <IconDatabase size={16} />,
    'Cloud & DevOps': <IconCloud size={16} />,
    'Testing & Quality Assurance': <IconTestPipe size={16} />,
    'Monitoring & Performance': <IconGauge size={16} />,
    'Tools & Methodologies': <IconSettings size={16} />
  };
  return SKILL_CATEGORIES.map(category => ({
    id: `expertise-${category.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`,
    title: category.name,
    level: 1,
    icon: categoryIcons[category.name] || <IconTools size={16} />
  }));
};

// Define the navigation items array with new Intro subsections
const biographyNavItems: SubNavItem[] = [
  {
    id: 'bio-intro',
    title: 'Introduction',
    level: 0,
    icon: <IconUser size={18} />
  },
  {
    id: 'bio-early-life',
    title: 'Early Life & Music',
    level: 1,
    icon: <IconSchool size={16} />
  },
  {
    id: 'bio-composition',
    title: 'Composition & Creative',
    level: 1,
    icon: <IconBrush size={16} />
  },
  {
    id: 'bio-bridge-to-tech',
    title: 'Bridge to Technology',
    level: 1,
    icon: <IconBuildingBridge size={16} />
  },
  {
    id: 'bio-return-to-eng',
    title: 'Return to Engineering',
    level: 1,
    icon: <IconRoute size={16} />
  },
  {
    id: 'bio-achievements',
    title: 'Achievements & Approach',
    level: 1,
    icon: <IconTargetArrow size={16} />
  },
  {
    id: 'bio-perspective',
    title: 'Unique Perspective',
    level: 1,
    icon: <IconEye size={16} />
  },
  {
    id: 'featured-media',
    title: 'Featured Media',
    level: 0,
    icon: <IconMicrophone2 size={18} />
  },
  ...generateMediaNavItems(),
  {
    id: 'testimonials',
    title: 'Testimonials',
    level: 0,
    icon: <IconMessageCircle size={18} />
  },
  ...generateTestimonialNavItems(),
  {
    id: 'technical-expertise',
    title: 'Technical Expertise',
    level: 0,
    icon: <IconCode size={18} />
  },
  ...generateExpertiseNavItems(),
];

export const BioPage: React.FC<BioPageProps> = ({
  id = 'bio',
  className,
  onReady
}) => {
  // Get player state from Redux store
  const isPlayerMinimized = useSelector(selectIsPlayerMinimized);

  // Check viewport size
  const theme = useMantineTheme();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

  useEffect(() => {
    // Placeholder for potential future logic
  }, []);

  // Hero props
  const heroProps = {
    title: "David Mieloch",
    subtitle: "Orchestrating Code · With Rhythmic Precision",
    background: 'image' as const,
    backgroundImage: '/orchestra.jpg',
    backgroundOverlay: true,
    overlayOpacity: 0.6,
    pattern: 'none' as const,
    textColor: 'light' as const,
    animation: 'fade-up' as const,
    className: 'bio-hero-bg',
    onImageLoad: onReady
  };

  return (
    <BioContainer id={id} className={className}>
      <GlobalStyles />

      <Hero {...heroProps} />

      {/* Conditionally render SubNavController */}
      {(isDesktop || isPlayerMinimized) && <SubNavController items={biographyNavItems} />}

      <TransitionDiv
        variants={fadeIn}
        animate="visible"
        className="bio-content-section"
        style={{ opacity: 1 }}
      >
        <TransitionContainer
          className="bio-content-container"
          style={{ opacity: 1 }}
        >
          <div id="bio-intro" style={{ scrollMarginTop: '100px' }}>
            <BioIntro />
          </div>
          <div id="featured-media" style={{ scrollMarginTop: '100px' }}>
            <FeaturedMedia />
          </div>
          <div id="testimonials" style={{ scrollMarginTop: '100px' }}>
            <Testimonials />
          </div>
          <div id="technical-expertise" style={{ scrollMarginTop: '100px' }}>
            <TechnicalExpertise />
          </div>
        </TransitionContainer>
      </TransitionDiv>
    </BioContainer>
  );
};

export default BioPage; 