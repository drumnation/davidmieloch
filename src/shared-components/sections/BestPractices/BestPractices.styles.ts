import styled from 'styled-components';
import { motion } from 'framer-motion';

// Animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const fadeInUp = {
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

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const BestPracticesContainer = styled.section`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const ContentSection = styled(motion.div)`
  width: 100%;
  background-color: #fff;
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 576px) {
    padding: 3rem 0;
  }
`;

export const ContentContainer = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 576px) {
    padding: 0 1.25rem;
  }
`;

export const SectionTitle = styled(motion.h1)`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const SectionDescription = styled(motion.p)`
  font-size: 1.25rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 3rem;
  }
`;

export const CategoriesContainer = styled(motion.div)`
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

export const CategoryCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.primary.main};
`;

export const CategoryDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
`;

export const ItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background.light};
  padding: 8px;
  flex-shrink: 0;
`;

export const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ItemTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ItemDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
`;

export const PracticesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PracticeItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background.light};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.paper};
  }
`;

export const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
`;

export const PracticeContent = styled.div`
  flex-grow: 1;
`;

export const PracticeTitle = styled.h3`
  font-size: 1.125rem;
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PracticeDescription = styled.p`
  font-size: 0.875rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
`;

export const DetailedContentContainer = styled(motion.div)`
  width: 100%;
  margin: 2rem 0 4rem;
`;

export const DetailedContentTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const DetailedContentText = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ConclusionContainer = styled(motion.div)`
  width: 100%;
  margin-top: 3rem;
`;

export const ConclusionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ConclusionText = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Container = styled.section`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;