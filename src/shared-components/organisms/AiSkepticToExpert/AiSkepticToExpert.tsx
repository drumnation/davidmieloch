import React from 'react';
import { Hero } from '../Hero';
import { QuoteGrid } from '../QuoteGrid';
import { ProblemSolutionCard } from '../ProblemSolutionCard';
import { AiSkepticToExpertProps } from './AiSkepticToExpert.types';

export const AiSkepticToExpert: React.FC<AiSkepticToExpertProps> = ({
  className,
  heroProps,
  quotesProps,
  problemSolutionCardsProps,
}) => {
  return (
    <div className={className} style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <Hero {...heroProps} />
      
      <div style={{ marginTop: '4rem' }}>
        <QuoteGrid {...quotesProps} />
      </div>
      
      <div style={{ 
        marginTop: '4rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {problemSolutionCardsProps.cards.map((card, index) => (
          <ProblemSolutionCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}; 