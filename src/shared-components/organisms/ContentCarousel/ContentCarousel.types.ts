import { Embla } from '@mantine/carousel';
import React from 'react';

export interface ContentCarouselProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    scrollIntoViewOnSelect?: boolean;
    getEmblaApi?: (embla: Embla | null) => void;
    // Add other Mantine Carousel props if needed for customization
} 