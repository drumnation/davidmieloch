import React from 'react';
import Image from 'next/image';
import { FoldableContent } from '@shared-components/molecules/FoldableContent';
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer';
import {
  NestedMediaItemWrapper,
  NestedMediaTitleWrapper,
  NestedMediaDescriptionWrapper,
  TitleLogoImage,
} from './NestedMediaItem.styles';
import { NestedMediaImageStyle } from '../../ExperienceSection.utils'; // Adjust path
import { MediaItem, ExperienceItem as ExperienceItemType } from '../../ExperienceSection.types'; // Adjust path
import { ModalImage } from '../../ExperienceSection.hook'; // Adjust path

interface NestedMediaItemProps {
  nestedItem: MediaItem;
  nestedIndex: number;
  parentJob: ExperienceItemType;
  parentMediaIndex: number;
  isLast: boolean;
  setModalImage?: (image: ModalImage) => void;
}

export const NestedMediaItem: React.FC<NestedMediaItemProps> = ({
  nestedItem,
  nestedIndex,
  parentJob,
  parentMediaIndex,
  isLast,
  setModalImage,
}) => {
  const nestedTitleLogoSrc = nestedItem.titleLogoPath || parentJob.logoPath;

  if (nestedItem.type === 'image') {
    return (
      <NestedMediaItemWrapper
        key={`nested-media-${parentJob.company}-${parentMediaIndex}-${nestedIndex}`}
        $isLast={isLast}
      >
        {nestedItem.url && (
          <Image
            src={nestedItem.url}
            alt={nestedItem.title || `${parentJob.company} image`}
            layout="responsive"
            width={1600}
            height={900}
            loading="lazy"
            style={NestedMediaImageStyle as React.CSSProperties}
            onClick={() => {
              if (setModalImage && nestedItem.url) {
                setModalImage({
                  url: nestedItem.url,
                  title: nestedItem.title || `${parentJob.company} image`,
                });
              }
            }}
          />
        )}
        {nestedItem.title && (
          <NestedMediaTitleWrapper $isLast={isLast}>
            {nestedItem.showLogo && nestedTitleLogoSrc && (
              <TitleLogoImage
                src={nestedTitleLogoSrc}
                alt={`${parentJob.company} logo`}
                style={{
                  borderRadius:
                    nestedItem.logoHasBorderRadius === false ? '0' : '6px',
                  backgroundColor:
                    nestedItem.logoHasBorderRadius === false
                      ? 'transparent'
                      : '#f8f8f8',
                  padding: nestedItem.logoHasBorderRadius === false ? '0' : '3px',
                  border: nestedItem.logoHasBorder ? '1px solid rgba(0, 0, 0, 0.2)' : 'none',
                  paddingRight: nestedItem.logoHasBorder ? '1px' : '0',
                  paddingBottom: nestedItem.logoHasBorder ? '1px' : '0',
                }}
              />
            )}
            {nestedItem.title}
          </NestedMediaTitleWrapper>
        )}
        {nestedItem.description && (
          <NestedMediaDescriptionWrapper>
            {nestedItem.foldable ? (
              <FoldableContent maxHeight={100} customMaxHeight="120px">
                <MarkdownRenderer
                  content={nestedItem.description || ''}
                  compact={true}
                />
              </FoldableContent>
            ) : (
              <MarkdownRenderer
                content={nestedItem.description || ''}
                compact={true}
              />
            )}
          </NestedMediaDescriptionWrapper>
        )}
      </NestedMediaItemWrapper>
    );
  }
  // Add handling for other types if necessary in the future
  return null;
}; 