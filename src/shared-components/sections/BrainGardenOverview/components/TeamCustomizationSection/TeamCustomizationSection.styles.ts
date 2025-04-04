import styled, { css } from 'styled-components';
import { SPACING } from '../../BrainGardenOverview.styles';

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
`;

export const ContentCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: ${SPACING.container};
  margin-bottom: ${SPACING.paragraph};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
`;

export const FeatureList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;

  li {
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;
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
  padding: 1.5rem;
  background-color: #f7fafc;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

export const FeatureItem = styled.li`
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.4rem;
    width: 0.5rem;
    height: 0.5rem;
    background-color: ${({ theme }) => theme.colors.primary.main};
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