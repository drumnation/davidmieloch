import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ComparisonTableProps } from './ComparisonTable.types';
import * as S from './ComparisonTable.styles';

// Replace framer-motion with CSS transitions
export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  leftTitle,
  rightTitle,
  items,
  variant = 'default',
  className,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-100px",
    threshold: 0.1
  });

  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <S.Container className={className} ref={ref}>
      <S.Table $variant={variant} className={isVisible ? 'visible' : ''}>
        <S.TableHead $variant={variant}>
          <tr>
            <S.TableHeaderCell>Category</S.TableHeaderCell>
            <S.TableHeaderCell>{leftTitle}</S.TableHeaderCell>
            <S.TableHeaderCell>{rightTitle}</S.TableHeaderCell>
          </tr>
        </S.TableHead>
        <S.TableBody>
          {items.map((item, index) => (
            <S.TableRow
              key={index}
              className={isVisible ? 'visible' : ''}
              style={{ '--item-index': index } as React.CSSProperties}
            >
              <S.CategoryCell>{item.category}</S.CategoryCell>
              <S.TableCell>{item.leftContent}</S.TableCell>
              <S.TableCell>{item.rightContent}</S.TableCell>
            </S.TableRow>
          ))}
        </S.TableBody>
      </S.Table>
    </S.Container>
  );
};
