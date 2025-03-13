import React, { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { HeroProps } from '../../organisms/Hero/Hero.types';
import { BrainGardenOverviewProps } from './BrainGardenOverview.types';
import { defaultContent } from './BrainGardenOverview.constants';
import { Icon } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
import {
  StatCard,
  StatNumber,
  StatLabel,
  IconContainer,
  CTAButton,
  IntroText
} from './BrainGardenOverview.styles';

/**
 * Enhances the hero props with consistent styling and defaults
 */
export const enhanceHeroProps = (heroProps: BrainGardenOverviewProps['heroProps'] = defaultContent.hero): HeroProps => {
  return {
    ...heroProps,
    className: heroProps.className || '',
    background: heroProps.background || 'gradient',
    backgroundImage: heroProps.backgroundImage,
    backgroundOverlay: heroProps.backgroundOverlay || false,
    textColor: heroProps.textColor || 'light',
    pattern: 'dots', // Using 'dots' instead of 'garden-growth' as it's supported by the Hero component
    animation: (heroProps.animation as "fade-up" | "slide-in" | "none") || 'fade-up',
  };
};

/**
 * Creates a stat card component for the Key Benefits section
 */
export const StatCardComponent: React.FC<{
  stat: {
    number: string;
    label: string;
    icon: string | ReactElement;
  };
  index: number;
}> = ({ stat, index }) => {
  // Ensure icon is always a ReactElement or string (not undefined)
  const iconElement = typeof stat.icon === 'string'
    ? <Icon name={stat.icon as string} size={32} />
    : (stat.icon || <Icon name="star" size={32} />);

  return (
    <StatCard
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            delay: index * 0.1,
            duration: 0.5
          }
        }
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <IconContainer>
        {iconElement}
      </IconContainer>
      <StatNumber>{stat.number}</StatNumber>
      <StatLabel>{stat.label}</StatLabel>
    </StatCard>
  );
};

/**
 * Creates a CTA button component with icon
 */
export const CTAButtonWithIcon: React.FC<{
  text: string;
  link: string;
  icon?: string | ReactElement;
}> = ({ text, link, icon }) => {
  const iconElement = typeof icon === 'string' 
    ? <Icon name={icon as string} size={16} style={{ marginLeft: '0.5rem' }} /> 
    : icon;

  const buttonVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    hover: { 
      y: -3,
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
      transition: { 
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    tap: { 
      scale: 0.98,
      transition: { 
        duration: 0.1,
        ease: 'easeOut'
      }
    }
  };

  const iconMotionVariants = {
    initial: { x: 0 },
    hover: { 
      x: 5,
      transition: { 
        duration: 0.2,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      style={{ display: 'inline-block' }}
    >
      <CTAButton href={link}>
        {text}
        {iconElement && (
          <motion.span 
            style={{ marginLeft: '0.5rem', display: 'inline-flex' }}
            variants={iconMotionVariants}
          >
            {iconElement}
          </motion.span>
        )}
      </CTAButton>
    </motion.div>
  );
};

/**
 * Creates a section title component
 */
export const SectionTitleComponent: React.FC<{
  title: string;
  className?: string;
}> = ({ title, className }) => {
  const titleVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={titleVariants}
    >
      <Typography variant="h2" mb="1.5rem" className={className}>
        {title}
      </Typography>
    </motion.div>
  );
};

/**
 * Creates a section subtitle component
 */
export const SectionSubtitleComponent: React.FC<{
  title: string;
  className?: string;
}> = ({ title, className }) => {
  const subtitleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut",
        delay: 0.1
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={subtitleVariants}
    >
      <Typography variant="h3" mb="1.25rem" className={className}>
        {title}
      </Typography>
    </motion.div>
  );
};

/**
 * Creates an intro text component
 */
export const IntroTextComponent: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className }) => {
  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={textVariants}
    >
      <IntroText className={className}>
        {text}
      </IntroText>
    </motion.div>
  );
};

/**
 * Creates a narrative section component with proper spacing between title and content
 */
export const NarrativeSectionComponent: React.FC<{
  title: string;
  content: string;
  className?: string;
}> = ({ title, content, className }) => {
  const divStyle = {
    marginTop: '2rem',
    marginBottom: '2rem'
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        delay: 0.1
      }
    }
  };
  
  return (
    <motion.div 
      style={divStyle} 
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={titleVariants}>
        <Typography variant="h3" mb="1.25rem">
          {title}
        </Typography>
      </motion.div>
      <motion.div variants={contentVariants}>
        <Typography variant="body" mb="1.5rem">
          {content}
        </Typography>
      </motion.div>
    </motion.div>
  );
};

/**
 * Processes icon strings into React elements
 */
export const processIcon = (icon: string | ReactElement | undefined, size: number = 24): ReactElement => {
  if (!icon) return <Icon name="star" size={size} />;
  
  return typeof icon === 'string'
    ? <Icon name={icon} size={size} />
    : icon;
};

/**
 * Processes features to ensure icons are React elements
 */
export const processFeatures = (features: Array<{
  title: string;
  description: string;
  icon: string | ReactElement;
  link?: string;
}>) => {
  return features.map(feature => ({
    ...feature,
    icon: processIcon(feature.icon)
  }));
};

/**
 * Processes navigation items to ensure icons are React elements
 */
export const processNavigationItems = (items: Array<{
  title: string;
  description: string;
  icon: string | ReactElement;
  link: string;
}>) => {
  return items.map(item => ({
    ...item,
    icon: processIcon(item.icon)
  }));
};

/**
 * Processes stats to ensure icons are React elements
 */
export const processStats = (stats: Array<{
  number: string;
  label: string;
  icon: string | ReactElement;
}>) => {
  return stats.map(stat => ({
    ...stat,
    icon: processIcon(stat.icon, 32)
  }));
};