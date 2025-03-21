import React from 'react';
import { CodeExamplesProps } from './CodeExamples.types';
import {
  Container,
  Header,
  Title,
  Description,
  RepoSection,
  SectionTitle,
  RepoGrid,
} from './CodeExamples.styles';
import { RepoCard } from '../../molecules/RepoCard';

export const CodeExamples: React.FC<CodeExamplesProps> = ({
  repositories,
  className,
}) => {
  return (
    <Container className={className}>
      <Header>
        <Title>Code Examples & Projects</Title>
        <Description>
          Explore my public repositories and learn about my code examples.
          Browse through different projects to see my coding style and skills.
        </Description>
      </Header>

      <RepoSection>
        <SectionTitle>Public Repositories</SectionTitle>
        <RepoGrid>
          {repositories.length > 0 ? (
            repositories.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))
          ) : (
            <p>No repositories available.</p>
          )}
        </RepoGrid>
      </RepoSection>
    </Container>
  );
}; 