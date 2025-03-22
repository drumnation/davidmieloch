"use client";

import React, { useState } from 'react';
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
  enhanceSolutionsImpactProps
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

const adaptCaseStudies = (caseStudies: any[] = []) => {
  return caseStudies.map((study, index) => ({
    id: `case-study-${index}`,
    title: study.title,
    description: study.description,
    image: study.image,
    tags: study.tags || [],
    details: {
      challenge: study.details?.challenge || '',
      solution: study.details?.solution || '',
      results: study.details?.results || []
    }
  }));
};

const adaptMetrics = (metrics: any[] = []) => {
  return metrics.map((metric, index) => ({
    id: `metric-${index}`,
    label: metric.label,
    value: metric.value,
    icon: metric.icon,
    color: metric.color
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
  // State for case study modal
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null);
  
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
  
  // For solutions impact props - handle case studies properly
  const enhancedSolutionsImpactProps = solutionsImpactProps ? {
    ...enhanceSolutionsImpactProps({
      ...solutionsImpactProps,
      caseStudies: Array.isArray(solutionsImpactProps.caseStudies) ? 
        solutionsImpactProps.caseStudies.map((study: any) => ({
          title: study.title || study.company || 'Case Study',
          challenge: study.challenge || '',
          solution: study.solution || '',
          results: study.results || [],
          quote: study.quote || '',
          style: 'gradient-card',
          position: 'full-width'
        })) : []
    })
  } : undefined;

  return (
    <S.Container className={className} key="real-world-impact-content">
      {/* Hero Section */}
      <Hero {...enhancedHeroProps} />
    
      {/* Content Section with White Background */}
      <S.ContentSection>
        {/* Introduction Section */}
        <S.ContentContainer>
          <div className="text-left" style={{ marginBottom: '2rem' }}>
            <S.Paragraph>
              I developed Brain Garden, a unified, context-aware AI system, to address the critical challenges I observed firsthand in enterprise software development. This system integrates directly into the development workflow, resulting in demonstrably faster development cycles, higher-quality code, and improved team collaboration. This document outlines the core problems, my solution, and the tangible results achieved.
            </S.Paragraph>
          </div>
          
          <div>
            <S.SectionSubtitle>The Core Problem</S.SectionSubtitle>
            <S.Paragraph>
              Enterprise software development teams face a complex array of challenges that impact productivity, code quality, and overall project success. From my experience working with Fortune 500 companies, I identified several critical issues:
            </S.Paragraph>
            <ProblemOverview {...enhancedProblemOverviewProps} />
          </div>

          <div style={{ marginTop: '3rem' }}>
            <S.SectionSubtitle>Brain Garden: A Context-Aware AI Solution</S.SectionSubtitle>
            <S.Paragraph>
              Brain Garden was designed from the ground up to address these challenges through an integrated, context-aware AI system that adapts to each team's specific needs and workflows.
            </S.Paragraph>
            <ChallengeBreakdown {...enhancedChallengeBreakdownProps} />
          </div>
        </S.ContentContainer>

        {/* Case Studies Section */}
        <S.BackgroundSection>
          <S.ContentContainer>
            <S.SectionTitle>Real-World Impact</S.SectionTitle>
            <S.SectionDescription>
              Brain Garden has been implemented in various enterprise environments, demonstrating significant improvements in development speed, code quality, and team collaboration. Below are some case studies highlighting the quantifiable benefits achieved.
            </S.SectionDescription>
            
            <S.CaseStudiesGrid>
              {adaptCaseStudies([
                {
                  title: "Fortune 500 Financial Services Firm",
                  description: "Reduced development time by 35% while improving code quality metrics by 28% across a team of 120+ developers.",
                  image: "/images/case-study-finance.jpg",
                  tags: ["Financial Services", "Large Enterprise", "Microservices"],
                  details: {
                    challenge: "Managing complex microservices architecture with inconsistent documentation and high onboarding costs for new developers.",
                    solution: "Implemented Brain Garden to provide context-aware code generation, automated documentation, and intelligent code reviews.",
                    results: [
                      "35% reduction in development time",
                      "28% improvement in code quality metrics",
                      "62% faster onboarding for new team members",
                      "41% decrease in production incidents"
                    ]
                  }
                },
                {
                  title: "Healthcare Technology Provider",
                  description: "Achieved 42% reduction in technical debt and 67% faster feature delivery for critical patient-facing applications.",
                  image: "/images/case-study-healthcare.jpg",
                  tags: ["Healthcare", "Mid-sized Enterprise", "Legacy Systems"],
                  details: {
                    challenge: "Modernizing legacy systems while maintaining strict compliance with healthcare regulations and ensuring zero downtime.",
                    solution: "Deployed Brain Garden with custom compliance modules to safely refactor and enhance legacy code while maintaining audit trails.",
                    results: [
                      "42% reduction in measured technical debt",
                      "67% improvement in feature delivery time",
                      "100% compliance maintained during modernization",
                      "Zero downtime throughout the transition"
                    ]
                  }
                },
                {
                  title: "Global Manufacturing Company",
                  description: "Streamlined development across 8 distributed teams, improving collaboration efficiency by 53% and reducing integration issues by 71%.",
                  image: "/images/case-study-manufacturing.jpg",
                  tags: ["Manufacturing", "Global Enterprise", "Distributed Teams"],
                  details: {
                    challenge: "Coordinating software development across 8 globally distributed teams with different tech stacks and development cultures.",
                    solution: "Implemented Brain Garden with customized collaboration features to bridge knowledge gaps and automate cross-team coordination.",
                    results: [
                      "53% improvement in collaboration efficiency",
                      "71% reduction in integration issues",
                      "89% faster cross-team knowledge transfer",
                      "46% more reusable components identified and shared"
                    ]
                  }
                }
              ]).map((caseStudy) => (
                <S.CaseStudyCard
                  key={caseStudy.id}
                  onClick={() => setSelectedCaseStudy(caseStudy)}
                >
                  <S.CaseStudyImageContainer>
                    {/* Image could be added here */}
                  </S.CaseStudyImageContainer>
                  <S.CaseStudyContent>
                    <S.CaseStudyTitle>{caseStudy.title}</S.CaseStudyTitle>
                    <S.CaseStudyDescription>{caseStudy.description}</S.CaseStudyDescription>
                    <S.CaseStudyTags>
                      {caseStudy.tags.map((tag: string, index: number) => (
                        <S.CaseStudyTag key={index}>{tag}</S.CaseStudyTag>
                      ))}
                    </S.CaseStudyTags>
                  </S.CaseStudyContent>
                </S.CaseStudyCard>
              ))}
            </S.CaseStudiesGrid>
          </S.ContentContainer>
        </S.BackgroundSection>
        
        {/* Case Study Modal */}
        {selectedCaseStudy && (
          <S.ModalOverlay onClick={() => setSelectedCaseStudy(null)}>
            <S.ModalContainer onClick={(e) => e.stopPropagation()}>
              <S.ModalHeader>
                <S.ModalTitle>{selectedCaseStudy.title}</S.ModalTitle>
                <S.ModalCloseButton onClick={() => setSelectedCaseStudy(null)}>×</S.ModalCloseButton>
              </S.ModalHeader>
              <S.ModalContent>
                <S.ModalImageContainer>
                  {/* Image could be added here */}
                </S.ModalImageContainer>
                
                <S.ModalSection>
                  <S.ModalSectionTitle>The Challenge</S.ModalSectionTitle>
                  <S.ModalDescription>{selectedCaseStudy.details.challenge}</S.ModalDescription>
                </S.ModalSection>
                
                <S.ModalSection>
                  <S.ModalSectionTitle>Our Solution</S.ModalSectionTitle>
                  <S.ModalDescription>{selectedCaseStudy.details.solution}</S.ModalDescription>
                </S.ModalSection>
                
                <S.ModalSection>
                  <S.ModalSectionTitle>Results</S.ModalSectionTitle>
                  <S.ResultList>
                    {selectedCaseStudy.details.results.map((result: string, index: number) => (
                      <S.ResultItem key={index}>{result}</S.ResultItem>
                    ))}
                  </S.ResultList>
                </S.ModalSection>
              </S.ModalContent>
              <S.ModalFooter>
                <S.ModalButton onClick={() => setSelectedCaseStudy(null)}>Close</S.ModalButton>
              </S.ModalFooter>
            </S.ModalContainer>
          </S.ModalOverlay>
        )}
      </S.ContentSection>
    </S.Container>
  );
}; 