import { IconType } from 'react-icons';
import React from 'react';

export interface PersonaCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  IconComponent?: React.ComponentType<{ size?: number; color?: string }>;
} 