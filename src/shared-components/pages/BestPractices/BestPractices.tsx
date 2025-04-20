"use client";

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { SubNavController } from '@shared-components/navigation/PageSubNav';
import { SubNavItem } from '@shared-components/navigation/PageSubNav/PageSubNav.types';
import {
  IconInfoCircle, IconBrandReact, IconSpeedboat, IconComponents,
  IconBrandTypescript, IconFlask, IconBrandStorybook, IconPlugConnected,
  IconCircleCheck, IconToolsKitchen2, IconReportAnalytics, IconPackage,
  IconNotes, IconChecklist, IconLayoutGrid, IconGitBranch, IconTool,
  IconRocket, IconTrendingUp, IconFlag3, IconZoomCode, IconTargetArrow,
  IconUsersGroup
} from '@tabler/icons-react';

import { Hero } from '../../organisms/Hero';
import { PageContainer } from '../../layouts/PageContainer';
import {
  ContentSection,
  ContentContainer,
  Container,
  GlobalStyles,
  PageSeparator
} from './BestPractices.styles';
import { BestPracticesProps } from './BestPractices.types';
import { PRACTICE_CATEGORIES } from './BestPractices.constants';
import { renderCategory } from './BestPractices.logic';
import { DetailedContent } from './components/DetailedContent/DetailedContent';
import {
  Categories,
  Conclusion,
  LetsWorkTogether
} from './components';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { selectIsPlayerMinimized } from '@store/slices/playerUiSlice';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';

// Define Navigation Items
const bestPracticesNavItems: SubNavItem[] = [
  {
    id: 'bp-detailed-content', title: 'Introduction & Overview', level: 0, icon: <IconInfoCircle size={18} />,
  },
  { id: 'bp-intro-modern', title: 'Modern Practices', level: 1, icon: <IconBrandReact size={16} /> },
  { id: 'bp-intro-enterprise', title: 'Enterprise Acceleration', level: 1, icon: <IconSpeedboat size={16} /> },
  { id: 'bp-intro-components', title: 'Component Architecture', level: 1, icon: <IconComponents size={16} /> },
  { id: 'bp-intro-typescript', title: 'TypeScript Practices', level: 1, icon: <IconBrandTypescript size={16} /> },
  { id: 'bp-intro-testing', title: 'Testing Strategy', level: 1, icon: <IconFlask size={16} /> },
  { id: 'bp-intro-storybook', title: 'Storybook Documentation', level: 1, icon: <IconBrandStorybook size={16} /> },
  { id: 'bp-intro-bottleneck', title: 'Shared Library Bottleneck', level: 1, icon: <IconPlugConnected size={16} /> },
  { id: 'bp-intro-quality', title: 'Code Quality', level: 1, icon: <IconCircleCheck size={16} /> },
  { id: 'bp-intro-dev-env', title: 'Development Environment', level: 1, icon: <IconToolsKitchen2 size={16} /> },
  { id: 'bp-intro-performance', title: 'Performance Optimization', level: 1, icon: <IconReportAnalytics size={16} /> },
  { id: 'bp-intro-deps', title: 'Dependency Management', level: 1, icon: <IconPackage size={16} /> },
  { id: 'bp-intro-summary', title: 'Summary', level: 1, icon: <IconNotes size={16} /> },
  {
    id: 'bp-key-practices', title: 'Key Practice Areas', level: 0, icon: <IconChecklist size={18} />,
  },
  { id: 'component-architecture', title: 'Component Architecture', level: 1, icon: <IconLayoutGrid size={16} /> },
  { id: 'monorepo-architecture', title: 'Monorepo Architecture', level: 1, icon: <IconGitBranch size={16} /> },
  { id: 'modern-tooling', title: 'Modern Tooling', level: 1, icon: <IconTool size={16} /> },
  { id: 'comprehensive-testing', title: 'Comprehensive Testing', level: 1, icon: <IconFlask size={16} /> },
  { id: 'ci-cd-pipeline', title: 'CI/CD Pipeline', level: 1, icon: <IconRocket size={16} /> },
  { id: 'incremental-adoption', title: 'Incremental Adoption', level: 1, icon: <IconTrendingUp size={16} /> },
  {
    id: 'bp-conclusion', title: 'Conclusion', level: 0, icon: <IconFlag3 size={18} />,
  },
  { id: 'bp-conclusion-synergy', title: 'AI Synergy', level: 1, icon: <IconZoomCode size={16} /> },
  { id: 'bp-conclusion-future', title: 'Building for the Future', level: 1, icon: <IconTargetArrow size={16} /> },
  {
    id: 'lets-work-together', title: "Let's Work Together", level: 0, icon: <IconUsersGroup size={18} />
  },
];

export const BestPractices: React.FC<BestPracticesProps> = ({ id = 'best-practices', className, onReady }) => {
  const [isVisible, setIsVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  // Get player state from Redux store
  const isPlayerMinimized = useSelector(selectIsPlayerMinimized);

  // Check viewport size
  const theme = useMantineTheme();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "-100px", threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  // Hero props
  const heroProps = {
    title: "Best Practices",
    subtitle: "Modern Enterprise Approaches for Fullstack React and React Native Development",
    background: 'image' as const,
    backgroundImage: '/monitors.jpg',
    pattern: 'none' as const,
    textColor: 'light' as const,
    animation: 'fade-up' as const,
    className: 'best-practices-hero',
    backgroundOverlay: true,
    overlayOpacity: 0.6,
    onImageLoad: onReady
  };

  const categories = useMemo(() => {
    return PRACTICE_CATEGORIES.map((category, index) => renderCategory(category, index));
  }, []);

  return (
    <Container id={id} className={className}>
      <GlobalStyles />

      <Hero {...heroProps} />

      <ContentSection
        ref={contentRef}
        className={`best-practices-content-section ${isVisible ? 'visible' : ''}`}
      >
        <PageContainer>
          {/* Conditionally render SubNavController based on viewport and player state */}
          {(isDesktop || isPlayerMinimized) && <SubNavController items={bestPracticesNavItems} />}

          <div id="bp-detailed-content" style={{ scrollMarginTop: '100px' }}>
            <DetailedContent />
          </div>
          <PageSeparator />
          <div id="bp-key-practices" style={{ scrollMarginTop: '100px' }}>
            <Categories categories={categories} />
          </div>
          <div id="bp-conclusion" style={{ scrollMarginTop: '100px' }}>
            <Conclusion />
          </div>
          <div id="lets-work-together" style={{ scrollMarginTop: '100px' }}>
            <LetsWorkTogether />
          </div>
        </PageContainer>
      </ContentSection>
    </Container>
  );
};

export default BestPractices; 