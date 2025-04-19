import React from 'react';
import Image from 'next/image';
import {
    EducationItem,
    SchoolLogo,
    EducationContent,
    EducationSchool,
    EducationMetadataRow,
    EducationDegree,
    EducationDates,
    EducationDescription,
    MediaRow,
} from '../../EducationSection.styles';
import { EducationItemDisplayProps } from './EducationItemDisplay.types';
import { isImageFile } from '../../EducationSection.utils';
import { stringToColor, LetterAvatar } from '../../../../utils/avatarHelpers';
import { MediaItemDisplay } from '../MediaItemDisplay';
import { MediaItem } from '../../EducationSection.types';

export const EducationItemDisplay: React.FC<EducationItemDisplayProps> = ({
    educationItem: edu,
    renderLogo,
    onImageClick
}) => {
    const renderDefaultLogo = () => {
        if (edu.logoPath && isImageFile(edu.logoPath)) {
            return (
                <Image
                    src={edu.logoPath}
                    alt={`${edu.school} logo`}
                    width={64}
                    height={64}
                />
            );
        } else if (edu.logoPath && edu.logoPath.endsWith('.html')) {
            return (
                <iframe
                    src={edu.logoPath}
                    title={`${edu.school} logo`}
                />
            );
        } else {
            return (
                <LetterAvatar
                    name={edu.school}
                    bgColor={stringToColor(edu.school)}
                />
            );
        }
    };

    return (
        <EducationItem>
            <SchoolLogo>
                {renderLogo ? renderLogo(edu.school) : renderDefaultLogo()}
            </SchoolLogo>

            <EducationContent>
                <EducationSchool>{edu.school}</EducationSchool>
                <EducationMetadataRow>
                    <EducationDegree>
                        {edu.degree}{edu.degree && edu.fieldOfStudy ? ', ' : ''}{edu.fieldOfStudy}
                    </EducationDegree>
                    <EducationDates>{edu.startDate} - {edu.endDate}</EducationDates>
                </EducationMetadataRow>
                {edu.description && (
                    <EducationDescription>{edu.description}</EducationDescription>
                )}

                {edu.media && edu.media.length > 0 && (
                    <MediaRow>
                        {edu.media.map((mediaItem: MediaItem, mediaIndex: number) => (
                            <MediaItemDisplay
                                key={`media-${edu.school}-${mediaIndex}`}
                                mediaItem={mediaItem}
                                schoolName={edu.school}
                                onImageClick={onImageClick}
                            />
                        ))}
                    </MediaRow>
                )}
            </EducationContent>
        </EducationItem>
    );
}; 