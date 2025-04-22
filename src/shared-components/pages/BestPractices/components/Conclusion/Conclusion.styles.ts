import styled from 'styled-components';
import { MantineTheme } from '@mantine/core';

export const ConclusionContainer = styled.div`
  width: 100%;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const SectionIcon = styled.div<{ theme: MantineTheme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.radius.xl};
  background-color: #000000;
  padding: ${({ theme }) => theme.spacing.sm};
  margin: 0 auto;

  svg, img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConclusionTitle = styled.h2<{ theme: MantineTheme }>`
  font-size: ${({ theme }) => theme.headings.sizes.h2.fontSize};
  margin: 0;
  color: ${({ theme }) => theme.black};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.headings.sizes.h3.fontSize};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.headings.sizes.h4.fontSize};
  }
`;

export const ConclusionText = styled.p<{ theme: MantineTheme }>`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.gray[7]};
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`; 