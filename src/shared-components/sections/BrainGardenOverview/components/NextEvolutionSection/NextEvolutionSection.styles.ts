import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SPACING } from '../../BrainGardenOverview.styles';

// Animation variants
export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.7,
      ease: "easeOut" 
    }
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.7,
      ease: "easeOut" 
    }
  }
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut" 
    }
  }
};

export const cardStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const phaseStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.3
    }
  }
};

// Timeline styles
export const TimelineContainer = styled(motion.div)`
  position: relative;
  margin-top: 2rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
`;

export const TimelineMainLine = styled(motion.div)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  width: 4px;
  background-color: #e0e0e0;
  
  @media (max-width: 768px) {
    left: 2rem;
  }
`;

export const PhaseContainer = styled(motion.div)`
  position: relative;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    align-items: flex-start;
    margin-left: 4rem;
  }
`;

export const PhaseTitle = styled(motion.div)`
  background-color: #6A0DAD;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  text-align: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const PhaseContent = styled(motion.div)`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 48rem;
`;

export const PhaseItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const PhaseItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

export const PhaseItemDot = styled(motion.div)`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 0.25rem;
`;

export const PhaseItemContent = styled.div`
  flex: 1;
`;

// Capability cards styles
export const CapabilityCardsGrid = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

export const CapabilityCard = styled(motion.div)`
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  width: 100%;
  
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

// Research area styles
export const ResearchAreaContainer = styled(motion.div)`
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 3rem;
`;

export const ResearchGridContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ResearchAreaCard = styled(motion.div)`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
`;