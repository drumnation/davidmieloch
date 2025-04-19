import React from 'react';
import Image from 'next/image';
import { GroupTitleWrapper, TitleLogoImage } from './GroupDisplay.styles.ts';
import { MediaItem, ExperienceItem as ExperienceItemTypeAliased } from '../../../../ExperienceSection.types'; // Adjust path
import { ModalImage } from '../../../../ExperienceSection.hook'; // Adjust path
import { NestedMediaItem } from '../../../NestedMediaItem'; // Adjust path relative to this file
import { MediaGroupContent } from '../../../../styles/Media.styles'; // Corrected path for MediaGroupContent

// Props specific to Group display
interface GroupDisplayProps {
    mediaItem: MediaItem;
    job: ExperienceItemTypeAliased;
    mediaIndex: number; // Needed for nested keys
    setModalImage?: (image: ModalImage) => void;
}

export const GroupDisplay: React.FC<GroupDisplayProps> = ({
    mediaItem,
    job,
    mediaIndex,
    setModalImage,
}) => {
    const titleLogoSrc = mediaItem.titleLogoPath || job.logoPath;

    return (
        <>
            {mediaItem.title && (
                <GroupTitleWrapper>
                    {mediaItem.showLogo && titleLogoSrc && (
                        <TitleLogoImage
                            src={titleLogoSrc}
                            alt={`${job.company} logo`}
                            style={{
                                marginRight: '8px',
                                borderRadius: mediaItem.logoHasBorderRadius === false ? '0' : '6px',
                                backgroundColor:
                                    mediaItem.logoHasBorderRadius === false ? 'transparent' : '#f8f8f8',
                                padding: mediaItem.logoHasBorderRadius === false ? '0' : '3px',
                                border: mediaItem.logoHasBorder ? '1px solid rgba(0, 0, 0, 0.2)' : 'none',
                                paddingRight: mediaItem.logoHasBorder ? '1px' : '0',
                                paddingBottom: mediaItem.logoHasBorder ? '1px' : '0',
                            }}
                        />
                    )}
                    {mediaItem.title}
                </GroupTitleWrapper>
            )}
            {/* Conditional rendering based on layout */}
            {mediaItem.layout === 'stack' ? (
                <MediaGroupContent>
                    {mediaItem.items?.map((nestedItemData: MediaItem, nestedIndex: number) => (
                        <NestedMediaItem
                            key={`nested-media-${job.company}-${mediaIndex}-${nestedIndex}`}
                            nestedItem={nestedItemData}
                            nestedIndex={nestedIndex}
                            parentJob={job}
                            parentMediaIndex={mediaIndex}
                            isLast={nestedIndex === (mediaItem.items?.length ?? 0) - 1}
                            setModalImage={setModalImage}
                        />
                    ))}
                </MediaGroupContent>
            ) : (
                mediaItem.items?.map((nestedItemData: MediaItem, nestedIndex: number) => (
                    <NestedMediaItem
                        key={`nested-media-${job.company}-${mediaIndex}-${nestedIndex}`}
                        nestedItem={nestedItemData}
                        nestedIndex={nestedIndex}
                        parentJob={job}
                        parentMediaIndex={mediaIndex}
                        isLast={nestedIndex === (mediaItem.items?.length ?? 0) - 1}
                        setModalImage={setModalImage}
                    />
                ))
            )}
        </>
    );
}; 