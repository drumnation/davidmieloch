import styled from 'styled-components';

interface StyledCardProps {
  $variant?: 'blue' | 'white';
}

export const StyledCard = styled.div<StyledCardProps>`
  padding: 0;
  height: 100%;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  background: ${({ $variant, theme }) =>
    $variant === 'blue'
      ? theme.colors.accent.blue
      : theme.colors.background.paper};
  color: ${({ $variant, theme }) =>
    $variant === 'blue'
      ? theme.colors.text.light
      : theme.colors.text.primary};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: ${({ theme }) => theme.transitions.default};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.md};

  &:hover {
    transform: translateY(-4px);
  }
`;

export const HeaderSlug = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.light};
`;

export const IconHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.space.md};
  background: ${({ theme }) => theme.colors.accent.blue};
  color: ${({ theme }) => theme.colors.text.light};
`;

export const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  margin-right: ${({ theme }) => theme.space.sm};
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: ${({ theme }) => theme.colors.text.light};
  }
`;

export const Content = styled.div<{ $variant?: 'blue' | 'white' }>`
  padding: ${({ theme }) => theme.space.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.lg};
  flex: 1;
  background: ${({ $variant, theme }) =>
    $variant === 'blue'
      ? theme.colors.accent.blue
      : theme.colors.background.paper};
  color: ${({ $variant, theme }) =>
    $variant === 'blue'
      ? theme.colors.text.light
      : theme.colors.text.primary};
`;

export const Section = styled.div`
  display: flex;
  align-items: flex-start;
  padding-bottom: ${({ theme }) => theme.space.md};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const TextContent = styled.div`
  flex: 1;
`;

export const ImpactTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`;

export const StatusIcon = styled.div<{ type: 'problem' | 'solution' | 'impact' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: ${({ theme }) => theme.space.md};
  margin-top: 0.125rem;
  background: ${({ type, theme }) => {
    switch (type) {
      case 'problem':
        return theme.colors.accent.red;
      case 'solution':
        return theme.colors.accent.green;
      case 'impact':
        return theme.colors.accent.blue;
      default:
        return theme.colors.accent.blue;
    }
  }};
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${({ theme }) => theme.colors.text.light};
  }
`; 