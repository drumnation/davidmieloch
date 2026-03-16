"use client";

import React from 'react';
import { Box, Container, Text } from '@mantine/core';
import { useRecursiveJourney } from './RecursiveJourney.hook';
import { RecursiveJourneyProps } from './RecursiveJourney.types';
import { useStyledTheme } from './RecursiveJourney.styles';
import {
    RecursiveGrowthSection,
    StepContent,
    JourneyConclusion,
    SectionTransition
} from './components';

export const RecursiveJourneyWeb: React.FC<RecursiveJourneyProps> = (props) => {
    const theme = useStyledTheme();

    // Use the hook to get data and props
    const {
        blocks,
        conclusion,
        blockNavIds,
        cta,
        isLoading
    } = useRecursiveJourney(props);

    return (
        <Box
            id="recursive-journey-walkthrough"
            style={{
                scrollMarginTop: '100px',
                opacity: 1,
                visibility: 'visible',
                padding: '0 1rem'
            }}
        >
            <Container size="xl">
                {/* Introduction Section with the meta insight box - this is the dark hero */}
                <RecursiveGrowthSection />

                {/* Main Content - Step by Step Journey */}
                <Text
                    fw={700}
                    fz="sm"
                    tt="uppercase"
                    ta="center"
                    c="dark.4"
                    mb="lg"
                    mt="xl"
                >
                    Follow the Journey
                </Text>

                {/* Render each step with transitions between certain sections */}
                {!isLoading && blocks.map((block, index) => (
                    <React.Fragment key={`step-container-${index}`}>
                        <StepContent
                            key={`step-${index}`}
                            block={block}
                            index={index}
                            navId={blockNavIds[index]}
                        />

                        {/* Add section transition after specific sections */}
                        {index < blocks.length - 1 && (
                            <SectionTransition
                                fromSection={block.title.replace(/^Step \d+:\s/, '')}
                                toSection={blocks[index + 1].title.replace(/^Step \d+:\s/, '')}
                            />
                        )}
                    </React.Fragment>
                ))}

                {/* Conclusion - Why it works */}
                <JourneyConclusion
                    content={conclusion}
                    cta={cta}
                    navId={blockNavIds[blockNavIds.length - 1]}
                />
            </Container>
        </Box>
    );
};

export default RecursiveJourneyWeb; 