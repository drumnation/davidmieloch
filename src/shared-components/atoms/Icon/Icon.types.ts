import { SVGProps } from 'react';
import { LucideProps } from 'lucide-react';
import { IconProps as PhosphorProps } from 'phosphor-react';

export type IconSource = 'tabler' | 'lucide' | 'phosphor';

export interface IconProps extends Omit<SVGProps<SVGSVGElement> & LucideProps & PhosphorProps, 'ref'> {
  name: string;
  source?: IconSource;
  size?: number | string;
  color?: string;
  className?: string;
} 