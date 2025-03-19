import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../../../atoms/Typography';
import { Icon } from '../../../../atoms/Icon';
import { SystemOverviewSectionProps } from './SystemOverviewSection.types';
import {
  ContentContainer,
  IntroBlock,
  fadeInUp,
  staggerContainer,
  SectionSubtitle,
  NavigationGrid
} from '../../BrainGardenOverview.styles';
import {
  SectionTitleComponent,
  IntroTextComponent
} from '../../BrainGardenOverview.logic';
import { NavigationCard } from '../../../../organisms/NavigationCard/NavigationCard';

export const SystemOverviewSection: React.FC<SystemOverviewSectionProps> = ({
  className,
  introProps
}) => {
  // Function to render icon component for NavigationCard
  const renderIcon = (iconName: string) => {
    return <Icon name={iconName} size={24} />;
  };

  // Animation variants for staggered card animations
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <ContentContainer
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div
        style={{ textAlign: 'left' }}
        variants={fadeInUp}
      >
        <SectionTitleComponent title="AI Brain Garden: Documentation & Structure System" />
      </motion.div>
      
      <motion.div variants={fadeInUp}>
        <IntroBlock>
          {introProps.icon && typeof introProps.icon === 'string' && (
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <Icon name={introProps.icon} size={48} />
            </div>
          )}
          <IntroTextComponent text={introProps.text || "Expanding on the autopilot analogy, the AI Brain Garden isn't a magical solution—it's a practical, evolving system of documentation techniques and structural approaches I've developed to enhance AI's capabilities in development workflows. Through years of working with React and Node.js teams, I've created a framework that provides structure, focus, and contextual knowledge that makes AI agents smarter and more effective. Unlike using raw AI without structure, this system reduces cognitive load by providing systematic approaches to common development challenges, allowing you to leverage AI more effectively while maintaining control of architecture and quality."} />
        </IntroBlock>
      </motion.div>
      
      {/* From Unstructured AI to Systematic Development */}
      <motion.div variants={fadeInUp} style={{ marginTop: '3rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <SectionSubtitle style={{ marginBottom: '1.5rem' }}>From Unstructured AI to Systematic Development</SectionSubtitle>
          <Typography variant="body" mb="1.5rem">
            Traditional AI coding assistants can help with isolated tasks, but they often lose context and require constant guidance. The Brain Garden system provides structural and documentation techniques that significantly enhance AI capabilities—giving you a collection of specialized prompts, folder structures, and tools that work together to create more effective AI assistance. The system includes:
          </Typography>
          
          <ul style={{ listStyleType: 'decimal', paddingLeft: '2rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <Typography variant="body" as="span"><strong>Knowledge/Skill-Jacks:</strong> Structured documentation that gives agents specialized capabilities</Typography>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Typography variant="body" as="span"><strong>Process Prompts:</strong> Templates that guide the AI through complex workflows</Typography>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Typography variant="body" as="span"><strong>Project Management Integration:</strong> Tools that sync AI-generated content with GitHub issues and projects</Typography>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Typography variant="body" as="span"><strong>Error Management Systems:</strong> Methods to generate task lists from TypeScript errors, linting issues, and test failures</Typography>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Typography variant="body" as="span"><strong>CLI and Automation Tools:</strong> Commands that help maintain project structure and context for the AI</Typography>
            </li>
          </ul>
          
          <Typography variant="body">
            While I'm exploring multi-agent approaches (different agent personas for different features), the core strength of Brain Garden is its systematic approach to documentation and structure that makes even a single AI agent much more effective.
          </Typography>
        </div>
      </motion.div>
      
      {/* MECE Organization Section */}
      <motion.div variants={fadeInUp} style={{ marginTop: '2rem', marginBottom: '3rem' }}>
        <div>
          <SectionSubtitle style={{ marginBottom: '1.5rem' }}>MECE Organization for Complex Development</SectionSubtitle>
          <Typography variant="body" mb="1.5rem">
            Good AI development requires careful organization. The MECE principle (Mutually Exclusive, Collectively Exhaustive) is central to the Brain Garden system for several important reasons:
          </Typography>
          
          <ul style={{ listStyleType: 'decimal', paddingLeft: '2rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <Typography variant="body" as="span"><strong>Preventing Merge Conflicts:</strong> When AI works at 10x speed across many files, proper separation of concerns becomes critical. MECE organization minimizes the chances of developers or agents overwriting each other's work or creating difficult merge conflicts.</Typography>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Typography variant="body" as="span"><strong>Complexity Management:</strong> As projects scale, the Brain Garden's MECE-based documentation structure helps maintain context and organization, making it easier for AI to understand specific domains without getting confused by overlapping responsibilities.</Typography>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Typography variant="body" as="span"><strong>Conflict Resolution Tools:</strong> While the system provides enhanced capabilities for resolving conflicts when they arise (including generating implementation guides rather than merging directly), strategic organization with MECE principles prevents many conflicts from occurring in the first place.</Typography>
            </li>
          </ul>
          
          <Typography variant="body">
            The Brain Garden system directly addresses many of the concerns raised by experienced developers about AI integration by providing structures and workflows that encourage good organization, clear boundaries, and systematic documentation—turning potential chaos into coordinated development.
          </Typography>
        </div>
      </motion.div>

      {/* Focused Navigation Grid - Preview of Topics */}
      <motion.div 
        variants={fadeInUp} 
        style={{ marginTop: '2rem' }}
      >
        <NavigationGrid
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              title: "Documentation Structure",
              description: "How the .brain directory organizes project knowledge",
              icon: "file-text"
            },
            {
              title: "Workflow Templates",
              description: "Process guides for common development tasks",
              icon: "git-branch"
            },
            {
              title: "MECE Organization",
              description: "How to divide projects for parallel development",
              icon: "layout"
            },
            {
              title: "Force Multipliers",
              description: "Tools that enhance AI effectiveness",
              icon: "zap"
            },
            {
              title: "Integration Systems",
              description: "Connecting with GitHub and project management",
              icon: "link"
            },
            {
              title: "Knowledge Management",
              description: "Techniques for maintaining project context",
              icon: "brain"
            }
          ].map((card, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <NavigationCard
                content={{
                  text: card.title,
                  action: "",
                  link: "",
                  icon: card.icon
                }}
                style="gradient-card"
              />
            </motion.div>
          ))}
        </NavigationGrid>
      </motion.div>
    </ContentContainer>
  );
};