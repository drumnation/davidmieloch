import React from 'react';
import { Typography } from '../../../../atoms/Typography';
import { SPACING } from '../../../AiAutopilotAnalogy/AiAutopilotAnalogy.styles';
import { SectionParagraph } from '../../AiAutopilotAnalogy.logic';

export const DunningKrugerSection: React.FC = () => {
  return (
    <div style={{
      marginTop: SPACING.paragraphBreak,
      padding: '1.5rem',
      backgroundColor: '#fff4e5',
      borderRadius: '8px',
      borderLeft: '4px solid #ff9800',
      marginBottom: '2rem'
    }}>
      <Typography variant="h3" weight="bold" className="mb-3">
        The Dunning-Kruger Trap: When Managers &quot;Vibe Code&quot;
      </Typography>
      <SectionParagraph>
        A particularly troubling pattern emerging in AI-enabled organizations is what I call the &quot;vibe coding&quot; phenomenon: project managers and other non-technical stakeholders who experiment with AI coding tools in their spare time suddenly believe they understand the development process deeply enough to dictate timelines.
      </SectionParagraph>
      
      <div style={{
        display: 'flex',
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
        borderRadius: '8px',
        overflow: 'hidden',
        flexDirection: 'column',
        border: '1px solid #f0f0f0',
        backgroundColor: '#FFFFFF'
      }}>
        <div style={{ 
          backgroundColor: '#f8f8f8', 
          padding: '0.75rem 1.5rem',
          borderBottom: '1px solid #f0f0f0' 
        }}>
          <Typography variant="h3" weight="semibold">
            Scenario
          </Typography>
        </div>
        <div style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
          <SectionParagraph>
            &quot;Our PM spent a weekend &apos;coding&apos; with ChatGPT and suddenly thinks he&apos;s a technical expert. Yesterday he told me, &apos;The AI built my entire portfolio site in an hour, so your estimate of three sprints for rebuilding the authentication system is ridiculous.&apos; He has no concept of edge cases, scale, or security concerns that don&apos;t exist in his static hobby site.&quot;
          </SectionParagraph>
        </div>
        <div style={{ 
          marginTop: '1rem', 
          padding: '0.75rem', 
          backgroundColor: '#e6f7ff', 
          borderRadius: '4px',
          fontSize: '0.9rem',
          margin: '1rem'
        }}>
          <strong>The Dunning-Kruger Effect: </strong> 
          The cognitive bias where people with limited knowledge in a domain dramatically overestimate their expertise, unaware of the complexity they don&apos;t understand.
        </div>
      </div>
      
      <div style={{ marginTop: '1.5rem' }}>
        <SectionParagraph>
          This represents a dangerous power shift where technical decisions and timelines are increasingly imposed by those who lack the expertise to understand all requirements. The superficial simplicity of AI-generated code creates a false perception that development work is now trivial, leading to:
        </SectionParagraph>
        <ul style={{ 
          marginTop: '1rem', 
          marginBottom: '1rem',
          paddingLeft: '2rem',
          listStyleType: 'disc'
        }}>
          <li>Unrealistic deadlines</li>
          <li>Dismissal of engineering concerns</li>
          <li>Technical debt accumulation</li>
          <li>Declining software quality</li>
          <li>Developer burnout</li>
        </ul>
      </div>
    </div>
  );
} 