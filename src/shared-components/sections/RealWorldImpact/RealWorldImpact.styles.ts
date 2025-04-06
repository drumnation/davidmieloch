import styled, { createGlobalStyle, css } from 'styled-components';
import { motion } from 'framer-motion';
import { Typography } from '../../atoms/Typography';
import { StyledProps } from './RealWorldImpact.types';

export const SPACING = {
  section: '4rem',
  paragraph: '2rem',
  paragraphBreak: '2rem',
  element: '1.5rem',
  elementBreak: '40px',
  container: '1.5rem',
  sectionBreak: '80px',
  contentWidth: '1200px',
  mobile: {
    section: '3rem',
    paragraph: '1.5rem',
    paragraphBreak: '1.5rem',
    element: '1rem',
    elementBreak: '20px',
    container: '1rem',
    sectionBreak: '40px'
  },
  mobileBreak: '16px'
};

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  .real-world-impact-content-section {
    max-width: ${SPACING.contentWidth};
    margin: 0 auto;
    padding: 0 1.5rem;
  }
`;

export const containerStyle = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

export const contentSectionStyle = {
  maxWidth: SPACING.contentWidth,
  margin: '0 auto',
  padding: '0 1.5rem'
};

export const sectionContainerStyle = {
  marginBottom: SPACING.sectionBreak,
  width: '100%'
};

export const sectionContainerWithoutMarginStyle = {
  width: '100%'
};

export const sectionContainerTopMarginStyle = {
  marginTop: SPACING.sectionBreak,
  width: '100%'
};

export const sectionContainerSmallTopMarginStyle = {
  marginTop: SPACING.paragraphBreak,
  width: '100%'
};

export const comparisonSectionStyle = {
  width: '100%',
  background: 'var(--background-subtle)',
  padding: '3rem 0',
  marginBottom: SPACING.sectionBreak
};

export const titleContainerStyle = {
  marginBottom: SPACING.elementBreak
};

export const paragraphContainerStyle = {
  marginBottom: SPACING.paragraphBreak
};

export const paragraphContainerNoMarginStyle = {
  marginBottom: 0
};

export const paragraphContainerTopMarginStyle = {
  marginTop: SPACING.paragraphBreak
};

export const titleBlockStyle = {
  marginBottom: '1rem'
};

export const descriptionBlockStyle = {
  marginBottom: '2rem',
  maxWidth: '800px'
};

export const quoteContainerStyle = {
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: '1.5rem',
  borderLeft: '4px solid var(--primary-blue)',
  position: 'relative',
  margin: '1rem 0 1.5rem'
};

export const Section = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SectionDescription = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const InsightCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  height: 100%;
  
  h3 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: 1rem;
  }
  
  strong {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

export const MetricItem = styled.div`
  text-align: center;
  padding: 1rem;
  
  h4 {
    font-size: 2rem;
    margin: 0;
    color: ${({ theme }) => theme.colors.primary.main};
  }
  
  p {
    font-size: 1rem;
    margin: 0.5rem 0 0;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${SPACING.paragraphBreak} 0;
`;

export const FeatureItem = styled.li`
  margin-bottom: 12px;
  padding-left: 24px;
  position: relative;

  &:before {
    content: '→';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  margin-right: ${SPACING.elementBreak};
  margin-bottom: ${SPACING.elementBreak};
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${SPACING.elementBreak};
  margin-bottom: ${SPACING.paragraphBreak};
`;

export const ClosingMessage = styled(Typography)`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.primary};
  max-width: 800px;
  margin: ${SPACING.paragraphBreak} auto;
  text-align: center;
  font-weight: 500;
`;

export const WarningBox = styled.div`
  width: 100%;
  padding: 2rem;
  margin-top: 3rem;
  background-color: #ffebee;
  border-left: 4px solid #f44336;
`;

export const WarningContent = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

export const QuoteBox = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid var(--primary-blue);
  position: relative;
  margin: 1rem 0 1.5rem;
`;

export const QuoteContext = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #e6f7ff;
  border-radius: 4px;
  font-size: 0.9rem;
`;

export const BlueprintCard = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid #e0e0e0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const BlueprintHeader = styled.div`
  padding: 1.25rem;
  background-color: #1976d2;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const BlueprintContent = styled.div`
  padding: 1.5rem;
  background-color: #ffffff;
`;

export const BottomLineBox = styled.div<StyledProps>`
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
  padding: ${SPACING.elementBreak};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-top: ${SPACING.sectionBreak};
  text-align: center;

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: ${SPACING.paragraphBreak};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.md};
    max-width: 800px;
    margin: 0 auto;
  }
`;

export const ContentSection = styled.section`
  background-color: ${({ theme }) => theme.colors.background.paper};
  padding: 2rem 0;
`;

export const ContentContainer = styled.div`
  ${containerStyle}
  display: flex;
  flex-direction: column;
`;

export const AnimatedSection = styled(motion.section)`
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

export const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

export const MetricCard = styled.div`
  background: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1.5rem;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
  justify-content: center;
`;

export const ClosingContainer = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 4rem auto 0;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export const CaseStudiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  margin-top: ${SPACING.paragraph};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CaseStudyCard = styled(Card)`
  // Additional case study specific styles can go here
`;

export const CaseStudyImageContainer = styled.div`
  height: 180px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
`;

export const CaseStudyContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const CaseStudyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
`;

export const CaseStudyDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  flex: 1;
`;

export const CaseStudyTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

export const CaseStudyTag = styled.span`
  background-color: #f0f7ff;
  color: var(--primary-blue);
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  background: white;
  padding: 1.5rem 1.5rem 1rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  z-index: 10;
`;

export const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding-right: 40px;
`;

export const ModalContent = styled.div`
  padding: 0 1.5rem 1.5rem;
  flex: 1;
`;

export const ModalDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

export const ModalSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const ModalSectionTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const ModalImageContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  margin-bottom: 1.5rem;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
`;

export const ResultList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const ResultItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  
  &:before {
    content: "•";
    color: var(--primary-blue);
    font-weight: bold;
    margin-right: 0.75rem;
  }
`;

export const ModalFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
`;

export const ModalButton = styled.button`
  background-color: var(--primary-blue);
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--primary-purple);
  }
`;

export const SectionSubtitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: ${props => props.theme.colors.text.secondary};
  
  @media (max-width: 576px) {
    font-size: 1.5rem;
    margin-bottom: ${SPACING.mobile.element};
  }
`;

export const SubSectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text.primary};
  
  @media (max-width: 576px) {
    font-size: 1.25rem;
    margin-bottom: ${SPACING.mobile.element};
  }
`;

export const Paragraph = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: ${SPACING.paragraph};
  color: ${props => props.theme.colors.text.primary};
  
  @media (max-width: 576px) {
    font-size: 1rem;
    margin-bottom: ${SPACING.mobile.paragraph};
  }
`;

export const ParagraphList = styled.div`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: ${SPACING.paragraph};
  color: ${props => props.theme.colors.text.primary};
  
  @media (max-width: 576px) {
    font-size: 1rem;
    margin-bottom: ${SPACING.mobile.paragraph};
  }
`;

export const ComponentWrapper = styled.div<{ position?: string }>`
  width: 100%;
  margin: ${SPACING.element} 0;
  
  ${props => props.position === 'left' && `
    align-self: flex-start;
    max-width: 800px;
  `}
  
  ${props => props.position === 'right' && `
    align-self: flex-end;
    max-width: 800px;
  `}
  
  ${props => props.position === 'center' && `
    align-self: center;
    max-width: 800px;
  `}
  
  ${props => props.position === 'full-width' && `
    max-width: 100%;
  `}
  
  @media (max-width: 992px) {
    max-width: 100% !important;
    margin: ${SPACING.mobile.section} 0;
  }
`;

export const GridItem = styled.div`
  height: 100%;
  
  & > div {
    height: 100%;
  }
`;

export const StatsGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: ${SPACING.paragraph} 0;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: ${SPACING.mobile.element};
    margin: ${SPACING.mobile.paragraph} 0;
  }
`;

export const AccentCard = styled.div`
  background: ${({ theme }) => theme.colors.gradient};
  color: ${({ theme }) => theme.colors.text.light};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  ul {
    margin-top: 1rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

export const GradientCard = styled.div`
  background: ${({ theme }) => theme.colors.gradient};
  color: ${({ theme }) => theme.colors.text.light};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-bottom: 2rem;
  
  h2, h3 {
    font-weight: 700;
  }
  
  h2 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const Quote = styled.blockquote`
  font-style: italic;
  font-size: 1.125rem;
  line-height: 1.6;
  margin: 2rem 0;
  padding: 1.5rem;
  border-left: 4px solid ${props => props.theme.colors.primary.main};
  background-color: rgba(52, 152, 219, 0.05);
  border-radius: 0 8px 8px 0;
  color: ${props => props.theme.colors.text.secondary};
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

export const CodeBlock = styled.div`
  background: ${({ theme }) => theme.colors.background.dark};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  overflow: auto;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.1);
  
  pre {
    margin: 0;
    
    code {
      font-family: 'Fira Code', monospace;
      color: #e6e6e6;
      
      .keyword {
        color: #569CD6;
      }
      
      .string {
        color: #CE9178;
      }
      
      .comment {
        color: #6A9955;
      }
      
      .type {
        color: #4EC9B0;
      }
      
      .number {
        color: #B5CEA8;
      }
    }
  }
`;

export const ProblemCard = styled(Card)`
  background: ${({ theme }) => theme.colors.background.light};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
  border-left: 4px solid ${({ theme }) => theme.colors.accent.yellow};
  font-weight: 600;
  
  h4 {
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const StatCard = styled(Card)`
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
  
  .stat-number {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }
  
  .stat-label {
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const ProblemCategoryBox = styled.div`
  background-color: ${({ theme }) => theme.colors.accent.yellow};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    font-size: 1.25rem;
  }
`;

export const TimelineContainer = styled.div`
  position: relative;
  margin: 3rem 0;
`;

export const TimelineItem = styled.div`
  position: relative;
  padding-left: 2rem;
  margin-bottom: 2rem;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary.main};
  }
  
  &:not(:last-child):after {
    content: '';
    position: absolute;
    top: 1rem;
    left: 0.5rem;
    width: 2px;
    height: calc(100% + 1rem);
    background: linear-gradient(to bottom, ${({ theme }) => theme.colors.primary.main}, ${({ theme }) => theme.colors.primary.light});
  }
`;

export const CtaButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  background-color: #ffffff;
  color: #2980b9;
  border-radius: 4px;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

export const BackgroundSection = styled.div`
  width: 100%;
  background-color: #f8f9fa;
  padding: ${SPACING.section} 0;
  margin-bottom: ${SPACING.section};
  
  @media (max-width: 576px) {
    padding: calc(${SPACING.section} * 0.75) 0;
    margin-bottom: calc(${SPACING.section} * 0.75);
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${SPACING.elementBreak};
  margin: ${SPACING.paragraphBreak} 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${SPACING.mobile.element};
    margin: ${SPACING.mobile.paragraph} 0;
  }
`;