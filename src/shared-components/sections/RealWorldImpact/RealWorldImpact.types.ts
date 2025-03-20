export interface RealWorldImpactProps {
  className?: string;
  heroProps?: {
    title: string;
    subtitle: string;
    
    // Legacy properties
    background?: 'image' | 'gradient' | 'dark' | 'light';
    backgroundImage?: string;
    backgroundOverlay?: boolean;
    overlayOpacity?: number;
    pattern?: string;
    textColor?: 'light' | 'dark';
    animation?: string;
    className?: string;
    
    // New properties
    description?: string;
    callToAction?: {
      label: string;
      action: string;
      target: string;
    };
    backgroundImageUrl?: string;
    style?: 'gradient-overlay' | string;
    metrics?: Array<{
      number: string;
      label: string;
    }>;
  };
  problemOverviewProps?: {
    title: string;
    subtitle?: string;
    description: string;
    metrics?: Array<{
      number: string;
      label: string;
    }>;
    keyPoints?: Array<{
      title: string;
      description: string;
      icons: string[];
      impact: string;
      data: {
        beforeAI: string;
        withUnstructuredAI: string;
        withBrainGarden: string;
      };
    }>;
    statistics?: Array<{
      number: string;
      label: string;
    }>;
    style?: 'gradient-card' | 'accent-card' | 'default' | 'grid-with-stats';
    position?: 'full-width' | 'left' | 'right' | 'center';
    animation?: 'fade-up' | 'slide-in' | 'none';
    background?: 'light' | 'dark' | 'gradient';
  };
  challengeBreakdownProps?: {
    title?: string;
    description?: string;
    key_issues?: Array<{
      title: string;
      description: string;
      impact: string;
    }>;
    challenges?: Array<{
      title: string;
      description: string;
      impact: string;
      solution?: string;
      icon?: string;
      style?: string;
    }>;
    diagram?: {
      title: string;
      description: string;
      nodes: Array<{
        id: string;
        label: string;
        description?: string;
        connections?: string[];
      }>;
      style: string;
    };
    style?: 'accent-card' | 'gradient-card' | 'challenge-cards' | 'default';
    position?: 'left' | 'center' | 'right' | 'full-width';
  };
  processFlowProps?: {
    title?: string;
    subtitle?: string;
    description?: string;
    steps?: Array<{
      title: string;
      description: string;
      impact: string;
    }>;
    comparisonDiagram?: {
      traditional: {
        title: string;
        steps: Array<{
          title: string;
          description: string;
          icon: string;
          metrics: {
            consistency: string;
            quality: string;
            speed: string;
            knowledge: string;
          };
        }>;
      };
      brainGarden: {
        title: string;
        steps: Array<{
          title: string;
          description: string;
          icon: string;
          metrics: {
            consistency: string;
            quality: string;
            speed: string;
            knowledge: string;
          };
        }>;
      };
    };
    style?: 'horizontal-steps' | 'vertical-steps' | 'comparative-flow-diagram';
    position?: 'left' | 'center' | 'right' | 'full-width';
  };
  statsComparisonProps?: {
    comparisons: Array<{
      metric: string;
      current: string;
      impact: string;
    }>;
    style?: 'gradient-cards' | 'accent-cards' | 'default';
    position?: 'right' | 'left' | 'center' | 'full-width';
  };
  debtAnalysisProps?: {
    categories: Array<{
      title: string;
      current_state: string;
      impact: string;
    }>;
    style?: 'accent-cards' | 'gradient-cards' | 'default';
    position?: 'full-width' | 'left' | 'right' | 'center';
  };
  cycleDiagramProps?: {
    diagram: string;
    style?: 'gradient-bg' | 'light-bg' | 'dark-bg';
    position?: 'center' | 'left' | 'right' | 'full-width';
  };
  problemSolutionProps?: {
    problem: string;
    consequence: string;
    metrics: Array<string>;
    style?: 'split-card' | 'full-card';
    position?: 'right' | 'left' | 'center' | 'full-width';
  };
  impactGridProps?: {
    impacts: Array<{
      category: string;
      metrics: Array<string>;
    }>;
    style?: 'gradient-cards' | 'accent-cards' | 'default';
    position?: 'full-width' | 'left' | 'right' | 'center';
  };
  navigationCardProps?: {
    content: {
      text: string;
      action: string;
      link: string;
      icon: string;
    };
    style?: 'gradient-card' | 'accent-card' | 'default';
    animation?: 'fade-up' | 'slide-in' | 'none';
  };
  enterpriseJourneyProps?: {
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
  };
  solutionsImpactProps?: {
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
  };
  industryVoicesProps?: {
    title: string;
    subtitle?: string;
    quotes?: Array<{
      text: string;
      author: string;
      role?: string;
    }>;
    voices?: Array<{
      quote: string;
      name: string;
      title: string;
      company: string;
      avatar?: string;
      linkedIn?: string;
    }>;
    style: string;
    position: string;
  };
  commonPitfallsProps?: {
    title: string;
    introduction: string;
    problems: Array<{
      title: string;
      description: string;
      codeExample: string;
    }>;
    style: string;
    position: string;
  };
  brainGardenSolutionsProps?: {
    title: string;
    solutions: Array<{
      title: string;
      description: string;
    }>;
    style: string;
    position: string;
  };
  conclusionProps?: {
    title: string;
    content: string;
    contactInfo: {
      email: string;
      linkedin: string;
      github: string;
    };
    style: string;
    position: string;
  };
} 