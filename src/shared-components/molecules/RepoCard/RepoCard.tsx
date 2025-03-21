import React from 'react';
import { RepoCardProps } from './RepoCard.types';
import { formatDate, truncateDescription } from './RepoCard.logic';
import {
  Card,
  Header,
  RepoName,
  Description,
  Footer,
  Stats,
  TopicsContainer,
  PrivateBadge,
  LastUpdated,
  MetaInfo,
  LanguageInfo,
  ViewRepoLink,
} from './RepoCard.styles';
import { Badge, LanguageDot, Tag } from '../../atoms';

export const RepoCard: React.FC<RepoCardProps> = ({
  repo,
  isCompact = false,
  className,
  onClick,
}) => {
  const {
    name,
    description,
    url,
    language,
    stars,
    forks,
    issues,
    lastUpdated,
    isPrivate,
    topics,
    createdAt,
  } = repo;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // Directly opens the GitHub URL in a new tab
  const handleViewOnGitHub = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent card's onClick
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card 
      $isCompact={isCompact} 
      className={className} 
      onClick={handleClick} 
      role="article"
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <Header>
        <RepoName>{name}</RepoName>
        {isPrivate && (
          <PrivateBadge>
            <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 5v-.8C4 1.88 5.79 0 8 0s4 1.88 4 4.2V5h.5c.83 0 1.5.67 1.5 1.5v8c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8C2 5.67 2.67 5 3.5 5H4Zm2-1V5h4v-.8C10 2.98 9.16 2 8 2S6 2.98 6 4.2ZM11 7v2H5V7h6Z" />
            </svg>
            Private
          </PrivateBadge>
        )}
      </Header>

      <Description $isCompact={isCompact}>{truncateDescription(description, isCompact ? 100 : 150)}</Description>

      {topics.length > 0 && (
        <TopicsContainer>
          {topics.slice(0, isCompact ? 3 : 5).map((topic) => (
            <Tag key={topic} label={topic} variant="primary" size="sm" />
          ))}
          {topics.length > (isCompact ? 3 : 5) && (
            <Tag label={`+${topics.length - (isCompact ? 3 : 5)} more`} variant="default" size="sm" />
          )}
        </TopicsContainer>
      )}

      <MetaInfo>
        {language && (
          <LanguageInfo>
            <LanguageDot language={language} size="sm" />
          </LanguageInfo>
        )}
        
        <Footer>
          <Stats>
            {stars > 0 && <Badge count={stars} variant="stars" size="sm" />}
            {forks > 0 && <Badge count={forks} variant="forks" size="sm" />}
            {issues > 0 && <Badge count={issues} variant="issues" size="sm" />}
          </Stats>
          <LastUpdated>
            {createdAt && <span>Created: {formatDate(createdAt)}</span>}
            {lastUpdated && <span>Updated: {formatDate(lastUpdated)}</span>}
          </LastUpdated>
        </Footer>
      </MetaInfo>

      <ViewRepoLink onClick={handleViewOnGitHub}>
        View on GitHub
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </ViewRepoLink>
    </Card>
  );
}; 