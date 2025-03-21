import styled from 'styled-components';

export const FilterBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
`;

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0;
`;

export const FilterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ClearFiltersButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: transparent;
  border: none;
  color: #4B5563;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #1F2937;
  }

  &:disabled {
    color: #9CA3AF;
    cursor: not-allowed;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`; 