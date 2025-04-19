import React from 'react';
import Image from 'next/image';
import {
    ExperienceHeader as StyledExperienceHeader,
    HeaderLeft,
    CompanyLogo,
    HeaderContent as StyledHeaderContent,
    ExperienceTitle,
    ExperienceMetadataRow,
    ExperienceCompany,
    ExperienceDates,
    ExperienceLocation,
} from '../../styles/ExperienceItem.styles'; // Path adjusted up one level
import { stringToColor, LetterAvatar } from '../../../../utils/avatarHelpers'; // Corrected path adjustment
import { isImageFile, MainImageStyle, IframeStyle } from '../../ExperienceSection.utils'; // Path adjusted up one level
import { ExperienceItem as ExperienceItemType } from '../../ExperienceSection.types'; // Path adjusted up one level
import { ExperienceItemHeaderProps } from './ExperienceItemHeader.types'; // Import types

export const ExperienceItemHeader: React.FC<ExperienceItemHeaderProps> = ({
    job,
    renderLogo,
}) => {
    const logoSrc = job.logoPath;

    return (
        <StyledExperienceHeader className="project-header">
            <HeaderLeft>
                <CompanyLogo>
                    {renderLogo ? (
                        renderLogo(job.company)
                    ) : logoSrc && isImageFile(logoSrc) ? (
                        <Image
                            src={logoSrc}
                            alt={`${job.company} logo`}
                            width={60}
                            height={60}
                            style={{
                                ...MainImageStyle,
                                ...(job.showBorder && {
                                    border: '1px solid rgba(0, 0, 0, 0.2)',
                                    padding: '2px',
                                }),
                            }}
                        />
                    ) : logoSrc && logoSrc.endsWith('.html') ? (
                        <iframe
                            src={logoSrc}
                            style={IframeStyle}
                            title={`${job.company} logo`}
                        />
                    ) : (
                        <LetterAvatar
                            name={job.company}
                            bgColor={stringToColor(job.company)}
                        />
                    )}
                </CompanyLogo>
                <StyledHeaderContent>
                    <ExperienceTitle>{job.title}</ExperienceTitle>
                    <ExperienceMetadataRow>
                        <ExperienceCompany>{job.company}</ExperienceCompany>
                        <ExperienceDates>
                            {job.startDate} - {job.endDate}
                        </ExperienceDates>
                        <ExperienceLocation>{job.location}</ExperienceLocation>
                    </ExperienceMetadataRow>
                </StyledHeaderContent>
            </HeaderLeft>
        </StyledExperienceHeader>
    );
}; 