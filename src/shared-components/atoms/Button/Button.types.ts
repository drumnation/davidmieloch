import { ButtonProps as MantineButtonProps } from '@mantine/core';
import { ReactNode } from 'react';

export interface ButtonProps extends Omit<MantineButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'repo-action' | 'repo-link';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}