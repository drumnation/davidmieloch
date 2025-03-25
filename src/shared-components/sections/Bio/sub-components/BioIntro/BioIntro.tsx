import React from 'react';
import { useSpring, animated } from '@react-spring/web';
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

// Create properly typed animated components
const AnimatedDiv = animated.div;
const AnimatedBioContent = animated(StyledBioContent);

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
  // Create fade-in animation with React Spring - start with opacity 1
  const [fadeInStyles, fadeInApi] = useSpring(() => ({
    from: { opacity: 1, y: 0 }, // Changed from opacity: 0, y: 20
    to: { opacity: 1, y: 0 },
    config: { tension: 280, friction: 60 },
    delay: 200
  }));

  // Create animation for icons section - start with opacity 1
  const [iconsStyles, iconsApi] = useSpring(() => ({
    from: { opacity: 1, y: 0 }, // Changed from opacity: 0, y: 30
    to: { opacity: 1, y: 0 },
    config: { tension: 280, friction: 60 },
    delay: 500
  }));

  // Helper function to get the right icon component
  const getIconComponent = (iconName: string) => {
    return IconMap[iconName as keyof typeof IconMap] || IconCode;
  };

  return (
    <StyledBioContent className={className}>
      <AnimatedDiv 
        style={{
          opacity: fadeInStyles.opacity,
          transform: fadeInStyles.y.to(y => `translateY(${y}px)`)
        }}
      >
        <HeadingWrapper>
          <h2>Introduction</h2>
          <h3>A passionate technical leader with a history of building impactful solutions</h3>
        </HeadingWrapper>
        
        <BioTextContent>
          {/* Add the detailed bio content from constants */}
          {BIO_CONTENT}
        </BioTextContent>
      </AnimatedDiv>

      <AnimatedDiv 
        style={{
          opacity: iconsStyles.opacity,
          transform: iconsStyles.y.to(y => `translateY(${y}px)`)
        }}
      >
        {/* Closing paragraphs from constants */}
        {CLOSING_PARAGRAPHS}
      </AnimatedDiv>
    </StyledBioContent>
  );
};

export default BioIntro; 