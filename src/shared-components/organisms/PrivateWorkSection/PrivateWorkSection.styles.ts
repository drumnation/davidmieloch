import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background.dark};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const WorkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

export const WorkCard = styled.article`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const WorkTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

export const Company = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 1rem;
`;

export const Period = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.primary};
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
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary.main};
  background-color: ${({ theme }) => theme.colors.accent.light};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

export const AchievementsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const Achievement = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;

  &:before {
    content: "•";
    position: absolute;
    left: 0.5rem;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`; 