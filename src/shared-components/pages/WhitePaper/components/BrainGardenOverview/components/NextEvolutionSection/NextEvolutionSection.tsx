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

export const NextEvolutionSection: React.FC<NextEvolutionSectionProps> = ({
  className
}) => {
  const theme = useMantineTheme();
  // Define media queries using the hook
  const isSm = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
  const isLg = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

  // Determine grid columns based on media queries
  const gridColumns = isLg ? 'repeat(3, 1fr)' : isSm ? 'repeat(2, 1fr)' : '1fr';

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

  // Animation ref
  const researchRef = React.useRef(null);
  const researchInView = useInView(researchRef, { once: true, amount: 0.2 });

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
    );
  };

  return (
    <ContentContainer className={className}>
      <Box>
        <SectionTitleComponent title="The Next Evolution of Brain Garden" />

        <Typography variant="h3" mb="1.5rem">Evolving Prompt and Knowledge Systems</Typography>

        <Typography variant="body" mb="2rem">
          The Brain Garden system is continuously evolving to enhance AI assistance capabilities.
          Our roadmap focuses on advancing both the Prompt System for more automated workflows and
          the Knowledge System for deeper, more interconnected expertise.
        </Typography>

        {/* Interactive Evolution Timeline */}
        <TimelineContainer>
          <TimelineMainLine />

          <TimelinePhase
            title={timelineData.current.title}
            color={timelineData.current.color}
            items={timelineData.current.items}
          />

          <TimelinePhase
            title={timelineData.next.title}
            color={timelineData.next.color}
            items={timelineData.next.items}
          />

          <TimelinePhase
            title={timelineData.future.title}
            color={timelineData.future.color}
            items={timelineData.future.items}
          />
        </TimelineContainer>

        {/* Highlighted Future Capabilities */}
        <Box mt="3rem" mb="1.5rem">
          <Typography variant="h3">Highlighted Future Capabilities</Typography>
        </Box>
        <CapabilityCardsGrid>
          <CapabilityCard>
            <Typography variant="h3" mb="0.75rem">{/* removed style prop */}
              <BsCodeSlash style={{ marginRight: '8px' }} /> Seamless VSCode Extension
            </Typography>
            <Typography variant="body">
              Provides a dedicated GUI within the developer's IDE for managing agents, workflows, and accessing Brain Garden features directly.
            </Typography>
          </CapabilityCard>

          <CapabilityCard>
            <Typography variant="h3" mb="0.75rem">{/* removed style prop */}
              <HiOutlineUsers style={{ marginRight: '8px' }} /> Hierarchical Agent Teams
            </Typography>
            <Typography variant="body">
              Implement specialized agent roles (Architects, Testers) directed by Lead agents for complex, parallel task execution and planning.
            </Typography>
          </CapabilityCard>

          <CapabilityCard>
            <Typography variant="h3" mb="0.75rem">{/* removed style prop */}
              <FaBrain style={{ marginRight: '8px' }} /> Unified Knowledge System
            </Typography>
            <Typography variant="body">
              Ingest diverse data sources (Gmail, OCR) into a universal, searchable knowledge graph, serving as the single source of truth for all agents.
            </Typography>
          </CapabilityCard>
        </CapabilityCardsGrid>

        {/* Research Focus - Updated with Icons and Mantine Grid */}
        <ResearchAreaContainer>
          <SectionSubTitleComponent>
            <Typography variant="h3">Key Research & Development Focus Areas</Typography>
          </SectionSubTitleComponent>
          <Typography variant="body" mb="xl">
            Our R&D resources are strategically invested in these transformative capabilities to
            create an increasingly autonomous and powerful Brain Garden ecosystem:
          </Typography>

          {/* Use motion.div for animation container */}
          <motion.div
            ref={researchRef}
            initial="hidden"
            animate={researchInView ? "visible" : "hidden"}
            variants={staggerContainer} // Use stagger effect
          >
            {/* Increased gutter */}
            <ResearchGridContainer gutter="xl">
              {researchAreas.map((area, index) => (
                // Keep Grid.Col structure
                <Grid.Col key={index} span={{ base: 12, sm: 6, md: 6 }}>
                  {/* Apply item animation & ensure full height */}
                  <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                    <ResearchAreaCard>
                      <IconWrapper><area.icon /></IconWrapper>
                      {/* Adjusted Typography size/weight */}
                      <Typography variant="h3" mb="0.5rem">{area.title}</Typography>
                      {/* Adjusted Typography size/line-height, use Highlight component */}
                      <Typography variant="body">
                        <HighlightKeywords text={area.description} />
                      </Typography>
                    </ResearchAreaCard>
                  </motion.div>
                </Grid.Col>
              ))}
            </ResearchGridContainer>
          </motion.div>
        </ResearchAreaContainer>

        {/* NEW SECTION: From Vision to Value */}
        <VisionValueContainer>
          <SectionSubTitleComponent>
            <Typography variant="h3">From Vision to Value: The Brain Garden Advantage</Typography>
          </SectionSubTitleComponent>
          <Typography variant="body" mb="2rem">
            The roadmap outlined above paints a picture of an increasingly powerful and integrated Brain Garden ecosystem. But beyond individual features, these advancements are driven by core principles and translate into tangible benefits for developers and the systems they build. Before diving into the technical architecture, let's explore the strategic value these developments unlock.
          </Typography>

          <SectionSubTitleComponent>
            <Typography variant="h3">Translating Research into Developer Empowerment</Typography>
          </SectionSubTitleComponent>
          <Typography variant="body" mb="1.5rem">
            Our key research and development areas are not just abstract goals; they are designed to deliver concrete advantages:
          </Typography>

          {/* Map R&D areas to benefits using Mantine Grid and BenefitCard */}
          <BenefitGrid gutter="lg">
            {/* Manually map each benefit to a Grid.Col */}
            <Grid.Col span={{ base: 12, md: 6 }} style={{ height: '100%' }}>
              <BenefitCard>
                <IconWrapper><BiNetworkChart /></IconWrapper>
                <Typography variant="h3" mb="0.5rem">Enhanced Efficiency & Capability</Typography>
                <Typography variant="body">Agent orchestration and specialization enable tackling complex tasks, parallel execution, and automation of sophisticated workflows.</Typography>
              </BenefitCard>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }} style={{ height: '100%' }}>
              <BenefitCard>
                <IconWrapper><BiBrain /></IconWrapper>
                <Typography variant="h3" mb="0.5rem">Smarter, Context-Aware Agents</Typography>
                <Typography variant="body">Dynamic knowledge integration provides deeper, unified understanding, leading to more accurate and relevant assistance.</Typography>
              </BenefitCard>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }} style={{ height: '100%' }}>
              <BenefitCard>
                <IconWrapper><BiPlug /></IconWrapper>
                <Typography variant="h3" mb="0.5rem">Superior Developer Experience (DevEx)</Typography>
                <Typography variant="body">Seamless workflow integration embeds Brain Garden into the developer's natural environment, reducing friction.</Typography>
              </BenefitCard>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }} style={{ height: '100%' }}>
              <BenefitCard>
                <IconWrapper><BiCog /></IconWrapper>
                <Typography variant="h3" mb="0.5rem">Long-Term Viability & Intelligence</Typography>
                <Typography variant="body">Adaptive self-improvement ensures the system evolves and becomes more effective over time.</Typography>
              </BenefitCard>
            </Grid.Col>
          </BenefitGrid>

          <SectionSubTitleComponent>
            <Typography variant="h3">Core Principles Guiding Development</Typography>
          </SectionSubTitleComponent>
          <Typography variant="body" mb="1.5rem">
            The technical architecture you are about to see is built upon several core principles:
          </Typography>

          {/* Use Mantine Box for the list container */}
          <Box
            mb="2rem"
            style={{
              display: 'grid',
              gap: '1.5rem',
              gridTemplateColumns: gridColumns // Apply dynamic columns
            }}
          >
            {corePrinciples.map((principle, index) => (
              /* Use Mantine Paper for the card - Add height style */
              <Paper
                key={index}
                shadow="xs"
                p="lg"
                withBorder
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: theme.spacing.sm,
                  borderColor: theme.colors.gray[3]
                }}
              >
                {/* Children are now correctly passed to Paper */}
                <IconWrapper><principle.icon /></IconWrapper>
                <Typography variant="h3" mb="0.5rem">{principle.title}</Typography>
                <Typography variant="body">{principle.description}</Typography>
              </Paper>
            ))}
          </Box>

        </VisionValueContainer>

        <Typography variant="body" mt="2rem" mb="1rem">
          These principles and the resulting benefits are the foundation upon which the Brain Garden's technical architecture is constructed. Let's now examine how these concepts are realized in the specific components and structures of the system.
        </Typography>

        <Typography variant="body">
          The architecture we&apos;re about to explore translates these concepts into practical
          tools and structures that developers can immediately apply to their daily workflows.
        </Typography>
      </Box>
    </ContentContainer>
  );
};