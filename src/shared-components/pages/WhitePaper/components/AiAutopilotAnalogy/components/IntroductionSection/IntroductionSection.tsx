import React from 'react';
import { SectionTitle, SectionParagraph } from '../ui-components';
import { paragraphContainerStyle, paragraphContainerStyle as additionalStyle } from '../../AiAutopilotAnalogy.styles';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../AiAutopilotAnalogy.styles';

interface IntroductionSectionProps {
  className?: string;
}

export const IntroductionSection: React.FC<IntroductionSectionProps> = ({
  className,
}) => {
  return (
    <motion.div 
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div variants={fadeInUp} style={additionalStyle}>
        <SectionTitle title="Reframing AI: The Autopilot Analogy" />
      </motion.div>
      
      <motion.div variants={fadeInUp} style={paragraphContainerStyle}>
        <SectionParagraph>
          As one experienced developer in the Reddit thread eloquently explained:
        </SectionParagraph>
      </motion.div>
      
      <motion.div 
        variants={fadeInUp}
        style={{
          ...paragraphContainerStyle, 
          marginLeft: '1.5rem', 
          borderLeft: '3px solid #3b82f6', 
          paddingLeft: '1.5rem',
          backgroundColor: '#f0f7ff',
          borderRadius: '0 8px 8px 0',
          padding: '1rem 1.5rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
        }}
      >
        <SectionParagraph>
          &quot;There&apos;s a &apos;Hollywood view&apos; of autopilot where it&apos;s a magical tool that the pilot just flicks on after takeoff, then they sit back and let it fly them to their destination. This view bleeds into other domains such as self-driving cars and AI programming tools.
        </SectionParagraph>
        
        <div style={{marginTop: '1rem'}}>
          <SectionParagraph>
            But it fundamentally misunderstands autopilot as a tool. The reality is that aircraft autopilot systems are specialist tools which require training to use effectively, where the primary goal is to reduce cognitive load and allow the pilot to focus on higher-level concerns.
          </SectionParagraph>
        </div>
        
        <div style={{marginTop: '1rem'}}>
          <SectionParagraph>
            Hand flying is tiring work, especially in bumpy weather, and it doesn&apos;t leave the pilot with a lot of spare brain capacity. So autopilot is there only to alleviate that load, freeing the pilot up to think more effectively about the bigger picture - what&apos;s the weather looking like up ahead? What about at the destination? Will we have to divert? If we divert, will we have enough fuel to get to an alternate? When is the cutoff for making that decision?
          </SectionParagraph>
        </div>
        
        <div style={{marginTop: '1rem'}}>
          <SectionParagraph>
            The autopilot may do the stick, rudder, and throttle work, but it does nothing that isn&apos;t actively monitored by the pilot as part of their higher-level duties.&quot;
          </SectionParagraph>
        </div>
      </motion.div>
      
      <motion.div variants={fadeInUp} style={paragraphContainerStyle}>
        <SectionParagraph>
          This analogy perfectly captures how we should view AI in software development - not as a replacement for human developers, but as a tool that reduces cognitive load so developers can focus on more strategic concerns.
        </SectionParagraph>
      </motion.div>
    </motion.div>
  );
}; 