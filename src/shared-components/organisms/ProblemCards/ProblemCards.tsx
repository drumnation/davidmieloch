import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Typography } from '../../atoms/Typography/Typography';
import { Card } from '../../atoms/Card/Card';

export interface ProblemCardsProps {
  problems: Array<{
    title: string;
    description: string;
    codeExample: string;
  }>;
  style?: string;
  position?: string;
  className?: string;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`;

const ProblemCard = styled(Card)`
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.background.light};
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &.gradient {
    background: ${({ theme }) => theme.colors.gradient};
    color: ${({ theme }) => theme.colors.text.light};
  }
  
  &.accent {
    background-color: ${({ theme }) => theme.colors.background.light};
    border-left: 4px solid ${({ theme }) => theme.colors.primary.main};
  }
`;

const Title = styled(Typography)`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary.main};
  
  .gradient & {
    color: ${({ theme }) => theme.colors.text.light};
  }
`;

const Description = styled(Typography)`
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const CodeBlock = styled.div`
  background: ${({ theme }) => theme.colors.background.dark};
  border-radius: 8px;
  padding: 1rem;
  margin-top: auto;
  overflow: auto;
  
  pre {
    margin: 0;
    
    code {
      font-family: 'Fira Code', monospace;
      color: #e6e6e6;
      white-space: pre-wrap;
      font-size: 0.875rem;
    }
  }
`;

export const ProblemCards: React.FC<ProblemCardsProps> = ({
  problems,
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
      <Container>
        {problems.map((problem, index) => (
          <motion.div key={index} variants={cardVariants}>
            <ProblemCard className={getCardClassName()}>
              <Title variant="h3">{problem.title}</Title>
              <Description variant="body">{problem.description}</Description>
              <CodeBlock>
                <pre>
                  <code>{problem.codeExample}</code>
                </pre>
              </CodeBlock>
            </ProblemCard>
          </motion.div>
        ))}
      </Container>
    </motion.div>
  );
}; 