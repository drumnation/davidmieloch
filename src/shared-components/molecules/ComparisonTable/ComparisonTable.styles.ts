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
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  background: #fff;
`;

export const TableHead = styled.thead<StyledTableProps>`
  background: #1976d2;
  color: #fff;
`;

export const TableBody = styled.tbody`
  background: #fff;
`;

export const TableRow = styled.tr`
  opacity: 0;
  transform: translateY(20px);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:nth-child(even) {
    background: #f5f5f5;
  }

  &:nth-child(odd) {
    background: #fff;
  }

  &:hover {
    background: #e3f2fd;
  }
`;

export const TableHeaderCell = styled.th`
  padding: 1.25rem 1.5rem;
  text-align: left;
  font-weight: 600;
  font-size: 1.125rem;
  color: #fff;
`;

export const TableCell = styled.td`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  color: #000;

  &:first-child {
    font-weight: 600;
  }
`;

export const CategoryCell = styled.td`
  padding: 1rem 1.5rem;
  font-weight: 600;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
`;

export const HighlightText = styled.span`
  color: #43a047;
  font-weight: 600;
`;

export const LowlightText = styled.span`
  color: #e53935;
  font-weight: 600;
`;
