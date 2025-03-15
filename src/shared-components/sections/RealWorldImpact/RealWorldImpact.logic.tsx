import React from 'react';
import { RealWorldImpactProps } from './RealWorldImpact.types';
import { defaultContent } from './RealWorldImpact.constants';
import { Icon } from '../../atoms/Icon';
import { HeroProps } from '../../organisms/Hero/Hero.types';
import { ChallengeBreakdownProps } from '../../organisms/ChallengeBreakdown/ChallengeBreakdown.types';
import { ProcessFlowProps } from '../../organisms/ProcessFlow/ProcessFlow.types';
import { StatsComparisonProps } from '../../organisms/StatsComparison/StatsComparison.types';
import { DebtAnalysisProps } from '../../organisms/DebtAnalysis/DebtAnalysis.types';
import { ImpactGridProps } from '../../organisms/ImpactGrid/ImpactGrid.types';
import { NavigationCardProps } from '../../organisms/NavigationCard/NavigationCard.types';

/**
 * Enhances the hero props with consistent styling and defaults
 */
export const enhanceHeroProps = (heroProps: RealWorldImpactProps['heroProps'] = defaultContent.hero): HeroProps => {
  return {
    ...heroProps,
    className: `${heroProps.className || ''} mb-0`,
    background: 'image',
    backgroundImage: '/skyscraper.jpg',
    backgroundOverlay: heroProps.backgroundOverlay !== undefined ? heroProps.backgroundOverlay : true,
    textColor: heroProps.textColor || 'light',
    pattern: 'none',
    animation: (heroProps.animation as "fade-up" | "slide-in" | "none") || 'fade-up',
  };
};

/**
 * Enhances the problem overview props with consistent styling and defaults
 */
export const enhanceProblemOverviewProps = (
  problemOverviewProps: RealWorldImpactProps['problemOverviewProps'] = defaultContent.problemOverview
): {
  title: string;
  description: string;
  metrics: Array<{
    number: string;
    label: string;
  }>;
  style: 'gradient-card' | 'accent-card' | 'default';
  position: 'full-width' | 'left' | 'right' | 'center';
  animation?: 'fade-up' | 'slide-in' | 'none';
  background?: 'light' | 'dark' | 'gradient';
} => {
  return {
    title: problemOverviewProps?.title || '',
    description: problemOverviewProps?.description || '',
    metrics: problemOverviewProps?.metrics?.map(metric => ({
      number: metric.number || '',
      label: metric.label || '',
    })) || [],
    style: problemOverviewProps?.style || 'gradient-card',
    position: problemOverviewProps?.position || 'full-width',
    animation: problemOverviewProps?.animation || 'fade-up',
    background: problemOverviewProps?.background || 'light',
  };
};

/**
 * Enhances the challenge breakdown props with consistent styling and defaults
 */
export const enhanceChallengeBreakdownProps = (
  challengeBreakdownProps: RealWorldImpactProps['challengeBreakdownProps'] = defaultContent.challengeBreakdown
): ChallengeBreakdownProps => {
  return {
    title: challengeBreakdownProps?.title || '',
    description: "The most pressing challenge in enterprise development isn't technical—it's cognitive.",
    challenges: challengeBreakdownProps?.key_issues?.map(issue => ({
      title: issue.title || '',
      description: issue.description || '',
      impact: issue.impact || '',
    })) || [],
    style: (challengeBreakdownProps?.style === 'default' ? 'accent-card' : challengeBreakdownProps?.style) || 'accent-card',
    position: (challengeBreakdownProps?.position === 'center' ? 'right' : challengeBreakdownProps?.position) || 'right',
    animation: 'fade-up',
  };
};

/**
 * Enhances the process flow props with consistent styling and defaults
 */
export const enhanceProcessFlowProps = (
  processFlowProps: RealWorldImpactProps['processFlowProps'] = defaultContent.processFlow
): ProcessFlowProps => {
  return {
    ...processFlowProps,
    steps: processFlowProps?.steps?.map(step => ({
      title: step.title || '',
      description: step.description || '',
      impact: step.impact || '',
    })) || [],
    style: processFlowProps?.style || 'vertical-steps',
    position: processFlowProps?.position || 'left',
  };
};

/**
 * Enhances the stats comparison props with consistent styling and defaults
 */
export const enhanceStatsComparisonProps = (
  statsComparisonProps: RealWorldImpactProps['statsComparisonProps'] = defaultContent.statsComparison
): StatsComparisonProps => {
  return {
    ...statsComparisonProps,
    comparisons: statsComparisonProps?.comparisons?.map(comparison => ({
      metric: comparison.metric || '',
      current: comparison.current || '',
      impact: comparison.impact || '',
    })) || [],
    style: statsComparisonProps?.style || 'gradient-cards',
    position: statsComparisonProps?.position || 'right',
  };
};

/**
 * Enhances the debt analysis props with consistent styling and defaults
 */
export const enhanceDebtAnalysisProps = (
  debtAnalysisProps: RealWorldImpactProps['debtAnalysisProps'] = defaultContent.debtAnalysis
): DebtAnalysisProps => {
  return {
    ...debtAnalysisProps,
    categories: debtAnalysisProps?.categories?.map(category => ({
      title: category.title || '',
      current_state: category.current_state || '',
      impact: category.impact || '',
    })) || [],
    style: debtAnalysisProps?.style || 'accent-cards',
    position: debtAnalysisProps?.position || 'full-width',
  };
};

/**
 * Enhances the cycle diagram props with consistent styling and defaults
 */
export const enhanceCycleDiagramProps = (
  cycleDiagramProps: RealWorldImpactProps['cycleDiagramProps'] = defaultContent.cycleDiagram
): { diagram: string; style: string; position: string } => {
  return {
    diagram: cycleDiagramProps?.diagram || '',
    style: cycleDiagramProps?.style || 'gradient-bg',
    position: cycleDiagramProps?.position || 'center',
  };
};

/**
 * Enhances the problem solution props with consistent styling and defaults
 */
export const enhanceProblemSolutionProps = (
  problemSolutionProps: RealWorldImpactProps['problemSolutionProps'] = defaultContent.problemSolution
): {
  problem: string;
  consequence: string;
  metrics: Array<string>;
  style: 'split-card';
  position: 'right' | 'left' | 'center' | 'full-width';
} => {
  return {
    problem: problemSolutionProps?.problem || '',
    consequence: problemSolutionProps?.consequence || '',
    metrics: problemSolutionProps?.metrics || [],
    style: 'split-card',
    position: problemSolutionProps?.position || 'right',
  };
};

/**
 * Enhances the impact grid props with consistent styling and defaults
 */
export const enhanceImpactGridProps = (
  impactGridProps: RealWorldImpactProps['impactGridProps'] = defaultContent.impactGrid
): ImpactGridProps => {
  return {
    ...impactGridProps,
    impacts: impactGridProps?.impacts?.map(impact => ({
      category: impact.category || '',
      metrics: impact.metrics || [],
    })) || [],
    style: impactGridProps?.style || 'gradient-cards',
    position: impactGridProps?.position || 'full-width',
  };
};

/**
 * Enhances the navigation card props with consistent styling and defaults
 */
export const enhanceNavigationCardProps = (
  navigationCardProps: RealWorldImpactProps['navigationCardProps'] = defaultContent.navigationCard
): NavigationCardProps => {
  return {
    ...navigationCardProps,
    content: navigationCardProps?.content ? {
      text: navigationCardProps.content.text || '',
      action: navigationCardProps.content.action || '',
      link: navigationCardProps.content.link || '',
      icon: navigationCardProps.content.icon || '',
    } : {
      text: '',
      action: '',
      link: '',
      icon: '',
    },
    style: navigationCardProps?.style || 'gradient-card',
    animation: navigationCardProps?.animation || 'fade-up',
  };
};

/**
 * Enhances the enterprise journey props with consistent styling and defaults
 */
export const enhanceEnterpriseJourneyProps = (
  enterpriseJourneyProps: RealWorldImpactProps['enterpriseJourneyProps'] = defaultContent.enterpriseJourney
): {
  title: string;
  subtitle: string;
  journeyTimeline: {
    diagram: string;
    style: string;
    position: string;
    animation?: string;
  };
  featureCard: {
    quote: string;
    author: string;
    style: string;
    position: string;
  };
  statsGrid: {
    stats: Array<{
      number: string;
      label: string;
      icon: string;
    }>;
    style: string;
    position: string;
    animation: string;
  };
  processFlow: {
    steps: Array<{
      title: string;
      description: string;
      metrics: Array<string>;
    }>;
    style: string;
    position: string;
  };
} => {
  return {
    title: enterpriseJourneyProps?.title || '',
    subtitle: enterpriseJourneyProps?.subtitle || '',
    journeyTimeline: {
      diagram: enterpriseJourneyProps?.journeyTimeline?.diagram || '',
      style: enterpriseJourneyProps?.journeyTimeline?.style || 'side-visual',
      position: enterpriseJourneyProps?.journeyTimeline?.position || 'right',
      animation: enterpriseJourneyProps?.journeyTimeline?.animation || 'fade-in',
    },
    featureCard: {
      quote: enterpriseJourneyProps?.featureCard?.quote || '',
      author: enterpriseJourneyProps?.featureCard?.author || '',
      style: enterpriseJourneyProps?.featureCard?.style || 'inset-quote',
      position: enterpriseJourneyProps?.featureCard?.position || 'left',
    },
    statsGrid: {
      stats: enterpriseJourneyProps?.statsGrid?.stats?.map(stat => ({
        number: stat.number || '',
        label: stat.label || '',
        icon: stat.icon || 'star',
      })) || [],
      style: enterpriseJourneyProps?.statsGrid?.style || 'gradient-cards',
      position: enterpriseJourneyProps?.statsGrid?.position || 'right',
      animation: enterpriseJourneyProps?.statsGrid?.animation || 'count-up',
    },
    processFlow: {
      steps: enterpriseJourneyProps?.processFlow?.steps?.map(step => ({
        title: step.title || '',
        description: step.description || '',
        metrics: step.metrics || [],
      })) || [],
      style: enterpriseJourneyProps?.processFlow?.style || 'horizontal-steps',
      position: enterpriseJourneyProps?.processFlow?.position || 'full-width',
    }
  };
};

/**
 * Enhances the solutions impact props with consistent styling and defaults
 */
export const enhanceSolutionsImpactProps = (
  solutionsImpactProps: RealWorldImpactProps['solutionsImpactProps'] = defaultContent.solutionsImpact
): {
  title: string;
  subtitle: string;
  solutionOverview: {
    title: string;
    description: string;
    key_metrics: Array<{
      number: string;
      label: string;
    }>;
    style: string;
    position: string;
  };
  knowledgeManagement: {
    title: string;
    key_features: Array<{
      title: string;
      description: string;
      impact: string;
    }>;
    style: string;
    position: string;
  };
  developmentVelocity: {
    improvements: Array<{
      title: string;
      description: string;
      impact: string;
    }>;
    style: string;
    position: string;
  };
  metricsGrid: {
    metrics: Array<{
      category: string;
      stats: Array<string>;
    }>;
    style: string;
    position: string;
  };
  qualityAssurance: {
    features: Array<{
      title: string;
      description: string;
      benefits: Array<string>;
    }>;
    style: string;
    position: string;
  };
  statsComparison: {
    comparisons: Array<{
      metric: string;
      before: string;
      after: string;
      impact: string;
    }>;
    style: string;
    position: string;
  };
  technicalDebt: {
    strategies: Array<{
      title: string;
      description: string;
      impact: string;
    }>;
    style: string;
    position: string;
  };
  transformationMetrics: {
    categories: Array<{
      title: string;
      metrics: Array<{
        label: string;
        improvement: string;
      }>;
    }>;
    style: string;
    position: string;
  };
  caseStudies: Array<{
    title: string;
    challenge: string;
    solution: string;
    results: Array<string>;
    quote: string;
    style: string;
    position: string;
  }>;
  journeyTimeline: {
    diagram: string;
    style: string;
    position: string;
  };
} => {
  return {
    title: solutionsImpactProps?.title || '',
    subtitle: solutionsImpactProps?.subtitle || '',
    solutionOverview: {
      title: solutionsImpactProps?.solutionOverview?.title || '',
      description: solutionsImpactProps?.solutionOverview?.description || '',
      key_metrics: solutionsImpactProps?.solutionOverview?.key_metrics || [],
      style: solutionsImpactProps?.solutionOverview?.style || 'gradient-card',
      position: solutionsImpactProps?.solutionOverview?.position || 'full-width',
    },
    knowledgeManagement: {
      title: solutionsImpactProps?.knowledgeManagement?.title || '',
      key_features: solutionsImpactProps?.knowledgeManagement?.key_features || [],
      style: solutionsImpactProps?.knowledgeManagement?.style || 'accent-card',
      position: solutionsImpactProps?.knowledgeManagement?.position || 'right',
    },
    developmentVelocity: {
      improvements: solutionsImpactProps?.developmentVelocity?.improvements || [],
      style: solutionsImpactProps?.developmentVelocity?.style || 'vertical-steps',
      position: solutionsImpactProps?.developmentVelocity?.position || 'left',
    },
    metricsGrid: {
      metrics: solutionsImpactProps?.metricsGrid?.metrics || [],
      style: solutionsImpactProps?.metricsGrid?.style || 'gradient-cards',
      position: solutionsImpactProps?.metricsGrid?.position || 'right',
    },
    qualityAssurance: {
      features: solutionsImpactProps?.qualityAssurance?.features || [],
      style: solutionsImpactProps?.qualityAssurance?.style || 'accent-cards',
      position: solutionsImpactProps?.qualityAssurance?.position || 'left',
    },
    statsComparison: {
      comparisons: solutionsImpactProps?.statsComparison?.comparisons || [],
      style: solutionsImpactProps?.statsComparison?.style || 'gradient-cards',
      position: solutionsImpactProps?.statsComparison?.position || 'right',
    },
    technicalDebt: {
      strategies: solutionsImpactProps?.technicalDebt?.strategies || [],
      style: solutionsImpactProps?.technicalDebt?.style || 'accent-cards',
      position: solutionsImpactProps?.technicalDebt?.position || 'left',
    },
    transformationMetrics: {
      categories: solutionsImpactProps?.transformationMetrics?.categories || [],
      style: solutionsImpactProps?.transformationMetrics?.style || 'gradient-cards',
      position: solutionsImpactProps?.transformationMetrics?.position || 'full-width',
    },
    caseStudies: solutionsImpactProps?.caseStudies || [],
    journeyTimeline: {
      diagram: solutionsImpactProps?.journeyTimeline?.diagram || '',
      style: solutionsImpactProps?.journeyTimeline?.style || 'gradient-bg',
      position: solutionsImpactProps?.journeyTimeline?.position || 'center',
    }
  };
};

/**
 * Creates a custom icon component
 */
export const CustomIcon = (name: string): React.ReactNode => (
  <Icon name={name} size={24} />
); 