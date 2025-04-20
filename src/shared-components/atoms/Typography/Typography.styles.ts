'use client';

import styled, { css } from 'styled-components';
import { StyledTypographyProps } from './Typography.types';

const variantStyles = {
  h1: css`
    font-size: 3rem; // Desktop
    line-height: 1.2;
    @media (max-width: 576px) {
      font-size: 2.25rem; // Mobile
    }
  `,
  h2: css`
    font-size: 2.25rem; // Desktop
    line-height: 1.3;
    @media (max-width: 576px) {
      font-size: 1.75rem; // Mobile
    }
  `,
  h3: css`
    font-size: 1.875rem; // Desktop
    line-height: 1.4;
    @media (max-width: 576px) {
      font-size: 1.5rem; // Mobile
    }
  `,
  body: css`
    font-size: 1.125rem; // Desktop
    line-height: 1.6;
    @media (max-width: 576px) {
      font-size: 1rem; // Mobile
    }
  `,
  caption: css`
    font-size: 0.875rem; // Desktop
    line-height: 1.5;
    @media (max-width: 576px) {
      font-size: 0.75rem; // Mobile
    }
  `,
};

const weightStyles = {
  regular: css`
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  `,
  medium: css`
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  `,
  semibold: css`
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  `,
  bold: css`
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  `,
};

const colorStyles = {
  primary: css`
    color: ${({ theme }) => theme.colors.text.primary};
  `,
  secondary: css`
    color: ${({ theme }) => theme.colors.text.secondary || '#e2e8f0'};
  `,
  light: css`
    color: ${({ theme }) => theme.colors.text.light};
  `,
  gradient: css`
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `,
  inherit: css`
    color: inherit;
  `,
};

export const StyledTypography = styled.span<StyledTypographyProps>`
  font-family: 'Inter', sans-serif;
  margin: 0;
  ${({ $variant }) => variantStyles[$variant]};
  ${({ $weight }) => weightStyles[$weight]};
  ${({ $color }) => colorStyles[$color]};
  
  /* Margin styles */
  ${({ $mt }) => $mt && `margin-top: ${typeof $mt === 'number' ? `${$mt}px` : $mt};`}
  ${({ $mb }) => $mb && `margin-bottom: ${typeof $mb === 'number' ? `${$mb}px` : $mb};`}
  ${({ $ml }) => $ml && `margin-left: ${typeof $ml === 'number' ? `${$ml}px` : $ml};`}
  ${({ $mr }) => $mr && `margin-right: ${typeof $mr === 'number' ? `${$mr}px` : $mr};`}
  ${({ $mx }) => $mx && `
    margin-left: ${typeof $mx === 'number' ? `${$mx}px` : $mx};
    margin-right: ${typeof $mx === 'number' ? `${$mx}px` : $mx};
  `}
  ${({ $my }) => $my && `
    margin-top: ${typeof $my === 'number' ? `${$my}px` : $my};
    margin-bottom: ${typeof $my === 'number' ? `${$my}px` : $my};
  `}
`; 