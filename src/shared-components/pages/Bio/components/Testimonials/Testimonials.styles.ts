import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AnimationVariants } from '../../../../../utils/animations/migration-helpers';

export const TestimonialsContainer = styled(motion.div)`
  width: 100%;
  margin-top: 5rem;
  margin-bottom: 5rem;
`;

export const SectionHeading = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 700;
`;

export const CategoryHeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  margin: 2.5rem 0 0.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary.light};
  width: 100%;
  
  &:first-of-type {
    margin-top: 2rem;
  }
`;

export const CategoryIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.main};
  
  svg {
    width: 28px;
    height: 28px;
  }
`;

export const CategoryHeading = styled(motion.h3)`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: 600;
  margin: 0;
  padding: 0;
`;

export const TestimonialCardsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-top: 1.5rem;
`;

export const TestimonialCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.light};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const TestimonialText = styled.blockquote`
  font-style: italic;
  font-size: 1.125rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 1.5rem;
  padding-left: 1.25rem;
  border-left: 3px solid ${({ theme }) => theme.colors.primary.light};
  
  p {
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const TestimonialAuthor = styled.div`
  font-weight: 600;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.primary.main};
  text-align: right;
  padding-right: 1rem;
`;

export const LinkedInButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

export const LinkedInButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #0077b5; /* LinkedIn blue */
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #006097; /* Darker LinkedIn blue */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

// Animation variants
export const fadeInUp: AnimationVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const staggerCards: AnimationVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}; 