import { ReactNode } from 'react';

export interface CallToActionProps {
    title: string;
    subtitle?: string;
    description?: string;
    buttonText: string;
    buttonLink: string;
    variant?: 'primary' | 'secondary';
    icon?: ReactNode;
} 