"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLightbulb, 
  FaExclamationTriangle, 
  FaCode, 
  FaBrain, 
  FaRocket, 
  FaChartLine, 
  FaClock, 
  FaUserCog, 
  FaBug, 
  FaTools, 
  FaCogs, 
  FaUsers,
  FaBuilding,
  FaTrophy,
  FaDatabase,
  FaClipboardCheck,
  FaFileAlt,
  FaNetworkWired,
  FaSyncAlt,
  FaProjectDiagram,
  FaArrowAltCircleUp,
  FaHandshake,
  FaChartBar,
  FaCheckCircle,
  FaSearch,
  FaCubes,
  FaComments,
  FaTasks,
  FaThumbsUp,
  FaStar
} from 'react-icons/fa';
import { Hero } from '../../organisms/Hero/Hero';
import { ProblemOverview } from '../../organisms/ProblemOverview/ProblemOverview';
import { ChallengeBreakdown } from '../../organisms/ChallengeBreakdown/ChallengeBreakdown';
import { Typography } from '../../atoms/Typography/Typography';
import { RealWorldImpactProps } from './RealWorldImpact.types';
import * as S from './RealWorldImpact.styles';
import { fadeIn, fadeInUp, staggerContainer } from './RealWorldImpact.animations';
import { defaultContent } from './RealWorldImpact.constants';
import { 
  enhanceHeroProps, 
  enhanceProblemOverviewProps, 
  enhanceChallengeBreakdownProps,
  enhanceProcessFlowProps,
  enhanceStatsComparisonProps,
  enhanceDebtAnalysisProps,
  enhanceCycleDiagramProps,
  enhanceProblemSolutionProps,
  enhanceImpactGridProps,
  enhanceNavigationCardProps,
  enhanceEnterpriseJourneyProps,
  enhanceSolutionsImpactProps,
} from './RealWorldImpact.logic';
import { ProcessFlow } from '../../organisms/ProcessFlow/ProcessFlow';
import { StatsComparison } from '../../organisms/StatsComparison/StatsComparison';
import { DebtAnalysis } from '../../organisms/DebtAnalysis/DebtAnalysis';
import { MermaidDiagram } from '../../molecules/MermaidDiagram/MermaidDiagram';
import { ProblemSolution } from '../../organisms/ProblemSolution/ProblemSolution';
import { ImpactGrid } from '../../organisms/ImpactGrid/ImpactGrid';
import { NavigationCard } from '../../organisms/NavigationCard/NavigationCard';
import { SuccessStory } from '../../organisms/SuccessStory';
import { ComparisonGrid } from '../../organisms/ComparisonGrid';
import { CaseStudy } from '../../organisms/CaseStudy';
import { Button } from '../../atoms/Button';
import { QuoteGrid } from '../../organisms/QuoteGrid';
import { ProblemCards } from '../../organisms/ProblemCards';
import { SolutionCards } from '../../organisms/SolutionCards';
import { ContactCard } from '../../organisms/ContactCard';

// Transform function near the top of the component to convert case studies to the expected format
const adaptCaseStudies = (caseStudies: any[] = []) => {
  if (!caseStudies || caseStudies.length === 0) return [];
  
  return caseStudies.map(study => ({
    title: study.company || study.title || '',
    challenge: study.challenge || '',
    solution: study.solution || '',
    results: study.results || [],
    quote: study.quote || '',
    style: 'gradient-card',
    position: 'center'
  }));
};

// Transform function to adapt metrics to the expected format
const adaptMetrics = (metrics: any[] = []) => {
  if (!metrics || metrics.length === 0) return [];
  
  return metrics.map(metric => ({
    number: metric.number || '',
    label: metric.label || '',
    prefix: metric.prefix,
    suffix: metric.suffix,
    animation: metric.animation
  }));
};

export const RealWorldImpact: React.FC<RealWorldImpactProps> = ({
  className,
  heroProps = defaultContent.hero,
  problemOverviewProps = defaultContent.problemOverview,
  challengeBreakdownProps = defaultContent.challengeBreakdown,
  processFlowProps = defaultContent.processFlow,
  statsComparisonProps = defaultContent.statsComparison,
  debtAnalysisProps = defaultContent.debtAnalysis,
  cycleDiagramProps = defaultContent.cycleDiagram,
  problemSolutionProps = defaultContent.problemSolution,
  impactGridProps = defaultContent.impactGrid,
  navigationCardProps = defaultContent.navigationCard,
  enterpriseJourneyProps = defaultContent.enterpriseJourney,
  solutionsImpactProps = defaultContent.solutionsImpact,
  commonPitfallsProps = defaultContent.commonPitfalls,
  brainGardenSolutionsProps = defaultContent.brainGardenSolutions,
  conclusionProps = defaultContent.conclusion,
}) => {
  // Enhance props with consistent styling and defaults
  const enhancedHeroProps = enhanceHeroProps(heroProps);
  const enhancedProblemOverviewProps = enhanceProblemOverviewProps(problemOverviewProps);
  const enhancedChallengeBreakdownProps = enhanceChallengeBreakdownProps(challengeBreakdownProps);
  const enhancedProcessFlowProps = enhanceProcessFlowProps(processFlowProps);
  const enhancedStatsComparisonProps = enhanceStatsComparisonProps(statsComparisonProps);
  const enhancedDebtAnalysisProps = enhanceDebtAnalysisProps(debtAnalysisProps);
  const enhancedCycleDiagramProps = enhanceCycleDiagramProps(cycleDiagramProps);
  const enhancedProblemSolutionProps = enhanceProblemSolutionProps(problemSolutionProps);
  const enhancedImpactGridProps = enhanceImpactGridProps(impactGridProps);
  const enhancedNavigationCardProps = enhanceNavigationCardProps(navigationCardProps);
  const enhancedEnterpriseJourneyProps = enhanceEnterpriseJourneyProps(enterpriseJourneyProps);
  
  // For solutions impact props
  const enhancedSolutionsImpactProps = solutionsImpactProps ? {
    ...enhanceSolutionsImpactProps(solutionsImpactProps)
  } : undefined;

  return (
    <AnimatePresence mode="wait">
      <S.Container className={className} key="real-world-impact-content">
        {/* Hero Section */}
        <Hero {...enhancedHeroProps} />
      
        {/* Content Section with White Background */}
        <S.ContentSection
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          {/* Introduction Section */}
          <S.ContentContainer
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="text-left"
              style={{ marginBottom: S.SPACING.paragraph }}
              variants={fadeInUp}
            >
              <S.Paragraph>
                I developed Brain Garden, a unified, context-aware AI system, to address the critical challenges I observed firsthand in enterprise software development. This system integrates directly into the development workflow, resulting in demonstrably faster development cycles, higher-quality code, and improved team collaboration. This document outlines the core problems, my solution, and the tangible results achieved.
              </S.Paragraph>
            </motion.div>

            <motion.div
              className="text-left"
              style={{ marginBottom: S.SPACING.paragraph }}
              variants={fadeInUp}
            >
              <Typography variant="h2" className="mb-4">
                <FaBrain style={{ marginRight: '10px' }} /> The Modern Development Paradox
              </Typography>
              <S.Paragraph>
                In today&apos;s enterprise development landscape, we face a striking paradox: despite having more tools and technologies at our disposal than ever before, development teams are struggling with increasing complexity, slower delivery times, and mounting technical debt. This isn&apos;t just a matter of tools or processes—it&apos;s a fundamental crisis in how we approach software development at scale and where AI can be the key to the solution.
              </S.Paragraph>
            </motion.div>

            {/* Problem Overview Component */}
            <S.ComponentWrapper position={enhancedProblemOverviewProps.position}>
              <ProblemOverview {...enhancedProblemOverviewProps} />
            </S.ComponentWrapper>

            <motion.div variants={fadeInUp}>
              <Typography variant="h2" className="mb-4">
                <FaExclamationTriangle style={{ marginRight: '10px' }} /> The Four Critical Challenges
              </Typography>
              <S.Paragraph>
                Enterprise development teams face four interconnected challenges that create a cycle of diminishing returns. Understanding these challenges is crucial to appreciating why traditional solutions fall short and why a fundamentally new approach is needed.
              </S.Paragraph>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography variant="h3" className="mb-3">
                <FaDatabase style={{ marginRight: '10px' }} /> 1. Knowledge Management Crisis
              </Typography>
              <S.Paragraph>
                The most pressing challenge in enterprise development isn&apos;t technical—it&apos;s cognitive. As systems grow in complexity, the knowledge required to maintain and evolve them grows exponentially. This creates several critical issues:
              </S.Paragraph>
            </motion.div>

            {/* Challenge Breakdown Component */}
            <S.ComponentWrapper position={enhancedChallengeBreakdownProps.position}>
              <ChallengeBreakdown {...enhancedChallengeBreakdownProps} />
            </S.ComponentWrapper>

            <motion.div variants={fadeInUp}>
              <S.Paragraph>
                <FaClock style={{ marginRight: '10px', float: 'left', fontSize: '1.5rem' }} />
                The real cost isn&apos;t just in delayed development—it&apos;s in the constant drain on team resources as developers repeatedly solve the same problems, navigate outdated documentation, and struggle to maintain context across complex systems.
              </S.Paragraph>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography variant="h3" className="mb-3">
                <FaRocket style={{ marginRight: '10px' }} /> 2. Development Velocity Crisis
              </Typography>
              <S.Paragraph>
                While tools promise to accelerate development, the reality is that enterprise teams are moving slower than ever. This isn&apos;t due to a lack of effort or skill, but rather a combination of factors that create overwhelming cognitive load:
              </S.Paragraph>
            </motion.div>

            {/* Process Flow Component */}
            <S.ComponentWrapper position={enhancedProcessFlowProps.position}>
              <ProcessFlow {...enhancedProcessFlowProps} />
            </S.ComponentWrapper>

            <motion.div variants={fadeInUp}>
              <Typography variant="h3" className="mb-3">
                <FaClipboardCheck style={{ marginRight: '10px' }} /> 3. Quality Assurance Crisis
              </Typography>
              <S.Paragraph>
                The pressure to deliver faster collides with the need to maintain quality, creating an impossible situation for many teams:
              </S.Paragraph>
            </motion.div>

            {/* Stats Comparison Component */}
            <S.ComponentWrapper position={enhancedStatsComparisonProps.position}>
              <StatsComparison {...enhancedStatsComparisonProps} />
            </S.ComponentWrapper>

            <motion.div variants={fadeInUp}>
              <S.Paragraph>
                <FaBug style={{ marginRight: '10px', float: 'left', fontSize: '1.5rem' }} />
                This isn&apos;t just about finding bugs—it&apos;s about the entire quality assurance process becoming a bottleneck that teams can&apos;t afford but also can&apos;t ignore.
              </S.Paragraph>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography variant="h3" className="mb-3">
                <FaTools style={{ marginRight: '10px' }} /> 4. Technical Debt Accumulation
              </Typography>
              <S.Paragraph>
                Perhaps the most insidious challenge is the accelerating accumulation of technical debt. This manifests in several ways:
              </S.Paragraph>
            </motion.div>

            {/* Debt Analysis Component */}
            <S.ComponentWrapper position={enhancedDebtAnalysisProps.position}>
              <DebtAnalysis {...enhancedDebtAnalysisProps} />
            </S.ComponentWrapper>

            <motion.div variants={fadeInUp}>
              <Typography variant="h2" className="mb-4">
                <FaCogs style={{ marginRight: '10px' }} /> The Compounding Effect
              </Typography>
              <S.Paragraph>
                These challenges don&apos;t exist in isolation—they form a self-reinforcing cycle that becomes increasingly difficult to break:
              </S.Paragraph>
            </motion.div>

            {/* Cycle Diagram Component */}
            <S.ComponentWrapper position={enhancedCycleDiagramProps.position}>
              <MermaidDiagram 
                definition={enhancedCycleDiagramProps.diagram}
                theme={enhancedCycleDiagramProps.style === 'gradient-bg' ? 'default' : 'dark'}
                width="100%"
                height="auto"
                backgroundColor="transparent"
              />
            </S.ComponentWrapper>

            <motion.div variants={fadeInUp}>
              <Typography variant="h2" className="mb-4">
                <FaLightbulb style={{ marginRight: '10px' }} /> Traditional Solutions Fall Short
              </Typography>
              <S.Paragraph>
                The typical enterprise responses to these challenges often make matters worse:
              </S.Paragraph>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Typography variant="h3" className="mb-3">
                <FaUserCog style={{ marginRight: '10px' }} /> Adding More Tools
              </Typography>
            </motion.div>

            {/* Problem Solution Component - Tools */}
            <S.ComponentWrapper position={enhancedProblemSolutionProps.position}>
              <ProblemSolution 
                problem="Teams add more specialized tools to solve specific problems"
                consequence="Increased complexity, more context switching, higher cognitive load"
                metrics={[]}
                style="split-card"
                position="right"
              />
            </S.ComponentWrapper>

            <motion.div variants={fadeInUp}>
              <Typography variant="h3" className="mb-3">
                <FaUsers style={{ marginRight: '10px' }} /> Hiring More Developers
              </Typography>
            </motion.div>

            {/* Problem Solution Component - Hiring */}
            <S.ComponentWrapper position="left">
              <ProblemSolution 
                problem="Organizations try to solve complexity by adding more developers"
                consequence="Communication overhead increases, knowledge sharing becomes harder"
                metrics={[]}
                style="split-card"
                position="left"
              />
            </S.ComponentWrapper>

            <motion.div variants={fadeInUp}>
              <Typography variant="h3" className="mb-3">
                <FaSyncAlt style={{ marginRight: '10px' }} /> Implementing More Processes
              </Typography>
              </motion.div>

            {/* Problem Solution Component - Processes */}
            <S.ComponentWrapper position="right">
              <ProblemSolution 
                problem="Teams add more processes to maintain quality and consistency"
                consequence="Increased bureaucracy, slower delivery, developer frustration"
                metrics={[]}
                style="split-card"
                position="right"
              />
            </S.ComponentWrapper>

            <motion.div variants={fadeInUp}>
              <Typography variant="h2" className="mb-4">
                <FaArrowAltCircleUp style={{ marginRight: '10px' }} /> The Need for a New Approach
              </Typography>
              <S.Paragraph>
                These challenges require a fundamental shift in how we approach enterprise development:
              </S.Paragraph>
              <S.ParagraphList>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  <li><FaBrain style={{ marginRight: '8px' }} /> Systems that reduce cognitive load.</li>
                  <li><FaTools style={{ marginRight: '8px' }} /> Tools that unify and simplify the development process.</li>
                  <li><FaProjectDiagram style={{ marginRight: '8px' }} /> Approaches that scale effectively with increasing complexity.</li>
                </ul>
              </S.ParagraphList>
            </motion.div>

            {/* Common Pitfalls Section */}
            <motion.div variants={fadeInUp}>
              <Typography variant="h2" className="mb-4">
                <FaExclamationTriangle style={{ marginRight: '10px' }} /> {commonPitfallsProps.title}
              </Typography>
              <S.Paragraph>
                {commonPitfallsProps.introduction}
              </S.Paragraph>
            </motion.div>

            {/* Brain Garden Solutions Section */}
            <motion.div variants={fadeInUp}>
              <Typography variant="h2" className="mb-4 mt-8">
                <FaLightbulb style={{ marginRight: '10px' }} /> {brainGardenSolutionsProps.title}
              </Typography>
            </motion.div>

            {/* Combined grid for Problems and Solutions ensures balanced layout */}
            <S.GridContainer style={{ margin: '2rem 0' }}>
              {/* Problem Cards */}
              {commonPitfallsProps.problems.map((problem, index) => (
                <S.GridItem key={`problem-${index}`}>
                  <ProblemCards 
                    problems={[problem]} 
                    style={commonPitfallsProps.style}
                    className="h-100"
                  />
                </S.GridItem>
              ))}
              
              {/* Solution Cards */}
              {brainGardenSolutionsProps.solutions.map((solution, index) => (
                <S.GridItem key={`solution-${index}`}>
                  <SolutionCards 
                    solutions={[solution]} 
                    style={brainGardenSolutionsProps.style}
                    className="h-100"
                  />
                </S.GridItem>
              ))}
            </S.GridContainer>

            {/* Results and Vision Section */}
            <motion.div variants={fadeInUp}>
              <Typography variant="h2" className="mb-4">
                <FaChartBar style={{ marginRight: '10px' }} /> {solutionsImpactProps.title}
              </Typography>
              <S.Paragraph>
                {solutionsImpactProps.subtitle}
              </S.Paragraph>
            </motion.div>

            {/* Development Velocity Component */}
            <S.ComponentWrapper position={solutionsImpactProps.solutionOverview.position}>
              <ProblemOverview 
                title={solutionsImpactProps.solutionOverview.title}
                description={solutionsImpactProps.solutionOverview.description}
                metrics={adaptMetrics(solutionsImpactProps.solutionOverview.key_metrics)}
                style={'gradient-card'}
                position={(solutionsImpactProps.solutionOverview.position === 'center' 
                  ? 'full-width' 
                  : solutionsImpactProps.solutionOverview.position === 'full-width' || 
                    solutionsImpactProps.solutionOverview.position === 'left' || 
                    solutionsImpactProps.solutionOverview.position === 'right'
                      ? solutionsImpactProps.solutionOverview.position
                      : 'full-width')}
                animation="fade-up"
                background="light"
              />
            </S.ComponentWrapper>

            {/* Code Quality Component */}
            <S.ComponentWrapper position={solutionsImpactProps.knowledgeManagement.position}>
              <ChallengeBreakdown 
                title={solutionsImpactProps.knowledgeManagement.title}
                key_issues={solutionsImpactProps.knowledgeManagement.key_features}
                style={solutionsImpactProps.knowledgeManagement.style as any}
                position={solutionsImpactProps.knowledgeManagement.position as any}
                description=""
              />
            </S.ComponentWrapper>

            {/* Team Dynamics Component */}
            <S.ComponentWrapper position={solutionsImpactProps.developmentVelocity.position}>
              <ProcessFlow 
                steps={solutionsImpactProps.developmentVelocity.improvements}
                style={solutionsImpactProps.developmentVelocity.style as any}
                position={solutionsImpactProps.developmentVelocity.position as any}
              />
            </S.ComponentWrapper>

            {/* Conclusion Section */}
            <motion.div variants={fadeInUp}>
              <Typography variant="h2" className="mb-4">
                <FaHandshake style={{ marginRight: '10px' }} /> {conclusionProps.title}
              </Typography>
              <S.Paragraph>
                {conclusionProps.content}
              </S.Paragraph>
            </motion.div>

            {/* Contact Card Component */}
            <S.ComponentWrapper position={conclusionProps.position}>
              <ContactCard 
                contactInfo={{
                  ...conclusionProps.contactInfo,
                  medium: ""
                }}
                style={conclusionProps.style}
              />
            </S.ComponentWrapper>
          </S.ContentContainer>
        </S.ContentSection>
      </S.Container>
    </AnimatePresence>
  );
}; 