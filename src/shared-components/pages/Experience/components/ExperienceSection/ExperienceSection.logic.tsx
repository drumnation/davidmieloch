import React, { ReactNode } from 'react';
import styled from 'styled-components';

// --- Icon Imports ---
import {
  FaCode, FaDatabase, FaCloud, FaUsers, FaTools, FaChartLine,
  FaLightbulb, FaBook, FaCogs, FaServer, FaMobileAlt, FaUserShield,
  FaPencilAlt, FaFileAlt, FaTasks, FaRocket,
  FaSearch, FaHandshake, FaGlobe, FaRegCheckCircle, FaBug,
} from 'react-icons/fa';

// --- Component Imports ---
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer';
import { FoldableContent } from '@shared-components/molecules/FoldableContent';
import { ContentCarousel } from '@shared-components/organisms/ContentCarousel';
import { TechnologyList } from './components/TechnologyList/TechnologyList';
import { EntityHeader } from '@shared-components/molecules/EntityHeader';
import { MediaItemRenderer } from './components/MediaItemRenderer/MediaItemRenderer';

// --- Style Imports ---
import {
  CompanyDescription,
  BulletList,
  BulletItem,
  BulletIcon,
  BulletText
} from './ExperienceSection.styles';
import {
  ExperienceItem as ExperienceItemContainer,
  ExperienceContent,
  ExperienceDescription as StyledExperienceDescription,
} from './styles/ExperienceItem.styles';
import { MediaRow } from './styles/Media.styles';

// --- Type Imports ---
import { ExperienceItem as ExperienceItemType, MediaItem } from './ExperienceSection.types';
import { ModalImage } from './ExperienceSection.hook';

// Import ExperienceCarouselContainer from Experience page styles
import { ExperienceCarouselContainer } from '../../Experience.styles';

// --- Helper Functions ---
const getBulletIcon = (text: string) => {
  const lowerText = text.toLowerCase();

  if (lowerText.includes('develop') || lowerText.includes('code') || lowerText.includes('program') || lowerText.includes('implement')) {
    return <FaCode />;
  } else if (lowerText.includes('database') || lowerText.includes('data') || lowerText.includes('sql')) {
    return <FaDatabase />;
  } else if (lowerText.includes('cloud') || lowerText.includes('aws') || lowerText.includes('azure') || lowerText.includes('infrastructure')) {
    return <FaCloud />;
  } else if (lowerText.includes('lead') || lowerText.includes('team') || lowerText.includes('manage') || lowerText.includes('collaborat')) {
    return <FaUsers />;
  } else if (lowerText.includes('tool') || lowerText.includes('build') || lowerText.includes('construct')) {
    return <FaTools />;
  } else if (lowerText.includes('analytics') || lowerText.includes('growth') || lowerText.includes('improve') || lowerText.includes('metric')) {
    return <FaChartLine />;
  } else if (lowerText.includes('design') || lowerText.includes('architec') || lowerText.includes('creat')) {
    return <FaLightbulb />;
  } else if (lowerText.includes('learn') || lowerText.includes('research') || lowerText.includes('study')) {
    return <FaBook />;
  } else if (lowerText.includes('config') || lowerText.includes('settings') || lowerText.includes('setup')) {
    return <FaCogs />;
  } else if (lowerText.includes('server') || lowerText.includes('backend') || lowerText.includes('api')) {
    return <FaServer />;
  } else if (lowerText.includes('mobile') || lowerText.includes('app') || lowerText.includes('responsive')) {
    return <FaMobileAlt />;
  } else if (lowerText.includes('security') || lowerText.includes('protect') || lowerText.includes('privacy')) {
    return <FaUserShield />;
  } else if (lowerText.includes('write') || lowerText.includes('document') || lowerText.includes('review')) {
    return <FaPencilAlt />;
  } else if (lowerText.includes('launch') || lowerText.includes('deploy') || lowerText.includes('release')) {
    return <FaRocket />;
  } else if (lowerText.includes('test') || lowerText.includes('debug') || lowerText.includes('fix')) {
    return <FaBug />;
  } else if (lowerText.includes('client') || lowerText.includes('partner') || lowerText.includes('stakeholder')) {
    return <FaHandshake />;
  } else if (lowerText.includes('global') || lowerText.includes('international') || lowerText.includes('worldwide')) {
    return <FaGlobe />;
  } else if (lowerText.includes('complete') || lowerText.includes('achieve') || lowerText.includes('success') || lowerText.includes('deliver')) {
    return <FaRegCheckCircle />;
  } else if (lowerText.includes('search') || lowerText.includes('find') || lowerText.includes('discover')) {
    return <FaSearch />;
  } else if (lowerText.includes('task') || lowerText.includes('project')) {
    return <FaTasks />;
  } else if (lowerText.includes('file') || lowerText.includes('report') || lowerText.includes('document')) {
    return <FaFileAlt />;
  } else {
    return <FaRegCheckCircle />;
  }
};

// --- Render Experience Item Logic ---
export const renderExperienceItem = (
  job: ExperienceItemType,
  index: number,
  generateId: (item: ExperienceItemType) => string,
  renderLogo?: (company: string) => React.ReactNode,
  setModalImage?: (image: ModalImage) => void,
  setPinnedJob?: (company: string) => void,
  showTechLabels: boolean = true
): React.ReactNode => {
  const jobMedia = job.media || [];
  const isMobileLayout = !showTechLabels;

  // Filter media items based on the new flag - REMOVE FILTERING
  // const carouselItems = jobMedia.filter(item => item.useMobileCarousel);
  // const regularItems = jobMedia.filter(item => !item.useMobileCarousel);

  // Define common rendering function for a single media item
  const renderSingleMediaItem = (mediaItem: MediaItem, mediaIndex: number) => (
    <MediaItemRenderer
      key={`media-${index}-${mediaIndex}`}
      mediaItem={mediaItem}
      job={job}
      index={index}
      mediaIndex={mediaIndex}
      jobMediaLength={jobMedia.length} // Still pass total length for context if needed
      setModalImage={setModalImage}
      isMobileLayout={isMobileLayout} // Pass mobile layout flag
    />
  );

  return (
    <ExperienceItemContainer key={`job-${index}`} id={generateId(job)}>
      {job.technologies && job.technologies.length > 0 && (
        <TechnologyList technologies={job.technologies} showLabels={showTechLabels} />
      )}

      <EntityHeader
        title={job.title}
        logoPath={job.logoPath}
        showLogoBorder={job.showBorder}
        metadataLines={[
          // Combine Company, Dates, and Location into a single line with bullet separators
          [
            job.company,
            (job.startDate && job.endDate) ? `${job.startDate} – ${job.endDate}` : undefined,
            job.location
          ].filter(Boolean).join(' • ') // Filter out undefined/empty parts and join with bullets
        ]}
        isMobileLayout={isMobileLayout}
        logoSize={60} // Original Experience logo size
      // No topRightAccessory needed for experience items currently
      />

      <ExperienceContent>
        <StyledExperienceDescription>
          {job.description && (
            job.foldable ? (
              <FoldableContent maxHeight={200} customMaxHeight="250px">
                <CompanyDescription>
                  <MarkdownRenderer
                    content={job.description}
                    compact={true}
                  />
                </CompanyDescription>
              </FoldableContent>
            ) : (
              <CompanyDescription>
                <MarkdownRenderer
                  content={job.description}
                  compact={true}
                />
              </CompanyDescription>
            )
          )}

          {job.bulletPoints && job.bulletPoints.length > 0 && (
            <BulletList>
              {job.bulletPoints.map((point: string, i: number) => (
                <BulletItem key={`point-${index}-${i}`}>
                  <BulletIcon>{getBulletIcon(point)}</BulletIcon>
                  <BulletText>
                    <MarkdownRenderer
                      content={point}
                      compact={true}
                    />
                  </BulletText>
                </BulletItem>
              ))}
            </BulletList>
          )}

          {/* --- Media Rendering Logic --- */}
          {isMobileLayout ? (
            <> { /* Render mobile layout */}
              {/* Only render Carousel if more than one media item */}
              {jobMedia.length > 1 ? (
                <ExperienceCarouselContainer> { /* Use Experience specific wrapper */}
                  <ContentCarousel scrollIntoViewOnSelect={true}>
                    {jobMedia.map((item, idx) => (
                      // Pass the rendered item directly as a child
                      renderSingleMediaItem(item, idx)
                    ))}
                  </ContentCarousel>
                </ExperienceCarouselContainer>
              ) : jobMedia.length === 1 ? (
                // Render single item directly if only one exists
                renderSingleMediaItem(jobMedia[0], 0)
              ) : null /* No media items - Moved comment inside */}
            </>
          ) : (
            // Render desktop layout: All items in a single MediaRow
            jobMedia.length > 0 && (
              <MediaRow>
                {jobMedia.map((item, idx) => renderSingleMediaItem(item, idx))} { /* Use original index for key */}
              </MediaRow>
            )
          )}
        </StyledExperienceDescription>
      </ExperienceContent>
    </ExperienceItemContainer>
  );
};