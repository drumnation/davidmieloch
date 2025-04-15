import { ReactElement } from 'react';

export interface ForceMultipliersSectionProps {
  className?: string;
  forceMultipliersProps: {
    features: Array<{
      title: string;
      description: string;
      icon: string | ReactElement;
      link?: string;
    }>;
  };
}