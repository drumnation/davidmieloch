import React from 'react';
import { Typography } from '@shared-components/atoms/Typography';
import { ContentContainer, Section, SectionTitle, SectionDescription } from '../../RealWorldImpact.styles';
import { InsightsSection } from '../InsightsSection';
import { FrameworkSection } from '../FrameworkSection';
import { CurrentStateSection } from '../CurrentStateSection';
import { defaultContent } from '../../RealWorldImpact.constants';
import { useConclusionContentAnimation } from './ConclusionContent.hook';

export const ConclusionContent: React.FC = () => {
  const conclusion = defaultContent.conclusion;
  const { ref } = useConclusionContentAnimation();

  if (!conclusion) {
    console.error('Missing conclusion content');
    return null;
  }

  const { journeyInsights, framework, currentState } = conclusion.content;

  return (
    <div ref={ref}>
      <ContentContainer>
        <Section id="impact-conclusion-intro" style={{ scrollMarginTop: '100px' }}>
          <SectionTitle>{conclusion.title}</SectionTitle>
          <SectionDescription>{conclusion.subtitle}</SectionDescription>
          <Typography variant="body">
            {conclusion.description}
          </Typography>
        </Section>

        <Section id="impact-insights" style={{ scrollMarginTop: '100px' }}>
          <SectionTitle>{journeyInsights.title}</SectionTitle>
          <SectionDescription>
            <Typography variant="body">
              {journeyInsights.description}
            </Typography>
          </SectionDescription>
          <InsightsSection insights={journeyInsights.insights} />
        </Section>

        <Section id="impact-framework" style={{ scrollMarginTop: '100px' }}>
          <SectionTitle>{framework.title}</SectionTitle>
          <SectionDescription>
            <Typography variant="body">
              {framework.description}
            </Typography>
          </SectionDescription>
          <FrameworkSection components={framework.components} />
        </Section>

        <Section id="impact-current-state" style={{ scrollMarginTop: '100px', marginBottom: '6rem' }}>
          <SectionTitle>{currentState.title}</SectionTitle>
          <SectionDescription>
            <Typography variant="body">
              {currentState.description}
            </Typography>
          </SectionDescription>
          <CurrentStateSection sections={currentState.sections} />
        </Section>
      </ContentContainer>
    </div>
  );
}; 