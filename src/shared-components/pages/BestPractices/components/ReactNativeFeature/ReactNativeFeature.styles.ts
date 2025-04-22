import styled from 'styled-components';
import { MantineTheme } from '@mantine/core';

export const ReactNativeFeatureContainer = styled.div<{ theme: MantineTheme }>`
  margin: 0;
  background: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: flex-start;
  
  &.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  }
  
  &.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const FeatureIcon = styled.div<{ theme: MantineTheme }>`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 0.5rem; 
  color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
  flex-shrink: 0;

  img {
    filter: brightness(0) invert(1);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    width: 3rem; 
    height: 3rem;
    padding: 0.6rem;
    margin-right: 0; 
  }
`;

export const FeatureContent = styled.div`
  flex: 1;
`;

export const FeatureTitle = styled.h3<{ theme: MantineTheme }>`
  font-size: ${({ theme }) => theme.headings.sizes.h3.fontSize};
  font-weight: 600;
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.black};
`;

export const FeatureDescription = styled.p<{ theme: MantineTheme }>`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray[7]};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  max-width: 85%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

export const FeatureList = styled.ul<{ theme: MantineTheme }>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureItem = styled.li<{ theme: MantineTheme }>`
  display: flex;
  align-items: flex-start;
  line-height: ${({ theme }) => theme.lineHeights.md};
`;

export const ItemIcon = styled.span<{ theme: MantineTheme }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
  flex-shrink: 0;
`;

export const FeatureItemText = styled.span<{ theme: MantineTheme }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.black};
`;
