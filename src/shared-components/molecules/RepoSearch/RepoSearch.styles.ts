import styled, { keyframes } from 'styled-components';
import { MantineTheme, rgba } from '@mantine/core';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 24px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => (theme as MantineTheme).colors.gray[3]};
  background-color: ${({ theme }) => (theme as MantineTheme).white};
  color: ${({ theme }) => (theme as MantineTheme).black};
  font-size: 16px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6]};
    box-shadow: 0 0 0 2px ${({ theme }) => rgba((theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6], 0.1)};
  }
  
  &::placeholder {
    color: ${({ theme }) => (theme as MantineTheme).colors.gray[6]};
    opacity: 0.7;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => (theme as MantineTheme).colors.gray[6]};
  pointer-events: none;
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${({ theme }) => (theme as MantineTheme).colors.gray[6]};
  opacity: 0.7;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
  
  &:focus {
    outline: none;
  }
`;

export const Loader = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border: 2px solid ${({ theme }) => (theme as MantineTheme).colors.gray[1]};
  border-top: 2px solid ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6]};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`; 