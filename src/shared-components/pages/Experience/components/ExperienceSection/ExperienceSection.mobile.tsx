import React from 'react';
import styled from 'styled-components';
import { MantineTheme, useMantineTheme } from '@mantine/core';

import { ExperienceSectionProps, ExperienceItem as ExperienceItemType } from './ExperienceSection.types';
import { WORK_EXPERIENCE, OLDER_EXPERIENCE, SECTION_TITLE } from '@shared-components/pages/Experience/components/ExperienceSection/ExperienceSection.constants';

import { useExperienceSection } from './ExperienceSection.hook';
import { renderExperienceItem } from './ExperienceSection.logic';
import { Accordion } from './components/Accordion/Accordion';
import { ImageModal } from './components/ImageModal/ImageModal';
import { sortExperiencesByDate } from './ExperienceSection.utils';

// Basic container for mobile layout without card styles
const MobileContainer = styled.div`
  margin-bottom: 24px; // Keep the bottom margin

  h2 {
    font-size: 1.25rem;
    margin-bottom: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
  }
`;

export const ExperienceSectionMobile: React.FC<ExperienceSectionProps> = ({
    experiences,
    title = SECTION_TITLE,
    className = '',
    children,
    renderLogo,
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

    // Removed console.log for production

    return (
        <MobileContainer className={className}>
            <h2>{title}</h2>

            {/* Render current experiences - pass showTechLabels={false} */}
            {currentExperiences.map((job: ExperienceItemType, index: number) => (
                <React.Fragment key={`job-${index}`}>
                    {renderExperienceItem(job, index, renderLogo, openModal, setPinnedJob, false)}
                </React.Fragment>
            ))}

            {/* Render older experiences - pass showTechLabels={false} */}
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
                                {renderExperienceItem(job as ExperienceItemType, index, renderLogo, openModal, setPinnedJob, false)}
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
        </MobileContainer>
    );
}; 