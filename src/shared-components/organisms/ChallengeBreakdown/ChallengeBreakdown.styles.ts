import styled, { css } from 'styled-components';
import { Stack, MantineTheme, Title, Text, rem } from '@mantine/core';
import { animated } from '@react-spring/web';

interface StyledProps {
  $usePointAnimation: boolean;
  styleType?: 'gradient-card' | 'accent-card' | 'challenge-cards';
}

interface SectionProps {
  $bgColor?: string;
}

export const Container = styled.div<{
  $variant: 'primary' | 'secondary' | 'default';
  $position?: 'left' | 'right' | 'center' | 'full-width';
}>`
  color: ${({ $variant, theme }) =>
    $variant === 'primary'
      ? theme.white
      : $variant === 'secondary'
        ? theme.white
        : 'var(--mantine-color-text)'};
  background: ${({ $variant, theme }) =>
    $variant === 'primary'
      ? (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor]?.[6]
      : $variant === 'secondary'
        ? (theme as MantineTheme).colors.gray[8]
        : 'var(--mantine-color-body)'};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  width: 100%;
  max-width: ${props => props.$position === 'full-width' ? '100%' : '800px'};
  margin: 2rem 0;
  
  ${props => props.$position === 'left' && `
    align-self: flex-start;
  `}
  
  ${props => props.$position === 'right' && `
    align-self: flex-end;
  `}
  
  ${props => props.$position === 'center' && `
    align-self: center;
  `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.sm};
    padding-bottom: ${({ theme }) => theme.spacing.xl};
    max-width: 100%;
  }
`;

export const MainTitle = styled(Title)`
  color: var(--mantine-color-black);
  margin-bottom: var(--mantine-spacing-sm);
  font-size: var(--mantine-font-size-xl);
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${rem(48)};
  }
`;

export const MainDescription = styled(Text)`
  color: var(--mantine-color-dimmed);
  font-size: var(--mantine-font-size-lg);
  text-align: center;
  margin-bottom: var(--mantine-spacing-xl);

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: var(--mantine-font-size-xl);
  }
`;

export const StyledCard = styled.div<StyledProps>`
  position: relative;
  overflow: hidden;
  border-radius: var(--mantine-radius-md);
  box-shadow: var(--mantine-shadow-sm);
  padding: var(--mantine-spacing-lg);
  background: var(--mantine-color-body);

  ${({ $usePointAnimation }) =>
    $usePointAnimation
      ? css`
          cursor: pointer;
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

          &:hover {
            transform: translateY(-5px);
            box-shadow: var(--mantine-shadow-md);
          }
        `
      : null}

  ${({ styleType }) => {
    switch (styleType) {
      case 'gradient-card':
        return css`
          background: linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-cyan-6) 100%);
          color: var(--mantine-color-white);
          box-shadow: var(--mantine-shadow-lg);
        `;
      case 'accent-card':
        return css`
          border-left: 4px solid var(--mantine-color-blue-6);
          background-color: rgba(var(--mantine-color-blue-0-rgb), 0.5);
        `;
      default:
        return null;
    }
  }}

  @media (min-width: var(--mantine-breakpoint-sm)) {
    padding: var(--mantine-spacing-xl);
  }
`;

export const ContentWrapper = styled.div`
max-width: 1200px;
margin: 0 auto;
padding: 0 ${({ theme }) => theme.spacing.xl};

@media(max-width: ${({ theme }) => theme.breakpoints.sm}) {
  padding: 0 ${({ theme }) => theme.spacing.sm};
  overflow: visible;
  width: 100%;
}
`;

export const ChallengeGrid = styled.div`
display: grid;
grid-template-columns: 1fr;
gap: ${({ theme }) => theme.spacing.lg};
margin-top: ${({ theme }) => theme.spacing.xl};

@media(min-width: ${({ theme }) => theme.breakpoints.md}) {
  grid-template-columns: repeat(2, 1fr);
}

@media(max-width: ${({ theme }) => theme.breakpoints.sm}) {
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 100%;
}
`;

export const ChallengeCard = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: var(--mantine-color-body);
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
    max-width: 100%;
    min-height: auto;
    overflow: visible;
    width: 100%;
    margin: 0 0 0.75rem 0;
    box-sizing: border-box;
    border: 1px solid var(--mantine-color-default-border);
  }

  h3 {
    color: var(--mantine-color-text);
    font-weight: 600;
    font-size: ${'${({ theme }) => rem(20)}'};

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: ${'${({ theme }) => rem(18)}'};
      margin-bottom: 0.75rem;
      padding: 0 0.25rem;
      line-height: 1.4;
    }
  }
`;

export const CardHeader = styled.div`
display: flex;
align-items: center;
margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CardTitle = styled(Title)`
margin-left: ${({ theme }) => theme.spacing.sm};
`;

export const CardDescription = styled(Text)`
color: ${({ theme }) => theme.colors.gray[7]};
margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const MetricsContainer = styled(Stack)`
margin-top: ${({ theme }) => theme.spacing.lg};
padding-top: ${({ theme }) => theme.spacing.lg};
border-top: 1px solid var(--mantine-color-default-border);
`;

export const MetricItem = styled(Text)`
display: flex;
align-items: center;
gap: ${({ theme }) => theme.spacing.xs};
`;

export const NegativeImpact = styled.span`
color: var(--mantine-color-red-6);
font-weight: 600;
margin-top: ${({ theme }) => theme.spacing.sm};
font-size: ${({ theme }) => theme.fontSizes.sm};
line-height: 1.5;
`;

export const MetricValue = styled.span`
font-size: ${({ theme }) => theme.fontSizes.lg};
font-weight: 700;
color: var(--mantine-color-text);
`;

export const MetricLabel = styled(Text)`
color: var(--mantine-color-dimmed);
`;

export const ChallengeDescription = styled.div`
font-size: 1rem;
line-height: 1.5;
color: var(--mantine-color-dimmed);
margin-bottom: 1rem;

@media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
`;

export const StyledTitle = styled(Title)`
text-align: center;
margin-bottom: var(--mantine-spacing-md);
`;

export const StyledDescription = styled(Text)`
text-align: center;
max-width: 800px;
margin: 0 auto var(--mantine-spacing-lg);
`;

export const AnimatedStack = animated(Stack);

export const InnerContainer = styled.div`
max-width: 1200px;
margin: 0 auto;
padding: 0 var(--mantine-spacing-xl);

@media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
  padding: 0 var(--mantine-spacing-sm);
  overflow: visible;
  width: 100%;
}
`;

export const GridContainer = styled.div`
display: grid;
grid-template-columns: 1fr;
gap: var(--mantine-spacing-lg);
margin-top: var(--mantine-spacing-xl);

@media(min-width: ${({ theme }) => theme.breakpoints.md}) {
  grid-template-columns: repeat(2, 1fr);
}

@media(max-width: ${({ theme }) => theme.breakpoints.sm}) {
  grid-template-columns: 1fr;
  gap: var(--mantine-spacing-md);
  margin-top: var(--mantine-spacing-md);
  width: 100%;
  max-width: 100%;
}
`;

export const Grid = styled.div`
display: grid;
grid-template-columns: 1fr;
gap: var(--mantine-spacing-lg);
margin-top: var(--mantine-spacing-xl);

@media (min-width: ${({ theme }) => theme.breakpoints.md}) {
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
  grid-template-columns: repeat(3, 1fr);
  gap: var(--mantine-spacing-md);
  margin-top: var(--mantine-spacing-md);
}
`;

export const Card = styled(animated.div)`
background: var(--mantine-color-white);
border-radius: var(--mantine-radius-md);
padding: var(--mantine-spacing-xl);
box-shadow: var(--mantine-shadow-sm);
display: flex;
flex-direction: column;
height: 100%;

@media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
  padding: var(--mantine-spacing-lg) var(--mantine-spacing-md);
}
`;

export const IconWrapper = styled.div`
margin-bottom: var(--mantine-spacing-md);
`;

export const SolutionList = styled.ul`
list-style: none;
padding: 0;
margin: 0;
margin-top: var(--mantine-spacing-lg);
padding-top: var(--mantine-spacing-lg);
border-top: 1px solid var(--mantine-color-gray-2);
`;

export const SolutionItem = styled.li`
display: flex;
align-items: center;
margin-top: var(--mantine-spacing-sm);
font-size: var(--mantine-font-size-sm);
color: var(--mantine-color-gray-7);
`;

export const Section = styled(animated.section) <SectionProps>`
  background: ${({ $bgColor }) => $bgColor || 'transparent'};
  padding: var(--mantine-spacing-xl) 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${rem(80)} 0;
  }
`;

export const PointStack = styled(Stack)`
margin-top: var(--mantine-spacing-md);
`;

export const PointText = styled(Text)`
cursor: pointer;
transition: color 0.2s ease-in-out;
position: relative;
padding-left: ${rem(15)};

&:hover {
  color: var(--mantine-color-blue-6);
}
`;

export const PointIndicator = styled.div`
position: absolute;
left: 0;
top: 50%;
transform: translateY(-50%);
width: ${rem(8)};
height: ${rem(8)};
border-radius: 50%;
background-color: var(--mantine-color-blue-6);
opacity: 0;
transition: opacity 0.2s ease-in-out;

${PointText}:hover & {
  opacity: 1;
}
`; 