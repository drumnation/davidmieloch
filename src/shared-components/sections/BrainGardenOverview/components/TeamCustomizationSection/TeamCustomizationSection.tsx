import React from 'react';
import { Typography } from '../../../../atoms/Typography';
import { FeatureGrid } from '../../../../organisms/FeatureGrid/FeatureGrid';
import { DiagramClientWrapper } from '../../../../../components/diagrams/_wrappers/DiagramClientWrapper';
import { BrainGardenComponentsDiagram } from '../../../../../components/diagrams/BrainGardenComponentsDiagram/BrainGardenComponentsDiagram';
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
  return (
    <div
      className={className}
      id="team-customization-section"
    >
      <div>
        <SectionTitleComponent title="Customizing Your Team" />
        
        <div 
          style={{ marginTop: '1rem', marginBottom: '1.5rem' }}
        >
          <SectionSubtitleComponent title="The Brain Garden System" />
          <div>
            <Typography variant="body" mb="1.5rem">
              Through years of working with React and Node.js teams, I developed the AI Brain Garden system to transform how teams interact with AI tools. This isn&apos;t just another set of guidelines—it&apos;s a living, evolving ecosystem that grows with your project and enables true parallel development at scale.
            </Typography>
          </div>
        </div>
        
        <div 
          style={{ marginBottom: '1.5rem' }}
        >
          <SectionSubtitleComponent title="From Individual to Team Director" />
          <div>
            <Typography variant="body" mb="1.5rem">
              Traditional AI coding assistants are like having a single junior developer who can help with individual tasks. AI Brain Garden transforms you into a technical director managing multiple specialized teams, each with their own expertise and focus. While we provide default agent personas as examples, the real power lies in its ability to adapt to your project&apos;s specific needs through a systematic MECE (Mutually Exclusive, Collectively Exhaustive) approach.
            </Typography>
          </div>
        </div>

        <div>
          <Typography variant="body" mb="0.5rem">
            For example, in one project I worked on, we needed to build a real-time data visualization platform. Using the MECE approach, we created specialized teams for:
          </Typography>
          <ul 
            style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}
          >
            <li style={{ marginBottom: '0.3rem' }}>Data Pipeline Architecture</li>
            <li style={{ marginBottom: '0.3rem' }}>Visualization Design</li>
            <li style={{ marginBottom: '0.3rem' }}>Performance Optimization</li>
            <li style={{ marginBottom: '0.3rem' }}>UX Flow Engineering</li>
          </ul>
          <div>
            <Typography variant="body" mb="1.5rem">
              This structure allowed us to tackle complex challenges in parallel while maintaining clear boundaries between responsibilities.
            </Typography>
          </div>
        </div>
        
        <div 
          style={{ backgroundColor: '#ebf5ff', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}
        >
          <div>
            <BrainGardenComponentsDiagram
              title=""
              theme="default"
              width="100%"
              height="400px"
              showZoomControls={false}
              accessibilityDescription="MECE organization divides projects into distinct domains with consistent documentation structure, preventing conflicts while ensuring complete coverage"
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Typography variant="body" color="secondary">
              MECE organization divides projects into distinct domains with consistent documentation structure, preventing conflicts while ensuring complete coverage
            </Typography>
          </div>
        </div>
        
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem', 
            marginBottom: '2rem' 
          }}
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
    </div>
  );
};