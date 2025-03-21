'use client';

import styled, { css } from 'styled-components';
import { StyledTypographyProps } from './Typography.types';

const variantStyles = {
  h1: css`
    font-size: 3rem;
    line-height: 1.2;
  `,
  h2: css`
    font-size: 2.25rem;
    line-height: 1.3;
  `,
  h3: css`
    font-size: 1.875rem;
    line-height: 1.4;
  `,
  body: css`
    font-size: 1.125rem;
    line-height: 1.6;
  `,
  caption: css`
    font-size: 0.875rem;
    line-height: 1.5;
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
    color: ${({ theme }) => theme.colors.text.secondary};
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