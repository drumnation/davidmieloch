import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../../../../atoms/Typography';
import { FeatureGrid } from '../../../../organisms/FeatureGrid/FeatureGrid';
import { ForceMultipliersSectionProps } from './ForceMultipliersSection.types';
import {
  ContentContainer,
  fadeInUp,
  staggerContainer,
  SectionSubtitle
} from '../../BrainGardenOverview.styles';
import {
  SectionTitleComponent,
  CTAButtonWithIcon
} from '../../BrainGardenOverview.logic';

export const ForceMultipliersSection: React.FC<ForceMultipliersSectionProps> = ({
  className,
  forceMultipliersProps
}) => {
  return (
    <ContentContainer
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <motion.div variants={fadeInUp}>
        <SectionTitleComponent title="Force Multipliers" />
        
        <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <SectionSubtitle style={{ marginBottom: '1.5rem' }}>Accelerating Development</SectionSubtitle>
          <Typography variant="body" mb="1.5rem">
            The Brain Garden System leverages three key force multipliers that dramatically accelerate development while maintaining high quality standards. These multipliers work together to create a development environment that&apos;s both efficient and thorough.
          </Typography>
        </div>
        
        <div style={{ backgroundColor: '#ebf5ff', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            <div>
              <div>
                <Typography variant="h3" mb="1rem">Documentation</Typography>
              </div>
              <div>
                <Typography variant="body" mb="0.5rem">
                  Documentation becomes a structured knowledge base that agents can parse and utilize:
                </Typography>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.25rem' }}>
                  <li>Pattern recognition acceleration</li>
                  <li>Automated code generation</li>
                  <li>Component documentation</li>
                  <li>Implementation acceleration</li>
                </ul>
              </div>
            </div>
            
            <div>
              <div>
                <Typography variant="h3" mb="1rem">Testing</Typography>
              </div>
              <div>
                <Typography variant="body" mb="0.5rem">
                  With 10-100x development speed, automated testing becomes critical:
                </Typography>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.25rem' }}>
                  <li>Comprehensive test coverage</li>
                  <li>Rapid feedback loops</li>
                  <li>Edge case identification</li>
                  <li>Continuous validation</li>
                </ul>
              </div>
            </div>
            
            <div>
              <div>
                <Typography variant="h3" mb="1rem">Git Integration</Typography>
              </div>
              <div>
                <Typography variant="body" mb="0.5rem">
                  Version control becomes a powerful development accelerator:
                </Typography>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.25rem' }}>
                  <li>Intelligent merge resolution</li>
                  <li>Advanced change analysis</li>
                  <li>Perfect commit organization</li>
                  <li>Historical pattern learning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <FeatureGrid 
          features={forceMultipliersProps.features}
          columns={3}
          style="accent-cards"
          animation="stagger-fade"
        />
        <div style={{ textAlign: 'right', marginTop: '1rem' }}>
          <Typography variant="body" mb="0.5rem">
            Explore each force multiplier in detail:
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <CTAButtonWithIcon 
              text="Documentation" 
              link="./doc-force-multiplier" 
              icon="file-text" 
            />
            <CTAButtonWithIcon 
              text="Testing" 
              link="./test-force-multiplier" 
              icon="shield-check" 
            />
            <CTAButtonWithIcon 
              text="Git Integration" 
              link="./git-force-multiplier" 
              icon="git-branch" 
            />
          </div>
        </div>
      </motion.div>
    </ContentContainer>
  );
};