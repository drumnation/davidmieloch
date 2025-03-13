import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../../../atoms/Typography';
import { NavigationCard } from '../../../../organisms/NavigationCard/NavigationCard';
import { NavigationSectionProps } from './NavigationSection.types';
import {
  ContentContainer,
  NavigationGrid,
  fadeInUp,
  staggerContainer,
  SectionSubtitle
} from '../../BrainGardenOverview.styles';
import {
  SectionTitleComponent
} from '../../BrainGardenOverview.logic';
import { Icon } from '../../../../atoms/Icon';

export const NavigationSection: React.FC<NavigationSectionProps> = ({
  className,
  navigationProps
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

  // System architecture cards
  const architectureCards = [
    {
      title: "Agent System",
      description: "Learn how AI agents are managed and coordinated",
      link: "./agent-system",
      icon: "users"
    },
    {
      title: "Integration System",
      description: "Discover how the system integrates with development tools",
      link: "./integration-system",
      icon: "git-branch"
    },
    {
      title: "Knowledge System",
      description: "Explore how project knowledge is managed and utilized",
      link: "./knowledge-system",
      icon: "brain"
    }
  ];

  return (
    <ContentContainer
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp}>
        <SectionTitleComponent title="Navigation" />
        
        <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <SectionSubtitle style={{ marginBottom: '1.5rem' }}>Explore the System</SectionSubtitle>
          <Typography variant="body" mb="1.5rem">
            Explore the different aspects of the Brain Garden System to learn more about how it can transform your development process. Each section provides detailed information about a specific component or concept of the system.
          </Typography>
        </div>
        
        <NavigationGrid
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {navigationProps.sections.map((section, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              style={{ height: '100%' }}
            >
              <NavigationCard
                title={section.title}
                description={section.description}
                action="Explore"
                link={section.link}
                icon={typeof section.icon === 'string' ? renderIcon(section.icon) : section.icon}
                style="gradient-card"
              />
            </motion.div>
          ))}
        </NavigationGrid>
        
        {/* System Architecture Navigation */}
        <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
          <SectionSubtitle style={{ marginBottom: '1.5rem' }}>System Architecture</SectionSubtitle>
          <Typography variant="body" mb="1.5rem">
            Dive deeper into the technical architecture of the Brain Garden System:
          </Typography>
        </div>
        
        <NavigationGrid
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {architectureCards.map((card, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              style={{ height: '100%' }}
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