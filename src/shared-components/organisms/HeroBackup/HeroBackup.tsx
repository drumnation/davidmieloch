'use client';

import React from 'react';
import Link from 'next/link';
import {
  Loader,
  Box,
  Text,
  Group,
  useMantineTheme,
  MantineTheme,
} from '@mantine/core';
import { Button as AtomButton } from '../../atoms/Button';
import { HeroProps } from './HeroBackup.types';

// Define helper type for sx props based on component type
type SxFromComponent<T extends React.ElementType> = React.ComponentPropsWithoutRef<T>['sx'];

export const HeroBackup: React.FC<HeroProps> = (props) => {
  const {
    title,
    subtitle,
    description,
    tagline,
    background = 'light',
    backgroundImage,
    backgroundOverlay = true,
    overlayOpacity = 0.5,
    minHeight,
    textColor = 'light',
    children,
    className,
    style,
    cta,
  } = props;

  const theme = useMantineTheme();
  const effectiveImageUrl = backgroundImage;

  const heroContainerSx = (theme: MantineTheme): SxFromComponent<typeof Box> => {
    const bgStyles: React.CSSProperties = {};
    if (background === 'gradient') {
      bgStyles.background = theme.other?.heroGradient ?? theme.other?.accentGradient ?? 'linear-gradient(135deg, #2196f3 0%, #00bcd4 100%)';
    } else if (background === 'dark') {
      bgStyles.background = theme.colors.dark[8];
    } else if (background === 'light') {
      bgStyles.background = theme.white;
    } else if (background === 'image') {
      // Remove setting a background color here; let the ::before handle the image
    }

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      minHeight: minHeight ?? '60vh',
      width: '100%',
      willChange: 'transform',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      perspective: '1000px',
      isolation: 'isolate',
      zIndex: 0,
      ...bgStyles,

      '&::before': effectiveImageUrl ? {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${effectiveImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
        willChange: 'transform',
        transform: 'translateZ(0)',
        opacity: 1,
      } : undefined,

      [`@media (min-width: ${theme.breakpoints.md})`]: {
        minHeight: minHeight ?? '70vh',
        padding: 0,
      },
    };
  };

  const heroContentSx = (theme: MantineTheme): SxFromComponent<typeof Box> => ({
    width: '90%',
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
    padding: { base: '1.5rem', sm: '2rem 2.5rem', md: '3.5rem 4rem' },
    backgroundColor: !effectiveImageUrl && backgroundOverlay ? `rgba(0, 0, 0, ${overlayOpacity})` : 'transparent',
    boxShadow: theme.shadows.lg,
    borderRadius: theme.radius.lg,
    color: theme.white,
    backdropFilter: !effectiveImageUrl && backgroundOverlay ? 'blur(8px)' : 'none',
    willChange: 'transform, opacity',
    transform: 'translateZ(0)',
    marginTop: '2rem',
    marginBottom: '2rem',
    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      marginTop: '1.5rem',
      marginBottom: '1.5rem',
      width: '95%',
    },
  });

  const heroTitleSx = (theme: MantineTheme): SxFromComponent<typeof Text> => ({
    fontSize: theme.headings.sizes.h1.fontSize,
    fontWeight: 800,
    margin: 0,
    marginBottom: theme.spacing.md,
    lineHeight: theme.headings.sizes.h1.lineHeight,
    color: 'inherit',
    [`@media (min-width: ${theme.breakpoints.md})`]: {
      fontSize: `calc(${theme.headings.sizes.h1.fontSize} * 1.1)`,
    },
    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      fontSize: `calc(${theme.headings.sizes.h1.fontSize} * 0.8)`,
    },
  });

  const heroSubtitleSx = (theme: MantineTheme): SxFromComponent<typeof Text> => ({
    fontSize: theme.fontSizes.xl,
    fontWeight: 400,
    margin: 0,
    marginBottom: theme.spacing.lg,
    lineHeight: theme.lineHeights.md,
    color: 'inherit',
    opacity: 0.9,
    maxWidth: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      fontSize: theme.fontSizes.lg,
      maxWidth: '95%',
    },
    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      fontSize: theme.fontSizes.md,
      maxWidth: '100%',
    },
  });

  const heroDescriptionSx = (theme: MantineTheme): SxFromComponent<typeof Text> => ({
    fontSize: theme.fontSizes.md,
    marginBottom: theme.spacing.xl,
    lineHeight: theme.lineHeights.lg,
    color: 'inherit',
    opacity: 0.8,
    maxWidth: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      fontSize: theme.fontSizes.sm,
      maxWidth: '100%',
    },
  });

  const taglineSx = (theme: MantineTheme): SxFromComponent<typeof Text> => ({
    fontSize: theme.fontSizes.sm,
    marginBottom: theme.spacing.sm,
    fontStyle: 'italic',
    opacity: 0.9,
    color: textColor === 'light' ? theme.white : theme.colors.dark[1],
  });

  const buttonContainerSx = (theme: MantineTheme): SxFromComponent<typeof Group> => ({
    marginTop: theme.spacing.xl,
    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        marginLeft: '0 !important',
        marginBottom: theme.spacing.md,
        width: '100%',
        maxWidth: '300px',
      }
    }
  });

  return (
    // @ts-ignore
    <Box sx={heroContainerSx}>
      {/* @ts-ignore */}
      <Box
        component="section"
        className={`${className || ''}`}
        style={style}
        // @ts-ignore
        sx={(theme: MantineTheme) => ({
          position: 'relative',
          width: '100%',
          minHeight: 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: textColor === 'light' ? theme.white : theme.colors.dark[9],
        })}
      >
        {/* @ts-ignore */}
        <Box sx={heroContentSx}>
          {/* @ts-ignore */}
          {tagline && <Text sx={taglineSx}>{tagline}</Text>}
          {/* @ts-ignore */}
          {title && <Text component="h1" sx={heroTitleSx}>{title}</Text>}
          {/* @ts-ignore */}
          {subtitle && <Text sx={heroSubtitleSx}>{subtitle}</Text>}
          {/* @ts-ignore */}
          {description && <Text sx={heroDescriptionSx}>{description}</Text>}
          {children}
          {cta && (cta.primary || cta.secondary) && (
            // @ts-ignore
            <Group sx={buttonContainerSx} justify="center">
              {cta.primary && (
                <Link href={cta.primary.link} passHref legacyBehavior>
                  <AtomButton
                    href={cta.primary.link}
                    size="lg"
                    variant="primary"
                  >
                    {cta.primary.text}
                  </AtomButton>
                </Link>
              )}
              {cta.secondary && (
                <Link href={cta.secondary.link} passHref legacyBehavior>
                  <AtomButton
                    href={cta.secondary.link}
                    size="lg"
                    variant="secondary"
                    color={textColor === 'light' ? 'white' : 'dark'}
                  >
                    {cta.secondary.text}
                  </AtomButton>
                </Link>
              )}
            </Group>
          )}
        </Box>
      </Box>
    </Box>
  );
}; 