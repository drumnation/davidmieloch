import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AnimationVariants } from '@utils/animations/migration-helpers';
import { MantineTheme } from '@mantine/core';

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

export const CategoryGrid = styled.div<{ theme: MantineTheme }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const CategoryCard = styled(motion.div) <{ theme: MantineTheme }>`
  background: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const CategoryHeader = styled.div<{ theme: MantineTheme }>`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CategoryIcon = styled.div<{ theme: MantineTheme }>`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
`;

export const CategoryTitle = styled.h3<{ theme: MantineTheme }>`
  font-size: ${({ theme }) => theme.headings.sizes.h3.fontSize};
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.black};
`;

export const CategoryDescription = styled.p<{ theme: MantineTheme }>`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray[7]};
  line-height: ${({ theme }) => theme.lineHeights.md};
`;

export const CategoryItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

export const CategoryItemListEntry = styled.li<{ theme: MantineTheme }>`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: ${({ theme }) => theme.lineHeights.sm};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ItemIcon = styled.span<{ theme: MantineTheme }>`
  color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
  margin-right: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.2rem;
`;

export const ItemText = styled.span<{ theme: MantineTheme }>`
  color: ${({ theme }) => theme.colors.gray[7]};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

export const SectionTitle = styled.h2<{ theme: MantineTheme }>`
  font-size: ${({ theme }) => theme.headings.sizes.h2.fontSize};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SectionDescription = styled.p<{ theme: MantineTheme }>`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
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