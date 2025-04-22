import styled from 'styled-components';
import { MantineTheme } from '@mantine/core';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
  }
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.gray[7]};
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    font-size: calc(${({ theme }) => theme.fontSizes.xl} * 0.85);
    margin-bottom: 0.5rem;
  }
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray[6]};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: calc(${({ theme }) => theme.fontSizes.md} * 0.9);
  }
`;

export const Content = styled.main`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 2rem;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    display: block;
    gap: 1rem;
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
    margin-bottom: 0.5rem;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MainContent = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const MobileFilterContainer = styled.div`
  display: none;
  margin-bottom: 1rem;
  gap: 1rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
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
  padding: 1rem;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
  text-align: center;
  padding: 1rem;
`;

export const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray[6]};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: calc(${({ theme }) => theme.fontSizes.md} * 0.9);
  }
`;

export const RetryButton = styled.button`
  background-color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.75rem 1.25rem;
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors[theme.primaryColor][7]};
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: calc(${({ theme }) => theme.fontSizes.md} * 0.9);
  }
`;

export const DisclaimerBox = styled.div`
  margin-top: 1.5rem;
  padding: 1.25rem;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border: 1px solid ${({ theme }) => theme.colors.gray[3]};
  border-radius: ${({ theme }) => theme.radius.md};
  
  p {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.gray[6]};
    font-style: italic;

    &:not(:last-child) {
      margin-bottom: 0.75rem;
    }
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
    padding: 1rem;
  }
`; 