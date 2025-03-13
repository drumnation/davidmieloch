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
      icon: ReactNode;
    }>;
    hollywoodItems: Array<{
      title: string;
      description: string;
      icon: ReactNode;
    }>;
  };
  strategicFocusAreasProps?: {
    features: Array<{
      title: string;
      description: string;
      icon: ReactNode;
    }>;
  };
  mermaidDiagramProps?: {
    title: string;
    description: string;
    definition: string;
    theme?: 'default' | 'dark' | 'forest' | 'neutral';
  };
}