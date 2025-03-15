import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Card } from '../../atoms/Card/Card';

// Define consistent spacing variables that can be reused across components
export const SPACING = {
  section: '5rem',
  paragraph: '2rem',
  paragraphBreak: '2rem',
  element: '1rem',
  container: '1.5rem',
  component: '3rem',
  
  // Responsive spacing for mobile
  mobile: {
    section: '2.5rem',
    paragraph: '1.25rem',
    paragraphBreak: '1.5rem',
    element: '0.75rem',
    container: '1rem'
  }
};

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const ContentSection = styled(motion.div)`
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

export const ContentContainer = styled(motion.div)`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto ${SPACING.section};
  padding: 0 ${SPACING.container};
  
  @media (max-width: 576px) {
    margin-bottom: calc(${SPACING.section} * 0.75);
    padding: 0 ${SPACING.container};
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text.primary};
  
  @media (max-width: 576px) {
    font-size: 2rem;
    margin-bottom: ${SPACING.mobile.paragraph};
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

export const ComponentWrapper = styled.div<{ position?: string }>`
  width: 100%;
  margin: ${SPACING.component} 0;
  
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

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: ${SPACING.paragraph} 0;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: ${SPACING.mobile.element};
    margin: ${SPACING.mobile.paragraph} 0;
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

export const AccentCard = styled(Card)`
  background: ${({ theme }) => theme.colors.gradient};
  color: ${({ theme }) => theme.colors.text.light};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
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

export const GradientCard = styled(Card)`
  background: ${({ theme }) => theme.colors.gradient};
  color: ${({ theme }) => theme.colors.text.light};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
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