import React from 'react';
import { Typography } from '@shared-components/atoms/Typography';
import { NextEvolutionSectionProps } from './NextEvolutionSection.types';
import {
    ContentContainer,
    fadeInUp,
    staggerContainer
} from '../../BrainGardenOverview.styles';
import {
    SectionTitleComponent
} from '../../BrainGardenOverview.logic';
import {
    TimelineContainer,
    TimelineMainLine,
    PhaseContainer,
    PhaseTitle,
    PhaseContent,
    PhaseItemsList,
    PhaseItem,
    PhaseItemDot,
    PhaseItemContent,
    CapabilityCardsGrid,
    CapabilityCard,
    ResearchAreaContainer,
    ResearchGridContainer,
    ResearchAreaCard,
    IconWrapper,
    VisionValueContainer,
    SectionSubTitleComponent,
    BenefitGrid,
    BenefitCard,
} from './NextEvolutionSection.styles';
import { Grid, Paper, Box, useMantineTheme, MantineTheme } from '@mantine/core';
import {
    BiNetworkChart,
    BiBrain,
    BiPlug,
    BiCog,
    BiCodeAlt,
    BiExtension,
    BiShow
} from 'react-icons/bi';
import { GiPuzzle } from 'react-icons/gi';
import { useMediaQuery } from '@mantine/hooks';
import { motion, useInView } from 'framer-motion';

// Import required icons
import { BsCodeSlash } from 'react-icons/bs';
import { HiOutlineUsers } from 'react-icons/hi';
import { FaBrain } from 'react-icons/fa';

// Define the type for a timeline item
interface TimelineItem {
    title: string;
    description: string;
}

// Define types for R&D and Principles
interface ResearchAreaItem {
    icon: React.ElementType;
    title: string;
    description: string;
}
interface PrincipleItemData {
    icon: React.ElementType;
    title: string;
    description: string;
}

// Helper for keyword highlighting
const HighlightKeywords: React.FC<{ text: string }> = ({ text }) => {
    const keywords = [
        'multi-agent collaboration', 'hierarchical task delegation', 'specialized agent roles',
        'on-demand skill integration', 'Skill-Jacks via MCP', 'universal memory compatibility', 'advanced knowledge graph capabilities',
        'deep integrations', 'developer tools', 'user environments',
        'feedback loops', 'dynamic rule profile management', 'autonomously enhance'
    ];
    const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, index) =>
                regex.test(part) ? <strong key={index}>{part}</strong> : part
            )}
        </>
    );
};

// Simplified animation variants
const simpleOpacityAnimation = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3
        }
    }
};

// Simple stagger without height changes
const simpleStaggerContainer = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05,
            duration: 0.3
        }
    }
};

export const NextEvolutionSectionWeb: React.FC<NextEvolutionSectionProps> = ({
    className
}) => {
    const theme = useMantineTheme();
    // Define media queries using the hook
    const isSm = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
    const isLg = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

    // Timeline data
    const timelineData = {
        current: {
            title: "Current Capabilities",
            color: "#6A0DAD", // purple-700
            items: [
                { title: "Agent Rules Library", description: "Select from a library of rules that work together to create a cohesive system" },
                { title: "User Prompt Library", description: "Choose and initiate advanced agent workflows" },
                { title: "Skill-Jacks", description: "Generate and prime agents with expert knowledge" },
                { title: "Github Integration", description: "Prompt, track, and manage agent tasks and sync to Github" },
                { title: "Project Structure Sync", description: "Keeps an up to date file tree of your project for context" },
                { title: "Automatic Documentation", description: "Agents curate project domain knowledge" },
                { title: "CLI", description: "Command line interface for syncing content and manaing brain garden features" },
            ]
        },
        next: {
            title: "Next Evolution",
            color: "#4CAF50", // green-500
            items: [
                { title: "VSCode Extension", description: "Seamless developer experience and GUI" },
                { title: "Gmail Integration", description: "Ingest client emails and ocr images into vectorized knowledge graph" },
                { title: "Advanced MCP Server", description: "Integrated agent tools powered by Brain Garden" },
                { title: "Dynamic Rule Profiles", description: "Swap entire rule sets on the fly" },
                { title: "Universal Memory Compatibility", description: "Brain Garden becomes the single source of truth connecting many variants of memory systems to enable agent tools without duplication" },
                { title: "Automated Self Improvement", description: "Agents improve and adapt the own project rulesets making them more effective over time" }
            ]
        },
        future: {
            title: "Future Roadmap",
            color: "#2196F3", // blue-500
            items: [
                { title: "Lead & Subordinate Agents", description: "Hierarchical task delegation" },
                { title: "Architect & Tester Subordinates", description: "Specialized roles and agent personas, dynamic model switching" },
                { title: "Parallel Task Processing", description: "Multi-agent coordination" },
                { title: "Agent Long Term Memory", description: "Similarity search within knowledge graph" },
                { title: "Advanced GitHub Workflow", description: "Enhanced integration enabling seamless visibility by non-technical stakeholders" },
            ]
        }
    };

    // R&D focus areas data - with Icons
    const researchAreas: ResearchAreaItem[] = [
        {
            icon: BiNetworkChart,
            title: "Agent Orchestration & Specialization",
            description: "Developing frameworks for multi-agent collaboration, hierarchical task delegation, and specialized agent roles."
        },
        {
            icon: BiBrain,
            title: "Dynamic Knowledge & Skill Integration",
            description: "Creating systems for on-demand skill integration (Skill-Jacks via MCP), universal memory compatibility, and advanced knowledge graph capabilities (long-term memory, Gmail ingestion)."
        },
        {
            icon: BiPlug,
            title: "Seamless Workflow & Tool Integration",
            description: "Building deep integrations with developer tools (VSCode, Advanced GitHub Workflow, CLI) and user environments (Gmail)."
        },
        {
            icon: BiCog,
            title: "Adaptive System Self-Improvement",
            description: "Implementing feedback loops, dynamic rule profile management, and mechanisms for agents to autonomously enhance system rulesets and performance."
        }
    ];

    // Core Principles Data - with Icons
    const corePrinciples: PrincipleItemData[] = [
        {
            icon: GiPuzzle,
            title: "Composability & Modularity",
            description: "Brain Garden components (Rules, Prompts, Skills, Knowledge) are designed to be modular and composable, allowing for flexible combinations and tailored solutions."
        },
        {
            icon: BiCodeAlt,
            title: "Developer Centricity",
            description: "The system is built with the developer's workflow and productivity as a primary focus, aiming to augment, not obstruct."
        },
        {
            icon: BiExtension,
            title: "Adaptability & Extensibility",
            description: "The architecture is intended to be open and adaptable, allowing for the integration of new tools, models, and knowledge sources as the AI landscape evolves."
        },
        {
            icon: BiShow,
            title: "Transparency & Control",
            description: "While aiming for automation, the system provides visibility into agent actions and allows developers to maintain control over the process and the generated outputs."
        }
    ];

    // Component for each timeline phase
    const TimelinePhase = ({ title, color, items }: { title: string; color: string; items: TimelineItem[] }) => {
        return (
            <motion.div variants={simpleOpacityAnimation}>
                <PhaseContainer>
                    {/* Phase title */}
                    <PhaseTitle style={{ backgroundColor: color }}>
                        <Typography variant="h3" weight="bold" color="light">{title}</Typography>
                    </PhaseTitle>

                    {/* Phase content */}
                    <PhaseContent>
                        <PhaseItemsList>
                            {items.map((item, index) => {
                                // Directly use item.title and item.description
                                return (
                                    <PhaseItem key={index}>
                                        <PhaseItemDot style={{ backgroundColor: color }} />
                                        <PhaseItemContent>
                                            <Typography variant="body" as="span" weight="bold">{item.title}</Typography>
                                            {item.description && (
                                                <div className="timeline-description-wrapper">
                                                    <span className="timeline-separator"> - </span>
                                                    <Typography variant="body" as="span" color="secondary">{item.description}</Typography>
                                                </div>
                                            )}
                                        </PhaseItemContent>
                                    </PhaseItem>
                                );
                            })}
                        </PhaseItemsList>
                    </PhaseContent>
                </PhaseContainer>
            </motion.div>
        );
    };

    return (
        <div className={className}>
            <ContentContainer>
                <Box>
                    <div>
                        <Typography variant="h2" mb="1rem">The Next Evolution of Brain Garden</Typography>
                    </div>

                    <Typography variant="h3" mb="1.5rem">Evolving Prompt and Knowledge Systems</Typography>

                    <Typography variant="body" mb="2rem">
                        The Brain Garden system is continuously evolving to enhance AI assistance capabilities.
                        Our roadmap focuses on advancing both the Prompt System for more automated workflows and
                        the Knowledge System for deeper, more interconnected expertise.
                    </Typography>

                    {/* Interactive Evolution Timeline */}
                    <TimelineContainer>
                        <TimelinePhase title={timelineData.current.title} color={timelineData.current.color} items={timelineData.current.items} />
                        <TimelinePhase title={timelineData.next.title} color={timelineData.next.color} items={timelineData.next.items} />
                        <TimelinePhase title={timelineData.future.title} color={timelineData.future.color} items={timelineData.future.items} />
                    </TimelineContainer>

                    {/* Research Areas Section */}
                    <div>
                        <Typography variant="h2" mb="1rem">R&D Focus Areas</Typography>
                    </div>

                    <Typography variant="body" mb="2rem">
                        To drive the future vision of Brain Garden, our research and development efforts are concentrated on several key areas that enable a more integrated, intelligent, and flexible system:
                    </Typography>

                    <ResearchAreaContainer>
                        <Grid>
                            {researchAreas.map((area, index) => {
                                const IconComponent = area.icon;
                                return (
                                    <Grid.Col key={index} span={12}>
                                        <Paper shadow="sm" p="xl" withBorder>
                                            <IconWrapper>
                                                <IconComponent size={32} />
                                            </IconWrapper>
                                            <Box style={{ textAlign: 'center' }}>
                                                <Typography variant="h3" weight="bold" mb={10}>
                                                    {area.title}
                                                </Typography>
                                                <Typography variant="body" color="secondary">
                                                    <HighlightKeywords text={area.description} />
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    </Grid.Col>
                                );
                            })}
                        </Grid>
                    </ResearchAreaContainer>

                    {/* Core Principles Section */}
                    <div>
                        <Typography variant="h2" mb="1rem">Core Principles</Typography>
                    </div>

                    <Typography variant="body" mb="2rem">
                        The development of Brain Garden is guided by a set of core principles that inform design decisions and prioritization:
                    </Typography>

                    <Grid mb={50}>
                        {corePrinciples.map((principle, index) => {
                            const IconComponent = principle.icon;
                            return (
                                <Grid.Col key={index} span={12}>
                                    <Paper shadow="sm" p="xl" withBorder>
                                        <IconWrapper>
                                            <IconComponent size={32} />
                                        </IconWrapper>
                                        <Box style={{ textAlign: 'center' }}>
                                            <Typography variant="h3" weight="bold" mb={10}>
                                                {principle.title}
                                            </Typography>
                                            <Typography variant="body" color="secondary">{principle.description}</Typography>
                                        </Box>
                                    </Paper>
                                </Grid.Col>
                            );
                        })}
                    </Grid>

                    {/* Vision and Value Proposition Section */}
                    <VisionValueContainer>
                        <div>
                            <Typography variant="h2" mb="1rem">Long-Term Vision</Typography>
                        </div>
                        <Typography variant="body" mb="2rem">
                            Brain Garden aims to become the premier framework for integrating LLM capabilities into software development, enabling:
                        </Typography>

                        <BenefitGrid>
                            <BenefitCard>
                                <IconWrapper>
                                    <BsCodeSlash size={32} />
                                </IconWrapper>
                                <div>
                                    <Typography variant="h3" weight="bold" mb={10}>
                                        Enhanced Developer Workflows
                                    </Typography>
                                    <Typography variant="body" color="secondary">
                                        Seamless AI assistance across the entire development lifecycle, from planning to maintenance.
                                    </Typography>
                                </div>
                            </BenefitCard>

                            <BenefitCard>
                                <IconWrapper>
                                    <HiOutlineUsers size={32} />
                                </IconWrapper>
                                <div>
                                    <Typography variant="h3" weight="bold" mb={10}>
                                        Team Augmentation
                                    </Typography>
                                    <Typography variant="body" color="secondary">
                                        AI collaborators that adapt to team practices, communication styles, and technical preferences.
                                    </Typography>
                                </div>
                            </BenefitCard>

                            <BenefitCard>
                                <IconWrapper>
                                    <FaBrain size={32} />
                                </IconWrapper>
                                <div>
                                    <Typography variant="h3" weight="bold" mb={10}>
                                        Knowledge Amplification
                                    </Typography>
                                    <Typography variant="body" color="secondary">
                                        Systems that accelerate learning, preserve institutional knowledge, and enable expertise sharing.
                                    </Typography>
                                </div>
                            </BenefitCard>
                        </BenefitGrid>
                    </VisionValueContainer>
                </Box>
            </ContentContainer>
        </div>
    );
}; 