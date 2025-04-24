import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@shared-components/atoms/Icon';
import { InsightsSectionProps, Insight } from '../../RealWorldImpact.types';
import { InsightCard, MetricsGrid } from '../../RealWorldImpact.styles';
import { getIconName } from '../../RealWorldImpact.utils';

// Define icons for each insight type
const insightIcons: Record<string, string> = {
  'The Synergy Opportunity': 'puzzle',
  'Developer Empowerment': 'rocket',
  'Knowledge Preservation': 'database'
};

// Animation variants for container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

// Animation variants for individual cards
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  }
};

// Animation variants for metrics
const metricsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.4
    }
  }
};

export const InsightsSection: React.FC<InsightsSectionProps> = ({ insights }) => {
  if (!Array.isArray(insights) || insights.length === 0) {
    console.warn('No insights provided to InsightsSection');
    return null;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <MetricsGrid as={motion.div}>
        {insights.map((insight: Insight, index) => (
          <motion.div key={`${insight.title}-${index}`} variants={cardVariants}>
            <InsightCard
              as={motion.div}
              whileHover={{
                y: -10,
                boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.5 } }}
                >
                  <Icon
                    name={getIconName(insight.title, insightIcons)}
                    size={24}
                    style={{ marginRight: '0.75rem' }}
                  />
                </motion.div>
                <h3>{insight.title}</h3>
              </motion.div>

              <p>{insight.description}</p>

              <motion.div variants={metricsVariants}>
                <motion.p
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <strong>Before:</strong> {insight.metrics.before}
                </motion.p>
                <motion.p
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <strong>After:</strong> {insight.metrics.after}
                </motion.p>
                <motion.p
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <strong>Impact:</strong>
                  <motion.span
                    style={{ color: '#2196f3' }}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                  >
                    {insight.metrics.impact}
                  </motion.span>
                </motion.p>
              </motion.div>
            </InsightCard>
          </motion.div>
        ))}
      </MetricsGrid>
    </motion.div>
  );
}; 