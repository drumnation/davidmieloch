import React from 'react';
import { RepoDetailsProps } from './RepoDetails.types';
import { Tag } from '../../atoms/Tag';
import {
  DetailsContainer,
  Header,
  BackButton,
  Title,
  PrivateBadge,
  Description,
  MetaInfo,
  MetaItem,
  TagsContainer,
  Content,
  Section,
  SectionTitle,
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  LinkButton
} from './RepoDetails.styles';
import { formatLongDate } from '../../../utils';

export const RepoDetails: React.FC<RepoDetailsProps> = ({
  repository,
  onBack,
  className
}) => {
  return (
    <DetailsContainer className={className}>
      <Header>
        {onBack && (
          <BackButton onClick={onBack}>
            ← Back to repositories
          </BackButton>
        )}
        
        <Title>
          {repository.name}
          {repository.isPrivate && <PrivateBadge>Private</PrivateBadge>}
        </Title>
        
        <Description>
          {repository.description || 'No description provided.'}
        </Description>
        
        <MetaInfo>
          {repository.language && (
            <MetaItem>
              <span role="img" aria-label="Language">📊</span>
              {repository.language}
            </MetaItem>
          )}
          <MetaItem>
            <span role="img" aria-label="Owner">👤</span>
            {repository.owner.login}
          </MetaItem>
          <MetaItem>
            <span role="img" aria-label="Created">📅</span>
            Created: {formatLongDate(repository.createdAt)}
          </MetaItem>
          <MetaItem>
            <span role="img" aria-label="Updated">🕒</span>
            Updated: {formatLongDate(repository.updatedAt)}
          </MetaItem>
        </MetaInfo>
        
        {repository.topics.length > 0 && (
          <TagsContainer>
            {repository.topics.map(topic => (
              <Tag key={topic} label={topic} />
            ))}
          </TagsContainer>
        )}
        
        <LinkButton href={repository.url} target="_blank" rel="noopener noreferrer">
          View on GitHub
          <span role="img" aria-label="External Link">↗️</span>
        </LinkButton>
      </Header>
      
      <Content>
        <Section>
          <SectionTitle>Repository Stats</SectionTitle>
          <StatsGrid>
            <StatCard>
              <StatLabel>Stars</StatLabel>
              <StatValue>{repository.stars}</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Forks</StatLabel>
              <StatValue>{repository.forks}</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Watchers</StatLabel>
              <StatValue>{repository.watchers}</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Open Issues</StatLabel>
              <StatValue>{repository.issues}</StatValue>
            </StatCard>
          </StatsGrid>
        </Section>
        
        {repository.homepage && (
          <Section>
            <SectionTitle>Homepage</SectionTitle>
            <LinkButton href={repository.homepage} target="_blank" rel="noopener noreferrer">
              Visit Homepage
              <span role="img" aria-label="External Link">↗️</span>
            </LinkButton>
          </Section>
        )}
      </Content>
    </DetailsContainer>
  );
}; 