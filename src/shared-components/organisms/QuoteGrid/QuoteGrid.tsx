import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Card } from '../../atoms/Card/Card';

export interface QuoteGridProps {
  quotes: Array<{
    text: string;
    author: string;
  }>;
  style?: string;
  position?: string;
  className?: string;
}

const QuoteContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

const QuoteCard = styled(Card)`
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.background.light};
  border-left: 4px solid ${({ theme }) => theme.colors.accent.blue};
  
  &.gradient {
    background: ${({ theme }) => theme.colors.gradient};
    color: ${({ theme }) => theme.colors.text.light};
    border-left: none;
  }
  
  &.accent {
    background-color: ${({ theme }) => theme.colors.background.light};
    border-left: 4px solid ${({ theme }) => theme.colors.primary.main};
  }
`;

const QuoteText = styled.blockquote`
  font-style: italic;
  font-size: 1.125rem;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  padding: 0;
`;

const QuoteAuthor = styled.div`
  text-align: right;
  font-weight: 500;
  font-size: 0.875rem;
  opacity: 0.8;
`;

export const QuoteGrid: React.FC<QuoteGridProps> = ({
  quotes,
  style = 'default',
  className,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const getCardClassName = () => {
    if (style === 'gradient-card' || style === 'gradient-cards') return 'gradient';
    if (style === 'accent-card' || style === 'accent-cards') return 'accent';
    return '';
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <QuoteContainer>
        {quotes.map((quote, index) => (
          <motion.div key={index} variants={cardVariants}>
            <QuoteCard className={getCardClassName()}>
              <QuoteText>&ldquo;{quote.text}&rdquo;</QuoteText>
              <QuoteAuthor>— {quote.author}</QuoteAuthor>
            </QuoteCard>
          </motion.div>
        ))}
      </QuoteContainer>
    </motion.div>
  );
};

export default QuoteGrid; 