import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.background.dark};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ChartSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  min-height: 350px;
  display: flex;
  flex-direction: column;
`;

export const ChartTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
  text-align: center;
`;

export const ChartContainer = styled.div`
  width: 100%;
  flex: 1;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
  text-align: center;
`;

export const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 1rem;
`;

export const RetryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.5rem 1rem;
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`; 