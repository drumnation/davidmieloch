import { SpinnerSize } from '../Spinner';

export type PageLoaderSize = 'small' | 'medium' | 'large' | number;

export interface PageLoaderProps {
  className?: string;
  minHeight?: string;
  spinnerSize?: PageLoaderSize;
  spinnerColor?: string;
  text?: string;
} 