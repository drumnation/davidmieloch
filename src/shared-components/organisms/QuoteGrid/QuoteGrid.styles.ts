import styled, { css } from 'styled-components';
import { media } from '../../../styles/theme/responsive';

const layoutStyles = {
  '2-column': css`
    grid-template-columns: repeat(1, 1fr);
    
    ${media.up('md')} {
      grid-template-columns: repeat(2, 1fr);
    }
  `,
  '3-column': css`
    grid-template-columns: repeat(1, 1fr);
    
    ${media.up('md')} {
      grid-template-columns: repeat(2, 1fr);
    }
    
    ${media.up('lg')} {
      grid-template-columns: repeat(3, 1fr);
    }
  `
};

const backgroundStyles = {
  light: css`
    background: ${({ theme }) => theme.colors.background.light};
  `,
  dark: css`
    background: ${({ theme }) => theme.colors.background.dark};
    color: ${({ theme }) => theme.colors.text.light};
  `,
  gradient: css`
    background: ${({ theme }) => css`
      linear-gradient(135deg, 
        ${theme.colors.primary.main} 0%,
        ${theme.colors.secondary.main} 100%
      )
    `};
    color: ${({ theme }) => theme.colors.text.light};
  `,
  blue: css`
    /* Setting this to transparent to let each card have the blue background independently */
    background: transparent;
    color: white;
  `
};

export const Grid = styled.div<{
  $layout: '2-column' | '3-column';
  $background?: 'light' | 'dark' | 'gradient' | 'blue';
}>`
  display: grid;
  gap: 1.5rem;
  width: 100%;
  padding: 0;
  background: transparent; /* Ensure grid background is transparent */
  ${({ $layout }) => layoutStyles[$layout]}
  ${({ $background }) => $background && backgroundStyles[$background]}
  
  /* Fix for making 3-column layout have equal widths */
  @media (min-width: 1024px) {
    ${({ $layout }) => $layout === '3-column' && css`
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: 1fr;
    `}
  }
`;

export const QuoteCard = styled.div<{
  $style: 'card' | 'minimal';
  $background?: 'light' | 'dark' | 'gradient' | 'blue';
}>`
  padding: ${({ $style }) => $style === 'card' ? '1.5rem' : '1rem'};
  border-radius: 8px; /* Fixed border radius */
  overflow: hidden; /* Ensure content respects border radius */
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 200px; /* Set fixed minimum height */
  
  ${({ $style, $background, theme }) => $style === 'card' && css`
    background: ${
      $background === 'blue' 
        ? '#2196f3'
        : $background === 'light' 
          ? theme.colors.background.paper
          : 'rgba(255, 255, 255, 0.1)'
    };
    color: ${
      $background === 'blue' || $background === 'dark' || $background === 'gradient'
        ? 'white'
        : 'inherit'
    };
    box-shadow: ${$background === 'light' 
      ? theme.shadows.md
      : '0 4px 8px rgba(0, 0, 0, 0.1)'};
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-4px);
    }
  `}
`;

export const IconWrapper = styled.div<{
  $background?: 'light' | 'dark' | 'gradient' | 'blue';
}>`
  margin-bottom: 0.75rem;
  color: ${({ theme, $background }) => 
    $background === 'light' 
      ? theme.colors.primary.main
      : theme.colors.text.light};
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const QuoteText = styled.div`
  margin-bottom: 1rem;
  font-style: italic;
  flex-grow: 1;
`;

export const QuoteAuthor = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-top: auto;
`;

export const QuoteNote = styled.div`
  margin-top: 0.25rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.8;
`; 