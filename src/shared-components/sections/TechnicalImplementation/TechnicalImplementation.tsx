"use client";

import { FC } from 'react';
import { useSpring, useTrail, config, SpringValue } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { Hero } from '../../../shared-components/organisms/Hero';
import * as S from './TechnicalImplementation.styles';
import { TechnicalImplementationProps } from './TechnicalImplementation.types';
import { useTechnicalImplementation } from './TechnicalImplementation.hook';
import SystemOverview from './SystemOverview';

// Import components directly instead of from barrel
import { KnowledgeSystemSection } from './components/KnowledgeSystemSection';
import { AgentSystemSection } from './components/AgentSystemSection';
import { IntegrationSystemSection } from './components/IntegrationSystemSection';
import { SecurityControlSection } from './components/SecurityControlSection';
import { PerformanceScalabilitySection } from './components/PerformanceScalabilitySection';
import { ResultSection } from './components/ResultSection';

// Define types for animated components
type AnimatedDivProps = {
  style: {
    opacity: SpringValue<number>;
    transform?: SpringValue<string>;
  };
  children: React.ReactNode;
};

// Create a properly typed animated div component
const AnimatedDiv: FC<AnimatedDivProps> = ({ style, children }) => {
  return (
    <div style={{ 
      opacity: style.opacity.get(), 
      transform: style.transform?.get() 
    }}>
      {children}
    </div>
  );
};

const TechnicalImplementation: FC<TechnicalImplementationProps> = (props) => {
  const {
    className,
    title,
    subtitle,
    systemOverviewDiagram,
    agentSystemDiagram,
    integrationSystemDiagram,
    knowledgeFlowDiagram,
    performanceScalabilityDiagram,
    knowledgeSystem,
    agentSystem,
    integrationSystem,
    securityControl,
    performanceScalability,
    result,
    systemOverview
  } = useTechnicalImplementation(props);

  // Setup animation with IntersectionObserver
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    rootMargin: "-100px",
  });

  // Main content fade in animation
  const contentAnimation = useSpring({
    opacity: contentInView ? 1 : 0,
    config: { duration: 800 }
  });

  // Setup animation for child elements
  const childAnimations = useTrail(7, {
    opacity: contentInView ? 1 : 0,
    transform: contentInView ? 'translateY(0)' : 'translateY(30px)',
    config: { mass: 1, tension: 280, friction: 60 }
  });

  return (
    <S.Container className={className}>
      {/* Hero Section */}
      <Hero 
        title={title}
        subtitle={subtitle}
        background="image"
        backgroundImage="/brain-garden2.png"
        backgroundOverlay={true}
        overlayOpacity={0.6}
        pattern="none"
        textColor="light"
        animation="fade-up"
      />
      
      {/* Content Section with White Background */}
      <div ref={contentRef}>
        <div 
          style={{
            width: '100%',
            backgroundColor: '#fff',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            marginTop: '-24px',
            position: 'relative',
            zIndex: 2,
            paddingTop: '5rem',
            paddingBottom: '5rem',
            boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            opacity: contentInView ? 1 : 0,
            transition: 'opacity 800ms ease-out'
          }}
        >
          <S.SectionContent>
            <AnimatedDiv style={childAnimations[0]}>
              <SystemOverview 
                diagram={systemOverviewDiagram} 
                introduction={systemOverview?.introduction}
                promptExample={systemOverview?.promptExample}
                taskExample={systemOverview?.taskExample}
                githubExample={systemOverview?.githubExample}
              />
            </AnimatedDiv>

            <AnimatedDiv style={childAnimations[1]}>
              <KnowledgeSystemSection 
                knowledgeSystem={knowledgeSystem} 
                knowledgeFlowDiagram={knowledgeFlowDiagram} 
              />
            </AnimatedDiv>

            <AnimatedDiv style={childAnimations[2]}>
              <AgentSystemSection 
                agentSystem={agentSystem} 
                agentSystemDiagram={agentSystemDiagram} 
              />
            </AnimatedDiv>

            <AnimatedDiv style={childAnimations[3]}>
              <IntegrationSystemSection 
                integrationSystem={integrationSystem} 
                integrationSystemDiagram={integrationSystemDiagram} 
              />
            </AnimatedDiv>

            <AnimatedDiv style={childAnimations[4]}>
              <SecurityControlSection securityControl={securityControl} />
            </AnimatedDiv>

            <AnimatedDiv style={childAnimations[5]}>
              <PerformanceScalabilitySection 
                performanceScalability={performanceScalability}
                performanceScalabilityDiagram={performanceScalabilityDiagram}
              />
            </AnimatedDiv>

            <AnimatedDiv style={childAnimations[6]}>
              <ResultSection result={result} />
            </AnimatedDiv>
          </S.SectionContent>
        </div>
      </div>
    </S.Container>
  );
};

export default TechnicalImplementation;