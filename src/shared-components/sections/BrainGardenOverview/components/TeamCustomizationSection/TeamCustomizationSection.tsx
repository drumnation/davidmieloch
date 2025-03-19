import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../../../atoms/Typography';
import { MermaidDiagram } from '../../../../molecules/MermaidDiagram';
import { TeamCustomizationSectionProps } from './TeamCustomizationSection.types';
import {
  ContentContainer,
  MermaidContainer,
  fadeInUp,
  staggerContainer
} from '../../BrainGardenOverview.styles';
import {
  SectionTitleComponent,
  SectionSubtitleComponent
} from '../../BrainGardenOverview.logic';

export const TeamCustomizationSection: React.FC<TeamCustomizationSectionProps> = ({
  className
}) => {
  // Animation variants for staggered grid animations
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

  const gridItemVariants = {
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

  const paragraphVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const cardListItemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const diagramContainerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <ContentContainer
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      id="team-customization-section"
    >
      <motion.div variants={fadeInUp}>
        <SectionTitleComponent title="Customizing Your Team" />
        
        <motion.div 
          style={{ marginTop: '1rem', marginBottom: '1.5rem' }}
          variants={paragraphVariants}
        >
          <SectionSubtitleComponent title="The Brain Garden System" />
          <motion.div variants={paragraphVariants}>
            <Typography variant="body" mb="1.5rem">
              Through years of working with React and Node.js teams, I developed the AI Brain Garden system to transform how teams interact with AI tools. This isn&apos;t just another set of guidelines—it&apos;s a living, evolving ecosystem that grows with your project and enables true parallel development at scale.
            </Typography>
          </motion.div>
        </motion.div>
        
        <motion.div 
          style={{ marginBottom: '1.5rem' }}
          variants={paragraphVariants}
        >
          <SectionSubtitleComponent title="From Individual to Team Director" />
          <motion.div variants={paragraphVariants}>
            <Typography variant="body" mb="1.5rem">
              Traditional AI coding assistants are like having a single junior developer who can help with individual tasks. AI Brain Garden transforms you into a technical director managing multiple specialized teams, each with their own expertise and focus. While we provide default agent personas as examples, the real power lies in its ability to adapt to your project&apos;s specific needs through a systematic MECE (Mutually Exclusive, Collectively Exhaustive) approach.
            </Typography>
          </motion.div>
        </motion.div>

        <motion.div variants={paragraphVariants}>
          <Typography variant="body" mb="0.5rem">
            For example, in one project I worked on, we needed to build a real-time data visualization platform. Using the MECE approach, we created specialized teams for:
          </Typography>
          <motion.ul 
            style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}
            variants={listContainerVariants}
          >
            <motion.li variants={listItemVariants} style={{ marginBottom: '0.3rem' }}>Data Pipeline Architecture</motion.li>
            <motion.li variants={listItemVariants} style={{ marginBottom: '0.3rem' }}>Visualization Design</motion.li>
            <motion.li variants={listItemVariants} style={{ marginBottom: '0.3rem' }}>Performance Optimization</motion.li>
            <motion.li variants={listItemVariants} style={{ marginBottom: '0.3rem' }}>UX Flow Engineering</motion.li>
          </motion.ul>
          <motion.div variants={paragraphVariants}>
            <Typography variant="body" mb="1.5rem">
              This structure allowed us to tackle complex challenges in parallel while maintaining clear boundaries between responsibilities.
            </Typography>
          </motion.div>
        </motion.div>
        
        <motion.div 
          style={{ backgroundColor: '#ebf5ff', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}
          variants={diagramContainerVariants}
          whileHover={{ 
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            y: -3,
            transition: { duration: 0.3 } 
          }}
        >
          <MermaidContainer variants={fadeInUp}>
            <MermaidDiagram
              definition={`
                flowchart LR
                    classDef root fill:#2D3748,stroke:none,color:white,font-weight:bold,padding:10px
                    classDef domain fill:#5A67D8,stroke:none,color:white,font-weight:bold,padding:10px
                    classDef file fill:#38A169,stroke:none,color:white,padding:8px
                    classDef benefit fill:#ED8936,stroke:none,color:white,font-weight:bold,padding:10px
                    classDef docs fill:#4A5568,stroke:none,color:white,font-weight:bold,padding:8px
                    
                    %% Main Directory with domains as a vertical column
                    BrainDir[".brain Directory"]:::root
                    
                    %% Domains as a vertical stack
                    BrainDir --> Auth["Authentication"]:::domain
                    BrainDir --> Profile["User Profile"]:::domain
                    BrainDir --> Payment["Payment System"]:::domain
                    BrainDir --> Benefits["Key Benefits"]:::root
                    
                    %% Files for Authentication
                    Auth --> AuthFiles["Documentation"]:::docs
                    AuthFiles --> AuthReq["requirements.md"]:::file
                    AuthFiles --> AuthArch["architecture.md"]:::file
                    AuthFiles --> AuthAPI["api.md"]:::file
                    AuthFiles --> AuthComp["components.md"]:::file
                    
                    %% Files for User Profile
                    Profile --> ProfileFiles["Documentation"]:::docs
                    ProfileFiles --> ProfileReq["requirements.md"]:::file
                    ProfileFiles --> ProfileArch["architecture.md"]:::file
                    ProfileFiles --> ProfileAPI["api.md"]:::file
                    ProfileFiles --> ProfileComp["components.md"]:::file
                    
                    %% Files for Payment System
                    Payment --> PayFiles["Documentation"]:::docs
                    PayFiles --> PayReq["requirements.md"]:::file
                    PayFiles --> PayArch["architecture.md"]:::file
                    PayFiles --> PayAPI["api.md"]:::file
                    PayFiles --> PayComp["components.md"]:::file
                    
                    %% Benefits arranged vertically
                    Benefits --> B1["No Overlapping Responsibilities"]:::benefit
                    Benefits --> B2["Complete Project Coverage"]:::benefit
                    Benefits --> B3["Prevents Merge Conflicts"]:::benefit
                    Benefits --> B4["Easier Context Management"]:::benefit
              `}
              theme="default"
              width="100%"
              height="auto"
              backgroundColor="transparent"
            />
          </MermaidContainer>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Typography variant="body" color="secondary">
              MECE organization divides projects into distinct domains with consistent documentation structure, preventing conflicts while ensuring complete coverage
            </Typography>
          </div>
        </motion.div>
        
        <motion.div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem', 
            marginBottom: '2rem' 
          }}
          variants={gridContainerVariants}
        >
          {[
            {
              title: "Project Analysis",
              items: [
                "Break down project requirements into distinct domains",
                "Identify core technical challenges",
                "Map out integration points and dependencies",
                "Define quality and performance requirements"
              ]
            },
            {
              title: "Skill Mapping",
              items: [
                "Determine required expertise for each domain",
                "Identify overlapping skill requirements",
                "Define specialized knowledge needs",
                "Map out collaboration points"
              ]
            },
            {
              title: "Agent Design",
              items: [
                "Create agent personas based on skill requirements",
                "Define specialized prompt libraries for each agent role",
                "Generate skill-jacks (specialized knowledge packages)",
                "Setup context handoff protocols for efficient agent session management"
              ]
            },
            {
              title: "Team Optimization",
              items: [
                "Ensure no gaps in coverage",
                "Eliminate redundant responsibilities",
                "Balance workload distribution",
                "Define clear handoff points"
              ]
            }
          ].map((card, index) => (
            <motion.div 
              key={index}
              style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '0.5rem' }}
              variants={gridItemVariants}
              whileHover={{ 
                y: -5, 
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                transition: { duration: 0.2 } 
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <Typography variant="h3" mb="1rem">{card.title}</Typography>
              </motion.div>
              <motion.ul 
                style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.25rem' }}
                variants={listContainerVariants}
              >
                {card.items.map((item, i) => (
                  <motion.li 
                    key={i}
                    variants={cardListItemVariants}
                    custom={i}
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </ContentContainer>
  );
};