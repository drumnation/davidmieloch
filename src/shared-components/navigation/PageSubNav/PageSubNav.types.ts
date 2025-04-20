import React, { ReactNode } from 'react'; // Import React for ReactNode

export interface SubNavItem {
    id: string;
    title: string;
    level: number;
    icon?: ReactNode; // Add optional icon property
    children?: SubNavItem[]; // Add optional children array for nesting
} 