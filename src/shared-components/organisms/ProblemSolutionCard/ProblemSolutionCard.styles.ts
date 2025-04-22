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
      ? theme.colors[theme.primaryColor]?.[6] || theme.colors.blue[6]
      : 'var(--mantine-color-body)'};
  color: ${({ $variant, theme }) =>
    $variant === 'blue'
      ? theme.white
      : 'var(--mantine-color-text)'};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};

  &:hover {
    transform: translateY(-4px);
  }
`;

export const HeaderSlug = styled.div`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.white};
`;

export const IconHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.blue[6]};
  color: ${({ theme }) => theme.white};
`;

export const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  margin-right: ${({ theme }) => theme.spacing.sm};
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: ${({ theme }) => theme.white};
  }
`;

export const Content = styled.div<{ $variant?: 'blue' | 'white' }>`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  background: ${({ $variant, theme }) =>
    $variant === 'blue'
      ? theme.colors[theme.primaryColor]?.[6] || theme.colors.blue[6]
      : 'var(--mantine-color-body)'};
  color: ${({ $variant, theme }) =>
    $variant === 'blue'
      ? theme.white
      : 'var(--mantine-color-text)'};
`;

export const Section = styled.div`
  display: flex;
  align-items: flex-start;
  padding-bottom: ${({ theme }) => theme.spacing.md};
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
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const StatusIcon = styled.div<{ type: 'problem' | 'solution' | 'impact' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: ${({ theme }) => theme.spacing.md};
  margin-top: 0.125rem;
  background: ${({ type, theme }) => {
    switch (type) {
      case 'problem':
        return theme.colors.red[6];
      case 'solution':
        return theme.colors.green[6];
      case 'impact':
        return theme.colors.blue[6];
      default:
        return theme.colors.blue[6];
    }
  }};
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${({ theme }) => theme.white};
  }
`; 