import { useEffect } from 'react';
import testClarityFeatures from '../../../utils/analytics-test';
import { PersonaNavItem } from './Home.types';

export const useHomeData = () => {
  // Performance optimization for image loading
  useEffect(() => {
    // Preload critical resources
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

    // Test Clarity analytics in development
    if (process.env.NODE_ENV === 'development') {
      testClarityFeatures();
    }
  }, []);

  // Hero section props
  const heroProps = {
    title: "David Mieloch",
    subtitle: "Full-Stack Business Person / Lean Tech Leader",
    description: "Bridging AI, Engineering, and Business Growth with deep technical expertise and broad business acumen to drive efficiency and results in lean, dynamic environments.",
    background: "image" as const,
    backgroundImage: "/connected-dots.jpg",
    textColor: 'light' as const,
    animation: 'fade-up' as const,
    cta: {
      primary: {
        text: 'Explore the FSBP Concept',
        link: '/#fsbp'
      },
      secondary: {
        text: 'View My Experience',
        link: '/experience'
      }
    }
  };

  // Persona-targeted navigation
  const personaNavData: PersonaNavItem[] = [
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

  // Meta data for the page
  const metaData = {
    description: "The Full-Stack Business Person: A strategic technologist bridging AI, engineering, and business growth with deep technical expertise and broad business acumen.",
    keywords: "Full-Stack Business Person, Lean Tech Leader, AI Strategy, React, Node.js, Team Transformation",
    ogTitle: "David Mieloch - Full-Stack Business Person / Lean Tech Leader",
    ogDescription: "The Full-Stack Business Person: A strategic technologist bridging AI, engineering, and business growth with deep technical expertise and broad business acumen.",
    ogImage: "/web-app-manifest-192x192.png",
    twitterTitle: "David Mieloch - Full-Stack Business Person / Lean Tech Leader",
    twitterDescription: "The Full-Stack Business Person: A strategic technologist bridging AI, engineering, and business growth with deep technical expertise and broad business acumen."
  };

  return {
    heroProps,
    personaNavData,
    metaData
  };
}; 