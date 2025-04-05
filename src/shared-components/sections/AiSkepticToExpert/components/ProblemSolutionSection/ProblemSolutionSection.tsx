import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../../../atoms/Typography';
import ProblemSolutionCard from '../../../../organisms/ProblemSolutionCard';
import * as S from './ProblemSolutionSection.styles';

export interface ProblemSolutionCardData {
  slug?: string;
  problem: string;
  solution: string;
  impact: string | { value: string; label?: string };
  icon: string;
  variant: 'gradient' | 'accent' | 'default' | 'blue' | 'white';
}

export interface ProblemSolutionSectionProps {
  title: string;
  cards: ProblemSolutionCardData[];
  className?: string;
}

export const ProblemSolutionSection: React.FC<ProblemSolutionSectionProps> = ({
  title = 'Common Problems & My Solutions',
  cards,
  className
}) => {
  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardItemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }}
      className={className}
    >
      <S.AccentBackgroundSection>
        <S.ContentWrapper>
          <S.TitleContainer>
            <Typography variant="h2">
              {title}
            </Typography>
          </S.TitleContainer>
          
          <S.CardGrid variants={cardContainerVariants}>
            {cards.map((card, index) => {
              const formattedImpact = typeof card.impact === 'string' 
                ? { value: card.impact } 
                : card.impact;
              
              const cardVariant = card.variant === 'gradient' || card.variant === 'accent' 
                ? 'blue' 
                : card.variant === 'default' ? 'white' : card.variant;
              
              return (
                <motion.div key={index} variants={cardItemVariants}>
                  <ProblemSolutionCard 
                    slug={card.slug || 'Feature'}
                    problem={card.problem}
                    solution={card.solution}
                    impact={formattedImpact}
                    icon={card.icon}
                    variant={cardVariant as 'blue' | 'white'}
                  />
                </motion.div>
              );
            })}
          </S.CardGrid>
        </S.ContentWrapper>
      </S.AccentBackgroundSection>
    </motion.div>
  );
};

export default ProblemSolutionSection; 