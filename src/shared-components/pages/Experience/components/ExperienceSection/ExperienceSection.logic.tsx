import React, { ReactNode } from 'react';

// --- Icon Imports ---
import {
  FaCode, FaDatabase, FaCloud, FaUsers, FaTools, FaChartLine,
  FaLightbulb, FaBook, FaCogs, FaServer, FaMobileAlt, FaUserShield,
  FaPencilAlt, FaFileAlt, FaTasks, FaRocket,
  FaSearch, FaHandshake, FaGlobe, FaRegCheckCircle, FaBug
} from 'react-icons/fa';

// --- Component Imports ---
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer';
import { FoldableContent } from '@shared-components/molecules/FoldableContent';
import { TechnologyList } from './components/TechnologyList/TechnologyList';
import { ExperienceItemHeader } from './components/ExperienceItemHeader/ExperienceItemHeader';
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
  renderLogo?: (company: string) => React.ReactNode,
  setModalImage?: (image: ModalImage) => void,
  setPinnedJob?: (company: string) => void
): React.ReactNode => {
  const jobMedia = job.media || [];

  return (
    <ExperienceItemContainer key={`job-${index}`}>
      {job.technologies && job.technologies.length > 0 && (
        <TechnologyList technologies={job.technologies} />
      )}

      <ExperienceItemHeader job={job} renderLogo={renderLogo} />

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
                  <BulletText>{point}</BulletText>
                </BulletItem>
              ))}
            </BulletList>
          )}

          {jobMedia.length > 0 && (
            <MediaRow>
              {jobMedia.map((mediaItem: MediaItem, mediaIndex: number) => (
                <MediaItemRenderer
                  key={`media-${index}-${mediaIndex}`}
                  mediaItem={mediaItem}
                  job={job}
                  index={index}
                  mediaIndex={mediaIndex}
                  jobMediaLength={jobMedia.length}
                  setModalImage={setModalImage}
                />
              ))}
            </MediaRow>
          )}
        </StyledExperienceDescription>
      </ExperienceContent>
    </ExperienceItemContainer>
  );
};