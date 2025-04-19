import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';

import {
  ProfileContainer,
} from './ProfileSection.styles';
import { ProfileSectionProps } from './ProfileSection.types';
import { ProfileSectionMobile } from './ProfileSection.mobile';
import { ProfileSectionWeb } from './ProfileSection.web';

export const ProfileSection: React.FC<ProfileSectionProps> = (props) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  if (isMobile) {
    return <ProfileSectionMobile {...props} className={props.className} />;
  }

  return (
    <ProfileContainer className={props.className}>
      <ProfileSectionWeb {...props} />
    </ProfileContainer>
  );
}; 