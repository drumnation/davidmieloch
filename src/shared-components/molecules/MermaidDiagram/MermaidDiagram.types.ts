export interface MermaidDiagramProps {
  /**
   * The Mermaid diagram definition in string format
   */
  definition: string;
  
  /**
   * Optional CSS class name for styling the container
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
   * @default 'auto'
   */
  height?: string;
  
  /**
   * Optional background color for the diagram container
   */
  backgroundColor?: string;
}
