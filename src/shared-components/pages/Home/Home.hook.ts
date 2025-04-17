"use client";

import { useEffect, useState } from 'react';
import testClarityFeatures from '../../../utils/analytics-test';
import { initClarity } from '@analytics/clarity';
import { PersonaNavItem } from './Home.types';
import { enhanceMetaDescription } from './Home.utils';

/**
 * Custom hook providing all data required for the Home page
 * @returns Object containing hero props, navigation data, meta data, and scroll state
 */
export const useHomeData = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  // Resource preloading and analytics setup
  useEffect(() => {
    // Preload critical resources for performance optimization
    preloadCriticalResources();

    // Initialize analytics in development mode
    initializeAnalytics();

    // Set up scroll listener
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero section props
  const heroProps = getHeroProps();

  // Persona-targeted navigation
  const personaNavData = getPersonaNavData();

  // Meta data for the page with enhanced description
  const metaData = getMetaData();

  return {
    heroProps,
    personaNavData,
    metaData,
    hasScrolled
  };
};

/**
 * Preload critical resources for improved performance
 */
const preloadCriticalResources = () => {
  const preloadLinks = [
    { href: '/web-app-manifest-192x192.png', as: 'image' },
    { href: '/images/ai-future.jpg', as: 'image' }
  ];
  
  preloadLinks.forEach(link => {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = link.href;
    preloadLink.as = link.as;
    document.head.appendChild(preloadLink);
  });
};

/**
 * Initialize analytics in development mode
 */
const initializeAnalytics = () => {
  if (process.env.NODE_ENV === 'development') {
    const clarityInitialized = initClarity();
    if (clarityInitialized) {
      testClarityFeatures();
    }
  }
};

/**
 * Get hero section props
 * @returns Hero component props
 */
const getHeroProps = () => {
  return {
    title: "David Mieloch",
    subtitle: "Staff-Level Full-Stack Engineer · AI-Native Systems Thinker",
    tagline: "I help engineering teams unlock 10x efficiency through scalable architectures, agentic workflows, and AI-native product design.",
    background: "image" as const,
    backgroundImage: "/connected-dots.jpg",
    backgroundOverlay: false,
    textColor: 'light' as const,
    animation: 'fade-up' as const,
    cta: {
      primary: {
        text: '🔍 View My Experience',
        link: '/experience'
      },
      secondary: {
        text: '💡 Discover How I Work',
        link: '#fsbp-concept'
      }
    }
  };
};

/**
 * Get persona navigation data
 * @returns Array of persona navigation items
 */
const getPersonaNavData = (): PersonaNavItem[] => {
  return [
    {
      title: 'For CEOs',
      icon: '👑',
      description: 'Business impact & ROI',
      link: '/enterprise-ai-development-framework?persona=ceo'
    },
    {
      title: 'For CTOs',
      icon: '🔧',
      description: 'Technical vision & scalability',
      link: '/enterprise-ai-development-framework?persona=cto'
    },
    {
      title: 'For Engineering Managers',
      icon: '👨‍💻',
      description: 'Team practices & mentorship',
      link: '/fullstack-react-best-practices-integration?persona=em'
    },
    {
      title: 'For Recruiters',
      icon: '🔎',
      description: 'Skills & experience overview',
      link: '/bio?persona=recruiter'
    }
  ];
};

/**
 * Get meta data for the page
 * @returns Meta data object
 */
const getMetaData = () => {
  const baseDescription = "The Full-Stack Business Person: A strategic technologist bridging AI, engineering, and business growth with deep technical expertise and broad business acumen.";
  const keywords = ["Full-Stack Business Person", "Lean Tech Leader", "AI Strategy", "React", "Node.js", "Team Transformation"];
  
  // Use utility to enhance description with keywords
  const enhancedDescription = enhanceMetaDescription(baseDescription, keywords);
  
  return {
    description: enhancedDescription,
    keywords: keywords.join(", "),
    ogTitle: "David Mieloch - Full-Stack Business Person / Lean Tech Leader",
    ogDescription: enhancedDescription,
    ogImage: "/web-app-manifest-192x192.png",
    twitterTitle: "David Mieloch - Full-Stack Business Person / Lean Tech Leader",
    twitterDescription: enhancedDescription
  };
}; 