import React from 'react';
import { motion } from 'framer-motion';
import { BioContent as StyledBioContent } from '../../Bio.styles';
import { HeadingWrapper, BioTextContent } from './BioIntro.styles';
import {
  IconCode,
  IconBuildingBridge,
  IconMusicCode,
  IconSchool,
  IconPuzzle,
  IconRocket,
  IconBrain,
  IconChartArcs,
  IconAward,
  IconBulb
} from '@tabler/icons-react';
import { 
  BIO_CONTENT,
  INTRO_PARAGRAPH,
  SKILL_ICONS,
  CLOSING_PARAGRAPHS
} from '../../Bio.constants';

// Define the props interface directly in this file since there seems to be an issue with importing it
interface BioIntroProps {
  className?: string;
}

// The fadeIn variants for framer-motion
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  }
};

// The delayed fadeIn variants for the second section
const delayedFadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      delay: 0.3
    } 
  }
};

// Map of icon components for dynamic rendering
const IconMap = {
  IconCode,
  IconBuildingBridge,
  IconMusicCode,
  IconSchool,
  IconPuzzle,
  IconRocket,
  IconBrain,
  IconChartArcs,
  IconAward,
  IconBulb
};

export const BioIntro: React.FC<BioIntroProps> = ({ className }) => {
  // Helper function to get the right icon component
  const getIconComponent = (iconName: string) => {
    return IconMap[iconName as keyof typeof IconMap] || IconCode;
  };

  return (
    <StyledBioContent className={className}>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <HeadingWrapper>
          <h2>Introduction</h2>
          <h3>A passionate technical leader with a history of building impactful solutions</h3>
        </HeadingWrapper>
        
        <BioTextContent>
          {/* Add the detailed bio content from constants */}
          {BIO_CONTENT}
        </BioTextContent>
      </motion.div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={delayedFadeInVariants}
      >
        {/* Closing paragraphs from constants */}
        {CLOSING_PARAGRAPHS}
      </motion.div>
    </StyledBioContent>
  );
};

export default BioIntro; 