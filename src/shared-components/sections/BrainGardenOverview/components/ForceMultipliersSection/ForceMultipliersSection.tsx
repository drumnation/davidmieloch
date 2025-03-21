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
      id="force-multipliers-section"
    >
      <motion.div variants={fadeInUp}>
        <SectionTitleComponent title="Force Multipliers" />
        
        {/* Force Multipliers Introduction */}
        <div style={{ marginTop: '1rem', marginBottom: '2rem' }}>
          <SectionSubtitle style={{ marginBottom: '1.5rem' }}>
            3 Critical Force Multipliers
          </SectionSubtitle>
          
          <Typography variant="body" mb="1.5rem">
            The Brain Garden System leverages three key force multipliers that dramatically accelerate development while maintaining high quality standards. These aren't just minor enhancements—they're transformative capabilities that fundamentally change how AI-assisted development works:
          </Typography>
          
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li>
              <Typography variant="body" mb="0.5rem">
                <strong>Documentation</strong> transforms from static reference material into dynamic knowledge that AI can interpret and apply
              </Typography>
            </li>
            <li>
              <Typography variant="body" mb="0.5rem">
                <strong>Testing</strong> creates rapid feedback loops that enable AI to iterate at superhuman speed, testing multiple solutions while a human would still be checking the first attempt
              </Typography>
            </li>
            <li>
              <Typography variant="body" mb="0.5rem">
                <strong>Git Integration</strong> turns version control into both a knowledge system and a collaboration amplifier, with AI enhancing every aspect from commit messages to history navigation
              </Typography>
            </li>
          </ul>
          
          <Typography variant="body" mb="1.5rem">
            Together, these force multipliers create a development environment that's exponentially more efficient and thorough than traditional approaches. They address the key challenges that limit AI effectiveness in conventional development workflows.
          </Typography>
        </div>

        {/* Feature Grid Overview */}
        <FeatureGrid 
          features={forceMultipliersProps.features}
          columns={3}
          style="accent-cards"
          animation="stagger-fade"
        />
        
        {/* Detailed Explanations */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem', 
          marginTop: '2rem',
          marginBottom: '2rem' 
        }}>
          {/* Documentation Force Multiplier */}
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div>
              <Typography variant="h3" mb="1rem">Documentation</Typography>
            </div>
            <div>
              <Typography variant="body" mb="1rem">
                Documentation becomes a structured knowledge base that agents can parse and utilize:
              </Typography>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                <li>
                  <Typography variant="body" mb="0.5rem">
                    <strong>Pattern recognition acceleration:</strong> Templates and examples provide reusable patterns that AI can quickly adapt to new requirements
                  </Typography>
                </li>
                <li>
                  <Typography variant="body" mb="0.5rem">
                    <strong>Automated code generation:</strong> Well-documented components and patterns allow AI to consistently generate code that follows project standards
                  </Typography>
                </li>
                <li>
                  <Typography variant="body" mb="0.5rem">
                    <strong>Component documentation:</strong> Comprehensive information about existing components reduces duplication and ensures consistent implementation
                  </Typography>
                </li>
                <li>
                  <Typography variant="body" mb="0.5rem">
                    <strong>Implementation acceleration:</strong> Providing AI with clear architecture decisions and patterns dramatically reduces the need for clarifying questions and iterations
                  </Typography>
                </li>
              </ul>
            </div>
          </div>

          {/* Testing Force Multiplier */}
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div>
              <Typography variant="h3" mb="1rem">Testing</Typography>
            </div>
            <div>
              <Typography variant="body" mb="1rem">
                With significantly increased development speed, automated testing becomes critical:
              </Typography>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                <li>
                  <Typography variant="body" mb="0.5rem">
                    <strong>Rapid feedback loops:</strong> AI can attempt multiple solutions in the time it would take a developer to manually test once, accelerating problem-solving by running tests, observing errors, adjusting code, and repeating
                  </Typography>
                </li>
                <li>
                  <Typography variant="body" mb="0.5rem">
                    <strong>Test-driven development:</strong> Tests become specifications that guide AI implementation, allowing AI to iterate quickly until all tests pass
                  </Typography>
                </li>
                <li>
                  <Typography variant="body" mb="0.5rem">
                    <strong>Edge case identification:</strong> AI can systematically identify and create tests for edge cases that humans might overlook
                  </Typography>
                </li>
                <li>
                  <Typography variant="body" mb="0.5rem">
                    <strong>Continuous validation:</strong> Testing becomes a real-time guardrail rather than a post-development activity
                  </Typography>
                </li>
              </ul>
            </div>
          </div>

          {/* Git Integration Force Multiplier */}
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div>
              <Typography variant="h3" mb="1rem">Git Integration</Typography>
            </div>
            <div>
              <Typography variant="body" mb="1rem">
                Version control becomes a powerful development accelerator:
              </Typography>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                <li>
                  <Typography variant="body" mb="0.5rem">
                    <strong>Enhanced documentation:</strong> AI generates detailed commit messages and PR descriptions that perfectly summarize changes, following team conventions without human effort
                  </Typography>
                </li>
                <li>
                  <Typography variant="body" mb="0.5rem">
                    <strong>Intelligent history navigation:</strong> AI can quickly search commit history, analyze relevant changes across time, and bring specific historical versions into context
                  </Typography>
                </li>
                <li>
                  <Typography variant="body" mb="0.5rem">
                    <strong>Change organization:</strong> AI can recommend how to break large changes into logical, focused commits and PRs with clear dependencies
                  </Typography>
                </li>
                <li>
                  <Typography variant="body" mb="0.5rem">
                    <strong>Context preservation:</strong> Well-documented git history becomes a knowledge base that AI can leverage without consuming precious context window space
                  </Typography>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div style={{ marginTop: '2rem' }}>
          <Typography variant="body" mb="1.5rem">
            These force multipliers don't work in isolation—they integrate seamlessly with the Brain Garden's core components:
          </Typography>
          
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li>
              <Typography variant="body" mb="0.5rem">
                The <strong>Knowledge System</strong> provides the foundation that Documentation builds upon
              </Typography>
            </li>
            <li>
              <Typography variant="body" mb="0.5rem">
                The <strong>Prompt System</strong> leverages Testing's rapid feedback loops to optimize workflows
              </Typography>
            </li>
            <li>
              <Typography variant="body" mb="0.5rem">
                <strong>Structured Documentation</strong> works with Git Integration to maintain context across team members and development sessions
              </Typography>
            </li>
          </ul>
          
          <Typography variant="body">
            Together, these systems transform AI from a helpful assistant into a development force multiplier that can dramatically accelerate your team's capabilities while maintaining or improving quality standards.
          </Typography>
        </div>
      </motion.div>
    </ContentContainer>
  );
};