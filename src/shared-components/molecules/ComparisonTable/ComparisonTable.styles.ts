import styled from 'styled-components';

interface StyledTableProps {
  $variant?: 'default' | 'gradient' | 'accent';
}

export const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 2rem 0;
`;

export const Table = styled.table<StyledTableProps>`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  opacity: 0;
  transition: opacity 0.6s ease-out;
  
  &.visible {
    opacity: 1;
  }
`;

export const TableHead = styled.thead<StyledTableProps>`
  background: ${({ $variant, theme }) => 
    $variant === 'gradient' 
      ? theme.colors.gradient
      : $variant === 'accent'
        ? theme.colors.accent.blue
        : theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
`;

export const TableBody = styled.tbody`
  background: ${({ theme }) => theme.colors.background.light};
`;

export const TableRow = styled.tr`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  transition-delay: calc(var(--item-index, 0) * 0.1s);
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:nth-child(even) {
    background: ${({ theme }) => theme.colors.background.paper};
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

export const TableHeaderCell = styled.th`
  padding: 1.25rem 1.5rem;
  text-align: left;
  font-weight: 600;
  font-size: 1.125rem;
  
  &:first-child {
    width: 30%;
  }
  
  &:not(:first-child) {
    width: 35%;
  }
`;

export const TableCell = styled.td`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  
  &:first-child {
    font-weight: 600;
  }
`;

export const CategoryCell = styled.td`
  padding: 1rem 1.5rem;
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  background: ${({ theme }) => theme.colors.background.paper};
`;

export const HighlightText = styled.span`
  color: ${({ theme }) => theme.colors.accent.green};
  font-weight: 600;
`;

export const LowlightText = styled.span`
  color: ${({ theme }) => theme.colors.accent.red};
  font-weight: 600;
`;
