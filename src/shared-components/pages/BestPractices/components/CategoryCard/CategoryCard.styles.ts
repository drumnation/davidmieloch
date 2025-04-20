import styled from 'styled-components';
import { AnimationVariants } from '../../../../../utils/animations/migration-helpers';

export const CategoryCardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: 8px;
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: opacity 0.5s ease, transform 0.5s ease;
  
  &.hidden {
    opacity: 0;
    transform: translateY(20px);
  }
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

export const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 24px 0;
  color: ${({ theme }) => theme.colors.primary.main};
  display: flex;
  align-items: center;
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 16px;
  }
`;

export const CategoryDescription = styled.p`
  font-size: 1rem;
  margin: 0 0 32px 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: flex-start;
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 24px;
  }
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-grow: 1;
`;

export const Item = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
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
  min-width: 0;
`;

export const ItemTitle = styled.h4`
  font-size: 1.1rem;
  margin: 0 0 6px 0;
  color: ${({ theme }) => theme.colors.text.primary};
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const ItemDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
  margin: 0;
`;

// Animation variants
export const scaleIn: AnimationVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
}; 