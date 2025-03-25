"use client";

import React from 'react';
import { Hero } from '../../organisms/Hero';
import { Typography } from '../../atoms/Typography';
import { RealWorldImpactProps, ConclusionContent as ConclusionContentType } from './RealWorldImpact.types';
import { Container, ContentSection, ContentContainer } from './RealWorldImpact.styles';
import { defaultContent } from './RealWorldImpact.constants';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const Section = styled.section<{ $inView?: boolean }>`
  margin-bottom: 3rem;
  opacity: ${({ $inView }) => ($inView ? 1 : 0)};
  transform: translateY(${({ $inView }) => ($inView ? '0' : '20px')});
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
`;

const SectionTitle = styled(Typography)`
  margin-bottom: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const SectionDescription = styled(Typography)`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 800px;
`;

const InsightCard = styled.div<{ $delay: number }>`
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  animation: fadeSlideIn 0.6s ease-out forwards;
  animation-delay: ${({ $delay }) => $delay * 0.2}s;

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.elevated};
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const MetricItem = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background.subtle};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
  }
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.text.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.dark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.button};
  }

  &:active {
    transform: translateY(0);
  }
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ClosingMessage = styled(Typography)`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.primary};
  max-width: 800px;
  margin: 2rem auto;
  text-align: center;
  font-weight: 500;
`;

const ConclusionContent: React.FC<{ content: ConclusionContentType }> = ({ content }) => {
  const [journeyRef, journeyInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [frameworkRef, frameworkInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [currentRef, currentInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [actionRef, actionInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <>
      {/* Journey Insights Section */}
      <Section ref={journeyRef} $inView={journeyInView}>
        <SectionTitle variant="h2" weight="bold">{content.journeyInsights.title}</SectionTitle>
        <SectionDescription variant="body">{content.journeyInsights.description}</SectionDescription>
        {content.journeyInsights.insights.map((insight, index) => (
          <InsightCard key={index} $delay={index}>
            <Typography variant="h3" weight="bold" color="primary" mb={1}>{insight.title}</Typography>
            <Typography variant="body" color="secondary" mb={2}>{insight.description}</Typography>
            <MetricsGrid>
              <MetricItem>
                <Typography variant="body" weight="bold" color="primary">Before</Typography>
                <Typography variant="body" color="secondary">{insight.metrics.before}</Typography>
              </MetricItem>
              <MetricItem>
                <Typography variant="body" weight="bold" color="primary">After</Typography>
                <Typography variant="body" color="secondary">{insight.metrics.after}</Typography>
              </MetricItem>
              <MetricItem>
                <Typography variant="body" weight="bold" color="primary">Impact</Typography>
                <Typography variant="body" color="secondary">{insight.metrics.impact}</Typography>
              </MetricItem>
            </MetricsGrid>
          </InsightCard>
        ))}
      </Section>

      {/* Framework Section */}
      <Section ref={frameworkRef} $inView={frameworkInView}>
        <SectionTitle variant="h2" weight="bold">{content.framework.title}</SectionTitle>
        <SectionDescription variant="body">{content.framework.description}</SectionDescription>
        {content.framework.components.map((component, index) => (
          <InsightCard key={index} $delay={index}>
            <Typography variant="h3" weight="bold" color="primary" mb={1}>{component.title}</Typography>
            <FeatureList>
              {component.features.map((feature, featureIndex) => (
                <FeatureItem key={featureIndex}>
                  <Typography variant="body" color="secondary">{feature}</Typography>
                </FeatureItem>
              ))}
            </FeatureList>
          </InsightCard>
        ))}
      </Section>

      {/* Current State Section */}
      <Section ref={currentRef} $inView={currentInView}>
        <SectionTitle variant="h2" weight="bold">{content.currentState.title}</SectionTitle>
        <SectionDescription variant="body">{content.currentState.description}</SectionDescription>
        {content.currentState.sections.map((section, index) => (
          <InsightCard key={index} $delay={index}>
            <Typography variant="h3" weight="bold" color="primary" mb={1}>{section.title}</Typography>
            <FeatureList>
              {section.points.map((point, pointIndex) => (
                <FeatureItem key={pointIndex}>
                  <Typography variant="body" color="secondary">{point}</Typography>
                </FeatureItem>
              ))}
            </FeatureList>
          </InsightCard>
        ))}
      </Section>

      {/* Call to Action Section */}
      <Section ref={actionRef} $inView={actionInView}>
        <SectionTitle variant="h2" weight="bold">{content.callToAction.title}</SectionTitle>
        <SectionDescription variant="body">{content.callToAction.description}</SectionDescription>
        <ActionGrid>
          {content.callToAction.actions.map((action, index) => (
            <ActionButton key={index} href={action.link}>
              {action.label}
            </ActionButton>
          ))}
        </ActionGrid>
        <ClosingMessage variant="body">{content.callToAction.closing}</ClosingMessage>
      </Section>
    </>
  );
};

export const RealWorldImpact: React.FC<RealWorldImpactProps> = ({
  className,
  heroProps = defaultContent.hero,
  conclusionProps = defaultContent.conclusion,
}) => {
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
              <Typography variant="h1" weight="bold" color="primary" mb={1}>{conclusionProps.title}</Typography>
              <Typography variant="h2" color="secondary" mb={2}>{conclusionProps.subtitle}</Typography>
              <Typography variant="body" color="secondary" mb={4}>{conclusionProps.description}</Typography>
              <ConclusionContent content={conclusionProps.content} />
            </div>
          )}
        </ContentContainer>
      </ContentSection>
    </Container>
  );
}; 