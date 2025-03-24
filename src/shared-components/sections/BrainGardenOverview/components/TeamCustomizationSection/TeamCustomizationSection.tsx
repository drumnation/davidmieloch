import React from 'react';
import { Typography } from '../../../../atoms/Typography';
import { MermaidDiagram } from '../../../../molecules/MermaidDiagram';
import { TeamCustomizationSectionProps } from './TeamCustomizationSection.types';
import {
  ContentContainer,
  SPACING,
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
  return (
    <ContentContainer
      className={className}
      id="team-customization-section"
    >
      <div>
        <SectionTitleComponent title="Customizing Your Team" />
        
        <div style={{ marginBottom: SPACING.paragraphBreak }}>
          <SectionSubtitleComponent title="The Brain Garden System" />
          <Typography variant="body" mb={SPACING.paragraph}>
            Through years of working with React and Node.js teams, I developed the AI Brain Garden system to transform how teams interact with AI tools. This isn&apos;t just another set of guidelines—it&apos;s a living, evolving ecosystem that grows with your project and enables true parallel development at scale.
          </Typography>
        </div>
        
        <div style={{ marginBottom: SPACING.paragraphBreak }}>
          <SectionSubtitleComponent title="From Individual to Team Director" />
          <Typography variant="body" mb={SPACING.paragraph}>
            Traditional AI coding assistants are like having a single junior developer who can help with individual tasks. AI Brain Garden transforms you into a technical director managing multiple specialized teams, each with their own expertise and focus. While we provide default agent personas as examples, the real power lies in its ability to adapt to your project&apos;s specific needs through a systematic MECE (Mutually Exclusive, Collectively Exhaustive) approach.
          </Typography>
        </div>

        <div style={{ marginBottom: SPACING.paragraphBreak }}>
          <Typography variant="body" mb={SPACING.element}>
            For example, in one project I worked on, we needed to build a real-time data visualization platform. Using the MECE approach, we created specialized teams for:
          </Typography>
          <ul style={{ 
            listStyleType: 'disc', 
            paddingLeft: SPACING.container, 
            marginBottom: SPACING.element 
          }}>
            <li style={{ marginBottom: '0.5rem' }}>Data Pipeline Architecture</li>
            <li style={{ marginBottom: '0.5rem' }}>Visualization Design</li>
            <li style={{ marginBottom: '0.5rem' }}>Performance Optimization</li>
            <li style={{ marginBottom: '0.5rem' }}>UX Flow Engineering</li>
          </ul>
          <Typography variant="body" mb={SPACING.paragraph}>
            This structure allowed us to tackle complex challenges in parallel while maintaining clear boundaries between responsibilities.
          </Typography>
        </div>
        
        <div style={{ 
          backgroundColor: '#ebf5ff', 
          padding: SPACING.container,
          borderRadius: '0.5rem', 
          marginBottom: SPACING.paragraphBreak 
        }}>
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
          <div style={{ textAlign: 'center', marginTop: SPACING.element }}>
            <Typography variant="body" color="secondary">
              MECE organization divides projects into distinct domains with consistent documentation structure, preventing conflicts while ensuring complete coverage
            </Typography>
          </div>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: SPACING.element,
          marginBottom: SPACING.section
        }}>
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
                "Define communication protocols",
                "Create specialized agent profiles"
              ]
            }
          ].map((card, index) => (
            <div 
              key={index}
              style={{
                padding: '1.5rem',
                backgroundColor: '#f7fafc',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <Typography variant="h3" mb="1rem">{card.title}</Typography>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {card.items.map((item, i) => (
                  <li 
                    key={i} 
                    style={{
                      marginBottom: '0.75rem',
                      paddingLeft: '1.5rem',
                      position: 'relative'
                    }}
                  >
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: '0.4rem',
                      width: '0.5rem',
                      height: '0.5rem',
                      backgroundColor: '#4C51BF',
                      borderRadius: '50%'
                    }}></span>
                    <Typography variant="body">{item}</Typography>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </ContentContainer>
  );
};