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

export const Card = styled(motion.div)<{ styleType?: string }>`
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  ${props => props.styleType === 'accent-card' && `
    background-color: #fff;
    border-left: 6px solid ${props.theme.colors.primary};
  `}
  
  ${props => props.styleType === 'gradient-card' && `
    background: linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary});
    color: #fff;
  `}
  
  ${props => props.styleType === 'default' && `
    background-color: #fff;
  `}
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text.primary};
`;

export const MetricsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 1.5rem 0;
`;

export const MetricItem = styled.li`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  
  &:before {
    content: "✓";
    color: ${props => props.theme.colors.primary.main};
    margin-right: 0.5rem;
    font-weight: bold;
  }
`;

export const Quote = styled.blockquote`
  font-style: italic;
  font-size: 1.125rem;
  line-height: 1.6;
  margin: 1.5rem 0 0;
  padding-left: 1rem;
  border-left: 3px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text.secondary};
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