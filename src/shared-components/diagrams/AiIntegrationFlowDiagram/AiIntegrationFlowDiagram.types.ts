import { CSSProperties } from 'react';
import { ReactFlowDiagramProps } from '../../molecules/ReactFlowDiagram/ReactFlowDiagram.types';

/**
 * Props for the AiIntegrationFlowDiagram component
 */
export interface AiIntegrationFlowDiagramProps {
  /**
   * Optional title for the diagram
   * @default "AI Integration Process Flow"
   */
  title?: string;
  
  /**
   * Optional description for the diagram
   * @default "The following diagram illustrates the ideal process flow for integrating AI into development workflows"
   */
  description?: string;
  
  /**
   * Optional CSS class name for styling the container
   * @default ''
   */
  className?: string;
  
  /**
   * Optional theme for the diagram
   * @default 'default'
   */
  theme?: 'default' | 'dark' | 'forest' | 'neutral';
  
  /**
   * Optional width for the diagram container
   * @default '100%'
   */
  width?: string;
  
  /**
   * Optional height for the diagram container
   * @default '1000px'
   */
  height?: string;
  
  /**
   * Optional background color for the diagram container
   */
  backgroundColor?: string;
  
  /**
   * Whether to show zoom controls
   * @default false
   */
  showZoomControls?: boolean;
  
  /**
   * Description for screen readers to describe the diagram
   * @default 'Flow diagram showing the AI integration process from workflow assessment to continuous improvement'
   */
  accessibilityDescription?: string;
} 