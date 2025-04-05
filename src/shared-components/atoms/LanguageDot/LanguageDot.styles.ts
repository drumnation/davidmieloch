import styled from 'styled-components';
import { LanguageDotProps } from './LanguageDot.types';

type SizeKey = 'sm' | 'md' | 'lg';

const sizeStyles: Record<SizeKey, string> = {
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

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  
  &[data-show-name="false"] {
    margin-right: 0;
  }
`;

export const Dot = styled.span<{ color: string; size: SizeKey }>`
  display: inline-block;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  ${({ size }) => sizeStyles[size as SizeKey]}
`;

export const LanguageName = styled.span`
  font-size: 0.9em;
  font-weight: 500;
`; 