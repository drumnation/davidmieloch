import React from 'react';
import { animated } from '@react-spring/web';
import { Icon } from '../../../../atoms/Icon/Icon';
import { InsightsSectionProps, Insight } from '../../RealWorldImpact.types';
import { InsightCard, MetricsGrid } from '../../RealWorldImpact.styles';
import { useInsightsSectionAnimation } from './InsightsSection.hook';
import { getIconName } from '../../RealWorldImpact.utils';

// Define icons for each insight type
const insightIcons: Record<string, string> = {
  'The Synergy Opportunity': 'puzzle',
  'Developer Empowerment': 'rocket',
  'Knowledge Preservation': 'database'
};

export const InsightsSection: React.FC<InsightsSectionProps> = ({ insights }) => {
  const { ref, animation } = useInsightsSectionAnimation();

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
                name={getIconName(insight.title, insightIcons)}
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