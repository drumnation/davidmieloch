import styled, { css } from 'styled-components';
import { TypographyVariant, TypographyWeight, TypographyColor } from './Typography.types';
import { media } from '../../styles/responsive';

const variantStyles = {
  h1: css`
    font-size: 2rem; // Mobile first
    line-height: 1.2;
    
    ${media.up('md')} {
      font-size: 2.5rem;
    }
    
    ${media.up('lg')} {
      font-size: 3rem;
    }
  `,
  h2: css`
    font-size: 1.75rem;
    line-height: 1.3;
    
    ${media.up('md')} {
      font-size: 2rem;
    }
    
    ${media.up('lg')} {
      font-size: 2.25rem;
    }
  `,
  h3: css`
    font-size: 1.5rem;
    line-height: 1.4;
    
    ${media.up('md')} {
      font-size: 1.75rem;
    }
    
    ${media.up('lg')} {
      font-size: 1.875rem;
    }
  `,
  h4: css`
    font-size: 1.25rem;
    line-height: 1.4;
    
    ${media.up('md')} {
      font-size: 1.375rem;
    }
    
    ${media.up('lg')} {
      font-size: 1.5rem;
    }
  `,
  body1: css`
    font-size: 1rem;
    line-height: 1.6;
    
    ${media.up('md')} {
      font-size: 1.125rem;
    }
  `,
  body2: css`
    font-size: 0.875rem;
    line-height: 1.6;
    
    ${media.up('md')} {
      font-size: 1rem;
    }
  `,
  caption: css`
    font-size: 0.75rem;
    line-height: 1.5;
    
    ${media.up('md')} {
      font-size: 0.875rem;
    }
  `,
  overline: css`
    font-size: 0.75rem;
    line-height: 1.5;
    text-transform: uppercase;
    letter-spacing: 0.08em;
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
    color: ${({ theme }) => theme.colors?.text?.primary || '#1A202C'};
  `,
  secondary: css`
    color: ${({ theme }) => theme.colors?.text?.secondary || '#4A5568'};
  `,
  accent: css`
    color: ${({ theme }) => theme.colors?.accent?.main || '#6366F1'};
  `,
  inherit: css`
    color: inherit;
  `,
};

interface StyledTypographyProps {
  $variant: TypographyVariant;
  $weight: TypographyWeight;
  $color: TypographyColor;
}

export const StyledTypography = styled.span<StyledTypographyProps>`
  margin: 0;
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $weight }) => weightStyles[$weight]}
  ${({ $color }) => colorStyles[$color]}
`; 