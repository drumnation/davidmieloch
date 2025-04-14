import { ReactNode } from 'react';

export interface ProfileSectionProps {
  photoUrl: string;
  name: string;
  headline: string;
  summary: string;
  className?: string;
  children?: ReactNode;
} 