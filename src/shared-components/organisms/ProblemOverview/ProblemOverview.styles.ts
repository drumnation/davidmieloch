import styled, { css } from 'styled-components';
import { animated } from '@react-spring/web';
import { media } from '../../../styles/theme/responsive';

const positionStyles = {
  left: css`
    margin-right: auto;
  `,
  right: css`
    margin-left: auto;
  `,
  'full-width': css`
    width: 100%;
  `
};

export const Container = styled.div<{
  $position: 'left' | 'right' | 'full-width';
  $background?: 'light' | 'dark' | 'gradient';
  $style?: 'gradient-card' | 'accent-card';
}>`
  max-width: ${({ $position }) => $position === 'full-width' ? '100%' : '600px'};
  width: 100%;
  padding: ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  
  ${({ $position }) => positionStyles[$position]}

  ${({ $style, $background, theme }) => {
    if ($style === 'accent-card') {
      return css`
        border-left: 4px solid ${theme.colors.primary.main};
        ${$background === 'light' && css`
          background: ${theme.colors.background.light};
          color: ${theme.colors.text.primary};
        `}
        ${$background === 'dark' && css`
          background: ${theme.colors.background.dark};
          color: ${theme.colors.text.light};
        `}
        ${$background === 'gradient' && css`
          background: linear-gradient(135deg,
            ${theme.colors.primary.main} 0%,
            ${theme.colors.secondary.main} 100%
          );
          color: ${theme.colors.text.light};
        `}
      `;
    }
    
    if ($style === 'gradient-card') {
      return css`
        ${$background === 'light' && css`
          background: ${theme.colors.background.paper};
          color: ${theme.colors.text.primary};
        `}
        ${$background === 'dark' && css`
          background: ${theme.colors.background.dark};
          color: ${theme.colors.text.light};
        `}
        ${$background === 'gradient' && css`
          background: linear-gradient(135deg,
            ${theme.colors.primary.dark} 0%,
            ${theme.colors.secondary.dark} 100%
          );
          color: ${theme.colors.text.light};
        `}
      `;
    }
  }}
`;

export const AnimatedContainer = animated(Container);

export const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

export const AnimatedHeader = animated(Header);

export const Description = styled.div`
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

export const AnimatedDescription = animated(Description);

export const MetricsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};
  grid-template-columns: repeat(1, 1fr);
  
  ${media.up('md')} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${media.up('lg')} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const MetricCard = styled.div`
  text-align: center;
`;

export const AnimatedMetricCard = animated(MetricCard);

export const MetricNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.space.xs};
  color: inherit;
  
  span {
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }
`;

export const MetricLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.8;
  color: inherit;
`; 