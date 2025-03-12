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
  `
};

export const Grid = styled.div<{
  $layout: '2-column' | '3-column';
  $background?: 'light' | 'dark' | 'gradient';
}>`
  display: grid;
  gap: 2rem;
  width: 100%;
  padding: 3rem;
  ${({ $layout }) => layoutStyles[$layout]}
  ${({ $background }) => $background && backgroundStyles[$background]}
`;

export const QuoteCard = styled.div<{
  $style: 'card' | 'minimal';
  $background?: 'light' | 'dark' | 'gradient';
}>`
  padding: ${({ $style }) => $style === 'card' ? '2rem' : '1rem'};
  border-radius: ${({ theme }) => theme.radius.lg};
  height: 100%;
  
  ${({ $style, $background, theme }) => $style === 'card' && css`
    background: ${$background === 'light' 
      ? theme.colors.background.paper
      : 'rgba(255, 255, 255, 0.1)'};
    box-shadow: ${$background === 'light' 
      ? theme.shadows.md
      : '0 4px 6px rgba(0, 0, 0, 0.2)'};
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-4px);
    }
  `}
`;

export const IconWrapper = styled.div<{
  $background?: 'light' | 'dark' | 'gradient';
}>`
  margin-bottom: 1rem;
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
  margin-bottom: 1.5rem;
  font-style: italic;
`;

export const QuoteAuthor = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const QuoteNote = styled.div`
  margin-top: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.8;
`; 