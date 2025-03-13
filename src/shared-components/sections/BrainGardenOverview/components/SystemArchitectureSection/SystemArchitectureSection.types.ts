export interface SystemArchitectureSectionProps {
  className?: string;
  systemArchitectureProps: {
    title: string;
    description?: string;
    definition: string;
    theme?: 'default' | 'dark' | 'forest' | 'neutral';
  };
}