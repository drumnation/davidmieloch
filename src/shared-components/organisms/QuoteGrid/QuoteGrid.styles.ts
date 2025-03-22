import styled from 'styled-components';
import { animated } from '@react-spring/web';

export const Grid = styled.div<{ $layout: string; $background: string }>`
  display: grid;
  grid-template-columns: ${({ $layout }) => 
    $layout === '3-column' ? 'repeat(auto-fill, minmax(300px, 1fr))' :
    $layout === '2-column' ? 'repeat(auto-fill, minmax(450px, 1fr))' : '1fr'};
  gap: 24px;
  width: 100%;
  margin-bottom: 60px;
`;

export const QuoteCard = styled.div<{ $style: string; $background: string }>`
  display: flex;
  flex-direction: column;
  padding: ${({ $style }) => $style === 'card' ? '24px' : '0'};
  background-color: ${({ $style, $background, theme }) => {
    if ($style !== 'card') return 'transparent';
    
    if ($background === 'blue') {
      return theme.colors?.primary?.main || '#4A72FF';
    }
    
    return $background === 'dark' 
      ? theme.colors?.background?.dark || '#2D3748' 
      : theme.colors?.background?.light || '#FFFFFF';
  }};
  border-radius: 12px;
  box-shadow: ${({ $style }) => $style === 'card' ? '0 4px 10px rgba(0, 0, 0, 0.08)' : 'none'};
  height: 100%;
`;

export const IconWrapper = styled.div<{
  $background?: 'light' | 'dark' | 'gradient' | 'blue';
}>`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  color: ${({ $background, theme }) => {
    if ($background === 'blue') {
      return theme.colors?.text?.light || '#FFFFFF';
    }
    
    return theme.colors?.primary?.main || '#4A72FF';
  }};
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const QuoteText = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 16px;
  flex-grow: 1;
`;

export const QuoteAuthor = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const QuoteNote = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors?.text?.secondary || '#718096'};
  margin: 0;
`;

// Animated versions
export const AnimatedQuoteCard = animated(QuoteCard);
export const AnimatedQuoteText = animated(QuoteText);
export const AnimatedQuoteAuthor = animated(QuoteAuthor);
export const AnimatedQuoteNote = animated(QuoteNote);
export const AnimatedIconWrapper = animated(IconWrapper); 