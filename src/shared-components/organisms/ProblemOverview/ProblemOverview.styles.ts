import styled, { css } from 'styled-components';
import { animated } from '@react-spring/web';
import { MantineTheme } from '@mantine/core';

interface ContainerProps {
  $position: 'left' | 'right' | 'center' | 'full-width';
  $background?: 'light' | 'dark' | 'gradient';
  $style?: 'gradient-card' | 'accent-card';
  $variant?: 'primary' | 'secondary' | 'default';
}

const positionStyles = {
  left: css`
    margin-right: auto;
  `,
  right: css`
    margin-left: auto;
  `,
  center: css`
    align-items: center;
    text-align: center;
  `,
  'full-width': css`
    width: 100%;
    align-items: stretch;
    text-align: left;
  `
};

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  ${({ $position }) => positionStyles[$position]}
  color: ${({ $variant, theme }) => {
    if ($variant === 'primary') return (theme as MantineTheme).white;
    if ($variant === 'secondary') return (theme as MantineTheme).black;
    return 'inherit';
  }};
  background: ${({ $variant, theme }) => {
    if ($variant === 'primary') return (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][8];
    if ($variant === 'secondary') return (theme as MantineTheme).white;
    return 'transparent';
  }};
  max-width: ${({ $position }) => $position === 'full-width' ? '100%' : '600px'};
  width: 100%;
  padding: ${({ theme }) => (theme as MantineTheme).spacing.xl};
  border-radius: ${({ theme }) => (theme as MantineTheme).radius.lg};
  box-shadow: ${({ theme }) => (theme as MantineTheme).shadows.md};
  overflow: hidden;

  ${({ $variant, theme }) =>
    $variant === 'primary' &&
    `
    h2, h3, p {
      color: ${(theme as MantineTheme).white};
    }
  `}

  ${({ $variant, theme }) =>
    $variant === 'secondary' &&
    `
    h2, h3, p {
      color: ${(theme as MantineTheme).colors.dark[8]};
    }
  `}

  ${({ $style, $background, theme }) => {
    if ($style === 'accent-card') {
      return css`
        border-left: 4px solid ${(theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6]};
        ${$background === 'light' && css`
          background: ${(theme as MantineTheme).white};
          color: ${(theme as MantineTheme).black};
        `}
        ${$background === 'dark' && css`
          background: ${(theme as MantineTheme).colors.dark[8]};
          color: ${(theme as MantineTheme).white};
        `}
        ${$background === 'gradient' && css`
          background: linear-gradient(135deg,
            ${(theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6]} 0%,
            ${(theme as MantineTheme).colors.gray[6]} 100%
          );
          color: ${(theme as MantineTheme).white};
        `}
      `;
    }

    if ($style === 'gradient-card') {
      return css`
        ${$background === 'light' && css`
          background: ${(theme as MantineTheme).white};
          color: ${(theme as MantineTheme).black};
        `}
        ${$background === 'dark' && css`
          background: ${(theme as MantineTheme).colors.dark[8]};
          color: ${(theme as MantineTheme).white};
        `}
        ${$background === 'gradient' && css`
          background: linear-gradient(135deg,
            ${(theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][8]} 0%,
            ${(theme as MantineTheme).colors.gray[8]} 100%
          );
          color: ${(theme as MantineTheme).white};
        `}
      `;
    }
  }}
`;

export const AnimatedContainer = animated(Container);

export const Header = styled.div`
  margin-bottom: ${({ theme }) => (theme as MantineTheme).spacing.lg};
`;

export const AnimatedHeader = animated(Header);

export const Description = styled.div`
  margin-bottom: ${({ theme }) => (theme as MantineTheme).spacing.xl};
`;

export const AnimatedDescription = animated(Description);

export const MetricsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => (theme as MantineTheme).spacing.lg};
  grid-template-columns: repeat(1, 1fr);
  
  @media (min-width: ${({ theme }) => (theme as MantineTheme).breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${({ theme }) => (theme as MantineTheme).breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const MetricCard = styled.div`
  text-align: inherit;
`;

export const AnimatedMetricCard = animated(MetricCard);

export const MetricNumber = styled.span`
  display: block;
  font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.xl};
  font-weight: 700;
  margin-bottom: ${({ theme }) => (theme as MantineTheme).spacing.xs};
  color: inherit;
  
  span {
    font-weight: 400;
  }
`;

export const MetricLabel = styled.span`
  display: block;
  font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.sm};
  opacity: 0.8;
  color: inherit;
`;

export const ProblemCard = styled.div`
  background-color: ${({ theme }) => (theme as MantineTheme).white};
  border-radius: ${({ theme }) => (theme as MantineTheme).radius.md};
  padding: ${({ theme }) => (theme as MantineTheme).spacing.xl};
  box-shadow: ${({ theme }) => (theme as MantineTheme).shadows.md};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => (theme as MantineTheme).spacing.lg};
  color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor]?.[6] || (theme as MantineTheme).colors.blue[6]};
`;

export const SectionContent = styled.div`
  font-size: 1rem;
  margin-bottom: ${({ theme }) => (theme as MantineTheme).spacing.xl};
`;

export const ProblemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  gap: ${({ theme }) => (theme as MantineTheme).spacing.lg};
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
`;

export const ListItemIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: ${({ theme }) => (theme as MantineTheme).spacing.sm};
  flex-shrink: 0;
  margin-top: 2px;
`;

export const ListItemText = styled.span`
  font-size: 0.9rem;
  margin-bottom: ${({ theme }) => (theme as MantineTheme).spacing.xs};
`; 