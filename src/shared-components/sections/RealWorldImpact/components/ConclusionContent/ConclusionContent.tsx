import React from 'react';
import { Typography } from '../../../../atoms/Typography';
import { ContentContainer, Section, SectionTitle, SectionDescription } from '../../RealWorldImpact.styles';
import { InsightsSection } from '../InsightsSection';
import { FrameworkSection } from '../FrameworkSection';
import { CurrentStateSection } from '../CurrentStateSection';
import { CallToActionSection } from '../CallToActionSection';
import { defaultContent } from '../../RealWorldImpact.constants';
import { useConclusionContentAnimation } from './ConclusionContent.hook';

export const ConclusionContent: React.FC = () => {
  const conclusion = defaultContent.conclusion;
  const { ref } = useConclusionContentAnimation();

  if (!conclusion) {
    console.error('Missing conclusion content');
    return null;
  }

  const { journeyInsights, framework, currentState, callToAction } = conclusion.content;

  return (
    <div ref={ref}>
      <ContentContainer>
        <Section>
          <SectionTitle>{conclusion.title}</SectionTitle>
          <SectionDescription>{conclusion.subtitle}</SectionDescription>
          <Typography variant="body">
            {conclusion.description}
          </Typography>
        </Section>

        <Section>
          <SectionTitle>{journeyInsights.title}</SectionTitle>
          <SectionDescription>
            <Typography variant="body">
              {journeyInsights.description}
            </Typography>
          </SectionDescription>
          <InsightsSection insights={journeyInsights.insights} />
        </Section>

        <Section>
          <SectionTitle>{framework.title}</SectionTitle>
          <SectionDescription>
            <Typography variant="body">
              {framework.description}
            </Typography>
          </SectionDescription>
          <FrameworkSection components={framework.components} />
        </Section>

        <Section>
          <SectionTitle>{currentState.title}</SectionTitle>
          <SectionDescription>
            <Typography variant="body">
              {currentState.description}
            </Typography>
          </SectionDescription>
          <CurrentStateSection sections={currentState.sections} />
        </Section>

        <Section>
          <SectionTitle>{callToAction.title}</SectionTitle>
          <SectionDescription>
            <Typography variant="body">
              {callToAction.description}
            </Typography>
          </SectionDescription>
          <CallToActionSection 
            actions={callToAction.actions} 
            closing={callToAction.closing} 
          />
        </Section>
      </ContentContainer>
    </div>
  );
}; 