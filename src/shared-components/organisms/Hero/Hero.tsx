'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import {
    Box,
    Container,
    Title,
    Text,
    Overlay,
    Group,
    Button,
    useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { HeroProps } from './Hero.types';

// Add enhanced keyframe animations and responsive styles
const keyframes = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
    40% { transform: translateY(-10px) translateX(-50%); }
    60% { transform: translateY(-5px) translateX(-50%); }
}
@keyframes subtleZoom {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

/* Add responsive styles */
@media (max-width: 768px) {
    .hero-content {
        backdrop-filter: none !important;
        background: transparent !important;
        box-shadow: none !important;
    }
}

/* Hero background animation styles */
.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  animation: subtleZoom 20s ease-in-out infinite;
  will-change: transform;
  z-index: 0;
}

/* Add subtle scale effect on hover for desktop */
@media (min-width: 769px) {
  .parallax-hero:hover .hero-bg {
    animation-play-state: paused;
  }
}

/* Add this new style for the highlighted span */
.ai-native-highlight {
  color: #4361ee; /* Blue color from Home.styles.ts theme */
  text-shadow: 0 0 8px rgba(67, 97, 238, 0.7); /* Add blue glow */
}
`;

export const Hero: React.FC<HeroProps> = ({
    title,
    subtitle,
    description,
    tagline,
    background = 'light',
    backgroundImage,
    backgroundOverlay = true,
    overlayOpacity = 0.5,
    textColor = 'light',
    className,
    style,
    cta,
    scrollCta,
    minHeight = '70vh',
    children,
    ctaText,
    ctaLink,
    backgroundImageUrl,
    titleColor = 'white',
    subtitleColor = 'white',
    contentAlignment = 'center',
    hideBlurSquareDesktop = false,
    mobileSubtitle,
    desktopSubtitle,
    mobileTitle,
    desktopTitle,
}) => {
    const theme = useMantineTheme();
    const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const heroRef = useRef<HTMLDivElement>(null);

    const effectiveTextColor = textColor === 'light' ? theme.white : theme.colors.dark[8];

    // Use the most appropriate background image source
    const bgImage = backgroundImageUrl || backgroundImage;

    // Handle scroll to target for the CTA
    const handleScrollToTarget = () => {
        if (scrollCta?.targetId) {
            const element = document.getElementById(scrollCta.targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            {/* Inject keyframes for animations */}
            <style dangerouslySetInnerHTML={{ __html: keyframes }} />

            <Box
                ref={heroRef}
                className={`${className || ''} parallax-hero`}
                style={{
                    position: 'relative',
                    minHeight: minHeight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: contentAlignment === 'center' ? 'center' : 'flex-start',
                    width: '100%',
                    overflow: 'hidden',
                    ...style
                }}
                variant={background === 'gradient' ? 'gradient' : undefined}
            >
                {/* Animated background with subtle zoom */}
                {bgImage && (
                    <div
                        className="hero-bg"
                        style={{ backgroundImage: `url(${bgImage})` }}
                    />
                )}

                {/* Enhanced gradient overlay for better text legibility */}
                {(background === 'image' || background === 'gradient') && backgroundOverlay && (
                    <Overlay
                        gradient="linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)"
                        opacity={overlayOpacity}
                        zIndex={1}
                    />
                )}

                {/* Enhanced content container with animation, shadow and backdrop filter */}
                <Container
                    className="hero-content"
                    size="md"
                    style={{
                        position: 'relative',
                        zIndex: 2,
                        textAlign: contentAlignment === 'center' ? 'center' : 'left',
                        color: effectiveTextColor,
                        paddingTop: `calc(${theme.spacing.xl} * 1.5)`,
                        paddingBottom: `calc(${theme.spacing.xl} * 1.5)`,
                        paddingLeft: theme.spacing.md,
                        paddingRight: theme.spacing.md,
                        animation: 'fadeIn 1s ease-out',
                        boxShadow: hideBlurSquareDesktop ? 'none' : '0 8px 32px rgba(0, 0, 0, 0.1)',
                        borderRadius: theme.radius.md,
                        backdropFilter: hideBlurSquareDesktop ? 'none' : 'blur(4px)',
                        background: hideBlurSquareDesktop ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
                        maxWidth: '600px',
                        width: '100%',
                    }}
                >
                    {/* Render either the responsive titles or the regular title */}
                    {(mobileTitle || desktopTitle) ? (
                        <>
                            {/* Mobile title - only shown on mobile */}
                            {mobileTitle && isMobile && (
                                <Title
                                    order={1}
                                    className="mobile-title"
                                    style={{
                                        display: isMobile ? 'block' : 'none',
                                        color: titleColor,
                                        fontSize: '2.5rem',
                                        fontWeight: 800,
                                        marginBottom: subtitle || mobileSubtitle ? '0.5rem' : '1.5rem',
                                        lineHeight: 1.1,
                                        textShadow: '0 2px 12px rgba(0,0,0,0.5), 0 0 1px rgba(0,0,0,0.7)',
                                        textTransform: 'uppercase',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: mobileTitle }}
                                />
                            )}

                            {/* Desktop title - only shown on desktop */}
                            {desktopTitle && !isMobile && (
                                <Title
                                    order={1}
                                    className="desktop-title"
                                    style={{
                                        display: isMobile ? 'none' : 'block',
                                        color: titleColor,
                                        fontSize: '3.5rem',
                                        fontWeight: 800,
                                        marginBottom: subtitle || desktopSubtitle ? '0.5rem' : '1.5rem',
                                        lineHeight: 1.1,
                                        textShadow: '0 2px 12px rgba(0,0,0,0.5), 0 0 1px rgba(0,0,0,0.7)',
                                        textTransform: 'uppercase',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: desktopTitle }}
                                />
                            )}
                        </>
                    ) : title && (
                        <Title
                            order={1}
                            style={{
                                color: titleColor,
                                fontSize: isMobile ? '2.5rem' : '3.5rem',
                                fontWeight: 800,
                                marginBottom: subtitle ? '0.5rem' : '1.5rem',
                                lineHeight: 1.1,
                                textShadow: '0 2px 12px rgba(0,0,0,0.5), 0 0 1px rgba(0,0,0,0.7)',
                                textTransform: 'uppercase',
                            }}
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                    )}

                    {/* Render either the responsive subtitles or the regular subtitle */}
                    {(mobileSubtitle || desktopSubtitle) ? (
                        <>
                            {/* Mobile subtitle - only shown on mobile */}
                            {mobileSubtitle && isMobile && (
                                <Title
                                    order={2}
                                    className="mobile-subtitle"
                                    style={{
                                        display: isMobile ? 'block' : 'none',
                                        color: subtitleColor,
                                        fontSize: '1.5rem',
                                        fontWeight: 400,
                                        marginBottom: '1.5rem',
                                        lineHeight: 1.4,
                                        opacity: 0.9,
                                        textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                                        maxWidth: '90%',
                                        margin: '0 auto 1.5rem auto',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: mobileSubtitle }}
                                />
                            )}

                            {/* Desktop subtitle - only shown on desktop */}
                            {desktopSubtitle && !isMobile && (
                                <Title
                                    order={2}
                                    className="desktop-subtitle"
                                    style={{
                                        display: isMobile ? 'none' : 'block',
                                        color: subtitleColor,
                                        fontSize: '1.75rem',
                                        fontWeight: 400,
                                        marginBottom: '1.5rem',
                                        lineHeight: 1.3,
                                        opacity: 0.9,
                                        textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: desktopSubtitle }}
                                />
                            )}
                        </>
                    ) : subtitle && (
                        <Title
                            order={2}
                            style={{
                                color: subtitleColor,
                                fontSize: isMobile ? '1.5rem' : '1.75rem',
                                fontWeight: 400,
                                marginBottom: '1.5rem',
                                lineHeight: isMobile ? 1.4 : 1.3,
                                opacity: 0.9,
                                textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                            }}
                            dangerouslySetInnerHTML={{ __html: subtitle }}
                        />
                    )}

                    {/* Tagline pasted here, after the subtitle block */}
                    {tagline && (
                        <Text
                            size="sm"
                            tt="uppercase"
                            fw={700}
                            mb="sm"
                            opacity={0.7}
                            style={{
                                textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                                display: isMobile ? 'none' : undefined // Keep hidden on mobile
                            }}
                        >
                            {tagline}
                        </Text>
                    )}

                    {description && (
                        <Text
                            style={{
                                fontSize: isMobile ? '1rem' : '1.1rem',
                                lineHeight: 1.6,
                                marginBottom: '1.5rem',
                                maxWidth: '100%',
                                textShadow: '0 1px 5px rgba(0,0,0,0.5)',
                            }}
                        >
                            {description}
                        </Text>
                    )}

                    {/* CTA Buttons */}
                    {(cta?.primary || cta?.secondary) && (
                        <Group
                            style={{
                                justifyContent: contentAlignment === 'center' ? 'center' : 'flex-start',
                                marginTop: '2rem',
                            }}
                        >
                            {cta.primary && (
                                <Link href={cta.primary.link} passHref>
                                    <Button
                                        component="a"
                                        size="lg"
                                        radius="md"
                                        leftSection={cta.primary.icon ? <cta.primary.icon size={20} /> : undefined}
                                    >
                                        {cta.primary.text}
                                    </Button>
                                </Link>
                            )}
                            {cta.secondary && (
                                <Link href={cta.secondary.link} passHref>
                                    <Button
                                        component="a"
                                        variant="outline"
                                        size="lg"
                                        radius="md"
                                        leftSection={cta.secondary.icon ? <cta.secondary.icon size={20} /> : undefined}
                                        style={{ color: theme.white, borderColor: theme.white }}
                                    >
                                        {cta.secondary.text}
                                    </Button>
                                </Link>
                            )}
                        </Group>
                    )}

                    {scrollCta && (
                        <Box
                            style={{
                                position: 'absolute',
                                bottom: '10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                cursor: 'pointer',
                                zIndex: 10,
                                animation: 'bounce 2s infinite',
                                opacity: 0.9,
                                transition: 'opacity 0.3s ease',
                                padding: '0.5rem',
                                background: 'transparent',
                                border: 'none',
                                boxShadow: 'none',
                            }}
                            onClick={handleScrollToTarget}
                            className="scroll-indicator"
                        >
                            <Box
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    color: 'white',
                                }}
                            >
                                <Box
                                    style={{
                                        width: '22px',
                                        height: '22px',
                                        borderBottom: '3px solid white',
                                        borderRight: '3px solid white',
                                        transform: 'rotate(45deg)',
                                        filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.9))',
                                    }}
                                />
                            </Box>
                        </Box>
                    )}

                    {children}
                </Container>
            </Box>
        </>
    );
};

export default Hero; 