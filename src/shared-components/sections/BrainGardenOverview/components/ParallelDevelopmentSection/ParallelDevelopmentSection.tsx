import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../../../atoms/Typography';
import { MermaidDiagram } from '../../../../molecules/MermaidDiagram';
import { ParallelDevelopmentSectionProps } from './ParallelDevelopmentSection.types';
import {
  BackgroundSection,
  ContentContainerNoMargin,
  MermaidContainer,
  fadeIn,
  fadeInUp,
  SectionSubtitle
} from '../../BrainGardenOverview.styles';
import {
  SectionTitleComponent,
  CTAButtonWithIcon
} from '../../BrainGardenOverview.logic';

export const ParallelDevelopmentSection: React.FC<ParallelDevelopmentSectionProps> = ({
  className
}) => {
  return (
    <BackgroundSection
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
      id="parallel-development-section"
    >
      <ContentContainerNoMargin>
        <motion.div variants={fadeInUp}>
          <SectionTitleComponent title="True Parallel Development" />
          
          <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
            <SectionSubtitle style={{ marginBottom: '1.5rem' }}>Genuine Parallel Development</SectionSubtitle>
            <Typography variant="body" mb="1.5rem">
              Just like a real development team, AI Brain Garden enables genuine parallel development across multiple features and branches:
            </Typography>
          </div>
          
          <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            <MermaidContainer variants={fadeInUp}>
              <MermaidDiagram
                definition={`
                  flowchart TB
                    %% Main repository at the top
                    REPO["Git Repository"]
                    
                    %% Branches coming down from repo
                    REPO --> MainBranch["main branch"]
                    REPO --> AuthBranch["auth-feature branch"]
                    REPO --> ProfileBranch["profile-feature branch"]
                    
                    %% Main branch structure flowing down
                    MainBranch --> MainBrain[".brain/"]
                    MainBrain --> MainShared["Shared project files"]
                    MainBrain --> MainAgents["Agent folders (empty)"]
                    
                    %% Auth branch flowing down
                    AuthBranch --> AuthBrain[".brain/"]
                    AuthBrain --> AuthShared["Shared project<br>files (unchanged)"]
                    AuthBrain --> AuthSmith["1-agent-smith/<br>(Active)"]
                    AuthBrain --> AuthOthers["Other agents<br>(untouched)"]
                    
                    %% Auth agent work
                    AuthSmith --> AuthWork["Permission Builder<br>Feature Work"]
                    
                    %% Profile branch flowing down
                    ProfileBranch --> ProfileBrain[".brain/"]
                    ProfileBrain --> ProfileShared["Shared project<br>files (unchanged)"]
                    ProfileBrain --> ProfileKeen["2-agent-keen/<br>(Active)"]
                    ProfileBrain --> ProfileOthers["Other agents<br>(untouched)"]
                    
                    %% Profile agent work
                    ProfileKeen --> ProfileWork["Profile UI<br>Feature Work"]
                    
                    %% Merge flows coming back up to main
                    AuthWork --> AuthMerge["Clean PR merge<br>(only agent-smith changes)"]
                    ProfileWork --> ProfileMerge["Clean PR merge<br>(only agent-keen changes)"]
                    
                    AuthMerge --> NoConflict1["No merge conflicts"]
                    ProfileMerge --> NoConflict2["No merge conflicts"]
                    
                    NoConflict1 --> MainBranch
                    NoConflict2 --> MainBranch
                    
                    %% Core concept
                    AuthSmith -.-> CONCEPT["One agent per feature<br>prevents merge conflicts"]
                    ProfileKeen -.-> CONCEPT
                    
                    classDef repo fill:#6366F1,stroke:#333,stroke-width:2px,color:white,font-size:18px,font-weight:bold,padding:15px
                    classDef branch fill:#10B981,stroke:#333,stroke-width:2px,color:white,font-size:16px,font-weight:bold,padding:12px
                    classDef brain fill:#4a6bff,stroke:#333,stroke-width:2px,color:white,font-size:16px,font-weight:bold,padding:12px
                    classDef active fill:#34D399,stroke:#333,stroke-width:2px,color:white,font-size:16px,font-weight:bold,padding:12px
                    classDef files fill:#A5B4FC,stroke:#333,stroke-width:1px,color:white,font-size:15px,padding:10px
                    classDef work fill:#60A5FA,stroke:#333,stroke-width:1px,color:white,font-size:15px,padding:10px
                    classDef merge fill:#F97316,stroke:#333,stroke-width:1px,color:white,font-size:15px,padding:10px
                    classDef concept fill:#8B5CF6,stroke:#333,stroke-width:2px,color:white,font-size:17px,font-weight:bold,padding:12px
                    
                    class REPO repo
                    class MainBranch,AuthBranch,ProfileBranch branch
                    class MainBrain,AuthBrain,ProfileBrain brain
                    class AuthSmith,ProfileKeen active
                    class MainShared,AuthShared,ProfileShared,MainAgents,AuthOthers,ProfileOthers files
                    class AuthWork,ProfileWork work
                    class AuthMerge,ProfileMerge,NoConflict1,NoConflict2 merge
                    class CONCEPT concept
                `}
                theme="default"
                width="100%"
                height="700px"
                backgroundColor="transparent"
              />
            </MermaidContainer>
            
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Typography variant="body" color="secondary">
                The .brain directory's agent specialization model allows teams to work on multiple features in parallel without merge conflicts
              </Typography>
            </div>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem', 
            marginBottom: '2rem' 
          }}>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div>
                <Typography variant="h3" mb="1rem">Multiple Workspaces</Typography>
              </div>
              <div>
                <Typography variant="body">
                  Open different branches in separate Cursor windows, with each window having a different agent activated. 
                  This allows work to continue in parallel across features.
                </Typography>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div>
                <Typography variant="h3" mb="1rem">Continuous Progress</Typography>
              </div>
              <div>
                <Typography variant="body">
                  While Team Architect refactors the authentication system, Team Frontend implements new UI components, 
                  and Team AI/ML optimizes existing integrations.
                </Typography>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div>
                <Typography variant="h3" mb="1rem">Efficient Review Cycles</Typography>
              </div>
              <div>
                <Typography variant="body">
                  Review one team&apos;s work while others continue, provide feedback and direction as needed, 
                  and keep all features moving forward.
                </Typography>
              </div>
            </div>
          </div>
        </motion.div>
      </ContentContainerNoMargin>
    </BackgroundSection>
  );
};