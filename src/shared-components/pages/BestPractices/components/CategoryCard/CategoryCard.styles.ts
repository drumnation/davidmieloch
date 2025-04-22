import styled from 'styled-components';
import { AnimationVariants } from '@utils/animations/migration-helpers';
import { MantineTheme } from '@mantine/core';

export const CategoryCardContainer = styled.div<{ theme: MantineTheme }>`
  background-color: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
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

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const CategoryTitle = styled.h3<{ theme: MantineTheme }>`
  font-size: ${({ theme }) => theme.headings.sizes.h3.fontSize};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
  display: flex;
  align-items: center;
  word-break: break-word;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: calc(${({ theme }) => theme.headings.sizes.h3.fontSize} * 0.9);
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

export const CategoryDescription = styled.p<{ theme: MantineTheme }>`
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  color: ${({ theme }) => theme.colors.gray[7]};
  display: flex;
  align-items: flex-start;
  word-break: break-word;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export const ItemsList = styled.div<{ theme: MantineTheme }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  flex-grow: 1;
`;

export const Item = styled.div<{ theme: MantineTheme }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ItemIcon = styled.div<{ theme: MantineTheme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.colors.gray[0]};
  padding: ${({ theme }) => theme.spacing.xs};
  flex-shrink: 0;
`;

export const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const ItemTitle = styled.h4<{ theme: MantineTheme }>`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  color: ${({ theme }) => theme.black};
  word-break: break-word;
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

export const ItemDescription = styled.p<{ theme: MantineTheme }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[7]};
  line-height: ${({ theme }) => theme.lineHeights.md};
  margin: 0;
`;

// Animation variants
export const scaleIn: AnimationVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
}; 