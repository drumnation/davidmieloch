"use client";

import React, { useEffect } from 'react';
import { Hero } from '../../organisms/Hero';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icon/Icon';
import type { 
  RealWorldImpactProps,
  InsightsSectionProps,
  FrameworkSectionProps,
  StateSectionProps,
  CallToActionSectionProps,
  Insight,
  FrameworkComponent,
  StateSection,
  Action
} from './RealWorldImpact.types';
import { FeatureGrid } from '../../organisms/FeatureGrid/FeatureGrid';
import type { FeatureGridProps } from '../../organisms/FeatureGrid/FeatureGrid.types';
import {
  GlobalStyles,
  containerStyle,
  Section,
  SectionTitle,
  SectionDescription,
  InsightCard,
  MetricsGrid,
  MetricItem,
  FeatureList,
  FeatureItem,
  ActionButton,
  ActionGrid,
  ClosingMessage,
  QuoteBox,
  QuoteContext,
  BlueprintCard,
  BlueprintHeader,
  BlueprintContent,
  BottomLineBox,
  WarningBox,
  WarningContent,
  ContentSection,
  ContentContainer
} from './RealWorldImpact.styles';
import { defaultContent } from './RealWorldImpact.constants';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated, config } from '@react-spring/web';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('RealWorldImpact Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <WarningBox>
          <WarningContent>
            <h3>Something went wrong</h3>
            <p>We're sorry, but there was an error loading this section.</p>
            {process.env.NODE_ENV === 'development' && (
              <pre>{this.state.error?.message}</pre>
            )}
          </WarningContent>
        </WarningBox>
      );
    }

    return this.props.children;
  }
}

const InsightsSection: React.FC<InsightsSectionProps> = ({ insights }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const animation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { 
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0px)' : 'translateY(20px)'
    },
    config: { ...config.gentle },
    reset: false
  });

  // Define icons for each insight type with proper typing
  const insightIcons: Record<string, string> = {
    'The Synergy Opportunity': 'puzzle',
    'Developer Empowerment': 'rocket',
    'Knowledge Preservation': 'database'
  };

  const getIconName = (title: string): string => {
    return insightIcons[title] || 'star';
  };

  if (!Array.isArray(insights) || insights.length === 0) {
    console.warn('No insights provided to InsightsSection');
    return null;
  }

  return (
    <animated.div ref={ref} style={animation}>
      <MetricsGrid>
        {insights.map((insight: Insight, index) => (
          <InsightCard key={`${insight.title}-${index}`}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <Icon 
                name={getIconName(insight.title)}
                size={24} 
                style={{ marginRight: '0.75rem' }} 
              />
              <h3>{insight.title}</h3>
            </div>
            <p>{insight.description}</p>
            <div>
              <p><strong>Before:</strong> {insight.metrics.before}</p>
              <p><strong>After:</strong> {insight.metrics.after}</p>
              <p><strong>Impact:</strong> <span style={{ color: '#2196f3' }}>{insight.metrics.impact}</span></p>
            </div>
          </InsightCard>
        ))}
      </MetricsGrid>
    </animated.div>
  );
};

const FrameworkSection: React.FC<FrameworkSectionProps> = ({ components }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const animation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { 
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0px)' : 'translateY(20px)'
    },
    config: { ...config.gentle },
    reset: false
  });

  if (!Array.isArray(components) || components.length === 0) {
    console.warn('No components provided to FrameworkSection');
    return null;
  }

  // Dynamically determine the number of columns based on component count
  // making sure to return one of the valid column types (2, 3, or 4)
  const getColumnCount = (featureCount: number): 2 | 3 | 4 => {
    if (featureCount <= 2) return 2;
    if (featureCount >= 4) return 4;
    return 3;
  };

  return (
    <animated.div ref={ref} style={animation}>
      {components.map((component: FrameworkComponent, index) => {
        const columnCount = getColumnCount(component.features.length);
        
        return (
          <div key={`${component.title}-${index}`}>
            <h3>{component.title}</h3>
            <FeatureGrid
              features={component.features.map(feature => {
                // Handle both string features and object features with keyword/description
                if (typeof feature === 'string') {
                  return {
                    title: '',
                    description: feature,
                    icon: component.icon ? <Icon name={component.icon} size={24} /> : undefined
                  };
                } else {
                  return {
                    title: feature.keyword,
                    description: feature.description,
                    icon: component.icon ? <Icon name={component.icon} size={24} /> : undefined
                  };
                }
              })}
              columns={columnCount}
              style="accent-cards"
              animation="none"
            />
          </div>
        );
      })}
    </animated.div>
  );
};

const CurrentStateSection: React.FC<StateSectionProps> = ({ sections }) => {
  if (!Array.isArray(sections) || sections.length === 0) {
    console.warn('No sections provided to CurrentStateSection');
    return null;
  }

  // Dynamically set the number of columns based on the number of items
  // Use 2 columns if there are only 2 sections to avoid empty spaces
  const columnCount: 2 | 3 | 4 = sections.length === 2 ? 2 : 3;

  return (
    <>
      {sections.map((section: StateSection, index) => (
        <div key={`${section.title}-${index}`}>
          <h3>{section.title}</h3>
          <FeatureGrid
            features={section.points.map(point => {
              // Handle both string points and object points with keyword/description
              if (typeof point === 'string') {
                return {
                  title: '',
                  description: point,
                  icon: section.icon ? <Icon name={section.icon} size={24} /> : undefined
                };
              } else {
                return {
                  title: point.keyword,
                  description: point.description,
                  icon: section.icon ? <Icon name={section.icon} size={24} /> : undefined
                };
              }
            })}
            columns={columnCount}
            style="accent-cards"
            animation="none"
          />
        </div>
      ))}
    </>
  );
};

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ actions, closing }) => {
  if (!Array.isArray(actions) || actions.length === 0) {
    console.warn('No actions provided to CallToActionSection');
    return null;
  }

  // Calculate grid template columns based on number of actions
  // This ensures proper layout with no empty spaces
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: actions.length === 2 ? '1fr 1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  };

  return (
    <>
      <div style={gridStyle}>
        {actions.map((action: Action, index) => (
          <InsightCard key={`${action.label}-${index}`}>
            <h3>{action.label}</h3>
            <p>{action.description}</p>
          </InsightCard>
        ))}
      </div>
      <BottomLineBox>
        <h3>Ready to Transform Your Development Process?</h3>
        <p>{closing}</p>
      </BottomLineBox>
    </>
  );
};

const ConclusionContent: React.FC = () => {
  const conclusion = defaultContent.conclusion;

  if (!conclusion) {
    console.error('Missing conclusion content');
    return null;
  }

  const { journeyInsights, framework, currentState, callToAction } = conclusion.content;

  // Keep the ref for potential future use, but don't use it for animations yet
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Remove the animation to break the circular dependency
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
          <CallToActionSection actions={callToAction.actions} closing={callToAction.closing} />
        </Section>
      </ContentContainer>
    </div>
  );
};

export const RealWorldImpact: React.FC<RealWorldImpactProps> = ({ 
  heroProps = defaultContent.hero,
  className
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: inView ? 1 : 0 },
    config: { ...config.gentle },
    reset: false
  });

  return (
    <ErrorBoundary>
      <animated.div ref={ref} style={fadeIn} className={className}>
        <GlobalStyles />
        <Hero {...heroProps} />
        <ContentSection>
          <ConclusionContent />
        </ContentSection>
      </animated.div>
    </ErrorBoundary>
  );
}; 