import React from 'react';
import Image from 'next/image';
import { Stack } from '@mantine/core';
import { 
  ProfileContainer, 
  ProfileDetails, 
  ProfileImageWrapper, 
  ProfileName, 
  ProfileHeadline, 
  ProfileActionsContainer, 
  ProfileSummary 
} from './ProfileSection.styles';
import { ProfileSectionProps } from './ProfileSection.types';

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  photoUrl,
  name,
  headline,
  summary,
  className,
  children,
  profileActions
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
            style={{ objectFit: 'cover', borderRadius: '50%' }}
            priority
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = "/web-app-manifest-192x192.png";
            }}
          />
        </ProfileImageWrapper>
        
        <Stack style={{ flex: 1 }}>
          <ProfileName>{name}</ProfileName>
          <ProfileHeadline>{headline}</ProfileHeadline>
          
          {profileActions && (
            <ProfileActionsContainer>
              {profileActions}
            </ProfileActionsContainer>
          )}
          
          <ProfileSummary>{summary}</ProfileSummary>
          
          {children}
        </Stack>
      </ProfileDetails>
    </ProfileContainer>
  );
}; 