import { ReactElement } from 'react';

export interface CoreComponentsSectionProps {
  className?: string;
  coreComponentsProps: {
    features: Array<{
      title: string;
      description: string;
      icon: string | ReactElement;
      link?: string;
    }>;
  };
}