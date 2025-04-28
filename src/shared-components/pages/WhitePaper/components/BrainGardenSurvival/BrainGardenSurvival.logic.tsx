import React from 'react';
import { HeroProps } from '@shared-components/organisms/Hero';
import { BrainGardenSurvivalProps } from './BrainGardenSurvival.types';
import { defaultContent } from './BrainGardenSurvival.constants';
import { Typography } from '@shared-components/atoms/Typography';

/**
 * Enhances the hero props with consistent styling and defaults
 */
export const enhanceHeroProps = (heroProps: BrainGardenSurvivalProps['heroProps'] = defaultContent.hero): HeroProps => {
    return {
        ...defaultContent.hero,
        ...heroProps,
        title: heroProps?.title || defaultContent.hero.title,
        subtitle: heroProps?.subtitle || defaultContent.hero.subtitle,
        background: 'image',
        backgroundOverlay: true,
        textColor: 'light',
        animation: (heroProps?.animation === 'fadeIn' || heroProps?.animation === 'slideIn' ||
            heroProps?.animation === 'zoomIn' || heroProps?.animation === 'none')
            ? heroProps.animation
            : 'fadeIn'
    };
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
 * Creates a section paragraph component
 */
export const SectionParagraphComponent: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className }) => {
    return (
        <Typography variant="body" className={className} weight="regular">
            {children}
        </Typography>
    );
}; 