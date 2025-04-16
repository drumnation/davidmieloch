import styled from 'styled-components';
import { GenericSection } from './components/ContentSection';

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

export const PersonaNav = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 4rem auto;
  max-width: 800px;
`;

export const FrameworksGrid = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

export const ProjectsGrid = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
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
  color: ${theme.text.secondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  max-width: 780px;
  margin-left: auto;
  margin-right: auto;
`;

export const Badge = styled.span<{ color: string, bg: string }>`
  background: ${props => props.bg};
  color: ${props => props.color};
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-right: 6px;
`;

export const ViewAllContainer = styled.div`
  text-align: center;
  margin-top: 2.5rem;
  padding-top: 1rem;
`;

// Consistent section spacing
export const StyledGenericSection = styled(GenericSection)`
  margin-top: clamp(3rem, 5vw, 5rem);
  margin-bottom: clamp(3rem, 5vw, 5rem);
`;

// Update SectionDivider to a more subtle style
export const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.06), rgba(255,255,255,0));
  margin: 3rem 0 2rem;
`;

// Extra padding container
export const SectionWrapper = styled.div`
  padding-bottom: 6rem;
  background: linear-gradient(to bottom, transparent, rgba(10, 12, 30, 0.8));
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
  color: ${theme.text.primary};
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

// Add HighlightBox styled component
export const HighlightBox = styled.span`
  background: #e5e7eb;
  color: #222;
  font-weight: 700;
  border-radius: 6px;
  padding: 0.1em 0.4em;
  margin: 0 0.1em;
  font-size: 1em;
  display: inline-block;
`; 