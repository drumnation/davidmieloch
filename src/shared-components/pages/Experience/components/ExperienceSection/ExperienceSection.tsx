import React, { useState, ReactNode, MouseEvent } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {
  SectionContainer,
} from './ExperienceSection.styles';
import {
  ExperienceItem,
  CompanyLogo,
  ExperienceContent,
  ExperienceTitle,
  ExperienceMetadataRow,
  ExperienceCompany,
  ExperienceDates,
  ExperienceLocation,
  ExperienceDescription,
  ExperienceHeader,
  HeaderLeft,
  HeaderContent,
} from './styles/ExperienceItem.styles';
import {
  MediaRow,
  MediaContainer,
} from './styles/Media.styles';
import { ExperienceSectionProps, ExperienceItem as ExperienceItemType, MediaItem } from './ExperienceSection.types';
import { stringToColor, LetterAvatar } from '../../utils/avatarHelpers';
import { WORK_EXPERIENCE, OLDER_EXPERIENCE, SECTION_TITLE } from '@shared-components/pages/Experience/components/ExperienceSection/ExperienceSection.constants';
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer/index';
import { FoldableContent } from '@shared-components/molecules/FoldableContent/index';
import { TechIcon } from '@shared-components/atoms/TechIcon/index';
// Import icons for bullet points

import {
  FaCode, FaDatabase, FaCloud, FaUsers, FaTools, FaChartLine,
  FaLightbulb, FaBook, FaCogs, FaServer, FaMobileAlt, FaUserShield,
  FaPencilAlt, FaFileAlt, FaTasks, FaRocket, // Removed FaLock, FaUserCog
  FaSearch, FaHandshake, FaGlobe, FaRegCheckCircle, FaBug
} from 'react-icons/fa';

import { useExperienceSection } from './ExperienceSection.hook';
import { renderExperienceItem } from './ExperienceSection.logic';
import { Accordion } from './components/Accordion/Accordion';
import { ImageModal } from './components/ImageModal/ImageModal';
import { sortExperiencesByDate } from './ExperienceSection.utils';

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
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
          {renderExperienceItem(job, index, renderLogo, openModal, setPinnedJob)}
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
                {/* Pass openModal (renamed from setModalImage) and setPinnedJob */}
                {renderExperienceItem(job as ExperienceItemType, index, renderLogo, openModal, setPinnedJob)}
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