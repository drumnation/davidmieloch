import React, { ReactElement, ReactNode } from 'react';
import { HeroProps } from '@shared-components/organisms/Hero';
import { BrainGardenOverviewProps } from './BrainGardenOverview.types';
import { defaultContent } from './BrainGardenOverview.constants';
import { Icon } from '@shared-components/atoms/Icon';
import { Typography } from '@shared-components/atoms/Typography';
import {
  StatCard as StatCardStyled,
  StatNumber,
  StatLabel,
  IconContainer,
  CTAButton,
  IntroText
} from './BrainGardenOverview.styles';
import { UseSectionVisibilityResult } from './hooks/useSectionVisibility';

/**
 * A reusable animated section component that applies visibility styles
 */
export const AnimatedSection: React.FC<{
  visibilityProps: UseSectionVisibilityResult;
  children: ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ visibilityProps, children, id, className, style }) => {
  const { ref, style: animationStyle, inView } = visibilityProps;

  // Merge incoming style with animation style
  const mergedStyle = { ...animationStyle, ...style };

  return (
    <div
      ref={ref}
      style={mergedStyle}
      id={id}
      className={className}
      data-inview={inView}
    >
      {children}
    </div>
  );
};

/**
 * Enhances the hero props with consistent styling and defaults
 */
export const enhanceHeroProps = (heroProps: BrainGardenOverviewProps['heroProps'] = defaultContent.hero): HeroProps => {
  const validAnimations = ['fadeIn', 'slideIn', 'zoomIn', 'none'];
  return {
    ...heroProps,
    title: (heroProps.title ?? '') as string,
    subtitle: (heroProps.subtitle ?? '') as string,
    animation: validAnimations.includes(heroProps.animation as string) ? heroProps.animation : 'fadeIn',
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
  text: string | string[];
  className?: string;
}> = ({ text, className }) => {
  const paragraphs = Array.isArray(text) ? text : [text];

  return (
    <div>
      <IntroText className={className}>
        {paragraphs.map((paragraph, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            {paragraph}
          </div>
        ))}
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