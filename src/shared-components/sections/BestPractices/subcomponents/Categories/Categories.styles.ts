import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AnimationVariants } from '../../../../../utils/animations/migration-helpers';

export const CategoriesWrapper = styled.div`
  &.fade-in {
    opacity: 0;
    transition: opacity 0.8s ease-out;
  }
  
  &.fade-in.visible {
    opacity: 1;
  }
`;

export const CategoriesContainer = styled.div`
  margin: 2rem 0;
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  padding: 2rem 0 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const CategoryCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const CategoryIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.main};
`;

export const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CategoryDescription = styled.p`
  margin: 0 0 1.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
`;

export const CategoryItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

export const CategoryItemListEntry = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  line-height: 1.4;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ItemIcon = styled.span`
  color: ${({ theme }) => theme.colors.primary.main};
  margin-right: 0.75rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.2rem;
`;

export const ItemText = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SectionDescription = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const categoriesAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    }
  }
} as AnimationVariants; 