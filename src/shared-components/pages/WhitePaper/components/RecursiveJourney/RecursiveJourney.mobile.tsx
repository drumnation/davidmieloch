"use client";

import React from 'react';
import { Box, Divider, Text, useMantineTheme, Image } from '@mantine/core';
import { useRecursiveJourney } from './RecursiveJourney.hook';
import { RecursiveJourneyProps, BlockType, StepContentProps } from './RecursiveJourney.types';
import { useStyledTheme } from './RecursiveJourney.styles';
import {
    RecursiveGrowthSection,
    StepContent,
    JourneyConclusion,
    BrainRuleAccordion,
    SectionTransition
} from './components';
import { ExampleViewer } from './components/ExampleViewer';
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer';
import { motion } from 'framer-motion';

// Mobile-specific version of StepContent with lighter styling
const MobileStepContent: React.FC<StepContentProps> = ({ block, index, navId }) => {
    const theme = useMantineTheme();

    // Parse the title to separate the step number and content
    const titleParts = block.title.match(/^(Step \d+:)(.*)$/);
    const stepNumber = titleParts ? titleParts[1].trim() : `Step ${index + 1}:`;
    const titleContent = titleParts ? titleParts[2].trim() : block.title;

    // Check if this is the "Protecting the Brain" section (Step 5)
    const isProtectingBrainSection = block.title.includes("Protecting the Brain");

    // For the Protecting the Brain section, we'll customize the title display
    const customTitle = isProtectingBrainSection ? "🚨 Protecting the Brain" : titleContent;

    // Function to render the content with the brain image and rule accordion for Step 5
    const renderContent = () => {
        if (isProtectingBrainSection) {
            return (
                <>
                    {/* Lead text about .brain/ folder */}
                    <Box mb="lg">
                        <MarkdownRenderer
                            content={`There's a folder called \`.brain/\`. It holds the memory, rules, context, and evolving thought process of the project — a kind of lightweight soul. When the agent is working on your app, that folder *is* its brain.

Now imagine you ask the agent to build the Brain Garden CLI — the tool that generates \`.brain/\` folders for other projects — and the agent is using its own \`.brain/\` folder to do that work.

In other words: **it's using its brain to build Brain Garden, inside Brain Garden, using Brain Garden.**

During early testing, this recursion got... messy.

The agent would spin up a test environment and see two \`.brain/\` folders — the one it *was* using and the one it *thought* was a test stub. Then, with no hesitation, it would delete what it assumed was throwaway scaffolding. Except... it just erased its own brain.`}
                            disablePadding
                        />
                    </Box>

                    {/* Brain image */}
                    <Box mt="xl" mb="xl" style={{ textAlign: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Image
                                src="/brain-core-deleted.png"
                                alt="Agent accidentally deletes the .brain/ folder while using the Brain Garden system to work on Brain Garden itself"
                                style={{
                                    maxWidth: '280px',
                                    width: '100%',
                                    margin: '0 auto',
                                    borderRadius: theme.radius.md,
                                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)'
                                }}
                            />
                        </motion.div>
                    </Box>

                    {/* Transition sentence */}
                    <Box mb="lg" mt="xl">
                        <Text fw={600} fz="md" style={{ color: theme.colors.red[7] }}>
                            This happened so many times, we had to write a rule. A loud one.
                        </Text>
                    </Box>

                    {/* Rule Accordion */}
                    <BrainRuleAccordion />

                    {/* Final warning styled as blockquote */}
                    <Box
                        mt="xl"
                        p="md"
                        style={{
                            background: theme.colors.gray[0],
                            borderRadius: theme.radius.md,
                            borderLeft: `4px solid ${theme.colors.blue[5]}`,
                            fontStyle: 'italic'
                        }}
                    >
                        <Text fz="md" style={{ color: theme.colors.dark[6] }}>
                            💬 "Hey! That's your <i>own</i> brain. Maybe don't delete it while you're using it to build the brain-builder inside the brain you're building."
                        </Text>
                    </Box>
                </>
            );
        } else {
            // Default rendering for other sections
            return (
                <>
                    {Array.isArray(block.content) ? (
                        block.content.map((paragraph: string, idx: number) => (
                            <Box
                                key={`p-${index}-${idx}`}
                                mb="md"
                            >
                                <MarkdownRenderer content={paragraph} disablePadding />
                            </Box>
                        ))
                    ) : (
                        <MarkdownRenderer content={block.content} disablePadding />
                    )}
                </>
            );
        }
    };

    return (
        <Box
            id={navId}
            style={{
                scrollMarginTop: '60px',
                marginTop: index > 0 ? '0' : '2rem',
                marginBottom: '2rem',
                paddingBottom: '1.5rem',
                position: 'relative',
                backgroundColor: theme.white,
                padding: '1.5rem 1rem 1rem',
                borderRadius: theme.radius.md,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: `1px solid ${theme.colors.gray[2]}`
            }}
        >
            {/* Connecting line for steps after the first */}
            {index > 0 && (
                <Box
                    style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '-2rem',
                        width: '2px',
                        height: '2rem',
                        background: `linear-gradient(to bottom, ${theme.colors.gray[3]}, ${theme.colors[theme.primaryColor][5]})`,
                        zIndex: 0
                    }}
                />
            )}

            {/* Step badge that overlaps the top of the card - rectangular like desktop */}
            <Box
                style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '20px',
                    backgroundColor: theme.colors[theme.primaryColor][6],
                    color: theme.white,
                    padding: '4px 12px',
                    borderRadius: theme.radius.sm,
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    zIndex: 2
                }}
            >
                {stepNumber}
            </Box>

            {/* Title */}
            <Box mb="md" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Text
                    fw={700}
                    fz="lg"
                    style={{
                        color: theme.colors[theme.primaryColor][7],
                        lineHeight: 1.3,
                        marginTop: '10px',
                        width: '100%'
                    }}
                >
                    {customTitle}
                </Text>
            </Box>

            {/* Summary */}
            <Text
                mb="md"
                fz="md"
                fw={500}
                style={{
                    color: theme.colors.dark[6],
                    fontStyle: 'italic',
                    lineHeight: 1.5
                }}
            >
                {block.summary}
            </Text>

            {/* Content - using MarkdownRenderer for proper markdown formatting */}
            <Box style={{ color: theme.colors.dark[7] }}>
                {renderContent()}
            </Box>

            {/* Example viewers */}
            {!isProtectingBrainSection && block.exampleFile && (
                <Box mt="md">
                    <ExampleViewer
                        fileName={block.exampleFile}
                        label={block.exampleLabel}
                    />
                </Box>
            )}

            {!isProtectingBrainSection && block.secondExampleFile && (
                <Box mt="md">
                    <ExampleViewer
                        fileName={block.secondExampleFile}
                        label="See example"
                    />
                </Box>
            )}
        </Box>
    );
};

export const RecursiveJourneyMobile: React.FC<RecursiveJourneyProps> = (props) => {
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
                scrollMarginTop: '60px',
                opacity: 1,
                visibility: 'visible',
                padding: '0'
            }}
        >
            {/* Introduction Section with the meta insight box - this is the dark hero */}
            <RecursiveGrowthSection />

            {/* Main Content - Step by Step Journey */}
            <Text
                fw={700}
                fz="xs"
                tt="uppercase"
                ta="center"
                c="dimmed"
                mb="md"
                mt="xl"
                px="md"
            >
                Follow the Journey
            </Text>

            {/* Each step is rendered with mobile-specific styling */}
            <Box px="md" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
                position: 'relative'
            }}>
                {!isLoading && blocks.map((block, index) => (
                    <React.Fragment key={`step-container-${index}`}>
                        <MobileStepContent
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
            </Box>

            {/* Conclusion - Why it works */}
            <JourneyConclusion
                content={conclusion}
                cta={cta}
                navId={blockNavIds[blockNavIds.length - 1]}
            />
        </Box>
    );
};

export default RecursiveJourneyMobile; 