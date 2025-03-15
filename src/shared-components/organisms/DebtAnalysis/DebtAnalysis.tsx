import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../atoms/Typography/Typography';
import { DebtAnalysisProps, DebtCategory } from './DebtAnalysis.types';
import * as S from './DebtAnalysis.styles';
import styled from 'styled-components';

const TitleContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const DebtAnalysis: React.FC<DebtAnalysisProps> = ({
  title,
  categories,
  style = 'accent-cards',
  position = 'full-width',
  className,
}) => {
  return (
    <S.Container className={className} $position={position}>
      {title && (
        <TitleContainer>
          <Typography variant="h2">
            {title}
          </Typography>
        </TitleContainer>
      )}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        style={{ width: '100%' }}
      >
        <S.CardsContainer>
          {categories.map((category: DebtCategory, index: number) => (
            <S.Card 
              key={index} 
              $style={style}
              variants={itemVariants}
            >
              <S.CardHeader>
                <Typography variant="h3">
                  {category.title}
                </Typography>
              </S.CardHeader>
              <S.CardBody>
                <S.CurrentState>
                  {category.current_state}
                </S.CurrentState>
                <S.Impact>
                  <strong>Impact:</strong> {category.impact}
                </S.Impact>
              </S.CardBody>
            </S.Card>
          ))}
        </S.CardsContainer>
      </motion.div>
    </S.Container>
  );
}; 