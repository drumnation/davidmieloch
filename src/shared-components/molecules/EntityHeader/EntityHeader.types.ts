import React from 'react';

export interface EntityHeaderProps {
    id?: string;
    title: string;
    logoPath?: string;
    /** Array of strings or React nodes to display below the title */
    metadataLines: (string | React.ReactNode)[];
    /** Optional component to render in the top-right (e.g., category pill, link) */
    topRightAccessory?: React.ReactNode;
    /** Determines logo border visibility */
    showLogoBorder?: boolean;
    /** Size of the logo */
    logoSize?: number;
    /** Flag for applying mobile-specific layout adjustments */
    isMobileLayout?: boolean;
    /** Custom CSS class */
    className?: string;
} 