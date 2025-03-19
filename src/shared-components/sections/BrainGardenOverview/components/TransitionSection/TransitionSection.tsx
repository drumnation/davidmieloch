import React from 'react';
import { motion } from 'framer-motion';
import * as S from './TransitionSection.styles';

interface TransitionSectionProps {
  /**
   * Description text explaining the next section
   */
  description?: string;
}

export const TransitionSection: React.FC<TransitionSectionProps> = ({ 
  description = "Explore how BrainGarden's innovative architecture is engineered to transform your team's productivity and knowledge management capabilities."
}) => {
  // Split text into sentences for staggered animation
  const sentences = description.split('. ').map((sentence: string) => 
    sentence.endsWith('.') ? sentence : `${sentence}.`
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.4,
        delayChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <S.TransitionContainer>
      <S.ContentWrapper>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {sentences.map((sentence: string, index: number) => (
            <motion.span 
              key={index}
              variants={itemVariants}
              style={{ display: 'inline' }}
            >
              <S.TransitionText as="span">{sentence} </S.TransitionText>
            </motion.span>
          ))}
        </motion.div>
      </S.ContentWrapper>
    </S.TransitionContainer>
  );
}; 