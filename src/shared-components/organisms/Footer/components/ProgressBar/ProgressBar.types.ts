import { RefObject } from 'react';

export interface ProgressBarProps {
    progress: number;
    backgroundColor: string;
    barRef: RefObject<HTMLDivElement>;
    onClick?: (e: React.MouseEvent) => void;
} 