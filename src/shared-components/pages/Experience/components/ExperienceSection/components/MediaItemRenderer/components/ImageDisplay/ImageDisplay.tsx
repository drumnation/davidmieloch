import React from 'react';
import Image from 'next/image';
import { FoldableContent } from '@shared-components/molecules/FoldableContent';
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer';
// Import styles locally
import {
    MediaImageWrapper,
    MediaTitleWrapper,
    MediaDescriptionWrapper,
} from './ImageDisplay.styles';
// Import style object from utils
import { MainImageStyle } from '../../../../ExperienceSection.utils'; // Corrected name
import {
    MediaItem,
    ExperienceItem as ExperienceItemTypeAliased,
} from '../../../../ExperienceSection.types'; // Corrected path
import { ModalImage } from '../../../../ExperienceSection.hook'; // Corrected path

// Props likely similar to what MediaItemRenderer receives, but specific to image
interface ImageDisplayProps {
    mediaItem: MediaItem;
    job: ExperienceItemTypeAliased;
    setModalImage?: (image: ModalImage) => void;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({
    mediaItem,
    job,
    setModalImage,
}) => {
    const titleLogoSrc = mediaItem.titleLogoPath || job.logoPath;

    return (
        <>
            <MediaImageWrapper>
                {mediaItem.url && (
                    <Image
                        src={mediaItem.url}
                        alt={mediaItem.title || `${job.company} image`}
                        width={800} // Consider making these configurable if needed
                        height={450}
                        style={MainImageStyle as React.CSSProperties} // Use corrected name
                        onClick={() => {
                            if (setModalImage && mediaItem.url) {
                                setModalImage({
                                    url: mediaItem.url,
                                    title: mediaItem.title || `${job.company} image`,
                                });
                            }
                        }}
                        loading="lazy"
                    />
                )}
            </MediaImageWrapper>
            {mediaItem.title && (
                <div style={{
                    padding: '12px 15px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    backgroundColor: '#f9f9f9',
                    borderTop: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center'
                }}>
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
                </div>
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
