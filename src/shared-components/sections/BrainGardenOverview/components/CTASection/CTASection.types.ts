import { ReactElement } from 'react';

export interface CTASectionProps {
  className?: string;
  ctaProps: {
    title: string;
    description: string;
    action: string;
    link: string;
    icon?: string | ReactElement;
  };
}