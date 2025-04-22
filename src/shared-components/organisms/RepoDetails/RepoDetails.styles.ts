import styled from 'styled-components';
import { MantineTheme } from '@mantine/core';

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => (theme as MantineTheme).white};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => (theme as MantineTheme).colors.gray[3]};
  overflow: hidden;
`;

export const Header = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${({ theme }) => (theme as MantineTheme).colors.gray[3]};
  background-color: ${({ theme }) => (theme as MantineTheme).white};
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 0;
  color: ${({ theme }) => (theme as MantineTheme).colors.gray[7]};
  font-size: 14px;
  margin-bottom: 16px;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6]};
  }
`;

export const Title = styled.h2`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: ${({ theme }) => (theme as MantineTheme).black};
`;

export const PrivateBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 12px;
  background-color: ${({ theme }) => (theme as MantineTheme).colors.dark[7]};
  color: ${({ theme }) => (theme as MantineTheme).white};
  font-size: 12px;
  font-weight: 500;
`;

export const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: ${({ theme }) => (theme as MantineTheme).colors.gray[7]};
  margin: 0 0 16px 0;
`;

export const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => (theme as MantineTheme).colors.gray[7]};
  font-size: 14px;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

export const Content = styled.div`
  padding: 24px;
`;

export const Section = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: ${({ theme }) => (theme as MantineTheme).black};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

export const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: ${({ theme }) => (theme as MantineTheme).white};
  border-radius: 8px;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => (theme as MantineTheme).colors.gray[7]};
  margin-bottom: 8px;
`;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => (theme as MantineTheme).black};
`;

export const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6]};
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][8]};
  }
`; 