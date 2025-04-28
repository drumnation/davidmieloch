'use client';

import React from 'react';
import { GenericSection } from '../GenericSection/GenericSection';
import { GenericSectionProps } from '../GenericSection/GenericSection.types';

export type SectionProps = GenericSectionProps;

export const Section: React.FC<SectionProps> = (props) => {
    return <GenericSection {...props} />;
};

export default Section; 