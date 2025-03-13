import React from 'react';
import { motion } from 'framer-motion';
import { ComparisonTableProps } from './ComparisonTable.types';
import * as S from './ComparisonTable.styles';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  leftTitle,
  rightTitle,
  items,
  variant = 'default',
  className,
}) => {
  return (
    <S.Container className={className}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <S.Table $variant={variant}>
          <S.TableHead $variant={variant}>
            <tr>
              <S.TableHeaderCell>Category</S.TableHeaderCell>
              <S.TableHeaderCell>{leftTitle}</S.TableHeaderCell>
              <S.TableHeaderCell>{rightTitle}</S.TableHeaderCell>
            </tr>
          </S.TableHead>
          <S.TableBody>
            {items.map((item, index) => (
              <motion.tr
                key={index}
                custom={index}
                variants={rowVariants}
              >
                <S.CategoryCell>{item.category}</S.CategoryCell>
                <S.TableCell>{item.leftContent}</S.TableCell>
                <S.TableCell>{item.rightContent}</S.TableCell>
              </motion.tr>
            ))}
          </S.TableBody>
        </S.Table>
      </motion.div>
    </S.Container>
  );
};
