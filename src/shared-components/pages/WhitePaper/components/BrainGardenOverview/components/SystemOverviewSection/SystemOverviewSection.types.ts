import { ReactElement } from 'react';

export interface SystemOverviewSectionProps {
  className?: string;
  introProps: {
    text: string | string[];
    icon?: string | ReactElement;
  };
}