"use client";

import React from 'react';
import { Hero } from '../../organisms/Hero';
import { Typography } from '../../atoms/Typography';
import { RealWorldImpactProps, ConclusionContent as ConclusionContentType } from './RealWorldImpact.types';
import { Container, ContentSection, ContentContainer } from './RealWorldImpact.styles';
import { defaultContent } from './RealWorldImpact.constants';
import styled from 'styled-components';

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled(Typography)`
  margin-bottom: 1rem;
`;

const SectionDescription = styled(Typography)`
  margin-bottom: 1.5rem;
`;

const InsightCard = styled.div`
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: 1rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  text-decoration: none;
  margin-right: 1rem;
  margin-bottom: 1rem;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const ConclusionContent: React.FC<{ content: ConclusionContentType }> = ({ content }) => {
  return (
    <>
      {/* Journey Insights Section */}
      <Section>
        <SectionTitle variant="h3">{content.journeyInsights.title}</SectionTitle>
        <SectionDescription variant="body">{content.journeyInsights.description}</SectionDescription>
        {content.journeyInsights.insights.map((insight, index) => (
          <InsightCard key={index}>
            <Typography variant="h3">{insight.title}</Typography>
            <Typography variant="body">{insight.description}</Typography>
            <Typography variant="body">Before: {insight.metrics.before}</Typography>
            <Typography variant="body">After: {insight.metrics.after}</Typography>
            <Typography variant="body">Impact: {insight.metrics.impact}</Typography>
          </InsightCard>
        ))}
      </Section>

      {/* Framework Section */}
      <Section>
        <SectionTitle variant="h3">{content.framework.title}</SectionTitle>
        <SectionDescription variant="body">{content.framework.description}</SectionDescription>
        {content.framework.components.map((component, index) => (
          <InsightCard key={index}>
            <Typography variant="h3">{component.title}</Typography>
            <FeatureList>
              {component.features.map((feature, featureIndex) => (
                <FeatureItem key={featureIndex}>
                  <Typography variant="body">{feature}</Typography>
                </FeatureItem>
              ))}
            </FeatureList>
          </InsightCard>
        ))}
      </Section>

      {/* Current State Section */}
      <Section>
        <SectionTitle variant="h3">{content.currentState.title}</SectionTitle>
        <SectionDescription variant="body">{content.currentState.description}</SectionDescription>
        {content.currentState.sections.map((section, index) => (
          <InsightCard key={index}>
            <Typography variant="h3">{section.title}</Typography>
            <FeatureList>
              {section.points.map((point, pointIndex) => (
                <FeatureItem key={pointIndex}>
                  <Typography variant="body">{point}</Typography>
                </FeatureItem>
              ))}
            </FeatureList>
          </InsightCard>
        ))}
      </Section>

      {/* Call to Action Section */}
      <Section>
        <SectionTitle variant="h3">{content.callToAction.title}</SectionTitle>
        <SectionDescription variant="body">{content.callToAction.description}</SectionDescription>
        <div>
          {content.callToAction.actions.map((action, index) => (
            <ActionButton key={index} href={action.link}>
              {action.label}
            </ActionButton>
          ))}
        </div>
        <Typography variant="body">{content.callToAction.closing}</Typography>
      </Section>
    </>
  );
};

export const RealWorldImpact: React.FC<RealWorldImpactProps> = ({
  className,
  heroProps = defaultContent.hero,
  conclusionProps = defaultContent.conclusion,
}) => {
  // Ensure required Hero props are present
  if (!heroProps?.title) {
    return null;
  }

  const enhancedHeroProps = {
    title: heroProps.title,
    subtitle: heroProps.subtitle,
    description: heroProps.description,
    background: heroProps.background,
    backgroundImage: heroProps.backgroundImage,
    backgroundOverlay: heroProps.backgroundOverlay,
    overlayOpacity: heroProps.overlayOpacity,
    textColor: heroProps.textColor,
    callToAction: heroProps.callToAction,
    metrics: heroProps.metrics
  };

  return (
    <Container className={className}>
      <Hero {...enhancedHeroProps} />

      <ContentSection>
        <ContentContainer>
          {conclusionProps && (
            <div>
              <Typography variant="h2">{conclusionProps.title}</Typography>
              <Typography variant="h3">{conclusionProps.subtitle}</Typography>
              <Typography variant="body" mb={2}>{conclusionProps.description}</Typography>
              <ConclusionContent content={conclusionProps.content} />
            </div>
          )}
        </ContentContainer>
      </ContentSection>
    </Container>
  );
}; 