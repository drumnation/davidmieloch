import styled from 'styled-components';
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const SectionTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const SectionDescription = styled.p`
  font-size: 1.25rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  transition-delay: 0.1s;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 3rem;
  }
`;

// Animation variants
export const fadeIn: AnimationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const staggerContainer: AnimationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}; 