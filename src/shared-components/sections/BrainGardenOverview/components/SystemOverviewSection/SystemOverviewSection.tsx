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
        <SectionTitleComponent title="System Overview" />
      </motion.div>
      
      <motion.div variants={fadeInUp}>
        <IntroBlock>
          {introProps.icon && typeof introProps.icon === 'string' && (
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <Icon name={introProps.icon} size={48} />
            </div>
          )}
          <IntroTextComponent text={introProps.text} />
        </IntroBlock>
      </motion.div>
      
      {/* From Solo Developer to Multi-Team Director Narrative */}
      <motion.div variants={fadeInUp} style={{ marginTop: '3rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <SectionSubtitle style={{ marginBottom: '1.5rem' }}>From Solo Developer to Multi-Team Director</SectionSubtitle>
          <Typography variant="body" mb="1.5rem">
            Traditional AI coding assistants are like having a single junior developer who can help with individual tasks. 
            AI Brain Garden transforms you into a technical director managing multiple specialized teams, each with their 
            own expertise and focus. Instead of working with a single AI assistant, you&apos;ll coordinate specialized AI teams 
            that work in parallel on different aspects of your project.
          </Typography>
        </div>
      </motion.div>

      {/* Core Teams Grid */}
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
              title: "Core Teams",
              description: "Meet your AI development teams",
              link: "#core-teams",
              icon: "users"
            },
            {
              title: "Team Customization",
              description: "Build your ideal AI team",
              link: "#team-customization",
              icon: "settings"
            },
            {
              title: "Parallel Development",
              description: "Scale your development efforts",
              link: "#parallel-development",
              icon: "git-branch"
            },
            {
              title: "Knowledge Management",
              description: "Grow your project's intelligence",
              link: "#knowledge-management",
              icon: "brain"
            },
            {
              title: "Documentation Power",
              description: "Documentation as a force multiplier",
              link: "#documentation-power",
              icon: "file-text"
            },
            {
              title: "Testing Excellence",
              description: "Testing as a force multiplier",
              link: "#testing-excellence",
              icon: "check-circle"
            },
            {
              title: "Git Integration",
              description: "Git as a force multiplier",
              link: "#git-integration",
              icon: "git-merge"
            },
            {
              title: "Agent System",
              description: "How AI agents are managed and coordinated",
              link: "#agent-system",
              icon: "cpu"
            },
            {
              title: "Integration System",
              description: "How the system integrates with development tools",
              link: "#integration-system",
              icon: "layers"
            },
            {
              title: "Knowledge System",
              description: "How project knowledge is managed and utilized",
              link: "#knowledge-system",
              icon: "database"
            }
          ].map((card, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <NavigationCard
                title={card.title}
                description={card.description}
                action="Explore"
                link={card.link}
                icon={renderIcon(card.icon)}
                style="gradient-card"
              />
            </motion.div>
          ))}
        </NavigationGrid>
      </motion.div>
    </ContentContainer>
  );
};