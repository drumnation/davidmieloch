import styled from 'styled-components';
import { LanguageDotProps } from './LanguageDot.types';

const sizeStyles = {
  sm: `
    width: 8px;
    height: 8px;
    margin-right: 4px;
  `,
  md: `
    width: 12px;
    height: 12px;
    margin-right: 6px;
  `,
  lg: `
    width: 16px;
    height: 16px;
    margin-right: 8px;
  `,
};

export const Container = styled.div<{ showName: boolean }>`
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Dot = styled.span<{ color: string; size: LanguageDotProps['size'] }>`
  display: inline-block;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  ${({ size = 'md' }) => sizeStyles[size]}
`;

export const LanguageName = styled.span`
  font-size: 0.9em;
  font-weight: 500;
`; 