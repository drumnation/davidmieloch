import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { AnimationVariants } from '../../../utils/animations/migration-helpers';
import { MantineTheme } from '@mantine/core';

// Global styles for the Bio component
export const GlobalStyles = createGlobalStyle`
  .bio-hero-bg {
    min-height: 70vh !important;
    position: relative !important;
  }

  .bio-hero-bg::before {
    background-position: center center !important;
    background-size: cover !important;
    filter: brightness(0.9) contrast(1.1) saturate(1.1) !important;
    transform: scale(1.05);
    transition: transform 0.5s ease-out;
    animation: subtle-zoom 25s infinite alternate ease-in-out;
  }

  .bio-hero-bg::after {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background: radial-gradient(circle, transparent 40%, rgba(0,0,0,0.4) 100%) !important;
    pointer-events: none !important;
    z-index: 1 !important;
  }

  .bio-hero-bg h1 {
    font-size: 3.5rem !important;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6) !important;
    letter-spacing: -0.5px !important;
    font-weight: 800 !important;
    position: relative !important;
    z-index: 2 !important;
    color: ${({ theme }) => theme.white} !important;
  }

  .bio-hero-bg p {
    font-size: 1.5rem !important;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8) !important;
    max-width: 800px !important;
    margin: 0 auto !important;
    font-weight: 400 !important;
    position: relative !important;
    z-index: 2 !important;
    color: ${({ theme }) => theme.white} !important;
  }

  @keyframes subtle-zoom {
    0% {
      transform: scale(1.05) translateY(0);
    }
    100% {
      transform: scale(1.12) translateY(-8px);
    }
  }
  
  // Add CSS classes for transitions
  .bio-content-section {
    width: 100%;
    background-color: ${({ theme }) => theme.white};
    border-top-left-radius: ${({ theme }) => theme.radius.lg};
    border-top-right-radius: ${({ theme }) => theme.radius.lg};
    margin-top: -24px;
    position: relative;
    z-index: 2;
    padding-top: 5rem;
    padding-bottom: 5rem;
    box-shadow: ${({ theme }) => theme.shadows.md};
    display: flex;
    flex-direction: column;
    align-items: stretch;
    
    @media (max-width: 576px) {
      padding-top: 3.75rem;
      padding-bottom: 3.75rem;
      border-top-left-radius: ${({ theme }) => theme.radius.md};
      border-top-right-radius: ${({ theme }) => theme.radius.md};
      margin-top: -16px;
    }
  }
  
  .bio-content-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto 5rem;
    padding: 0 5rem;
    
    @media (max-width: 576px) {
      margin-bottom: 3.75rem;
      padding: 0 2rem;
    }
  }
  
  .icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
    
    @media (max-width: 576px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }
  
  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.gray[0]};
    border-radius: ${({ theme }) => theme.radius.md};
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: ${({ theme }) => theme.shadows.md};
    }
    
    svg {
      color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
      margin-bottom: 0.75rem;
    }
    
    span {
      font-size: 0.9rem;
      font-weight: 500;
    }
  }
`;

// Define consistent spacing variables that can be reused across components
export const SPACING = {
  section: '5rem',
  paragraph: '2rem',
  paragraphBreak: '2.5rem',
  element: '1.5rem',
  container: '2rem',

  // Responsive spacing for mobile
  mobile: {
    section: '3rem',
    paragraph: '1.5rem',
    paragraphBreak: '2rem',
    element: '1rem',
    container: '1.25rem'
  }
};

// Animation variants
export const fadeInUp: AnimationVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const fadeIn: AnimationVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const staggerContainer: AnimationVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const slideInLeft: AnimationVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const slideInRight: AnimationVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const scaleIn: AnimationVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const BioContainer = styled.section`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const ContentSection = styled.div`
  width: 100%;
  background-color: #fff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  margin-top: -24px;
  position: relative;
  z-index: 2;
  padding-top: ${SPACING.section};
  padding-bottom: ${SPACING.section};
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  
  @media (max-width: 576px) {
    padding-top: calc(${SPACING.section} * 0.75);
    padding-bottom: calc(${SPACING.section} * 0.75);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    margin-top: -16px;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto ${SPACING.section};
  padding: 0 ${SPACING.section};
  
  @media (max-width: 576px) {
    margin-bottom: calc(${SPACING.section} * 0.75);
    padding: 0 ${SPACING.container};
  }
`;

export const BioHeader = styled.div`
  text-align: center;
  margin-bottom: ${SPACING.section};
`;

export const BioTitle = styled.h1`
  font-size: 3rem;
  background: ${({ theme }) => theme.other.heroGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  line-height: 1.2;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

export const BioSubtitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.gray[6]};
  font-weight: 500;
  margin-bottom: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.25rem;
  }
`;

export const BioContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.125rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.gray[7]};
  margin-bottom: ${SPACING.section};
  
  h3 {
    margin-top: 1rem;
  }
  
  p {
    margin-bottom: ${SPACING.paragraph};
  }
  
  p:first-of-type::first-letter {
    font-size: 3.5rem;
    font-weight: 700;
    float: left;
    line-height: 1;
    padding-right: 0.5rem;
    color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
  }
`;

export const BioSection = styled.div`
  margin: ${SPACING.section} 0;
  width: 100%;
`;

export const BioSectionTitle = styled.h3`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
  margin-bottom: ${SPACING.paragraph};
  font-weight: 600;
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

export const MediaContainer = styled.div`
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const MediaItem = styled.div`
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const MediaTitle = styled.h4`
  font-size: 1.25rem;
  padding: 1rem;
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.colors.gray[7]};
  margin: 0;
`;

export const MediaDescription = styled.p`
  padding: 0 1rem 1rem;
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.colors.gray[6]};
  font-size: 0.875rem;
`;

export const EmbedContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  width: 100%;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
  font-weight: 600;
`;

export const Quote = styled.blockquote`
  font-style: italic;
  border-left: 4px solid ${({ theme }) => theme.colors[theme.primaryColor][6]};
  padding-left: 1.5rem;
  margin: 2rem 0;
  color: ${({ theme }) => theme.colors.gray[6]};
  font-size: 1.25rem;
  line-height: 1.8;
`;

export const TimelineContainer = styled.div`
  margin: 3rem 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 1.5rem;
    width: 4px;
    background: ${({ theme }) => theme.other.heroGradient};
    border-radius: ${({ theme }) => theme.radius.sm};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

export const TimelineItem = styled.div<{ itemIndex: number }>`
  display: flex;
  margin-bottom: 3rem;
  position: relative;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: ${props => props.itemIndex % 2 === 0 ? 'flex-end' : 'flex-start'};
    padding-left: ${props => props.itemIndex % 2 === 0 ? '0' : '50%'};
    padding-right: ${props => props.itemIndex % 2 === 0 ? '50%' : '0'};
  }
`;

export const TimelineContent = styled.div`
  background: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  width: calc(100% - 3rem);
  margin-left: 3rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 45%;
    margin-left: 0;
  }
`;

export const TimelineDot = styled.div`
  position: absolute;
  left: 1.5rem;
  top: 1.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors[theme.primaryColor][6]};
  transform: translateX(-50%);
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    left: 50%;
  }
`;

export const TimelineYear = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
  margin-bottom: 0.5rem;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
  justify-content: center;
`;

export const SkillTag = styled.span`
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.colors.gray[7]};
  padding: 0.75rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 1rem;
  font-weight: 500;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    background: ${({ theme }) => theme.colors[theme.primaryColor][6]};
    color: ${({ theme }) => theme.white};
  }
`; 