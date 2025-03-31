import React from 'react';
import { Typography } from '../../../../atoms/Typography';
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
  slideInRight,
  slideInLeft,
  fadeInScale,
  cardStaggerContainer,
  phaseStaggerContainer
} from './NextEvolutionSection.styles';

export const NextEvolutionSection: React.FC<NextEvolutionSectionProps> = ({
  className
}) => {
  // Timeline data
  const timelineData = {
    current: {
      title: "Current Capabilities",
      color: "#6A0DAD", // purple-700
      items: [
        "Knowledge System - Structured information repository",
        "Skill-Jacks - Modular capability extensions",
        "Prompt System - Advanced interaction framework",
        "MECE Documentation - Comprehensive knowledge capture"
      ]
    },
    next: {
      title: "Next Evolution",
      color: "#4CAF50", // green-500
      items: [
        "Advanced MCP Server - Enhanced processing capabilities",
        "Skill-Jacks via MCP - Dynamic tool integration",
        "Meta MCP Server - Self-modifying architecture",
        "CLI Automation via MCP - Streamlined workflows"
      ]
    },
    future: {
      title: "Future Roadmap",
      color: "#2196F3", // blue-500
      items: [
        "Lead & Subordinate Agents - Hierarchical task delegation",
        "Architect & Tester Subordinates - Specialized roles",
        "Parallel Task Processing - Multi-agent coordination",
        "Advanced GitHub Workflow - Enhanced integration",
        "VSCode Extension - Seamless developer experience",
        "Iterative System Improvements - Continuous enhancement"
      ]
    }
  };

  // R&D focus areas data
  const researchAreas = [
    {
      title: "Agent Orchestration",
      description: "Developing frameworks for multi-agent collaboration, task delegation, and resource optimization"
    },
    {
      title: "Dynamic Skill Acquisition",
      description: "Creating systems for on-demand capability extension and knowledge integration"
    },
    {
      title: "Workflow Automation",
      description: "Building seamless interfaces between Brain Garden and development environments"
    },
    {
      title: "Self-Improvement Mechanisms",
      description: "Implementing feedback loops for continuous system enhancement and refinement"
    }
  ];

  // Component for each timeline phase
  const TimelinePhase = ({ title, color, items }: { title: string; color: string; items: string[] }) => {
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
              const [feature, description] = item.split(" - ");
              return (
                <PhaseItem key={index}>
                  <PhaseItemDot style={{ backgroundColor: color }} />
                  <PhaseItemContent>
                    <Typography variant="body" as="span" weight="bold">{feature}</Typography>
                    {description && <Typography variant="body" as="span" color="secondary"> - {description}</Typography>}
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
      <div>
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
        
        {/* Focus Areas Grid */}
        <div>
          <Typography variant="h3" mt="3rem" mb="1.5rem">Key Research & Development Focus Areas</Typography>
        </div>
        
        <CapabilityCardsGrid>
          <CapabilityCard style={{ backgroundColor: "#6A0DAD" }}>
            <Typography variant="h3" color="light" mb="0.75rem">Advanced MCP Server</Typography>
            <Typography variant="body" color="light">
              Enhanced MCP server providing brain-garden specific tools to the agent, including skill-jacks via MCP and dynamic tool creation capabilities.
            </Typography>
          </CapabilityCard>
          
          <CapabilityCard style={{ backgroundColor: "#4CAF50" }}>
            <Typography variant="h3" color="light" mb="0.75rem">Lead & Subordinate Agents</Typography>
            <Typography variant="body" color="light">
              Lead agent delegates tasks to specialized subordinate agents, such as architect agents for planning and tester agents for automated quality assurance.
            </Typography>
          </CapabilityCard>
          
          <CapabilityCard style={{ backgroundColor: "#2196F3" }}>
            <Typography variant="h3" color="light" mb="0.75rem">Advanced Workflow Integration</Typography>
            <Typography variant="body" color="light">
              Enhanced agile workflow with GitHub Projects integration, VSCode extensions, and continuous iterative improvements to leverage new technologies.
            </Typography>
          </CapabilityCard>
        </CapabilityCardsGrid>
        
        {/* Research Focus */}
        <ResearchAreaContainer>
          <Typography variant="h3" mb="1rem">Research Investment Areas</Typography>
          <Typography variant="body" mb="1.5rem">
            Our R&D resources are strategically invested in these transformative capabilities to 
            create an increasingly autonomous and powerful Brain Garden ecosystem:
          </Typography>
          
          <ResearchGridContainer>
            {researchAreas.map((area, index) => (
              <ResearchAreaCard key={index}>
                <Typography variant="h3" mb="0.5rem">{area.title}</Typography>
                <Typography variant="body">{area.description}</Typography>
              </ResearchAreaCard>
            ))}
          </ResearchGridContainer>
        </ResearchAreaContainer>
        
        <Typography variant="body" mt="2rem" mb="1rem">
          Now that we've explored the conceptual framework of the Brain Garden system, 
          let's examine how these ideas come to life through technical implementation.
        </Typography>
        
        <Typography variant="body">
          The architecture we're about to explore translates these concepts into practical 
          tools and structures that developers can immediately apply to their daily workflows.
        </Typography>
      </div>
    </ContentContainer>
  );
};