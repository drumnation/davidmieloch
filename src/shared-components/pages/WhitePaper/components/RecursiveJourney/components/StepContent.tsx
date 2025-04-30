import React from 'react';
import { Box, Text, Title, useMantineTheme, Image } from '@mantine/core';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { IconBraces, IconTerminal, IconAlertTriangle } from '@tabler/icons-react';
import { StepContentProps } from '../RecursiveJourney.types';
import { ExampleViewer } from './ExampleViewer';
import { BrainRuleAccordion } from './BrainRuleAccordion';

export const StepContent: React.FC<StepContentProps> = ({ block, index, navId }) => {
    const theme = useMantineTheme();

    // Define different styling based on specialStyle
    const getSpecialStyles = () => {
        // Special terminal style
        if (block.specialStyle === 'terminal') {
            return {
                wrapper: {
                    background: theme.white,
                    border: `1px solid ${theme.colors.blue[3]}`,
                    boxShadow: `0 0 20px rgba(0, 0, 0, 0.1), inset 0 0 10px rgba(61, 180, 242, 0.05)`,
                },
                icon: <IconTerminal size={24} color={theme.colors.blue[6]} />,
                titleColor: theme.colors.blue[7],
                numberColor: theme.colors.blue[6],
                contentColor: theme.colors.dark[7]
            };
        }
        // Special warning style
        else if (block.specialStyle === 'warning') {
            return {
                wrapper: {
                    background: theme.white,
                    border: `1px solid ${theme.colors.red[3]}`,
                    boxShadow: `0 0 20px rgba(0, 0, 0, 0.1), inset 0 0 10px rgba(242, 100, 61, 0.05)`,
                },
                icon: <IconAlertTriangle size={24} color={theme.colors.red[6]} />,
                titleColor: theme.colors.red[7],
                numberColor: theme.colors.red[6],
                contentColor: theme.colors.dark[7]
            };
        }

        // Default light styling for all blocks
        return {
            wrapper: {
                background: theme.white,
                border: `1px solid ${theme.colors.gray[3]}`,
                boxShadow: `0 4px 10px rgba(0, 0, 0, 0.1)`,
            },
            icon: block.icon || <IconBraces size={24} color={theme.colors[theme.primaryColor][6]} />,
            titleColor: theme.colors[theme.primaryColor][7],
            numberColor: theme.colors[theme.primaryColor][6],
            contentColor: theme.colors.dark[7]
        };
    };

    const specialStyles = getSpecialStyles();

    // Animation variants for the step content
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: index * 0.1 // Stagger the animations
            }
        }
    };

    // Parse the title to separate the step number and content
    const titleParts = block.title.match(/^(Step \d+:)(.*)$/);
    const stepNumber = titleParts ? titleParts[1].trim() : null;
    const titleContent = titleParts ? titleParts[2].trim() : block.title;

    // Check if this is the "Protecting the Brain" section (Step 5)
    const isProtectingBrainSection = block.title.includes("Protecting the Brain");

    // For the Protecting the Brain section, we'll customize the title
    const customTitle = isProtectingBrainSection ? "🚨 Protecting the Brain" : titleContent;

    // Function to render the content with the brain image and rule accordion for Step 5
    const renderContent = () => {
        if (isProtectingBrainSection) {
            return (
                <>
                    {/* Lead text about .brain/ folder */}
                    <Box mb="xl" style={{ lineHeight: 1.7 }}>
                        <ReactMarkdown>
                            {`There's a folder called \`.brain/\`. It holds the memory, rules, context, and evolving thought process of the project — a kind of lightweight soul. When the agent is working on your app, that folder *is* its brain.

Now imagine you ask the agent to build the Brain Garden CLI — the tool that generates \`.brain/\` folders for other projects — and the agent is using its own \`.brain/\` folder to do that work.

In other words: **it's using its brain to build Brain Garden, inside Brain Garden, using Brain Garden.**

During early testing, this recursion got... messy.

The agent would spin up a test environment and see two \`.brain/\` folders — the one it *was* using and the one it *thought* was a test stub. Then, with no hesitation, it would delete what it assumed was throwaway scaffolding. Except... it just erased its own brain.`}
                        </ReactMarkdown>
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
                                    maxWidth: '400px',
                                    width: '100%',
                                    margin: '0 auto',
                                    borderRadius: theme.radius.md,
                                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                                }}
                            />
                        </motion.div>
                    </Box>

                    {/* Transition sentence */}
                    <Box mb="lg" mt="xl" style={{ lineHeight: 1.7 }}>
                        <Text fw={600} fz="lg" style={{ color: theme.colors.red[7] }}>
                            This happened so many times, we had to write a rule. A loud one.
                        </Text>
                    </Box>

                    {/* Rule Accordion */}
                    <BrainRuleAccordion />

                    {/* Final warning styled as blockquote */}
                    <Box
                        mt="xl"
                        p="lg"
                        style={{
                            background: theme.colors.gray[0],
                            borderRadius: theme.radius.md,
                            borderLeft: `4px solid ${theme.colors.blue[5]}`,
                            fontStyle: 'italic'
                        }}
                    >
                        <Text fz="lg" style={{ color: theme.colors.dark[6] }}>
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
                        block.content.map((paragraph, idx) => (
                            <Box
                                key={`p-${index}-${idx}`}
                                mb="md"
                                style={{ lineHeight: 1.7 }}
                            >
                                <ReactMarkdown>{paragraph}</ReactMarkdown>
                            </Box>
                        ))
                    ) : (
                        <ReactMarkdown>{block.content}</ReactMarkdown>
                    )}
                </>
            );
        }
    };

    return (
        <motion.div
            id={navId}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            style={{
                scrollMarginTop: '100px',
                marginBottom: '4rem',
                position: 'relative'
            }}
        >
            {index > 0 && (
                <Box
                    style={{
                        position: 'absolute',
                        left: '1.5rem',
                        top: '-4rem',
                        width: '2px',
                        height: '4rem',
                        background: `linear-gradient(to bottom, ${theme.colors.gray[3]}, ${theme.colors[theme.primaryColor][5]})`,
                        zIndex: 0
                    }}
                />
            )}

            <Box
                p="xl"
                style={{
                    ...specialStyles.wrapper,
                    borderRadius: theme.radius.md,
                    overflow: 'visible',
                    position: 'relative',
                    paddingTop: '1.75rem'
                }}
            >
                {/* Step number badge */}
                {stepNumber && (
                    <Box
                        style={{
                            position: 'absolute',
                            top: '-16px',
                            left: '20px',
                            background: theme.colors[theme.primaryColor][7],
                            padding: '5px 15px',
                            borderRadius: theme.radius.sm,
                            fontWeight: 700,
                            color: theme.white,
                            fontSize: '1rem',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                            zIndex: 10,
                            transform: 'translateY(-2px)'
                        }}
                    >
                        {stepNumber}
                    </Box>
                )}

                {/* Title with icon */}
                <Box mb="md" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Box
                        style={{
                            backgroundColor: `rgba(${theme.colors.gray[0]}, 0.8)`,
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexShrink: 0
                        }}
                    >
                        {specialStyles.icon}
                    </Box>
                    <Title
                        order={3}
                        style={{
                            lineHeight: 1.3,
                            color: specialStyles.titleColor
                        }}
                    >
                        {customTitle}
                    </Title>
                </Box>

                {/* Summary */}
                <Text
                    mb="md"
                    fz="lg"
                    fw={500}
                    style={{
                        color: theme.colors.dark[6],
                        fontStyle: 'italic',
                        lineHeight: 1.5
                    }}
                >
                    {block.summary}
                </Text>

                {/* Content - rendered as markdown */}
                <Box style={{ color: specialStyles.contentColor }}>
                    {renderContent()}
                </Box>

                {/* Example viewers */}
                {!isProtectingBrainSection && block.exampleFile && (
                    <ExampleViewer
                        fileName={block.exampleFile}
                        label={block.exampleLabel}
                    />
                )}

                {!isProtectingBrainSection && block.secondExampleFile && (
                    <ExampleViewer
                        fileName={block.secondExampleFile}
                        label="See example"
                    />
                )}
            </Box>
        </motion.div>
    );
};

export default StepContent; 