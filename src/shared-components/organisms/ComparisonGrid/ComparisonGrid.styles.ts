import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div<{ position?: string }>`
  width: 100%;
  max-width: ${props => props.position === 'full-width' ? '100%' : '800px'};
  margin: 2rem 0;
  
  ${props => props.position === 'left' && `
    align-self: flex-start;
  `}
  
  ${props => props.position === 'right' && `
    align-self: flex-end;
  `}
  
  ${props => props.position === 'center' && `
    align-self: center;
  `}
  
  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled(motion.div)<{ styleType?: string }>`
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  
  ${props => props.styleType === 'accent-cards' && `
    background-color: #fff;
    border-top: 4px solid ${props.theme.colors.primary.main};
  `}
  
  ${props => props.styleType === 'gradient-cards' && `
    background: linear-gradient(135deg, ${props.theme.colors.primary.main}, ${props.theme.colors.secondary.main});
    color: #fff;
  `}
  
  ${props => props.styleType === 'default' && `
    background-color: #fff;
  `}
`;

export const AspectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ComparisonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const ComparisonItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

export const Label = styled.span`
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  opacity: 0.7;
`;

export const Value = styled.span`
  font-size: 1rem;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary.light};
  color: ${props => props.theme.colors.primary.main};
  margin-right: 0.5rem;
`;

export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}; 