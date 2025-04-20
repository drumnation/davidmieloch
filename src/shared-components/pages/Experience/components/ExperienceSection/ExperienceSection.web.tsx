import React from 'react';
import {
    SectionContainer,
} from './ExperienceSection.styles';

import { ExperienceSectionProps, ExperienceItem as ExperienceItemType } from './ExperienceSection.types';
import { WORK_EXPERIENCE, OLDER_EXPERIENCE, SECTION_TITLE } from '@shared-components/pages/Experience/components/ExperienceSection/ExperienceSection.constants';

import { useExperienceSection } from './ExperienceSection.hook';
import { renderExperienceItem } from './ExperienceSection.logic';
import { Accordion } from './components/Accordion/Accordion';
import { ImageModal } from './components/ImageModal/ImageModal';
import { sortExperiencesByDate } from './ExperienceSection.utils';

export const ExperienceSectionWeb: React.FC<ExperienceSectionProps> = ({
    experiences,
    title = SECTION_TITLE,
    className = '',
    children,
    renderLogo,
    generateId,
}: ExperienceSectionProps) => {
    // Use the custom hook for state management
    const {
        modalImage,
        openModal,
        closeModal,
        setPinnedJob,
    } = useExperienceSection();

    // Use data directly from import
    const hasOlderExperience = OLDER_EXPERIENCE && OLDER_EXPERIENCE.length > 0;
    const currentExperiences = experiences || WORK_EXPERIENCE; // Use prop if provided, otherwise default to imported data

    // Optional: Keep console log for debugging if needed
    console.log(
        'Experience items with media:',
        currentExperiences // Use the resolved experiences
            .filter((exp: ExperienceItemType) => exp.media?.length)
            .map((exp: ExperienceItemType) => ({ company: exp.company, mediaCount: exp.media?.length || 0 }))
    );

    return (
        <SectionContainer className={className}>
            <h2>{title}</h2>

            {children}

            {/* Render current experiences */}
            {currentExperiences.map((job: ExperienceItemType, index: number) => (
                <React.Fragment key={`job-${index}`}>
                    {renderExperienceItem(job, index, generateId, renderLogo, openModal, setPinnedJob, true)}
                </React.Fragment>
            ))}

            {/* Render older experiences within an accordion */}
            {hasOlderExperience && (
                <Accordion
                    title={`Previous Sales & Marketing Experience (${OLDER_EXPERIENCE.length} Positions)`}
                    subtitle="Click to expand and see earlier sales and marketing positions from 2004-2016"
                    initiallyOpen={true}
                >
                    {[...OLDER_EXPERIENCE]
                        .sort(sortExperiencesByDate)
                        .map((job, index) => (
                            <React.Fragment key={`older-job-${index}`}>
                                {renderExperienceItem(job as ExperienceItemType, index, generateId, renderLogo, openModal, setPinnedJob, true)}
                            </React.Fragment>
                        ))}
                </Accordion>
            )}

            {/* Image Modal */}
            {modalImage && (
                <ImageModal
                    imageUrl={modalImage.url}
                    imageTitle={modalImage.title}
                    onClose={closeModal}
                />
            )}
        </SectionContainer>
    );
}; 