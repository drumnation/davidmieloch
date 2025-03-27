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
  ProfileSummary,
  ResumeButtonContainer,
  ResumeButton
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
        
        <Stack style={{ flex: 1, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <ProfileName>{name}</ProfileName>
              <ProfileHeadline>{headline}</ProfileHeadline>
            </div>
            
            <ResumeButtonContainer>
              <ResumeButton href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM16 12V9C16 8.45 15.55 8 15 8H13V13H15C15.55 13 16 12.55 16 12ZM14 9H15V12H14V9ZM18 11H19V10H18V9H19V8H17V13H18V11ZM10 11H11C11.55 11 12 10.55 12 10V9C12 8.45 11.55 8 11 8H9V13H10V11ZM10 9H11V10H10V9Z" fill="white"/>
                </svg>
                Resume
              </ResumeButton>
            </ResumeButtonContainer>
          </div>
          
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