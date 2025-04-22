import { ReactNode, CSSProperties, ComponentType } from 'react';
import { MantineGradient, MantineColor } from '@mantine/core';

interface CTAButton {
    text: string;
    link: string;
    variant?: 'primary' | 'secondary' | 'tertiary'; // Added variant for flexibility
    icon?: ComponentType<{ size?: number; color?: string }>; // Added icon prop
}

export type TextColor = 'light' | 'dark';
export type ContentAlignment = 'left' | 'center' | 'right';
export type AnimationType = 'none' | 'fadeIn' | 'slideIn' | 'zoomIn';
export type BgPosition = 'center' | 'top' | 'bottom';

// Core props for the Hero component
export interface HeroProps {
    title?: string;
    mobileTitle?: string; // Added for responsive title text
    desktopTitle?: string; // Added for responsive title text
    subtitle?: string;
    mobileSubtitle?: string; // Added for responsive subtitle text
    desktopSubtitle?: string; // Added for responsive subtitle text
    description?: string;
    tagline?: string;
    background?: 'gradient' | 'light' | 'dark' | 'image';
    backgroundImage?: string; // Primary prop for image background
    backgroundImageUrl?: string; // Alternative for image background
    backgroundOverlay?: boolean;
    overlayOpacity?: number;
    overlayColor?: MantineColor; // Allow specifying overlay color
    gradient?: MantineGradient; // For gradient background
    textColor?: TextColor;
    titleColor?: string;
    subtitleColor?: string;
    contentAlignment?: ContentAlignment;
    className?: string;
    style?: CSSProperties;
    cta?: {
        primary?: CTAButton;
        secondary?: CTAButton;
    };
    ctaText?: string;
    ctaLink?: string;
    scrollCta?: {
        text: string;
        targetId?: string;
    };
    minHeight?: string | number;
    height?: string | number;
    children?: ReactNode;
    animation?: AnimationType;
    backgroundPosition?: BgPosition;
    hideBlurSquareDesktop?: boolean; // Control blur square visibility on desktop (already hidden on mobile)
    onImageLoad?: () => void; // Add the missing prop
} 