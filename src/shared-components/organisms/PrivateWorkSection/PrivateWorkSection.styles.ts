import styled from 'styled-components';
import { MantineTheme } from '@mantine/core';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: ${({ theme }) => (theme as MantineTheme).colors.dark[8]};
  border-radius: ${({ theme }) => (theme as MantineTheme).radius.lg};
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.xl};
  color: ${({ theme }) => (theme as MantineTheme).white};
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.md};
  color: ${({ theme }) => (theme as MantineTheme).colors.dark[1]};
`;

export const WorkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

export const WorkCard = styled.article`
  background-color: ${({ theme }) => (theme as MantineTheme).colors.dark[6]};
  border-radius: ${({ theme }) => (theme as MantineTheme).radius.md};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => (theme as MantineTheme).shadows.sm};
`;

export const WorkTitle = styled.h3`
  font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.lg};
  color: ${({ theme }) => (theme as MantineTheme).white};
  margin-bottom: 0.5rem;
`;

export const Company = styled.p`
  font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.sm};
  color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][5]};
  margin-bottom: 1rem;
`;

export const Period = styled.p`
  font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.sm};
  color: ${({ theme }) => (theme as MantineTheme).colors.dark[1]};
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.md};
  color: ${({ theme }) => (theme as MantineTheme).white};
  margin-bottom: 1rem;
  line-height: 1.5;
`;

export const TechnologiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const Technology = styled.span`
  font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.sm};
  color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][2]};
  background-color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][8]};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => (theme as MantineTheme).radius.sm};
`;

export const AchievementsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const Achievement = styled.li`
  font-size: ${({ theme }) => (theme as MantineTheme).fontSizes.md};
  color: ${({ theme }) => (theme as MantineTheme).white};
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;

  &:before {
    content: "•";
    position: absolute;
    left: 0.5rem;
    color: ${({ theme }) => (theme as MantineTheme).colors[(theme as MantineTheme).primaryColor][5]};
  }
`; 