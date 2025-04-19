import React from 'react';
import Image from 'next/image';
import { FoldableContent } from '@shared-components/molecules/FoldableContent';
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer';
// Import local styles
import {
    EmbedVideo,
    EmbedIframe,
    EmbedTitleWrapper,
    MediaDescriptionWrapper,
} from './EmbedDisplay.styles';
// Import types
import { MediaItem, ExperienceItem as ExperienceItemTypeAliased } from '../../../../ExperienceSection.types'; // Adjust path

// Props specific to Embed display
interface EmbedDisplayProps {
    mediaItem: MediaItem;
    job: ExperienceItemTypeAliased;
}

export const EmbedDisplay: React.FC<EmbedDisplayProps> = ({
    mediaItem,
    job,
}) => {
    const titleLogoSrc = mediaItem.titleLogoPath || job.logoPath;

    return (
        <>
            {mediaItem.url &&
                (mediaItem.url.endsWith('.mp4') || mediaItem.url.includes('.mp4#')) ? (
                <EmbedVideo
                    src={mediaItem.url}
                    title={mediaItem.title || `${job.company} video`}
                    controls
                    preload="metadata"
                    poster={mediaItem.thumbnailUrl}
                    style={{ height: typeof mediaItem.height === 'number' ? `${mediaItem.height}px` : (mediaItem.height || '400px') }}
                />
            ) : mediaItem.url ? (
                <EmbedIframe
                    src={mediaItem.url}
                    title={mediaItem.title || `${job.company} embed`}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ height: typeof mediaItem.height === 'number' ? `${mediaItem.height}px` : (mediaItem.height || '400px') }}
                />
            ) : null}
            {mediaItem.title && (
                <EmbedTitleWrapper>
                    {mediaItem.showLogo && titleLogoSrc && (
                        <Image
                            src={titleLogoSrc}
                            alt={`${job.company} logo`}
                            width={20}
                            height={20}
                            style={{
                                width: '20px',
                                height: '20px',
                                objectFit: 'contain',
                                marginRight: '8px',
                                borderRadius: mediaItem.logoHasBorderRadius === false ? '0' : '6px',
                                overflow: 'visible',
                                backgroundColor: mediaItem.logoHasBorderRadius === false ? 'transparent' : '#f8f8f8',
                                padding: mediaItem.logoHasBorderRadius === false ? '0' : '3px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                ...(mediaItem.logoHasBorder && {
                                    border: '1px solid rgba(0, 0, 0, 0.2)',
                                    padding: '1px'
                                })
                            }}
                        />
                    )}
                    {mediaItem.title}
                </EmbedTitleWrapper>
            )}
            {mediaItem.description && (
                <MediaDescriptionWrapper>
                    {mediaItem.foldable ? (
                        <FoldableContent maxHeight={100} customMaxHeight="120px">
                            <MarkdownRenderer
                                content={mediaItem.description || ''}
                                compact={true}
                            />
                        </FoldableContent>
                    ) : (
                        <MarkdownRenderer
                            content={mediaItem.description || ''}
                            compact={true}
                        />
                    )}
                </MediaDescriptionWrapper>
            )}
        </>
    );
};
