import styled from 'styled-components';

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
  color: ${({ theme }) => theme.colors.text.secondary};
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
    $active ? theme.colors.primary.main : theme.colors.background.light};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text.light : theme.colors.text.primary};
  border: 1px solid ${({ $active, theme }) =>
    $active ? theme.colors.primary.main : theme.colors.border.light};
  border-radius: 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ $active, theme }) =>
      $active ? theme.colors.primary.dark : theme.colors.background.medium};
  }
`;

export const SortSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  background-color: ${({ theme }) => theme.colors.background.light};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 14px;
  width: 100%;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const OrderToggle = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background.light};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary.main : theme.colors.text.secondary};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.medium};
  }
`; 