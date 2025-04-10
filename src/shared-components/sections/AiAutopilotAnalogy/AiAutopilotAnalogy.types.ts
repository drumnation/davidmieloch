import { ReactNode } from 'react';

export interface AiAutopilotAnalogyProps {
  className?: string;
  heroProps?: {
    title: string;
    subtitle: string;
    background?: 'gradient' | 'light' | 'dark' | 'image';
    backgroundImage?: string;
    backgroundOverlay?: boolean;
    overlayOpacity?: number;
    pattern?: 'circuit-board' | 'dots' | 'none';
    textColor?: 'light' | 'dark';
    animation?: 'fade-up' | 'slide-in' | 'none';
    className?: string;
  };
  comparisonTableProps?: {
    leftTitle: string;
    rightTitle: string;
    items: Array<{
      category: string;
      leftContent: string;
      rightContent: string;
    }>;
  };
  realityVsHollywoodProps?: {
    realityItems: Array<{
      title: string;
      description: string;
      iconName: string;
    }>;
    hollywoodItems: Array<{
      title: string;
      description: string;
      iconName: string;
    }>;
  };
  strategicFocusAreasProps?: {
    features: Array<{
      title: string;
      description: string;
      iconName: string;
    }>;
  };
  mermaidDiagramProps?: {
    title: string;
    description: string;
    definition: string;
    theme?: 'default' | 'dark' | 'forest' | 'neutral';
  };
  leadershipBlueprintProps?: {
    title: string;
    subtitle: string;
    warningTransition: {
      title: string;
      description: string;
    };
    narrative: {
      introduction: string;
      quotes: Array<string>;
      conclusion: string;
    };
    blueprint: Array<{
      title: string;
      items: Array<{
        name: string;
        description: string;
      }>;
    }>;
    bottomLine: string;
  };
}