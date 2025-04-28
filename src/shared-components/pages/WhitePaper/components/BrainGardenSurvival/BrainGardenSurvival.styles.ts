import styled from 'styled-components';
import { motion } from 'framer-motion';

// Spacing constants for consistent layout
const SPACING = {
  container: '2rem',
  section: '3rem',
  element: '1.5rem',
  paragraph: '1rem',
  paragraphBreak: '2.5rem',
};

export const ContentSection = styled.div`
  padding: 4rem 2rem;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  
  [data-mantine-color-scheme="dark"] & {
    background-color: ${({ theme }) => theme.colors.dark[8]};
  }
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const Subsection = styled.div`
  margin: 3rem 0;
  padding-left: 1.5rem;
  border-left: 3px solid ${({ theme }) => theme.colors[theme.primaryColor][5]};
  
  @media (max-width: 768px) {
    margin: 2rem 0;
    padding-left: 1rem;
  }
`;

export const SectionParagraph = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.gray[7]};
  max-width: 720px;
  
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors.gray[3]};
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors[theme.primaryColor][7]};
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
  
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors[theme.primaryColor][4]};
  }
`;

export const SectionSubtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.gray[8]};
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors.gray[2]};
  }
`;

export const HighlightBox = styled.div`
  background-color: ${({ theme }) => `${theme.colors[theme.primaryColor][0]}`};
  border-left: 4px solid ${({ theme }) => theme.colors[theme.primaryColor][5]};
  padding: 1.25rem;
  margin: 1.5rem 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: ${({ theme }) => theme.shadows.xs};
  
  [data-mantine-color-scheme="dark"] & {
    background-color: ${({ theme }) => `rgba(${theme.colors[theme.primaryColor][9]}, 0.15)`};
  }
`;

export const InsightCallout = styled.div`
  background-color: ${({ theme }) => `${theme.colors.cyan[0]}`};
  border: 1px solid ${({ theme }) => theme.colors.cyan[3]};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1.25rem;
  margin: 2rem 0;
  position: relative;
  
  &::before {
    content: 'Key Insight';
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.colors.cyan[7]};
    margin-bottom: 0.75rem;
  }
  
  [data-mantine-color-scheme="dark"] & {
    background-color: ${({ theme }) => `rgba(${theme.colors.cyan[9]}, 0.15)`};
    border-color: ${({ theme }) => theme.colors.cyan[7]};
    
    &::before {
      color: ${({ theme }) => theme.colors.cyan[5]};
    }
  }
`;

export const CTAContainer = styled(motion.div)`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors[theme.primaryColor][6]}, ${({ theme }) => theme.colors.cyan[6]});
  padding: 3rem 2rem;
  border-radius: ${({ theme }) => theme.radius.md};
  text-align: center;
  color: white;
  margin-top: 4rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  
  h3 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin-top: 3rem;
    
    h3 {
      font-size: 1.5rem;
    }
  }
`;

export const CTAButton = styled(motion.a)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: white;
  color: ${({ theme }) => theme.colors[theme.primaryColor][7]};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radius.md};
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Styled-components that reference Mantine theme values
export const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: calc(var(--mantine-spacing-xl) * 2);

  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

export const HeroContent = styled.div`
  flex: 1;
  max-width: 100%;

  @media (min-width: 992px) {
    max-width: 55%;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 42px;
  font-weight: 900;
  line-height: 1.2;
  color: var(--mantine-color-blue-6);

  @media (min-width: 992px) {
    font-size: 52px;
  }
`;

export const HeroDescription = styled.div`
  font-size: 18px;
  line-height: 1.6;
  color: var(--mantine-color-gray-7);
`;

export const HeroButton = styled.button`
  margin-top: var(--mantine-spacing-md);
  background-color: var(--mantine-color-blue-6);
  color: var(--mantine-color-white);
  
  &:hover {
    background-color: var(--mantine-color-blue-7);
  }
`;

export const HeroImageContainer = styled.div`
  margin-top: var(--mantine-spacing-lg);
  width: 100%;

  @media (min-width: 992px) {
    margin-top: 0;
    width: 40%;
  }
`;

export const HeroImage = styled.img`
  border-radius: var(--mantine-radius-md);
  box-shadow: var(--mantine-shadow-md);
`;

export const SectionDescriptionText = styled.div`
  font-size: 18px;
  line-height: 1.6;
  color: var(--mantine-color-gray-7);
  margin-bottom: var(--mantine-spacing-lg);
`;

export const HighlightCardStyled = styled.div`
  background-color: var(--mantine-color-gray-0);
  border-color: var(--mantine-color-blue-1);
  border-width: 2px;
`;

export const HighlightTitleStyled = styled.h3`
  color: var(--mantine-color-blue-6);
  font-weight: 700;
`;

export const HighlightTextStyled = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.gray[8]};
`;

export const InsightBoxStyled = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border-left: 4px solid ${({ theme }) => theme.colors[theme.primaryColor][6]};
  border-radius: ${({ theme }) => theme.radius.sm}px;
`;

export const InsightTextStyled = styled.div`
  color: ${({ theme }) => theme.colors.gray[8]};
`;

export const CTASectionStyled = styled.div`
  margin-top: var(--mantine-spacing-xl-3);
  margin-bottom: var(--mantine-spacing-xl-2);
`;

export const SeparatorLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--mantine-color-gray-3);
  margin: 0.5rem 0 1rem 0;
`;

export const HeadingText = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
`;

export const SubHeadingText = styled.div`
  font-weight: 700;
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
`;

export const BlueInfoCard = styled.div`
  background-color: rgba(66, 133, 244, 0.08);
  border-color: var(--mantine-color-blue-3);
`;

export const ItalicQuoteBox = styled.div`
  background-color: rgba(0, 0, 0, 0.03);
  border-left: 3px solid var(--mantine-color-gray-5);
  border-radius: 4px;
  font-style: italic;
  margin: 1rem 0;
  padding: 1rem;
`;

export const GreenInfoCard = styled.div`
  background-color: rgba(100, 180, 100, 0.05);
  border-color: var(--mantine-color-green-3);
  max-width: 400px;
  margin-bottom: 16px;
`;

export const BrainGardenHeading = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

export const StepList = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--mantine-color-gray-8);
  margin-bottom: 24px;
`;

export const DescriptionText = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--mantine-color-gray-8);
  margin-bottom: 20px;
`;

export const BlueCalloutBox = styled.div`
  background-color: rgba(66, 133, 244, 0.05);
  border-radius: 4px;
  text-align: center;
  padding: 1rem;
`;

export const LargeDescriptionText = styled.div`
  font-size: 24px;
  line-height: 1.6;
  color: var(--mantine-color-gray-7);
  font-weight: 400;
  margin-bottom: 24px;
`;

export const ScrollableSection = styled.div`
  scroll-margin-top: 100px;
`; 