"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../../organisms/Hero';
import { FeatureGrid } from '../../organisms/FeatureGrid/FeatureGrid';
import { ComparisonTable } from '../../molecules/ComparisonTable';
import { AiAutopilotAnalogyProps } from './AiAutopilotAnalogy.types';
import { Typography } from '../../atoms/Typography';
import { MermaidDiagram } from '../../molecules/MermaidDiagram';
import { useAiAutopilotAnalogy } from './AiAutopilotAnalogy.hook';
import {
  containerStyle,
  contentSectionStyle,
  sectionContainerStyle,
  sectionContainerWithoutMarginStyle,
  sectionContainerTopMarginStyle,
  sectionContainerSmallTopMarginStyle,
  comparisonSectionStyle,
  titleContainerStyle,
  paragraphContainerStyle,
  paragraphContainerNoMarginStyle,
  realityVsHollywoodContainerStyle,
  itemsContainerStyle,
  mermaidContainerStyle,
  titleBlockStyle,
  descriptionBlockStyle,
  fadeIn,
  fadeInUp,
  staggerContainer,
  paragraphContainerTopMarginStyle
} from './AiAutopilotAnalogy.styles';
import {
  RealityItem,
  HollywoodItem,
  SectionTitle,
  SectionSubtitle,
  SectionParagraph
} from './AiAutopilotAnalogy.logic';

export const AiAutopilotAnalogy: React.FC<AiAutopilotAnalogyProps> = (props) => {
  const {
    className,
    enhancedHeroProps,
    comparisonTableProps,
    realityVsHollywoodProps,
    strategicFocusAreasProps,
    mermaidDiagramProps
  } = useAiAutopilotAnalogy(props);

  return (
    <div className={className} style={containerStyle}>
      {/* Hero Section */}
      <Hero {...enhancedHeroProps} />
      
      {/* Content Section with White Background */}
      <motion.div 
        style={contentSectionStyle}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        {/* Introduction Section */}
        <motion.div 
          style={sectionContainerStyle}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="text-left" 
            style={titleContainerStyle}
            variants={fadeInUp}
          >
            <SectionTitle title="Reframing AI: The Autopilot Analogy" />
          </motion.div>
          
          <motion.div 
            style={paragraphContainerStyle}
            variants={fadeInUp}
          >
            <SectionParagraph>
              To understand the proper role of AI in software development, consider the relationship between a pilot and an autopilot system in aviation. 
              This analogy helps clarify expectations, responsibilities, and the optimal division of labor between human developers and AI tools.
            </SectionParagraph>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <SectionParagraph>
              Just as autopilot systems handle routine flight operations but require pilot oversight for critical decisions and emergencies, 
              AI coding tools excel at generating boilerplate code and routine tasks while requiring human expertise for architecture, 
              complex problem-solving, and quality assurance.
            </SectionParagraph>
          </motion.div>
        </motion.div>
        
        {/* Comparison Table Section */}
        <motion.div 
          style={comparisonSectionStyle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <motion.div 
            style={sectionContainerWithoutMarginStyle}
            variants={fadeInUp}
          >
            <SectionSubtitle title="Human Pilot vs. AI Autopilot" />
            <ComparisonTable 
              leftTitle={comparisonTableProps.leftTitle}
              rightTitle={comparisonTableProps.rightTitle}
              items={comparisonTableProps.items}
              variant="accent"
            />
          </motion.div>
        </motion.div>
        
        {/* Reality vs Hollywood Section */}
        <motion.div 
          style={sectionContainerStyle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div 
            className="text-left" 
            style={titleContainerStyle}
            variants={fadeInUp}
          >
            <SectionTitle title="AI Reality vs. Hollywood Fiction" />
          </motion.div>
          
          <motion.div 
            style={paragraphContainerStyle}
            variants={fadeInUp}
          >
            <SectionParagraph>
              Many misconceptions about AI stem from science fiction portrayals that bear little resemblance to today&apos;s reality. 
              Understanding these differences is crucial for setting realistic expectations and implementing effective AI strategies.
            </SectionParagraph>
          </motion.div>
          
          <motion.div 
            style={realityVsHollywoodContainerStyle}
            variants={staggerContainer}
          >
            {/* Reality Column */}
            <motion.div variants={fadeInUp}>
              <SectionSubtitle title="Reality: AI Today" color="primary" />
              <div style={itemsContainerStyle}>
                {realityVsHollywoodProps.realityItems.map((item, index) => (
                  <RealityItem key={index} item={item} index={index} />
                ))}
              </div>
            </motion.div>
            
            {/* Hollywood Column */}
            <motion.div variants={fadeInUp}>
              <SectionSubtitle title="Hollywood: AI Fiction" color="primary" />
              <div style={itemsContainerStyle}>
                {realityVsHollywoodProps.hollywoodItems.map((item, index) => (
                  <HollywoodItem key={index} item={item} index={index} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Strategic Focus Areas Section */}
        <motion.div 
          style={sectionContainerWithoutMarginStyle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div 
            className="text-left" 
            style={titleContainerStyle}
            variants={fadeInUp}
          >
            <SectionTitle title="Strategic Focus Areas for AI Integration" />
          </motion.div>
          
          <motion.div 
            style={paragraphContainerStyle}
            variants={fadeInUp}
          >
            <SectionParagraph>
              Based on my experience implementing AI systems across multiple development teams, 
              I&apos;ve identified six key focus areas that determine the success of AI integration:
            </SectionParagraph>
          </motion.div>
          
          <FeatureGrid 
            features={strategicFocusAreasProps.features}
            columns={3}
            style="gradient-cards"
            animation="stagger-fade"
          />
          
          <motion.div 
            style={paragraphContainerTopMarginStyle}
            variants={fadeInUp}
          >
            <SectionParagraph>
              By focusing on these strategic areas, organizations can create a balanced approach that leverages AI&apos;s strengths 
              while maintaining the critical human elements of software development.
            </SectionParagraph>
          </motion.div>
        </motion.div>
        
        {/* Process Flow Diagram Section */}
        <motion.div 
          style={sectionContainerTopMarginStyle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div 
            style={paragraphContainerStyle}
            variants={fadeInUp}
          >
            <div style={titleBlockStyle}>
              <Typography variant="h2" weight="bold">
                {mermaidDiagramProps.title}
              </Typography>
            </div>
            <div style={descriptionBlockStyle}>
              <Typography variant="body" weight="regular">
                {mermaidDiagramProps.description}
              </Typography>
            </div>
          </motion.div>
          
          <motion.div
            variants={fadeInUp}
            style={mermaidContainerStyle}
          >
            <MermaidDiagram
              definition={mermaidDiagramProps.definition || ''}
              theme={mermaidDiagramProps.theme as 'default' | 'dark' | 'forest' | 'neutral' | undefined}
              height="auto"
              width="100%"
            />
          </motion.div>
          
          <motion.div variants={fadeInUp} style={paragraphContainerNoMarginStyle}>
            <SectionParagraph>
              This process emphasizes the iterative nature of successful AI integration, with continuous feedback loops
              and clear decision points for refining the approach based on real-world results.
            </SectionParagraph>
          </motion.div>
        </motion.div>
        
        {/* Conclusion Section */}
        <motion.div 
          style={sectionContainerSmallTopMarginStyle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div 
            style={paragraphContainerStyle}
            variants={fadeInUp}
          >
            <SectionParagraph>
              The autopilot analogy provides a powerful framework for understanding AI&apos;s role in development. 
              Just as pilots remain essential despite advanced autopilot systems, developers remain the creative and strategic core of software development.
            </SectionParagraph>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <SectionParagraph>
              In the next section, we&apos;ll explore how these principles are implemented in my comprehensive AI integration system: The Brain Garden.
            </SectionParagraph>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};