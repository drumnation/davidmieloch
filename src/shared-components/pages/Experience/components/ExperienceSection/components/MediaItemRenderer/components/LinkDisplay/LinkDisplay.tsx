import React from 'react';
import Image from 'next/image';
import { FoldableContent } from '@shared-components/molecules/FoldableContent';
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer';
import { FaLink, FaExternalLinkAlt } from 'react-icons/fa';
import {
    LinkThumbnailWrapper,
    LinkThumbnailAnchor,
    LinkPlaceholder,
    LinkContentWrapper,
    LinkTitle,
    LinkDescriptionWrapper,
    LinkButtonAnchor,
    TitleLogoImage,
} from './LinkDisplay.styles';
import { LinkThumbnailImageStyle } from '../../../../ExperienceSection.utils';
import { MediaItem, ExperienceItem as ExperienceItemTypeAliased } from '../../../../ExperienceSection.types';

interface LinkDisplayProps {
    mediaItem: MediaItem;
    job: ExperienceItemTypeAliased;
}

export const LinkDisplay: React.FC<LinkDisplayProps> = ({
    mediaItem,
    job,
}) => {
    const titleLogoSrc = mediaItem.titleLogoPath || job.logoPath;

    return (
        <>
            <LinkThumbnailWrapper>
                {mediaItem.thumbnailUrl ? (
                    <LinkThumbnailAnchor href={mediaItem.url || '#'} target="_blank" rel="noopener noreferrer">
                        <Image
                            src={mediaItem.thumbnailUrl}
                            alt={mediaItem.title || 'Blog post'}
                            width={300}
                            height={225}
                            style={LinkThumbnailImageStyle as React.CSSProperties}
                            loading="lazy"
                        />
                    </LinkThumbnailAnchor>
                ) : (
                    <LinkPlaceholder>
                        <FaLink size={48} color="#A0AEC0" />
                        <span className="placeholder-text">Article Preview</span>
                    </LinkPlaceholder>
                )}
            </LinkThumbnailWrapper>
            <LinkContentWrapper>
                <LinkTitle>
                    {mediaItem.showLogo && titleLogoSrc && (
                        <TitleLogoImage
                            src={titleLogoSrc}
                            alt={`${job.company} logo`}
                            style={{
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
                </LinkTitle>
                <LinkDescriptionWrapper>
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
                </LinkDescriptionWrapper>
                <LinkButtonAnchor href={mediaItem.url || '#'} target="_blank" rel="noopener noreferrer">
                    View Article
                    <FaExternalLinkAlt size={16} />
                </LinkButtonAnchor>
            </LinkContentWrapper>
        </>
    );
};
