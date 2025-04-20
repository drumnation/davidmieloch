import styled, { css } from 'styled-components';
import { SPACING } from '../../BrainGardenOverview.styles';

// Define mobile breakpoint
const mobileBreakpoint = '576px';

export const TeamContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${SPACING.container};

  .underlined-title {
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary.main};
    padding-bottom: 0.5rem;
  }

  .italic-text {
    font-style: italic;
  }

  .section-title {
    margin-bottom: 1rem;
  }

  .section-description {
    max-width: 700px;
    margin: 0 auto 2rem;
  }

  @media (max-width: ${mobileBreakpoint}) {
    padding: ${SPACING.mobile.container};
    padding-bottom: ${SPACING.mobile.paragraph};
  }
`;

export const ContentCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: ${SPACING.container};
  margin-bottom: ${SPACING.paragraph};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: ${mobileBreakpoint}) {
    padding: ${SPACING.mobile.container};
    padding-bottom: ${SPACING.mobile.paragraph};
  }
`;

export const IntroCard = styled.div`
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 12px;
  padding: ${SPACING.container};
  color: white;
  margin-bottom: ${SPACING.paragraphBreak};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  /* Make all text white */
  * {
    color: white !important;
  }

  @media (max-width: ${mobileBreakpoint}) {
    padding: ${SPACING.mobile.container};
  }
`;

export const FeatureList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-top: 0.5rem;
  margin-bottom: 1rem;

  li {
    margin-bottom: 1rem;
    padding-left: 0;
    
    & > div {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      
      & > svg, & > span[class*="Icon"] {
        flex-shrink: 0;
      }

      .text-content {
        display: flex;
        flex-direction: column;
      }

      @media (max-width: ${mobileBreakpoint}) {
        align-items: flex-start;
        gap: 0.5rem;
        
        & > svg, & > span[class*="Icon"] {
          flex-shrink: 0;
        }
        
        .text-content {
          display: block;
          width: 100%;
          
          &[data-weight="bold"] {
            margin-bottom: 0.25rem;
          }
        }
      }
    }
  }
`;

export const DiagramCard = styled.div`
  background-color: #ebf5ff;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: ${SPACING.paragraph};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: ${SPACING.paragraph};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  position: relative;
  padding-left: 1.5rem;
  
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 0.5rem;
    height: 0.5rem;
    background-color: #4299e1;
    border-radius: 50%;
  }
`;

export const SectionWrapper = styled.div`
  margin-bottom: ${SPACING.paragraph};
`;

export const BackgroundAccent = styled.div`
  background-color: #f8faff;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: ${SPACING.paragraph};
`;

export const SectionHeader = styled.div`
  margin-bottom: 2rem;
  text-align: left;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
`;

export const StyledDivider = styled.div`
  width: 60px;
  height: 4px;
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: 2px;
  margin: 1rem 0 2rem;
`;

// New wrapper for icon + title sections to control layout
export const TitleIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: ${mobileBreakpoint}) {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }
`;

// New wrapper for the icon in TitleIconWrapper to add background
export const TitleIconBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: black;
  margin-right: 0.75rem;
  flex-shrink: 0;

  & > * {
    color: white;
  }

  @media (max-width: ${mobileBreakpoint}) {
    margin-right: 0;
    margin-bottom: 0.75rem;
  }
`;