import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 1.5rem;
  padding-top: 0.75rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 1rem;
    padding-top: 0.5rem;
    gap: 1rem;
  }
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: calc(${({ theme }) => theme.fontSizes.xl} * 0.85);
  }
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: 768px) {
    font-size: calc(${({ theme }) => theme.fontSizes.md} * 0.9);
  }
`;

export const Content = styled.main`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 1.5rem;

  @media (max-width: 1024px) {
    position: static;
    margin-bottom: 1rem;
  }
`;

export const MainContent = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0; /* Prevent grid blowout */
`;

export const SearchContainer = styled.div`
  width: 100%;
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

export const DisclaimerBox = styled.div`
  margin-top: 16px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background.light};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 8px;
  
  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text.secondary};
    font-style: italic;
  }
`; 