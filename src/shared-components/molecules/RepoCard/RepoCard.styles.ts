'use client';

import styled from 'styled-components';
import { MantineTheme } from '@mantine/core';
import { RepoCardProps } from './RepoCard.types';

export const Card = styled.div<{ $isCompact?: boolean; $isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${({ $isCompact }) => ($isCompact ? '16px' : '24px')};
  border-radius: ${({ theme }) => (theme as MantineTheme).radius.md};
  background-color: ${({ theme }) => (theme as MantineTheme).white};
  border: 1px solid ${({ $isSelected, theme }) =>
    $isSelected ? (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6] : (theme as MantineTheme).colors.gray[3]};
  transition: all 0.2s ease;
  height: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: ${({ $isCompact }) => ($isCompact ? '12px' : '16px')};
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => (theme as MantineTheme).shadows.md};
    border-color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][1]};
  }

  &:active {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => (theme as MantineTheme).shadows.sm};
  }

  ${({ $isSelected, theme }) => $isSelected && `
    box-shadow: 0 0 0 2px ${(theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6]};
    border-color: ${(theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6]};
  `}

  &::after {
    content: '';
    position: absolute;
    top: 12px;
    right: 12px;
    width: 8px;
    height: 8px;
    border-top: 2px solid ${({ theme }) => (theme as MantineTheme).colors.gray[7]};
    border-right: 2px solid ${({ theme }) => (theme as MantineTheme).colors.gray[7]};
    transform: rotate(45deg);
    opacity: 0.7;
    transition: all 0.2s ease;
  }

  &:hover::after {
    opacity: 1;
    border-color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6]};
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
  width: 100%;

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

export const RepoName = styled.h3`
  font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => (theme as MantineTheme).black};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 24px;
  flex-grow: 1;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.md};
  }
`;

export const Description = styled.p<{ $isCompact?: boolean }>`
  font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.sm};
  line-height: 1.5;
  color: ${({ theme }) => (theme as MantineTheme).colors.gray[7]};
  margin: 0 0 16px;
  flex-grow: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${({ $isCompact }) => ($isCompact ? 2 : 3)};
  -webkit-box-orient: vertical;
  width: 100%;

  @media (max-width: 768px) {
    margin: 0 0 12px;
    font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.sm};
    -webkit-line-clamp: 2;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: auto;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

export const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
    justify-content: flex-start;
  }
`;

export const TopicsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 16px;
  width: 100%;

  @media (max-width: 768px) {
    margin: 0 0 12px;
  }
`;

export const PrivateBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: ${({ theme }) => (theme as MantineTheme).radius.sm};
  font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.xs};
  font-weight: 500;
  color: ${({ theme }) => (theme as MantineTheme).colors.gray[7]};
  background-color: ${({ theme }) => (theme as MantineTheme).white};
  border: 1px solid ${({ theme }) => (theme as MantineTheme).colors.gray[3]};
  white-space: nowrap;
  margin-left: 8px;
  
  svg {
    width: 14px;
    height: 14px;
    margin-right: 4px;
    flex-shrink: 0;
  }
`;

export const LastUpdated = styled.div`
  font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.xs};
  color: ${({ theme }) => (theme as MantineTheme).colors.gray[7]};
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  text-align: right;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    text-align: left;
    margin-top: 4px;
    width: 100%;
  }
  
  > span {
    margin-bottom: 4px;
    
    &:last-child {
      margin-bottom: 0;
    }
    > span {
       display: inline-block;
    }
  }
`;

export const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const LanguageInfo = styled.div`
  margin-bottom: 12px;
  width: 100%;

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

export const ViewRepoLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 16px;
  padding: 10px 16px;
  background-color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6]};
  color: ${({ theme }) => (theme as MantineTheme).white};
  border: none;
  border-radius: ${({ theme }) => (theme as MantineTheme).radius.md};
  font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.sm};
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  @media (max-width: 768px) {
    margin-top: 12px;
    padding: 8px 12px;
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  &:hover {
    background-color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][7]};
  }
`; 