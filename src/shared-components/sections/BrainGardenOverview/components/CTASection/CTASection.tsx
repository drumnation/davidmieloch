import React from 'react';
import { motion } from 'framer-motion';
import { CTASectionProps } from './CTASection.types';
import {
  ContentContainer,
  CTABlock,
  CTATitle,
  CTADescription,
  fadeInUp,
  pulse,
  staggerContainer
} from '../../BrainGardenOverview.styles';
import {
  CTAButtonWithIcon
} from '../../BrainGardenOverview.logic';

export const CTASection: React.FC<CTASectionProps> = ({
  className,
  ctaProps
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
        <CTABlock
          variants={pulse}
          whileHover="hover"
        >
          <CTATitle>{ctaProps.title}</CTATitle>
          <CTADescription>{ctaProps.description}</CTADescription>
          <CTAButtonWithIcon 
            text={ctaProps.action} 
            link={ctaProps.link} 
            icon={ctaProps.icon} 
          />
        </CTABlock>
      </motion.div>
    </ContentContainer>
  );
};