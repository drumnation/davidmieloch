"use client";

import styled from 'styled-components';
import { Container, Box } from '@mantine/core'; // Import Mantine components
import GenericSection from '@shared-components/molecules/GenericSection'; // Use default import syntax

// Define theme colors for consistency
export const theme = {
  background: {
    primary: '#0a0c1e',
    card: '#10131f',
    cardHover: '#191d35'
  },
  text: {
    primary: '#ffffff',
    secondary: '#e2e8f0',
    muted: '#cbd5e1'
  },
  accent: {
    primary: '#4361ee',
    secondary: '#7209b7',
    gradient: 'linear-gradient(90deg, #4361ee, #7209b7)'
  },
  glow: {
    standard: '0 0 15px rgba(93, 156, 255, 0.25)',
    hover: '0 0 20px rgba(93, 156, 255, 0.4)'
  }
};

export const HomeContainer = styled(Container)`
  min-height: calc(100vh - 60px); /* Subtract header height */
  width: 100%;
  padding: 0;
  position: relative;

  // Add side shadows using pseudo-elements on wider screens
  @media (min-width: 1200px) { // Use standard pixel value for lg breakpoint
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50px; // Width of the shadow effect
      pointer-events: none; // Ensure they don't interfere with interaction
    }

    &::before {
      left: 0;
      transform: translateX(-100%);
      background: linear-gradient(to left, rgba(0, 0, 0, 0.08), transparent);
    }

    &::after {
      right: 0;
      transform: translateX(100%);
      background: linear-gradient(to right, rgba(0, 0, 0, 0.08), transparent);
    }
  }

  /* === Carousel Control Overrides === */
  /*
  .mantine-Carousel-controls {
    // ... removed flex styles ...
  }

  .mantine-Carousel-control {
    // ... removed control styles ...
  }

  .mantine-Carousel-indicators {
     // ... removed indicator styles ...
  }

  .mantine-Carousel-indicator {
     // ... removed indicator styles ...
  }
  */
  /* === End Carousel Control Overrides === */
`;

export const FullWidthBackgroundWrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  margin-left: calc(-50vw + 50%);
  z-index: -1;
  // Use theme color - Note: Theme needs to be provided via ThemeProvider for this to work
  // background-color: ${({ theme }) => theme.colors.dark[8]}; 
  background-color: #1A1B1E; // Fallback to direct value if ThemeProvider is not setup here
`;

export const HomePageContainer = styled.div`
  width: 100%;
  background-color: ${theme.background.primary};
  color: ${theme.text.primary};
  min-height: 100vh;
`;

// Add cylindrical glow and dark theme to Hero section
export const HeroSection = styled.div`
  position: relative;
  background: radial-gradient(ellipse at center, #0a0e2a 20%, #000000 100%);
  overflow: hidden;
  
  .cylinder-backdrop {
    position: absolute;
    top: -30%;
    left: 0;
    width: 100%;
    height: 150%;
    background: radial-gradient(ellipse at center, #1e1e42 10%, transparent 80%);
    z-index: 0;
  }
  
  .hero-content {
    position: relative;
    z-index: 1;
  }
`;

// Curve overlay for the hero section to create a wave effect
export const CurveOverlay = styled.div`
  position: relative;
  height: 50px;
  margin-top: -50px;
  z-index: 10;
  background-color: ${theme.background.primary};
  border-top-left-radius: 50% 80px;
  border-top-right-radius: 50% 80px;
  transform: translateY(1px); /* Ensure there's no gap */
  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    height: 30px;
    margin-top: -30px;
    border-top-left-radius: 50% 50px;
    border-top-right-radius: 50% 50px;
  }
`;

export const PersonaNav = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 4rem auto;
  max-width: 800px;
  align-items: stretch;
`;

export const FrameworksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  
  & > div {
    background: linear-gradient(to right, #1e1e2f, #232342);
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(to right, #2f2f48, #363656);
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    
    h3, .card-title {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    p, .card-description {
      margin-bottom: 1.5rem;
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: 
    "card1 card2"
    "card3 card3";
  gap: 2rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  
  & > div {
    min-height: 280px;
    
    h3, .card-title {
      min-height: 3.5rem;
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    p, .card-description {
      min-height: 3rem;
      margin-bottom: 1.5rem;
    }
  }
  
  & > div:nth-child(1) {
    grid-area: card1;
  }
  
  & > div:nth-child(2) {
    grid-area: card2;
  }
  
  & > div:nth-child(3) {
    grid-area: card3;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas: 
      "card1"
      "card2"
      "card3";
  }
`;

// Shared grid component for card-based sections
export const CardGridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// Updated dark card style with better contrast and consistent hover
export const DarkCard = styled.div`
  background: ${theme.background.card};
  color: ${theme.text.primary};
  border-radius: 12px;
  padding: 1.75rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.glow.hover};
    background: ${theme.background.cardHover};
  }
  
  strong {
    font-size: 1.1rem;
    font-weight: 700;
    display: block;
    margin-bottom: 0.75rem;
    letter-spacing: -0.01em;
    color: ${theme.text.primary};
  }
  
  p {
    color: ${theme.text.secondary};
    line-height: 1.6;
    margin-top: 0.5rem;
    font-size: 0.95rem;
  }
`;

// CTA Box for bottom blocks with consistent styling
export const CTABox = styled.div`
  background: rgba(16, 19, 31, 0.7);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  color: ${theme.text.primary};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s, color 0.3s;
  
  &:hover {
    background: #10131f;
    color: #f5f7fa;
    box-shadow: 0 0 0 1.5px #3f51b5, 0 8px 24px rgba(16,19,31,0.25);
    transform: scale(1.03);
  }

  h4, p {
    transition: color 0.3s;
  }

  &:hover h4,
  &:hover p {
    color: #f5f7fa;
  }

  a {
    margin-top: auto;
  }
`;

// CTA Grid for bottom blocks
export const CTAGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

// Standardized section body text
export const SectionBodyText = styled.p`
  color: ${theme.text.secondary}; /* Light color for dark background */
  line-height: 1.6;
  margin-top: 0;
  margin-bottom: 2.5rem;
  font-size: 1rem;
  max-width: 780px;
  margin-left: auto;
  margin-right: auto;
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

export const Badge = styled.span<{ color?: string; bg: string }>`
  background: ${props => props.bg};
  color: ${props => props.color || theme.text.primary};
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: 6px;
  display: inline-block;
`;

export const ViewAllContainer = styled.div`
  text-align: center;
  margin-top: 2.5rem;
  padding-top: 1rem;
`;

// Consistent section spacing
export const StyledGenericSection = styled(GenericSection)`
  padding: 3rem 1.5rem;
  background-color: ${theme.background.primary};
  position: relative;
  z-index: 5; /* Ensure it's above the curve overlay */
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

// Alternate section with slightly different background
export const AlternateGenericSection = styled(GenericSection)`
  padding: 3rem 1.5rem;
  background-color: ${theme.background.primary};
  position: relative;
  z-index: 5;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

// Blue tinted section for frameworks
export const BlueTintGenericSection = styled(GenericSection)`
  padding: 3rem 1.5rem;
  padding-bottom: 6rem;
  background-color: #121530; /* Slightly blue-tinted background */
  position: relative;
  z-index: 5;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
    padding-bottom: 5rem;
  }
`;

// Gray tinted section for Live Proof Projects
export const GrayBackgroundSection = styled(GenericSection)`
  padding: 3rem 1.5rem;
  background-color: #1a1a2e; /* More distinctly different background */
  position: relative;
  z-index: 5;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

// Gray background section for Projects
export const DarkGrayBackgroundSection = styled(GenericSection)`
  padding: 3rem 1.5rem;
  background-color: #111827; /* Simple dark gray background */
  position: relative;
  z-index: 5;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

// Update SectionDivider to be more visible on dark background
export const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(67, 97, 238, 0), rgba(67, 97, 238, 0.3), rgba(67, 97, 238, 0));
  margin: 3rem 0 2rem;
`;

// Update SectionWrapper to use dark background
export const SectionWrapper = styled.div`
  padding-bottom: 6rem;
  background-color: ${theme.background.primary};
`;

// Button group with consistent styling
export const ButtonGroup = styled.div`
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  margin-bottom: 2.5rem;
  justify-content: center;
`;

// Sticky CTA Footer
export const StickyFooter = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(16, 19, 31, 0.95);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
  padding: 1.25rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translateY(${props => props.visible ? '0' : '100%'});
  transition: transform 0.3s ease;
  z-index: 100;
  color: ${theme.text.primary};
  backdrop-filter: blur(8px);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

// Highlighted text component
export const Highlight = styled.span`
  background: ${theme.accent.gradient};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 700;
`;

// Typography components for consistency
export const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${theme.text.primary}; /* Light color for dark background */
  margin: 0 0 1.5rem 0;
  letter-spacing: 0.5px;
  text-align: center;
`;

export const SectionSubtitle = styled.div`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.875rem;
  color: ${theme.text.muted};
  margin-bottom: 0.75rem;
  text-align: center;
`;

// Animation wrapper for fade-in effects
export const FadeInSection = styled.div`
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.8s ease forwards;
  animation-delay: ${props => props.style?.animationDelay || '0s'};
  
  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Add a styled component for CTA descriptions
export const CTADescription = styled.p`
  color: #fff;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

// Update HighlightBox for dark theme
export const HighlightBox = styled.span`
  background: rgba(67, 97, 238, 0.2);
  color: ${theme.text.primary};
  font-weight: 700;
  border-radius: 6px;
  padding: 0.1em 0.4em;
  margin: 0 0.1em;
  font-size: 1em;
  display: inline-block;
`;

// StandOut section for highlighting key differentiating factors
export const StandOutSection = styled.section`
  background-color: rgba(16, 19, 31, 0.7); /* Dark with slight transparency */
  padding: 3rem 2rem;
  border-radius: 12px;
  position: relative;
  z-index: 5;
  max-width: 780px;
  margin: 3rem auto;
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin: 2rem auto;
  }
`;

export const StandOutTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${theme.text.primary}; /* Light color for dark background */
  display: flex;
  align-items: center;
`;

export const StandOutList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const StandOutItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  color: ${theme.text.secondary}; /* Light color for dark background */
  font-size: 1.1rem;
  line-height: 1.6;
  
  &::before {
    content: '•';
    color: ${theme.accent.primary};
    font-weight: bold;
    margin-right: 0.75rem;
  }
`;

// Section titles with icon
export const SectionHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

export const SectionHeaderIcon = styled.div`
  font-size: 1.75rem;
  background: rgba(67, 97, 238, 0.1);
  border-radius: 10px;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SectionHeaderTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  position: relative;
  display: flex;
  align-items: center;
  
  &::after {
    content: '';
    display: block;
    width: 3rem;
    height: 2px;
    background: linear-gradient(90deg, #4361ee, #7209b7);
    margin-left: 1rem;
  }
`;

// Dark section for projects with proper spacing
export const ProjectsSection = styled.div`
  background-color: #1A1B1E;
  padding: 5rem 1.5rem 3rem;
  position: relative;
  z-index: 5;
  max-width: 780px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 4rem 1rem 2rem;
  }
`;

// New section variant with var(--background-dark)
export const DarkBackgroundSection = styled(GenericSection)`
  padding: 3rem 1.5rem;
  background-color: #1A1B1E;
  position: relative;
  z-index: 5;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

// Style adjustments for Mantine Carousel
export const CarouselContainer = styled.div`
  .mantine-Carousel-controls {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: ${({ theme }) => theme.spacing.md}; /* Add some padding instead */
    top: unset;
    left: unset;
    right: unset;
    transform: unset;
  }

  .mantine-Carousel-control {
    position: relative;
    background: rgba(255, 255, 255, 0.1); // Simple background
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    border-radius: 50%; // Make them circular
    width: 30px; // Explicit size
    height: 30px;
    display: flex; // Center icon
    align-items: center;
    justify-content: center;
    top: unset;
    left: unset;
    right: unset;
    bottom: unset;
    transform: unset;
    margin: 0; /* Reset margin */

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &[data-inactive] {
      opacity: 0.4 !important;
      cursor: default;
    }

    &[data-carousel-prev] {
      order: -1; /* Place before indicators */
      margin-right: 24px;
    }

    &[data-carousel-next] {
      order: 1; /* Place after indicators */
      margin-left: 24px;
    }
  }

  .mantine-Carousel-indicators {
    display: flex; /* Ensure indicators are flex items */
    margin: 0;
    padding: 0;
    align-items: center;
    order: 0; /* Place between controls */
  }

  .mantine-Carousel-indicator {
    background-color: ${({ theme }) => theme.colors.dark[3]};
    width: 8px;
    height: 8px;
    transition: width 250ms ease;
    border-radius: 4px;
    margin: 0 4px;

     &[data-active] {
        background-color: ${({ theme }) => theme.colors[theme.primaryColor]?.[6] || theme.colors.blue[6]};
        width: 24px;
     }
  }
`;