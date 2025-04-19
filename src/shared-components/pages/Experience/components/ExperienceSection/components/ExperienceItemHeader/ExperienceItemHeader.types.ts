import React from 'react';
import { ExperienceItem as ExperienceItemType } from '../../ExperienceSection.types'; // Adjust path

export interface ExperienceItemHeaderProps {
    job: ExperienceItemType;
    renderLogo?: (company: string) => React.ReactNode;
} 