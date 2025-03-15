import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../../atoms/Icon';
import { ComparisonGridProps } from './ComparisonGrid.types';
import * as S from './ComparisonGrid.styles';

export const ComparisonGrid: React.FC<ComparisonGridProps> = ({
  before_after,
  style = 'gradient-cards',
  position = 'full-width',
  className,
}) => {
  return (
    <S.Container position={position} className={className}>
      <S.Grid
        as={motion.div}
        variants={S.staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {before_after.map((item, index) => (
          <S.Card
            key={index}
            styleType={style}
            variants={S.fadeIn}
          >
            <S.AspectTitle>
              {item.icon && (
                <S.IconWrapper>
                  <Icon name={item.icon} size={18} />
                </S.IconWrapper>
              )}
              {item.aspect}
            </S.AspectTitle>
            
            <S.ComparisonContainer>
              <S.ComparisonItem>
                <S.Label>Before</S.Label>
                <S.Value>{item.before}</S.Value>
              </S.ComparisonItem>
              
              <S.ComparisonItem>
                <S.Label>After</S.Label>
                <S.Value>{item.after}</S.Value>
              </S.ComparisonItem>
            </S.ComparisonContainer>
          </S.Card>
        ))}
      </S.Grid>
    </S.Container>
  );
}; 