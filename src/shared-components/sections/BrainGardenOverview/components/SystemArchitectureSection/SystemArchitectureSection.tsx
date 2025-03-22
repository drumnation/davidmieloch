import React from 'react';
import { Typography } from '../../../../atoms/Typography';
import { SystemArchitectureSectionProps } from './SystemArchitectureSection.types';
import { ContentContainer } from '../../BrainGardenOverview.styles';
import { SectionTitleComponent, CTAButtonWithIcon } from '../../BrainGardenOverview.logic';

export const SystemArchitectureSection: React.FC<SystemArchitectureSectionProps> = ({
  className,
  systemArchitectureProps
}) => {
  return (
    <ContentContainer
      className={className}
      id="system-architecture-section"
      style={{ 
        backgroundColor: '#4a6bff', 
        color: 'white', 
        padding: '3rem 2rem',
        borderRadius: '0.5rem' 
      }}
    >
      <div>
        <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>System Architecture</h1>
        
        <Typography variant="h2" mb="1.5rem" color="light">
          Scalable System Design
        </Typography>
        
        <Typography variant="body" mb="2rem" color="light">
          The Brain Garden System architecture is designed for scalability, flexibility, and efficiency. It consists of three main systems: the Knowledge System for managing project intelligence, the Agent System for coordinating AI teams, and the Integration System for connecting with development tools and workflows.
        </Typography>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: '2rem',
          borderRadius: '0.5rem',
          width: '100%',
          margin: '0 auto 2rem auto'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <Typography variant="h3" color="primary">
              System Implementation
            </Typography>
          </div>

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 900 600"
              style={{ width: '100%', maxWidth: '800px', height: 'auto' }}
            >
              {/* Background */}
              <rect width="900" height="600" fill="#f8f9fa" rx="10" ry="10"/>
              
              {/* Main System Box */}
              <rect x="50" y="50" width="800" height="120" rx="10" ry="10" fill="#4361ee" stroke="#2b4acb" strokeWidth="2"/>
              <text x="450" y="110" fontFamily="Arial, sans-serif" fontSize="32" fill="white" textAnchor="middle" fontWeight="bold">Brain Garden System</text>
              
              {/* Three Main Systems */}
              <rect x="80" y="200" width="220" height="150" rx="10" ry="10" fill="#3a86ff" stroke="#2a66cf" strokeWidth="2"/>
              <text x="190" y="240" fontFamily="Arial, sans-serif" fontSize="22" fill="white" textAnchor="middle" fontWeight="bold">Knowledge System</text>
              <text x="190" y="275" fontFamily="Arial, sans-serif" fontSize="16" fill="white" textAnchor="middle">Project Intelligence</text>
              <text x="190" y="305" fontFamily="Arial, sans-serif" fontSize="16" fill="white" textAnchor="middle">Context Management</text>
              
              <rect x="340" y="200" width="220" height="150" rx="10" ry="10" fill="#7209b7" stroke="#5a0792" strokeWidth="2"/>
              <text x="450" y="240" fontFamily="Arial, sans-serif" fontSize="22" fill="white" textAnchor="middle" fontWeight="bold">Agent System</text>
              <text x="450" y="275" fontFamily="Arial, sans-serif" fontSize="16" fill="white" textAnchor="middle">AI Team Coordination</text>
              <text x="450" y="305" fontFamily="Arial, sans-serif" fontSize="16" fill="white" textAnchor="middle">Task Management</text>
              
              <rect x="600" y="200" width="220" height="150" rx="10" ry="10" fill="#06d6a0" stroke="#04a77c" strokeWidth="2"/>
              <text x="710" y="240" fontFamily="Arial, sans-serif" fontSize="22" fill="white" textAnchor="middle" fontWeight="bold">Integration System</text>
              <text x="710" y="275" fontFamily="Arial, sans-serif" fontSize="16" fill="white" textAnchor="middle">Development Tools</text>
              <text x="710" y="305" fontFamily="Arial, sans-serif" fontSize="16" fill="white" textAnchor="middle">Workflow Connection</text>
              
              {/* Implementation Components Box */}
              <rect x="100" y="400" width="700" height="180" rx="10" ry="10" fill="#f1f3f5" stroke="#dee2e6" strokeWidth="2"/>
              
              {/* Implementation Title - moved to top center of the box for clarity */}
              <text x="450" y="430" fontFamily="Arial, sans-serif" fontSize="24" fill="#212529" textAnchor="middle" fontWeight="bold">System Implementation</text>
              
              {/* Essential Components */}
              <rect x="130" y="450" width="180" height="110" rx="8" ry="8" fill="#9d4edd" stroke="#7b2cbf" strokeWidth="2"/>
              <text x="220" y="485" fontFamily="Arial, sans-serif" fontSize="18" fill="white" textAnchor="middle" fontWeight="bold">CLI Tools</text>
              <text x="220" y="515" fontFamily="Arial, sans-serif" fontSize="14" fill="white" textAnchor="middle">Setup, Generate, Create</text>
              <text x="220" y="540" fontFamily="Arial, sans-serif" fontSize="14" fill="white" textAnchor="middle">Manage AI Agents</text>
              
              <rect x="360" y="450" width="180" height="110" rx="8" ry="8" fill="#2dc653" stroke="#25a244" strokeWidth="2"/>
              <text x="450" y="485" fontFamily="Arial, sans-serif" fontSize="18" fill="white" textAnchor="middle" fontWeight="bold">.brain Directory</text>
              <text x="450" y="515" fontFamily="Arial, sans-serif" fontSize="14" fill="white" textAnchor="middle">Project Configuration</text>
              <text x="450" y="540" fontFamily="Arial, sans-serif" fontSize="14" fill="white" textAnchor="middle">Feature Management</text>
              
              <rect x="590" y="450" width="180" height="110" rx="8" ry="8" fill="#ffb703" stroke="#fd9e02" strokeWidth="2"/>
              <text x="680" y="485" fontFamily="Arial, sans-serif" fontSize="18" fill="white" textAnchor="middle" fontWeight="bold">GitHub Integration</text>
              <text x="680" y="515" fontFamily="Arial, sans-serif" fontSize="14" fill="white" textAnchor="middle">Management</text>
              <text x="680" y="540" fontFamily="Arial, sans-serif" fontSize="14" fill="white" textAnchor="middle">Visibility</text>
              
              {/* Connecting Lines */}
              {/* Main systems to Brain Garden */}
              <line x1="190" y1="200" x2="305" y2="170" stroke="#4895ef" strokeWidth="2"/>
              <line x1="450" y1="200" x2="450" y2="170" stroke="#4895ef" strokeWidth="2"/>
              <line x1="710" y1="200" x2="595" y2="170" stroke="#4895ef" strokeWidth="2"/>
              
              {/* Implementation components connections to Implementation title - SIMPLIFIED */}
              {/* Only keep the solid middle line, remove the dotted side lines */}
              <line x1="450" y1="450" x2="450" y2="430" stroke="#6c757d" strokeWidth="2"/>
              
              {/* CLI to .brain connection */}
              <line x1="310" y1="505" x2="360" y2="505" stroke="#6c757d" strokeWidth="2"/>
              
              {/* .brain to GitHub connection */}
              <line x1="540" y1="505" x2="590" y2="505" stroke="#6c757d" strokeWidth="2" strokeDasharray="5,5"/>
            </svg>
          </div>
          
          <div style={{ 
            marginTop: '2rem', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '1.5rem',
            width: '100%' 
          }}>
            <div style={{ 
              border: '1px solid #e2e8f0', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              backgroundColor: 'white'
            }}>
              <h3 style={{ fontWeight: 'bold', color: '#9d4edd', marginBottom: '0.5rem', textAlign: 'center' }}>CLI Capabilities</h3>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', color: '#333333' }}>
                <li>Setup Project Configuration</li>
                <li>Generate Task Lists</li>
                <li>Create Feature Files</li>
                <li>Manage AI Agents</li>
              </ul>
            </div>
            
            <div style={{ 
              border: '1px solid #e2e8f0', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              backgroundColor: 'white'
            }}>
              <h3 style={{ fontWeight: 'bold', color: '#2dc653', marginBottom: '0.5rem', textAlign: 'center' }}>.brain Directory</h3>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', color: '#333333' }}>
                <li>Project Documentation</li>
                <li>Configuration Files</li>
                <li>Prompts & Skill-Jacks</li>
                <li>Domain Knowledge</li>
              </ul>
            </div>
            
            <div style={{ 
              border: '1px solid #e2e8f0', 
              padding: '1rem', 
              borderRadius: '0.5rem',
              backgroundColor: 'white'
            }}>
              <h3 style={{ fontWeight: 'bold', color: '#ffb703', marginBottom: '0.5rem', textAlign: 'center' }}>GitHub Integration</h3>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', color: '#333333' }}>
                <li>Issues & Projects</li>
                <li>Management Visibility</li>
                <li>Automated PR Creation</li>
                <li>Documentation Generation</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <Typography variant="body" color="light" mb="2rem">
            The Brain Garden system consists of two essential components: CLI tools for project setup and management, and the .brain directory for structured documentation and knowledge. GitHub integration is available as an optional component that provides visibility and management tools primarily for non-technical stakeholders.
          </Typography>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <CTAButtonWithIcon
          text="Explore Knowledge System"
          icon="arrow-right"
          link="#knowledge-system"
        />
      </div>
    </ContentContainer>
  );
};