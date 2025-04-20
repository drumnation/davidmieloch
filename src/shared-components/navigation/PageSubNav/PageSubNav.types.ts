import React from 'react'; // Import React for ReactNode

export interface SubNavItem {
    id: string;
    title: string;
    level: number;
    icon?: React.ReactNode; // Add optional icon property
} 