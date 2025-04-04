import React from 'react';
import { FeatureGrid } from '../../../../organisms/FeatureGrid/FeatureGrid';
import { SectionTitle, SectionParagraph } from '../ui-components';
import { 
  titleContainerStyle, 
  paragraphContainerStyle, 
  paragraphContainerTopMarginStyle,
  sectionContainerWithoutMarginStyle
} from '../../AiAutopilotAnalogy.styles';

interface StrategicFocusSectionProps {
  features: Array<{
    title: string;
    description: string;
    iconName: string;
  }>;
  className?: string;
}

export const StrategicFocusSection: React.FC<StrategicFocusSectionProps> = ({
  features,
  className
}) => {
  // Transform features to include Icon components
  const transformedFeatures = features.map(feature => ({
    ...feature,
    icon: null // This will be handled by the FeatureGrid component
  }));

  return (
    <div className={className} style={sectionContainerWithoutMarginStyle}>
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
        features={transformedFeatures}
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
  );
}; 