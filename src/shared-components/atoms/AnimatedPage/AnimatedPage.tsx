import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AnimatedPageProps } from './AnimatedPage.types';

const StyledAnimatedPage = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
`;

export const AnimatedPage: React.FC<AnimatedPageProps> = ({ 
  children, 
  className 
}) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: "easeInOut"
      } 
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      } 
    }
  };

  return (
    <StyledAnimatedPage
      className={className}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
    >
      {children}
    </StyledAnimatedPage>
  );
}; 