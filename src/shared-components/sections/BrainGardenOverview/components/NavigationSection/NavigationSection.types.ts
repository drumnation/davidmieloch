import { ReactElement } from 'react';

export interface NavigationSectionProps {
  className?: string;
  navigationProps: {
    sections: Array<{
      title: string;
      description: string;
      icon: string | ReactElement;
      link: string;
    }>;
  };
}