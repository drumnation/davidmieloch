import { ReactElement } from 'react';

export interface KeyBenefitsSectionProps {
  className?: string;
  keyBenefitsProps: {
    stats: Array<{
      number: string;
      label: string;
      icon: string | ReactElement;
    }>;
  };
}