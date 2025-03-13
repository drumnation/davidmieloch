import React from 'react';
import { motion } from 'framer-motion';
import { AiSkepticToExpert } from '../../sections/AiSkepticToExpert';
import { AiAutopilotAnalogy } from '../../sections/AiAutopilotAnalogy';
import { WhitePaperProps } from './WhitePaper.types';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const WhitePaper: React.FC<WhitePaperProps> = ({
  className,
}) => {
  return (
    <motion.div 
      className={className}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      style={{ 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'stretch'
      }}
    >
      <AiSkepticToExpert />
      <AiAutopilotAnalogy />
      {/* Additional sections will be added here as they are developed */}
    </motion.div>
  );
};

export default WhitePaper;