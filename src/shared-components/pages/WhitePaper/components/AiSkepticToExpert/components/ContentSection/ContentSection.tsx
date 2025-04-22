import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@shared-components/atoms/Typography';
import * as S from './ContentSection.styles';

export interface ContentSectionProps {
  title?: string;
  titleStyle?: {
    uppercase?: boolean;
  };
  children: ReactNode;
  className?: string;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  titleStyle = { uppercase: true },
  children,
  className
}) => {
  const contentVariants = {
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

  // Transform title to uppercase if specified in titleStyle
  const displayTitle = titleStyle?.uppercase && title
    ? title.toUpperCase()
    : title;

  return (
    <motion.div
      variants={contentVariants}
      className={className}
    >
      <S.ContentContainer>
        {title && (
          <div className="text-left" style={{ marginBottom: S.SPACING.paragraph }}>
            <Typography variant="h2" className="mb-4">
              {displayTitle}
            </Typography>
          </div>
        )}

        {children}
      </S.ContentContainer>
    </motion.div>
  );
};

export default ContentSection; 