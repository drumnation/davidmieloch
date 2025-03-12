import styled, { css } from 'styled-components';
import { media } from '../../styles/responsive';

const backgroundStyles = {
  gradient: css`
    background: var(--bg-gradient);
  `,
  light: css`
    background: var(--bg-light);
  `,
  dark: css`
    background: var(--bg-dark);
  `
};

const textColorStyles = {
  light: css`
    color: var(--text-light);
  `,
  dark: css`
    color: var(--text-primary);
  `
};

const patternStyles = {
  'circuit-board': css`
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M10 10h80v80H10z' stroke='rgba(255,255,255,0.1)' stroke-width='1' fill='none'/%3E%3C/svg%3E");
    background-size: 50px 50px;
  `,
  dots: css`
    background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  `,
  none: css``
};

export const HeroContainer = styled.section<{
  $background: string;
  $textColor: string;
  $pattern: string;
}>`
  position: relative;
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  overflow: hidden;
  ${({ $background }) => backgroundStyles[$background as keyof typeof backgroundStyles]}
  ${({ $textColor }) => textColorStyles[$textColor as keyof typeof textColorStyles]}
  ${({ $pattern }) => patternStyles[$pattern as keyof typeof patternStyles]}

  ${media.up('md')} {
    min-height: 90vh;
    padding: 6rem 3rem;
  }
`;

export const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  z-index: 1;
`;

export const Title = styled.div`
  margin-bottom: 1.5rem;

  ${media.up('md')} {
    margin-bottom: 2rem;
  }
`;

export const Subtitle = styled.div`
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
`; 