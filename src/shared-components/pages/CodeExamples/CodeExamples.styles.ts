import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Header = styled.header`
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  max-width: 800px;
`;

export const RepoSection = styled.section`
  margin-bottom: 48px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const RepoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`; 