import styled from 'styled-components';
import { RepoCardProps } from './RepoCard.types';

export const Card = styled.div<{ $isCompact?: boolean; $isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${({ $isCompact }) => ($isCompact ? '16px' : '24px')};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background.light};
  border: 1px solid ${({ $isSelected, theme }) => 
    $isSelected ? theme.colors.primary.main : theme.colors.border.light};
  transition: all 0.2s ease;
  height: 100%;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
    border-color: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  }

  ${({ $isSelected, theme }) => $isSelected && `
    box-shadow: 0 0 0 2px ${theme.colors.primary.main};
    border-color: ${theme.colors.primary.main};
  `}

  &::after {
    content: '';
    position: absolute;
    top: 12px;
    right: 12px;
    width: 8px;
    height: 8px;
    border-top: 2px solid ${({ theme }) => theme.colors.text.secondary};
    border-right: 2px solid ${({ theme }) => theme.colors.text.secondary};
    transform: rotate(45deg);
    opacity: 0.7;
    transition: all 0.2s ease;
  }

  &:hover::after {
    opacity: 1;
    border-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const RepoName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Description = styled.p<{ $isCompact?: boolean }>`
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 16px;
  flex-grow: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${({ $isCompact }) => ($isCompact ? 2 : 3)};
  -webkit-box-orient: vertical;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

export const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TopicsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 16px;
`;

export const PrivateBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  background-color: ${({ theme }) => theme.colors.background.light};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  
  svg {
    width: 14px;
    height: 14px;
    margin-right: 4px;
  }
`;

export const LastUpdated = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 8px;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  
  /* Add some separation between items when there are multiple dates */
  > span {
    margin-bottom: 4px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LanguageInfo = styled.div`
  margin-bottom: 12px;
`;

export const ViewRepoLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 16px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }
`; 