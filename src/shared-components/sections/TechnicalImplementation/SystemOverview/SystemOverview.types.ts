export interface PromptExample {
  title: string;
  description: string;
  prompt: string;
}

export interface TaskExample {
  title: string;
  description: string;
  tasks: string[];
}

export interface GitHubExample {
  title: string;
  description: string;
  image: string;
  caption: string;
}

export interface SystemOverviewProps {
  /**
   * Optional CSS class name for the component
   */
  className?: string;
  
  /**
   * Mermaid diagram definition string
   */
  diagram?: string;
  
  /**
   * Introductory text to display above the diagram
   */
  introduction?: string;

  /**
   * Whether to show zoom controls for the diagram
   * @default true
   */
  showZoomControls?: boolean;

  /**
   * Description for screen readers to describe the diagram
   */
  accessibilityDescription?: string;

  /**
   * Example prompt structure to display
   */
  promptExample?: PromptExample;

  /**
   * Example task breakdown to display
   */
  taskExample?: TaskExample;

  /**
   * Example GitHub integration to display
   */
  githubExample?: GitHubExample;
}