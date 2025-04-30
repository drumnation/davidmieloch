"use client";

import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import { Hero } from '@shared-components/organisms/Hero';
import { useRecursiveJourney } from './RecursiveJourney.hook';
import { RecursiveJourneyProps } from './RecursiveJourney.types';
import { RecursiveJourneyMobile } from './RecursiveJourney.mobile';
import { RecursiveJourneyWeb } from './RecursiveJourney.web';
import {
    Container,
    RecursiveJourneyStyles
} from './RecursiveJourney.styles';

export const RecursiveJourney: React.FC<RecursiveJourneyProps> = (props) => {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    // Use the hook to get data and props
    const {
        className,
        enhancedHeroProps,
        blocks,
        revealedBlocks,
        exampleContent,
        timelineItems,
        blockNavIds
    } = useRecursiveJourney(props);

    // Props to pass down to the platform-specific component
    const platformProps = {
        ...props, // Pass original props through if needed
        blocks,
        revealedBlocks,
        exampleContent,
        timelineItems,
        blockNavIds,
        className // Ensure className is passed down
    };

    return (
        <Container className={className}>
            {/* Apply global styles */}
            <RecursiveJourneyStyles />

            {/* Render Shared Hero Once */}
            <Hero {...enhancedHeroProps} />

            {/* Conditionally Render Web or Mobile Version */}
            {isMobile ? (
                <RecursiveJourneyMobile {...platformProps} />
            ) : (
                <RecursiveJourneyWeb {...platformProps} />
            )}
        </Container>
    );
};

export default RecursiveJourney; 