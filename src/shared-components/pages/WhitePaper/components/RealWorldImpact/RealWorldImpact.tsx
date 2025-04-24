"use client";

import React, { useState, useEffect } from 'react';
import { animated } from '@react-spring/web';
import { Hero } from '@shared-components/organisms/Hero';
import { RealWorldImpactProps } from './RealWorldImpact.types';
import { ContentSection, ActionGrid, InsightCard, ClosingContainer } from './RealWorldImpact.styles';
import { defaultContent } from './RealWorldImpact.constants';
import { useRealWorldImpactAnimation } from './RealWorldImpact.hook';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SpinnerLoader } from '@shared-components/atoms/SpinnerLoader';
import { ConclusionContent } from './components/ConclusionContent';
import { motion } from 'framer-motion';
import { Button } from '@shared-components/atoms/Button';
import { FaRocket, FaCalendarAlt, FaHandshake } from 'react-icons/fa';

// Temporarily removed GlobalStyles import since it's causing theme issues
// import { GlobalStyles } from './RealWorldImpact.styles';

// Animation variants
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  }
};

export const RealWorldImpact: React.FC<RealWorldImpactProps> = ({
  heroProps = defaultContent.hero,
  className
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { ref, fadeIn } = useRealWorldImpactAnimation();

  // Add console.log for debugging
  useEffect(() => {
    console.log('RealWorldImpact rendering with heroProps:', heroProps);
  }, [heroProps]);

  useEffect(() => {
    // Simulate loading time or fetch data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <SpinnerLoader text="Loading impact data..." />
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        <h2>Error Loading Component</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  // Safety check for heroProps
  if (!heroProps || typeof heroProps !== 'object') {
    console.error('Invalid heroProps provided to RealWorldImpact:', heroProps);
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        <h2>Error: Invalid Hero Props</h2>
        <p>Could not render RealWorldImpact due to invalid hero properties.</p>
      </div>
    );
  }

  const callToActionData = {
    actions: defaultContent.enterpriseJourney.statsGrid.stats.map(stat => ({
      label: stat.label,
      description: `Improve your team's ${stat.label.toLowerCase()} metrics with Brain Garden's systematic approach.`,
      icon: stat.icon,
      link: '/contact'
    })),
    closing: "Ready to bring AI-powered development to your organization? Contact us to learn more about how Brain Garden can transform your team's productivity."
  };

  const getIconForAction = (icon: string) => {
    if (icon.includes('rocket')) return <FaRocket size={24} />;
    if (icon.includes('calendar')) return <FaCalendarAlt size={24} />;
    if (icon.includes('handshake')) return <FaHandshake size={24} />;
    return <FaRocket size={24} />;
  };

  try {
    return (
      <ErrorBoundary>
        <animated.div ref={ref} style={fadeIn} className={className}>
          {/* GlobalStyles removed temporarily */}
          <div id="impact-hero" style={{ scrollMarginTop: '100px' }}>
            <Hero {...heroProps} />
          </div>
          <ContentSection id="impact-conclusion">
            <ConclusionContent />
          </ContentSection>
          <ContentSection id="impact-cta">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              <ActionGrid>
                {callToActionData.actions.map((action, index) => (
                  <motion.div key={`${action.label}-${index}`} variants={cardVariants}>
                    <InsightCard
                      as={motion.div}
                      whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="CallToActionSection__IconWrapper" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                        color: 'var(--mantine-color-blue-6)'
                      }}>
                        {getIconForAction(action.icon || '')}
                      </div>
                      <h3>{action.label}</h3>
                      <p>{action.description}</p>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="primary"
                          href={action.link || "#"}
                        >
                          Learn More
                        </Button>
                      </motion.div>
                    </InsightCard>
                  </motion.div>
                ))}
              </ActionGrid>
            </motion.div>
            <ClosingContainer
              as={motion.div}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                type: 'spring',
                stiffness: 100
              }}
            >
              <h3>Ready to Transform Your Development Process?</h3>
              <p>{callToActionData.closing}</p>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.8 }
                }}
              >
                <Button
                  variant="primary"
                  href="/contact"
                  size="lg"
                >
                  Start Your AI Journey Today
                </Button>
              </motion.div>
            </ClosingContainer>
          </ContentSection>
        </animated.div>
      </ErrorBoundary>
    );
  } catch (err) {
    console.error('Error rendering RealWorldImpact:', err);
    setError(err instanceof Error ? err : new Error('Unknown error rendering component'));
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        <h2>Rendering Error</h2>
        <p>An unexpected error occurred while rendering the component.</p>
      </div>
    );
  }
}; 