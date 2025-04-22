import styled from 'styled-components';
import { MantineTheme } from '@mantine/core';

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SectionTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => (theme as MantineTheme).colors.gray[7]};
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const LanguageTag = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: ${({ $active, theme }) =>
    $active ? (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6] : (theme as MantineTheme).white};
  color: ${({ $active, theme }) =>
    $active ? (theme as MantineTheme).white : (theme as MantineTheme).black};
  border: 1px solid ${({ $active, theme }) =>
    $active ? (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6] : (theme as MantineTheme).colors.gray[3]};
  border-radius: 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ $active, theme }) =>
    $active ? (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][8] : (theme as MantineTheme).colors.gray[0]};
  }
`;

export const SortSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => (theme as MantineTheme).colors.gray[3]};
  background-color: ${({ theme }) => (theme as MantineTheme).white};
  color: ${({ theme }) => (theme as MantineTheme).black};
  font-size: 14px;
  width: 100%;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6]};
  }
`;

export const OrderToggle = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => (theme as MantineTheme).colors.gray[3]};
  border-radius: 4px;
  background-color: ${({ theme }) => (theme as MantineTheme).white};
  color: ${({ $active, theme }) =>
    $active ? (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6] : (theme as MantineTheme).colors.gray[7]};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => (theme as MantineTheme).colors.gray[0]};
  }
`; 