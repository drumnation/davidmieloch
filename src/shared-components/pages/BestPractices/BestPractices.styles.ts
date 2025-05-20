import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { AnimationVariants } from '../../../utils/animations/migration-helpers';

// Global styles for the BestPractices component
export const GlobalStyles = createGlobalStyle`
  .best-practices-hero {
    min-height: 70vh !important;
    position: relative !important;
  }

  .best-practices-hero::before {
    background-position: center center !important;
    background-size: cover !important;
    filter: brightness(0.9) contrast(1.1) saturate(1.1) !important;
    transform: scale(1.05);
    transition: transform 0.5s ease-out;
    animation: subtle-zoom 25s infinite alternate ease-in-out;
  }

  .best-practices-hero::after {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background: radial-gradient(circle, transparent 40%, rgba(0,0,0,0.4) 100%) !important;
    pointer-events: none !important;
    z-index: 1 !important;
  }

  .best-practices-hero h1 {
    font-size: 3.5rem;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
    letter-spacing: -0.5px;
    font-weight: 800;
    position: relative;
    z-index: 2;
  }

  .best-practices-hero p {
    font-size: 1.5rem;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
    max-width: 800px;
    margin: 0 auto;
    font-weight: 400;
    position: relative;
    z-index: 2;
  }

  @keyframes subtle-zoom {
    0% {
      transform: scale(1.05) translateY(0);
    }
    100% {
      transform: scale(1.12) translateY(-8px);
    }
  }
  
  .best-practices-content-section {
    width: 100%;
    background-color: #fff;
    color: #000;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    margin-top: -24px;
    position: relative;
    z-index: 2;
    padding-top: 5rem;
    padding-bottom: 5rem;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media (max-width: 576px) {
      padding-top: 3rem;
      padding-bottom: 3rem;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      margin-top: -16px;
    }
  }
  
  .best-practices-content-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    
    @media (max-width: 768px) {
      padding: 0 1.5rem;
    }

    @media (max-width: 480px) {
      padding: 0 1rem;
    }
  }
`;

// Animation variants
export const fadeIn: AnimationVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1
  }
};

export const fadeInUp: AnimationVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0
  }
};

export const staggerContainer: AnimationVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1
  }
};

export const scaleIn: AnimationVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1
  }
};

export const Container = styled.section`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const ContentSection = styled.div`
  width: 100%;
  background-color: var(--mantine-color-body);
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  margin-top: -24px;
  position: relative;
  z-index: 2;
  padding-top: 5rem;
  padding-bottom: 5rem;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  @media (max-width: 576px) {
    padding-top: 3rem;
    padding-bottom: 3rem;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    margin-top: -16px;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

export const SectionTitle = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  background: ${({ theme }) => `linear-gradient(to right, ${theme.colors[theme.primaryColor]?.[6] || theme.colors.blue[6]}, ${theme.colors.cyan?.[6] || theme.colors.teal[6]})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
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
  color: #666;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 3rem;
  }
`;

export const CategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

export const CategoryCard = styled.div`
  background-color: #fff;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors[theme.primaryColor]?.[6] || theme.colors.blue[6]};
`;

export const CategoryDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 16px;
  color: #666;
  line-height: 1.5;
  flex-grow: 1;
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
  background-color: ${({ theme }) => theme.colors.gray[0]};
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
  color: ${({ theme }) => theme.colors.gray[7]};
`;

export const ItemDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray[6]};
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

export const PracticeItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[1]};
  }
`;

export const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${({ theme }) => theme.other?.heroGradient || theme.colors.blue[6]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.white};
`;

export const PracticeContent = styled.div`
  flex-grow: 1;
`;

export const PracticeTitle = styled.h3`
  font-size: 1.125rem;
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.colors.gray[7]};
`;

export const PracticeDescription = styled.p`
  font-size: 0.875rem;
  margin: 0;
  color: #666;
  line-height: 1.5;
`;

export const DetailedContentContainer = styled.div`
  width: 100%;
  margin: 2rem 0 4rem;
`;

export const DetailedContentTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.gray[7]};
`;

export const DetailedContentText = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #666;
`;

export const DetailedContentList = styled.div`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #666;
`;

export const ConclusionContainer = styled.div`
  width: 100%;
  margin-top: 3rem;
`;

export const ConclusionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.gray[7]};
`;

export const ConclusionText = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #666;
`;

export const PageSeparator = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.1),
    transparent
  );
  margin: 1rem 0 4rem 0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 50%;
    background-image: url('/icons/code.svg');
    background-size: 20px;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: ${({ theme }) => theme.shadows.md};
    border: 1px solid var(--mantine-color-default-border);
  }
`;

export const BestPracticeItem = styled.li`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray[6]};
  margin-bottom: 8px;
  padding-left: 16px;
  position: relative;
  
  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
  }
`;

export const BestPracticeDetail = styled.div`
  margin-bottom: 3rem;
`;

export const BestPracticeTitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
`;

export const BestPracticeDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #666;
`;

export const ImplementationList = styled.ul`
  list-style: none;
  padding-left: 20px;
`;

export const ImplementationItem = styled.li`
  margin-bottom: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray[7]};
  position: relative;

  &:before {
    content: '✓';
    position: absolute;
    left: -20px;
    color: ${({ theme }) => theme.colors.green[6]};
  }
  
  strong {
    font-weight: 600;
  }
`;

export const LetsWorkTogetherSection = styled.div`
  text-align: center;
  width: 100%;
  max-width: 800px;
  margin: 4rem auto 0;
  padding: 3rem 2rem;
  background: #fff;
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid #e0e0e0;
`;

export const CallToActionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors[theme.primaryColor]?.[7] || theme.colors.blue[7]};
`;

export const CallToActionText = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #666;
`;

export const ActionButton = styled.button`
  // ... styles ...
`;