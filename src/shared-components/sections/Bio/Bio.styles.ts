import styled from 'styled-components';
import { motion } from 'framer-motion';

export const BioContainer = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  width: 100%;
`;

export const BioHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export const BioTitle = styled(motion.h1)`
  font-size: 3rem;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  line-height: 1.2;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

export const BioSubtitle = styled(motion.h2)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text.secondary};
  font-weight: 500;
  margin-bottom: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.25rem;
  }
`;

export const BioContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const BioParagraph = styled(motion.p)`
  font-size: 1.125rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: 1.5rem;
  
  &:first-of-type::first-letter {
    font-size: 3.5rem;
    font-weight: 700;
    float: left;
    line-height: 1;
    padding-right: 0.5rem;
    color: ${({ theme }) => theme.primary.main};
  }
`;

export const BioSection = styled(motion.div)`
  margin: 3rem 0;
`;

export const BioSectionTitle = styled(motion.h3)`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.primary.main};
  margin-bottom: 1.5rem;
  font-weight: 600;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

export const MediaContainer = styled(motion.div)`
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const MediaItem = styled(motion.div)`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
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
  background: ${({ theme }) => theme.background.paper};
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
`;

export const MediaDescription = styled.p`
  padding: 0 1rem 1rem;
  background: ${({ theme }) => theme.background.paper};
  color: ${({ theme }) => theme.text.secondary};
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
  color: ${({ theme }) => theme.primary.main};
  font-weight: 600;
`;

export const Quote = styled.blockquote`
  font-style: italic;
  border-left: 4px solid ${({ theme }) => theme.primary.main};
  padding-left: 1.5rem;
  margin: 2rem 0;
  color: ${({ theme }) => theme.text.secondary};
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
    background: ${({ theme }) => theme.colors.gradient};
    border-radius: 4px;
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

export const TimelineItem = styled(motion.div)<{ itemIndex: number }>`
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
  background: ${({ theme }) => theme.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
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
  background: ${({ theme }) => theme.primary.main};
  transform: translateX(-50%);
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    left: 50%;
  }
`;

export const TimelineYear = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.primary.main};
  margin-bottom: 0.5rem;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
`;

export const SkillTag = styled.span`
  background: ${({ theme }) => theme.background.paper};
  color: ${({ theme }) => theme.text.primary};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`; 