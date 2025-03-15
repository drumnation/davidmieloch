"use client";

import { FC } from 'react';
import { motion } from 'framer-motion';
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
    result
  } = useTechnicalImplementation(props);

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
      <S.ContentSection
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={S.fadeIn}
      >
        <S.SectionContent
          variants={S.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={S.fadeInUp}>
            <SystemOverview diagram={systemOverviewDiagram} />
          </motion.div>

          <motion.div variants={S.fadeInUp}>
            <KnowledgeSystemSection 
              knowledgeSystem={knowledgeSystem} 
              knowledgeFlowDiagram={knowledgeFlowDiagram} 
            />
          </motion.div>

          <motion.div variants={S.fadeInUp}>
            <AgentSystemSection 
              agentSystem={agentSystem} 
              agentSystemDiagram={agentSystemDiagram} 
            />
          </motion.div>

          <motion.div variants={S.fadeInUp}>
            <IntegrationSystemSection 
              integrationSystem={integrationSystem} 
              integrationSystemDiagram={integrationSystemDiagram} 
            />
          </motion.div>

          <motion.div variants={S.fadeInUp}>
            <SecurityControlSection securityControl={securityControl} />
          </motion.div>

          <motion.div variants={S.fadeInUp}>
            <PerformanceScalabilitySection 
              performanceScalability={performanceScalability}
              performanceScalabilityDiagram={performanceScalabilityDiagram}
            />
          </motion.div>

          <motion.div variants={S.fadeInUp}>
            <ResultSection result={result} />
          </motion.div>
        </S.SectionContent>
      </S.ContentSection>
    </S.Container>
  );
};

export default TechnicalImplementation;