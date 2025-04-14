import React from 'react';
import Image from 'next/image';
import { Stack } from '@mantine/core';
import { 
  ProfileContainer, 
  ProfileDetails, 
  ProfileImageWrapper, 
  ProfileName, 
  ProfileHeadline, 
  ProfileSummary,
  ResumeButton
} from './ProfileSection.styles';
import { ProfileSectionProps } from './ProfileSection.types';

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  photoUrl,
  name,
  headline,
  summary,
  className,
  children
}) => {
  return (
    <ProfileContainer className={className}>
      <ProfileDetails>
        <ProfileImageWrapper>
          <Image 
            src={photoUrl} 
            alt={name} 
            width={200} 
            height={200}
            style={{ 
              objectFit: 'cover', 
              borderRadius: '50%',
              width: '100%',
              height: '100%'
            }}
            priority
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = "/web-app-manifest-192x192.png";
            }}
          />
        </ProfileImageWrapper>
        
        <Stack style={{ flex: 1, position: 'relative' }}>
          <div>
            <ProfileName>{name}</ProfileName>
            <ProfileHeadline>{headline}</ProfileHeadline>
          </div>
          
          <ProfileSummary>{summary}</ProfileSummary>
          
          {children}
        </Stack>
      </ProfileDetails>
    </ProfileContainer>
  );
}; 