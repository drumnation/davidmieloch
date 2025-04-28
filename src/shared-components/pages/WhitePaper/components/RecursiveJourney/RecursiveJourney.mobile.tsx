"use client";

import React from 'react';
import { Hero } from '@shared-components/organisms/Hero';
import { useRecursiveJourney } from './RecursiveJourney.hook';
import {
    Container,
    ContentSection,
    BlockContainer,
    BlockTitle,
    BlockContent,
    IconContainer,
    useStyledTheme,
    RecursiveJourneyStyles
} from './RecursiveJourney.styles';
import { RecursiveJourneyProps, BlockType } from './RecursiveJourney.types';
import { parseBlockTitle } from './RecursiveJourney.logic';
// import { VerticalTimeline } from '@shared-components/molecules/VerticalTimeline'; // Commented out - component not found
import { RecursiveGrowthSection } from './components';

export const RecursiveJourneyMobile: React.FC<RecursiveJourneyProps> = (props) => {
    const { className } = props;
    const theme = useStyledTheme();

    // Temporarily hardcoding data until hook/types are fully defined
    const blocks: BlockType[] = [];
    const timelineItems: any[] = []; // Placeholder
    const exampleContent: any = {}; // Placeholder
    const blockNavIds: string[] = []; // Placeholder

    // Placeholder for hook usage - replace with actual hook later
    // const {
    //     className,
    //     enhancedHeroProps,
    //     blocks,
    //     revealedBlocks,
    //     exampleContent,
    //     timelineItems,
    //     blockNavIds
    // } = useRecursiveJourney(props);

    return (
        <Container className={className}>
            {/* Apply global styles */}
            <RecursiveJourneyStyles />

            {/* Hero Section - Placeholder */}
            {/* <Hero {...enhancedHeroProps} mobileTitle="Your Mobile Title" /> */}
            <div
                id="recursive-journey"
                style={{
                    scrollMarginTop: '60px', // Reduced for mobile
                    opacity: 1,
                    visibility: 'visible'
                }}
            >
                <ContentSection>
                    {/* Introduction */}
                    <RecursiveGrowthSection />

                    <BlockContainer style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <BlockContent>
                            <p style={{ fontSize: '1rem', lineHeight: '1.6', margin: '0 auto' }}>
                                The following illustrates a typical development workflow with Brain Garden. This journey showcases actual system artifacts—example outputs, system rules, workflow files, and core mechanisms that power the platform.
                            </p>
                        </BlockContent>
                    </BlockContainer>

                    {/* Render blocks 1-5 with animation */}
                    {blocks.slice(0, 5).map((block: BlockType, index: number) => {
                        const { hasStep, stepPart, contentPart } = parseBlockTitle(block.title);

                        return (
                            <div
                                key={`block-${index}`}
                                id={blockNavIds[index]}
                                style={{
                                    scrollMarginTop: '60px',
                                    opacity: 1,
                                    visibility: 'visible',
                                    display: 'block',
                                    marginBottom: '3rem'
                                }}
                            >
                                <BlockContainer style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
                                    <BlockTitle style={{
                                        paddingTop: '0.5rem',
                                        paddingBottom: '1rem',
                                        textAlign: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}>
                                        {block.icon && (
                                            <IconContainer style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                backgroundColor: theme.colors[theme.primaryColor][1],
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginBottom: '0.75rem',
                                                marginRight: 0
                                            }}>
                                                {block.icon}
                                            </IconContainer>
                                        )}
                                        {hasStep && <span className="step-indicator" style={{
                                            color: theme.colors.dark[9],
                                            marginRight: 0,
                                            marginBottom: '0.25rem'
                                        }}>{stepPart}</span>}
                                        <span className="title-content">{contentPart}</span>
                                    </BlockTitle>
                                    <BlockContent>
                                        {Array.isArray(block.content) ? (
                                            block.content.map((paragraph: string, idx: number) => (
                                                <p key={`p-${index}-${idx}`}>{paragraph}</p>
                                            ))
                                        ) : (
                                            <p>{block.content}</p>
                                        )}

                                        {/* Add example markdown for Context Initialization step */}
                                        {index === 0 && (
                                            <div style={{ marginTop: '1.5rem' }}>
                                                <p>Brain Garden provides a specialized prompt to help guide developers through creating comprehensive project overview documents like the one shown below.</p>
                                                <p><strong>Example of Project Context Document:</strong></p>
                                                <pre style={{
                                                    backgroundColor: theme.colors.dark[9],
                                                    padding: '0.75rem',
                                                    borderRadius: theme.radius.md,
                                                    overflowX: 'auto',
                                                    color: theme.colors.gray[2],
                                                    fontSize: '0.75rem',
                                                    border: `1px solid ${theme.colors.dark[6]}`,
                                                    maxWidth: '100%'
                                                }}>
                                                    <code>{exampleContent.projectContext}</code>
                                                </pre>
                                            </div>
                                        )}

                                        {/* Add example feature task plan for Starting a Feature Task step */}
                                        {index === 1 && (
                                            <div style={{ marginTop: '1.5rem' }}>
                                                <p>Brain Garden includes a specialized <strong>create-feature-task-list</strong> prompt that helps developers generate detailed, structured task breakdowns.</p>
                                                <p><strong>Example of Feature Task Plan:</strong></p>
                                                <pre style={{
                                                    backgroundColor: theme.colors.dark[9],
                                                    padding: '0.75rem',
                                                    borderRadius: theme.radius.md,
                                                    overflowX: 'auto',
                                                    color: theme.colors.gray[2],
                                                    fontSize: '0.75rem',
                                                    border: `1px solid ${theme.colors.dark[6]}`,
                                                    maxWidth: '100%'
                                                }}>
                                                    <code>{exampleContent.featureTaskPlan}</code>
                                                </pre>
                                            </div>
                                        )}

                                        {/* Add rule system explanation for Intelligent Execution step */}
                                        {index === 2 && (
                                            <div style={{ marginTop: '1.5rem' }}>
                                                <p>Many of the agent's autonomous actions are guided by the application of rules that are selectively applied while it works.</p>

                                                <p><strong>Rules can be attached to context in four ways:</strong></p>
                                                <div style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
                                                    <p style={{ margin: '0.5rem 0' }}>• ALWAYS attached to context</p>
                                                    <p style={{ margin: '0.5rem 0' }}>• Selectively attached based on file extension</p>
                                                    <p style={{ margin: '0.5rem 0' }}>• Agent-requested based on needs</p>
                                                    <p style={{ margin: '0.5rem 0' }}>• Manually attached by user</p>
                                                </div>

                                                <p><strong>Example of a Brain Garden System Rule:</strong></p>
                                                <pre style={{
                                                    backgroundColor: theme.colors.dark[9],
                                                    padding: '0.75rem',
                                                    borderRadius: theme.radius.md,
                                                    overflowX: 'auto',
                                                    color: theme.colors.gray[2],
                                                    fontSize: '0.75rem',
                                                    border: `1px solid ${theme.colors.dark[6]}`,
                                                    maxWidth: '100%'
                                                }}>
                                                    <code>{exampleContent.systemRule}</code>
                                                </pre>
                                            </div>
                                        )}

                                        {/* Add workflow example for Developer Intervention step */}
                                        {index === 3 && (
                                            <div style={{ marginTop: '1.5rem' }}>
                                                <p>When an agent encounters a knowledge gap, the developer can trigger a specific workflow via a .workflow.md file.</p>

                                                <p><strong>Example of a Skill Jack Generation Workflow:</strong></p>
                                                <pre style={{
                                                    backgroundColor: theme.colors.dark[9],
                                                    padding: '0.75rem',
                                                    borderRadius: theme.radius.md,
                                                    overflowX: 'auto',
                                                    color: theme.colors.gray[2],
                                                    fontSize: '0.75rem',
                                                    border: `1px solid ${theme.colors.dark[6]}`,
                                                    maxWidth: '100%'
                                                }}>
                                                    <code>{exampleContent.skillJackWorkflow}</code>
                                                </pre>
                                            </div>
                                        )}
                                    </BlockContent>
                                </BlockContainer>
                            </div>
                        );
                    })}

                    {/* Insert Vertical Timeline Here */}
                    {/* <VerticalTimeline items={timelineItems} /> */}

                    {/* Why Skill Jacks Matter Section */}
                    <div
                        id={blockNavIds[5]}
                        style={{
                            scrollMarginTop: '60px',
                            opacity: 1,
                            visibility: 'visible',
                            display: 'block'
                        }}
                    >
                        <BlockContainer>
                            <BlockTitle style={{
                                textAlign: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}>
                                {blocks[5].icon && (
                                    <IconContainer style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        backgroundColor: theme.colors[theme.primaryColor][1],
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: '0.75rem',
                                        marginRight: 0
                                    }}>
                                        {blocks[5].icon}
                                    </IconContainer>
                                )}
                                {(() => {
                                    const { hasStep, stepPart, contentPart } = parseBlockTitle(blocks[5].title);
                                    return (
                                        <>
                                            {hasStep && <span className="step-indicator" style={{
                                                color: theme.colors.dark[9],
                                                marginRight: 0,
                                                marginBottom: '0.25rem'
                                            }}>{stepPart}</span>}
                                            <span className="title-content">{contentPart}</span>
                                        </>
                                    );
                                })()}
                            </BlockTitle>
                            <BlockContent>
                                {Array.isArray(blocks[5].content) ? (
                                    blocks[5].content.map((paragraph: string, idx: number) => (
                                        <p key={`p-5-${idx}`}>{paragraph}</p>
                                    ))
                                ) : (
                                    <p>{blocks[5].content}</p>
                                )}

                                <p style={{ marginTop: '1rem' }}>The concept of a "Skill Jack" is inspired by the movie The Matrix, where humans could instantly download skills and become experts.</p>

                                <p><strong>Example Skill Jack:</strong> This example teaches an agent a crash course in software design patterns.</p>

                                <pre style={{
                                    backgroundColor: theme.colors.dark[9],
                                    padding: '0.75rem',
                                    borderRadius: theme.radius.md,
                                    overflowX: 'auto',
                                    color: theme.colors.gray[2],
                                    fontSize: '0.75rem',
                                    border: `1px solid ${theme.colors.dark[6]}`,
                                    maxWidth: '100%'
                                }}>
                                    <code>{exampleContent.skillJackCode}</code>
                                </pre>
                            </BlockContent>
                        </BlockContainer>
                    </div>
                </ContentSection>
            </div>
        </Container>
    );
}; 