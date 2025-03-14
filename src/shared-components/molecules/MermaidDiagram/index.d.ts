import { FC } from 'react';

export type MermaidTheme = 'default' | 'base' | 'dark' | 'forest' | 'neutral';

export interface MermaidDiagramProps {
  definition: string;
  className?: string;
  theme?: MermaidTheme;
  width?: string;
  height?: string;
  backgroundColor?: string;
}

export const MermaidDiagram: FC<MermaidDiagramProps>; 