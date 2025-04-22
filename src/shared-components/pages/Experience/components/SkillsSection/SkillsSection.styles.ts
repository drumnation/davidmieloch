import styled from 'styled-components';
import { MantineTheme } from '@mantine/core';

export const SectionContainer = styled.section`
  margin-bottom: 24px;
  background-color: ${({ theme }) => (theme as MantineTheme).white};
  border-radius: ${({ theme }) => (theme as MantineTheme).radius.md};
  box-shadow: ${({ theme }) => (theme as MantineTheme).shadows.sm};
  padding: 24px;

  h2 {
    font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.lg};
    margin-bottom: 16px;
    font-weight: 600;
    color: ${({ theme }) => (theme as MantineTheme).black};
  }
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1.5rem;
`;

export const SkillsCategoryColumn = styled.div`
  flex: 1 1 calc(33.333% - 2rem);
  min-width: 240px;
  
  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

export const SkillsCategoryTitle = styled.h3`
  font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.md};
  margin-bottom: 1rem;
  font-weight: 600;
  border-bottom: 2px solid ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][2]};
  padding-bottom: 0.5rem;
  display: inline-block;
  color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][7]};
`;

export const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const SkillTag = styled.div`
  background-color: ${({ theme }) => (theme as MantineTheme).colors.gray[0]};
  padding: 0.5rem 0.75rem;
  border-radius: ${({ theme }) => (theme as MantineTheme).radius.sm};
  font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.sm};
  display: flex;
  align-items: center;
  box-shadow: ${({ theme }) => (theme as MantineTheme).shadows.xs};
  transition: transform 0.2s, box-shadow 0.2s;
  color: ${({ theme }) => (theme as MantineTheme).colors.gray[7]};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => (theme as MantineTheme).shadows.sm};
  }
  
  .skill-icon {
    margin-right: 8px;
    color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][6]};
  }
  
  .skill-name {
    font-weight: 500;
  }
`; 