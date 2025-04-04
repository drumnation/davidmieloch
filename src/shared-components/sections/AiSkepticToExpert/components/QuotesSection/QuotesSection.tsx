import React from 'react';
import { motion, useInView } from 'framer-motion';
import { QuoteGrid } from '../../../../organisms/QuoteGrid';
import { QuoteGridProps } from '../../../../organisms/QuoteGrid/QuoteGrid.types';
import * as S from './QuotesSection.styles';

export interface QuotesSectionProps {
  quotesProps: QuoteGridProps;
  className?: string;
}

export const QuotesSection: React.FC<QuotesSectionProps> = ({
  quotesProps,
  className
}) => {
  // Create a ref for the section
  const sectionRef = React.useRef(null);
  
  // Ensure quotes props are valid
  const validQuotes = React.useMemo(() => {
    if (!quotesProps || !quotesProps.quotes || !Array.isArray(quotesProps.quotes) || quotesProps.quotes.length === 0) {
      console.warn('QuotesSection: Invalid or empty quotes array provided');
      return false;
    }
    return true;
  }, [quotesProps]);

  // Use intersection observer to trigger animations when section is in view
  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.1
  });

  if (!validQuotes) return null;

  // Section animation variants
  const sectionVariants = {
    hidden: { 
      opacity: 0
    },
    visible: { 
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={sectionRef}
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      <S.BackgroundSection
        initial={{ y: 20, opacity: 0.8 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0.8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <S.ContentWrapper>
          <QuoteGrid {...quotesProps} />
        </S.ContentWrapper>
      </S.BackgroundSection>
    </motion.div>
  );
};

export default QuotesSection; 