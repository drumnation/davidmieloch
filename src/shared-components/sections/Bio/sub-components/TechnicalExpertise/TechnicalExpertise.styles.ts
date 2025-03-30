import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 1rem 0;
`;

export const CategoryContainer = styled(motion.div)`
  margin-bottom: 0;
`;

export const CategoryTitle = styled.h4`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const CategorySkills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  
  & > * {
    margin: 0.1rem;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

// We're no longer using this component, but keeping it for reference
// in case we need to revert back or use it elsewhere
export const CompactSkillTag = styled(motion.span)`
  background: ${({ theme }) => theme.colors.background.light};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
  }
`; 