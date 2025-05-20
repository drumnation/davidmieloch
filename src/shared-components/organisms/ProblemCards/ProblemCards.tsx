import React from 'react';
import { ProblemCardsProps } from './ProblemCards.types';
import { ProblemCard, Title, Description, PlainTextContent } from './ProblemCards.styles';

export const ProblemCards: React.FC<ProblemCardsProps> = ({
  problems,
  style = 'default',
  className,
}) => {
  const getCardClassName = () => {
    if (style === 'gradient-card' || style === 'gradient-cards') return 'gradient';
    if (style === 'accent-card' || style === 'accent-cards') return 'accent';
    return '';
  };

  return (
    <div className={className} style={{ height: '100%' }}>
      {problems.map((problem, index) => (
        <ProblemCard key={index} className={getCardClassName()}>
          <Title variant="h3">{problem.title}</Title>
          <Description variant="body">{problem.description}</Description>
          {problem.plainTextContent && (
            <PlainTextContent>{problem.plainTextContent}</PlainTextContent>
          )}
          {problem.codeExample && !problem.plainTextContent && (
            <PlainTextContent>{problem.codeExample}</PlainTextContent>
          )}
        </ProblemCard>
      ))}
    </div>
  );
}