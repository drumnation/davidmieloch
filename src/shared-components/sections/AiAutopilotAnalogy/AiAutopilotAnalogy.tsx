"use client";

import React, { CSSProperties } from 'react';
import { Hero } from '../../organisms/Hero';
import { FeatureGrid } from '../../organisms/FeatureGrid/FeatureGrid';
import { ComparisonTable } from '../../molecules/ComparisonTable';
import { AiAutopilotAnalogyProps } from './AiAutopilotAnalogy.types';
import { Typography } from '../../atoms/Typography';
import { MermaidDiagram } from '../../molecules/MermaidDiagram';
import { useAiAutopilotAnalogy } from './AiAutopilotAnalogy.hook';
import {
  GlobalStyles,
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
  paragraphContainerTopMarginStyle,
  SPACING,
  RealityVsHollywoodContainer
} from './AiAutopilotAnalogy.styles';
import {
  RealityItem,
  HollywoodItem,
  SectionTitle,
  SectionSubtitle,
  SectionParagraph,
  enhanceHeroProps,
  defaultContent
} from './AiAutopilotAnalogy.logic';

export const AiAutopilotAnalogy: React.FC<AiAutopilotAnalogyProps> = ({ 
  heroProps = defaultContent.hero,
  realityVsHollywoodProps = defaultContent.realityVsHollywood,
  className
}) => {
  const {
    enhancedHeroProps,
    comparisonTableProps,
    realityVsHollywoodProps: updatedRealityVsHollywoodProps,
    strategicFocusAreasProps,
    mermaidDiagramProps,
    leadershipBlueprintProps
  } = useAiAutopilotAnalogy({
    heroProps,
    realityVsHollywoodProps
  });

  const quoteHoverProps: CSSProperties = {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '1.5rem',
    borderLeft: '4px solid var(--primary-blue)',
    position: 'relative' as const,
    margin: '1rem 0 1.5rem'
  };

  const blueprintHoverProps: CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e0e0e0'
  };

  return (
    <div className={className}>
      <GlobalStyles />
      <div style={containerStyle}>
        <Hero {...enhancedHeroProps} />
        
        <div className="autopilot-content-section">
          {/* Introduction Section */}
          <div style={sectionContainerStyle}>
            <div className="text-left" style={titleContainerStyle}>
              <SectionTitle title="Reframing AI: The Autopilot Analogy" />
            </div>
            
            <div style={paragraphContainerStyle}>
              <SectionParagraph>
                As one experienced developer in the Reddit thread eloquently explained:
              </SectionParagraph>
            </div>
            
            <div style={{...paragraphContainerStyle, marginLeft: '1.5rem', borderLeft: '3px solid #e0e0e0', paddingLeft: '1.5rem'}}>
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
            </div>
            
            <div style={paragraphContainerStyle}>
              <SectionParagraph>
                This analogy perfectly captures how we should view AI in software development - not as a replacement for human developers, but as a tool that reduces cognitive load so developers can focus on more strategic concerns.
              </SectionParagraph>
            </div>
          </div>
          
          {/* Comparison Table Section */}
          <div style={comparisonSectionStyle}>
            <div style={sectionContainerWithoutMarginStyle}>
              <SectionSubtitle title="Human Pilot vs. AI Autopilot" />
              <ComparisonTable 
                leftTitle={comparisonTableProps.leftTitle}
                rightTitle={comparisonTableProps.rightTitle}
                items={comparisonTableProps.items}
                variant="accent"
              />
            </div>
          </div>
          
          {/* Reality vs Hollywood Section */}
          <div style={sectionContainerStyle}>
            <div style={titleContainerStyle}>
              <Typography variant="h2" className="mb-4">Reality vs Hollywood AI</Typography>
            </div>
            <RealityVsHollywoodContainer>
              {updatedRealityVsHollywoodProps.realityItems.map((item, index) => (
                <RealityItem key={`reality-${index}`} item={item} index={index} />
              ))}
              {updatedRealityVsHollywoodProps.hollywoodItems.map((item, index) => (
                <HollywoodItem key={`hollywood-${index}`} item={item} index={index} />
              ))}
            </RealityVsHollywoodContainer>
          </div>
          
          {/* Strategic Focus Areas Section */}
          <div style={sectionContainerWithoutMarginStyle}>
            <div className="text-left" style={titleContainerStyle}>
              <SectionTitle title="Strategic Focus Areas for AI Integration" />
            </div>
            
            <div style={paragraphContainerStyle}>
              <SectionParagraph>
                Based on my experience implementing AI systems across multiple development teams, 
                I&apos;ve identified six key focus areas that determine the success of AI integration:
              </SectionParagraph>
            </div>

            <div style={paragraphContainerStyle}>
              <SectionParagraph>
                Before diving into these focus areas, it&apos;s worth emphasizing that AI integration requires a strong foundation of engineering excellence. 
                The rise of AI tools doesn&apos;t diminish the importance of best practices—it magnifies it. 
                This perspective was powerfully articulated by another voice in the discussion:
              </SectionParagraph>
            </div>

            <div style={{...paragraphContainerStyle, marginLeft: '1.5rem', borderLeft: '3px solid #e0e0e0', paddingLeft: '1.5rem', marginBottom: '2rem'}}>
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
            </div>
            
            <div style={paragraphContainerStyle}>
              <SectionParagraph>
                This architect&apos;s insights align perfectly with what I&apos;ve observed in successful AI implementations. 
                With this foundation in mind, let&apos;s explore the six strategic focus areas that can transform how teams integrate AI tools, starting with establishing a knowledge foundation and progressing through implementation, people, and measurement:
              </SectionParagraph>
            </div>
            
            <FeatureGrid 
              features={strategicFocusAreasProps.features}
              columns={3}
              style="gradient-cards"
              animation="stagger-fade"
            />
            
            <div style={paragraphContainerTopMarginStyle}>
              <SectionParagraph>
                By focusing on these strategic areas, organizations can create a balanced approach that leverages AI&apos;s strengths 
                while maintaining the critical human elements of software development.
              </SectionParagraph>
            </div>
          </div>

          {/* Critical Warning Transition */}
          <div style={{
            width: '100%',
            padding: '2rem',
            marginTop: '3rem',
            backgroundColor: '#ffebee',
            borderLeft: '4px solid #f44336'
          }}>
            <div style={{ 
              width: '100%',
              maxWidth: '1000px', 
              margin: '0 auto'
            }}>
              <Typography variant="h3" weight="bold" className="mb-3">
                {leadershipBlueprintProps.warningTransition.title}
              </Typography>
              <Typography variant="body" weight="regular">
                {leadershipBlueprintProps.warningTransition.description}
              </Typography>
            </div>
          </div>
          
          {/* Leadership Blueprint Section */}
          <div style={sectionContainerTopMarginStyle}>
            <div className="text-left" style={titleContainerStyle}>
              <SectionTitle title={leadershipBlueprintProps.title} />
            </div>
            
            <div style={paragraphContainerStyle}>
              <SectionParagraph>
                {leadershipBlueprintProps.narrative.introduction}
              </SectionParagraph>
            </div>
            
            {/* First Quote with Context */}
            <div style={paragraphContainerStyle}>
              <div style={quoteHoverProps}>
                <div style={{ fontSize: '24px', color: 'var(--primary-blue)', position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                  <span style={{ fontFamily: 'Georgia, serif' }}>&ldquo;</span>
                </div>
                <div style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                  <SectionParagraph>
                    {leadershipBlueprintProps.narrative.quotes[0]}
                  </SectionParagraph>
                </div>
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.75rem', 
                  backgroundColor: '#e6f7ff', 
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}>
                  <strong>Context: </strong> 
                  AI proponents create unrealistic deadlines, then disappear when the tools aren't available.
                </div>
              </div>
            </div>
            
            {/* Narrative between quotes */}
            <div style={paragraphContainerStyle}>
              <SectionParagraph>
                Such overreach disrupts a key balance: developers—who understand software complexity—lose influence over timelines and 
                design decisions, while managers set aggressive deadlines based on AI's partial outputs. Another quote underscores how 
                deadlines ignore real effort:
              </SectionParagraph>
            </div>
            
            {/* Second Quote with Impact */}
            <div style={paragraphContainerStyle}>
              <div style={quoteHoverProps}>
                <div style={{ fontSize: '24px', color: 'var(--primary-blue)', position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                  <span style={{ fontFamily: 'Georgia, serif' }}>&ldquo;</span>
                </div>
                <div style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                  <SectionParagraph>
                    {leadershipBlueprintProps.narrative.quotes[1]}
                  </SectionParagraph>
                </div>
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.75rem', 
                  backgroundColor: '#e6f7ff', 
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}>
                  <strong>Impact: </strong> 
                  Developers are left to fix AI-generated code with the same unrealistic timelines.
                </div>
              </div>
            </div>
            
            {/* Narrative between quotes */}
            <div style={paragraphContainerStyle}>
              <SectionParagraph>
                This dynamic drains the joy from engineering. Developers end up debugging and polishing code they didn't fully create, 
                yet remain fully accountable for production-readiness:
              </SectionParagraph>
            </div>
            
            {/* Third Quote with Result */}
            <div style={paragraphContainerStyle}>
              <div style={quoteHoverProps}>
                <div style={{ fontSize: '24px', color: 'var(--primary-blue)', position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                  <span style={{ fontFamily: 'Georgia, serif' }}>&ldquo;</span>
                </div>
                <div style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                  <SectionParagraph>
                    {leadershipBlueprintProps.narrative.quotes[2]}
                  </SectionParagraph>
                </div>
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.75rem', 
                  backgroundColor: '#e6f7ff', 
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}>
                  <strong>Result: </strong> 
                  Developers lose ownership while retaining all responsibility for outcomes.
                </div>
              </div>
            </div>
            
            {/* Autopilot Explanation */}
            <div style={{
              marginBottom: SPACING.paragraphBreak,
              padding: '0',
              marginTop: '1rem'
            }}>
              <SectionParagraph>
                <strong>The Autopilot Connection:</strong> Just like autopilot in aviation, AI tools can greatly reduce the repetitive "flying" (writing boilerplate code) so the 
                pilot (developer) can focus on higher-level tasks—planning architecture, anticipating future issues, and ensuring 
                reliability. But if someone mistakes an AI or an autopilot for a "set-it-and-forget-it" tool, they risk both safety 
                and quality. As with flying, the pilot must train, monitor, and correct for any deviation, because autopilot doesn't 
                replace the pilot—it only assists.
              </SectionParagraph>
            </div>
            
            <div style={paragraphContainerStyle}>
              <SectionParagraph>
                {leadershipBlueprintProps.narrative.conclusion}
              </SectionParagraph>
            </div>
            
            <div className="text-left" style={{...titleContainerStyle, marginTop: '2rem'}}>
              <SectionSubtitle title={leadershipBlueprintProps.subtitle} />
            </div>
            
            {/* Blueprint Cards - Vertical Layout */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              width: '100%',
              margin: '2rem 0 3rem'
            }}>
              {leadershipBlueprintProps.blueprint.map((section, index) => (
                <div
                  key={index}
                  style={blueprintHoverProps}
                >
                  <div style={{
                    padding: '1.25rem',
                    backgroundColor: '#1976d2',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <Typography 
                      variant="h3" 
                      className="mb-0" 
                      color="light"
                      weight="bold"
                    >
                      {section.title}
                    </Typography>
                  </div>
                  <div style={{ padding: '1.5rem', backgroundColor: '#ffffff' }}>
                    {section.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        style={{
                          marginBottom: itemIndex < section.items.length - 1 ? '1.5rem' : 0
                        }}
                      >
                        <Typography variant="body" weight="bold" className="mb-2" color="primary">
                          {item.name}
                        </Typography>
                        <Typography variant="body" color="secondary">
                          {item.description}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bottom Line Box */}
            <div style={{
              marginTop: SPACING.paragraphBreak,
              padding: '1.5rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              borderLeft: '4px solid var(--accent-green)',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <Typography variant="h3" weight="bold" className="mb-3">
                Bottom Line
              </Typography>
              <SectionParagraph>
                {leadershipBlueprintProps.bottomLine}
              </SectionParagraph>
            </div>
          </div>
          
          {/* Process Flow Diagram Section */}
          <div style={sectionContainerTopMarginStyle}>
            <div style={paragraphContainerStyle}>
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
            </div>
            
            <div style={{
              ...mermaidContainerStyle,
              textAlign: 'center',
              display: 'block'
            }}>
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
            </div>
            
            <div style={paragraphContainerNoMarginStyle}>
              <SectionParagraph>
                This process flow directly aligns with our six strategic focus areas, showing how they integrate into a practical implementation plan.
                Starting with knowledge integration as the foundation, the flow incorporates each focus area in a logical sequence.
                Note the iterative nature with continuous feedback loops and clear decision points for refinement based on real-world results.
                This approach ensures AI integration remains human-directed, balancing engineering excellence with practical implementation.
              </SectionParagraph>
            </div>
          </div>
          
          {/* Conclusion Section */}
          <div style={sectionContainerSmallTopMarginStyle}>
            <div style={paragraphContainerStyle}>
              <SectionParagraph>
                The autopilot analogy provides a powerful framework for understanding AI&apos;s role in development. 
                Just as pilots remain essential despite advanced autopilot systems, developers remain the creative and strategic core of software development.
              </SectionParagraph>
            </div>
            
            <div>
              <SectionParagraph>
                In the next section, we&apos;ll explore how these principles are implemented in my comprehensive AI integration system: The Brain Garden.
              </SectionParagraph>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};