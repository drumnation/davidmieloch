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
  box-shadow: ${({ theme }) => theme.shadows.md};
  opacity: 0;
`;

export const TableHead = styled.thead<StyledTableProps>`
  background: ${({ $variant, theme }) =>
    $variant === 'gradient'
      ? theme.colors[theme.primaryColor]?.[7] || theme.colors.blue[7]
      : $variant === 'accent'
        ? theme.colors.blue[7]
        : theme.colors[theme.primaryColor]?.[7] || theme.colors.blue[7]};
  color: ${({ theme }) => theme.white};
`;

export const TableBody = styled.tbody`
  background: var(--mantine-color-body);
`;

export const TableRow = styled.tr`
  opacity: 0;
  transform: translateY(20px);
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:nth-child(even) {
    background: ${props => props.theme.colors.gray[0]};
    [data-mantine-color-scheme="dark"] & {
       background: ${props => props.theme.colors.dark[6]};
    }
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    [data-mantine-color-scheme="dark"] & {
       background: rgba(255, 255, 255, 0.05);
    }
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
  border-bottom: 1px solid var(--mantine-color-default-border);
  
  &:first-child {
    font-weight: 600;
  }
`;

export const CategoryCell = styled.td`
  padding: 1rem 1.5rem;
  font-weight: 600;
  border-bottom: 1px solid var(--mantine-color-default-border);
  background: var(--mantine-color-body);
  [data-mantine-color-scheme="dark"] & {
       background: ${props => props.theme.colors.dark[7]};
  }
`;

export const HighlightText = styled.span`
  color: ${({ theme }) => theme.colors.green[6]};
  font-weight: 600;
`;

export const LowlightText = styled.span`
  color: ${({ theme }) => theme.colors.red[6]};
  font-weight: 600;
`;
