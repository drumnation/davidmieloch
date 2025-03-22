import React, { ReactElement } from 'react';
import { HeroProps } from '../../organisms/Hero/Hero.types';
import { BrainGardenOverviewProps } from './BrainGardenOverview.types';
import { defaultContent } from './BrainGardenOverview.constants';
import { Icon } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
import {
  StatCard as StatCardStyled,
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
    <StatCardStyled style={{ opacity: 1 }}>
      <IconContainer>
        {iconElement}
      </IconContainer>
      <StatNumber>{stat.number}</StatNumber>
      <StatLabel>{stat.label}</StatLabel>
    </StatCardStyled>
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

  return (
    <div style={{ display: 'inline-block' }}>
      <CTAButton href={link}>
        {text}
        {iconElement && (
          <span style={{ marginLeft: '0.5rem', display: 'inline-flex' }}>
            {iconElement}
          </span>
        )}
      </CTAButton>
    </div>
  );
};

/**
 * Creates a section title component
 */
export const SectionTitleComponent: React.FC<{
  title: string;
  className?: string;
}> = ({ title, className }) => {
  return (
    <div>
      <Typography variant="h2" mb="1.5rem" className={className}>
        {title}
      </Typography>
    </div>
  );
};

/**
 * Creates a section subtitle component
 */
export const SectionSubtitleComponent: React.FC<{
  title: string;
  className?: string;
}> = ({ title, className }) => {
  return (
    <div>
      <Typography variant="h3" mb="1.25rem" className={className}>
        {title}
      </Typography>
    </div>
  );
};

/**
 * Creates an intro text component
 */
export const IntroTextComponent: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className }) => {
  return (
    <div>
      <IntroText className={className}>
        {text}
      </IntroText>
    </div>
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
    maxWidth: '720px',
    margin: '0 auto',
    padding: '1.5rem 0'
  };

  return (
    <div 
      style={divStyle} 
      className={className}
    >
      <div>
        <Typography variant="h3" mb="1.25rem">
          {title}
        </Typography>
      </div>
      <div>
        <Typography variant="body" mb="1.5rem">
          {content}
        </Typography>
      </div>
    </div>
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