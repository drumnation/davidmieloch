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
              As one experienced developer in the Reddit thread eloquently explained:
            </SectionParagraph>
          </motion.div>
          
          <motion.div 
            style={{...paragraphContainerStyle, marginLeft: '1.5rem', borderLeft: '3px solid #e0e0e0', paddingLeft: '1.5rem'}}
            variants={fadeInUp}
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
          
          <motion.div 
            style={paragraphContainerStyle}
            variants={fadeInUp}
          >
            <SectionParagraph>
              This analogy perfectly captures how we should view AI in software development - not as a replacement for human developers, but as a tool that reduces cognitive load so developers can focus on more strategic concerns.
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

          <motion.div 
            style={paragraphContainerStyle}
            variants={fadeInUp}
          >
            <SectionParagraph>
              Before diving into these focus areas, it&apos;s worth emphasizing that AI integration requires a strong foundation of engineering excellence. 
              The rise of AI tools doesn&apos;t diminish the importance of best practices—it magnifies it. 
              This perspective was powerfully articulated by another voice in the discussion:
            </SectionParagraph>
          </motion.div>

          <motion.div 
            style={{...paragraphContainerStyle, marginLeft: '1.5rem', borderLeft: '3px solid #e0e0e0', paddingLeft: '1.5rem', marginBottom: '2rem'}}
            variants={fadeInUp}
          >
            <SectionParagraph>
              <strong>As a software architect with 15 years of experience emphasized in the same thread:</strong>
            </SectionParagraph>
            
            <div style={{marginTop: '1rem'}}>
              <SectionParagraph>
                &quot;AI will make following best practices even more important. You need diligent code review to prevent AI slop from getting in (real code review, not rubber stamps). You need strong and thorough typing to provide the context needed to generate quality code. You need testing and thorough test coverage to prevent regressions and ensure correct behavior. You need linters to ensure best practices and avoid the cases. You need well thought out comments to communicate edge cases. You need CI and git hooks to enforce compliance. You need well thought out interfaces and well designed encapsulation to keep responsibility of each module small. You need a well thought out and clean and consistent project structure so it&apos;s clear where code should go.
              </SectionParagraph>
            </div>
            
            <div style={{marginTop: '1rem'}}>
              <SectionParagraph>
                I think architects and team leads will come out of this great if their skills are legit. But even a high level person can&apos;t manage all the AI output and ensure high quality, so they&apos;ll still need a team of smart engineers to make sure the plan is being followed and to work on the framework and tooling to keep code quality high. Technicians who just do business logic on top of existing frameworks will have a very hard time. The kind of developer that thinks &apos;why do I need theory, I just want to learn tech stack X and build stuff&apos; will suffer.
              </SectionParagraph>
            </div>
            
            <div style={{marginTop: '1rem'}}>
              <SectionParagraph>
                Companies that understand and respect good engineering quality and culture will excel while companies that think this allows them to skimp on engineering and give the reigns to hacks and inexperienced juniors are doomed to ruin themselves under unmaintainable spaghetti code AI slop.&quot;
              </SectionParagraph>
            </div>
          </motion.div>
          
          <motion.div 
            style={paragraphContainerStyle}
            variants={fadeInUp}
          >
            <SectionParagraph>
              This architect&apos;s insights align perfectly with what I&apos;ve observed in successful AI implementations. 
              With this foundation in mind, let&apos;s explore the six strategic focus areas that can transform how teams integrate AI tools, starting with establishing a knowledge foundation and progressing through implementation, people, and measurement:
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
            style={{
              ...mermaidContainerStyle,
              textAlign: 'center',
              display: 'block'
            }}
          >
            <div style={{ 
              width: '100%',
              maxWidth: '800px', 
              margin: '0 auto',
              textAlign: 'center'
            }}>
              <MermaidDiagram
                definition={mermaidDiagramProps.definition || ''}
                theme={mermaidDiagramProps.theme as 'default' | 'dark' | 'forest' | 'neutral' | undefined}
                height="auto"
                width="100%"
                className="centered-diagram"
              />
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp} style={paragraphContainerNoMarginStyle}>
            <SectionParagraph>
              This process flow directly aligns with our six strategic focus areas, showing how they integrate into a practical implementation plan.
              Starting with knowledge integration as the foundation, the flow incorporates each focus area in a logical sequence.
              Note the iterative nature with continuous feedback loops and clear decision points for refinement based on real-world results.
              This approach ensures AI integration remains human-directed, balancing engineering excellence with practical implementation.
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