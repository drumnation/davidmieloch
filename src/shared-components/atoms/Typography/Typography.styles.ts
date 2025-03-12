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
    font-weight: 400;
  `,
  medium: css`
    font-weight: 500;
  `,
  semibold: css`
    font-weight: 600;
  `,
  bold: css`
    font-weight: 700;
  `,
};

const colorStyles = {
  primary: css`
    color: var(--text-primary);
  `,
  secondary: css`
    color: var(--text-secondary);
  `,
  light: css`
    color: var(--text-light);
  `,
  gradient: css`
    background: var(--bg-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `,
};

export const StyledTypography = styled.span<StyledTypographyProps>`
  font-family: 'Inter', sans-serif;
  margin: 0;
  ${({ $variant }) => variantStyles[$variant]};
  ${({ $weight }) => weightStyles[$weight]};
  ${({ $color }) => colorStyles[$color]};
`; 