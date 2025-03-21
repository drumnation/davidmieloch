import React from 'react';
import { PrivateWorkSectionProps } from './PrivateWorkSection.types';
import {
  Container,
  Header,
  Title,
  Subtitle,
  WorkGrid,
  WorkCard,
  WorkTitle,
  Company,
  Period,
  Description,
  TechnologiesList,
  Technology,
  AchievementsList,
  Achievement,
} from './PrivateWorkSection.styles';

export const PrivateWorkSection: React.FC<PrivateWorkSectionProps> = ({
  works,
  title = 'Private Work Experience',
  subtitle = 'Showcasing my contributions to private repositories and closed-source projects',
}) => {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Header>
      <WorkGrid>
        {works.map((work, index) => (
          <WorkCard key={`${work.company}-${index}`}>
            <WorkTitle>{work.title}</WorkTitle>
            <Company>{work.company}</Company>
            <Period>{work.period}</Period>
            <Description>{work.description}</Description>
            <TechnologiesList>
              {work.technologies.map((tech) => (
                <Technology key={tech}>{tech}</Technology>
              ))}
            </TechnologiesList>
            <AchievementsList>
              {work.achievements.map((achievement, i) => (
                <Achievement key={i}>{achievement}</Achievement>
              ))}
            </AchievementsList>
          </WorkCard>
        ))}
      </WorkGrid>
    </Container>
  );
}; 