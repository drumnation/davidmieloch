import React from 'react';
import { Box, Grid } from '@mantine/core';
import { Typography } from '@shared-components/atoms/Typography';
import { 
  sectionContainerStyle, 
  paragraphContainerStyle,
  paragraphContainerTopMarginStyle
} from '../../AiAutopilotAnalogy.styles';

interface DunningKrugerSectionProps {
  isVisible?: boolean;
}

const DunningKrugerSection: React.FC<DunningKrugerSectionProps> = ({ isVisible = true }) => {
  if (!isVisible) return null;
  
  const phaseContainerStyle = {
    padding: '1.5rem',
    borderRadius: '8px',
    height: '100%',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  };

  return (
    <Box style={sectionContainerStyle}>
      <div style={paragraphContainerStyle}>
        <Typography variant="h2" mb="md">The Dunning-Kruger Effect in AI Integration</Typography>
        <Typography variant="body">
          The journey of integrating AI into business workflows often follows a pattern similar to the Dunning-Kruger effect - 
          a cognitive bias where people with limited knowledge in a specific domain overestimate their competence. 
          With AI integration, organizations typically move through distinct phases of expectation versus reality.
        </Typography>
      </div>
      
      <div style={paragraphContainerTopMarginStyle}>
        <Typography variant="body" mb="lg">
          Below is how organizations typically progress through the AI integration journey:
        </Typography>
      </div>
      
      <Grid gutter={{ base: "lg", sm: "xl" }}>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Box style={phaseContainerStyle}>
            <Typography variant="h3" mb="sm">Phase 1: Peak of Inflated Expectations</Typography>
            <Typography variant="body">
              Initially, businesses have unrealistic expectations about what AI can accomplish. 
              They envision fully autonomous systems that require minimal human oversight and dramatically 
              reduce workloads immediately.
            </Typography>
          </Box>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Box style={phaseContainerStyle}>
            <Typography variant="h3" mb="sm">Phase 2: Trough of Disillusionment</Typography>
            <Typography variant="body">
              Reality sets in when organizations discover that implementing AI requires significant 
              training, data preparation, and ongoing maintenance. Disappointment emerges when initial 
              results don't match expectations.
            </Typography>
          </Box>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Box style={phaseContainerStyle}>
            <Typography variant="h3" mb="sm">Phase 3: Slope of Enlightenment</Typography>
            <Typography variant="body">
              With perseverance, businesses gain a more realistic understanding of AI's capabilities 
              and limitations. They develop practical strategies for implementation, focusing on specific, 
              high-value use cases rather than broad transformation.
            </Typography>
          </Box>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Box style={phaseContainerStyle}>
            <Typography variant="h3" mb="sm">Phase 4: Plateau of Productivity</Typography>
            <Typography variant="body">
              Eventually, organizations reach a stage of productive AI integration, with realistic 
              expectations and measurable benefits. They understand the balance between automation 
              and human oversight, creating sustainable AI systems that genuinely enhance productivity.
            </Typography>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default DunningKrugerSection; 