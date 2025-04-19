import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import Image from 'next/image';
import {
  Stack,
  Divider,
  Title,
  List,
  ThemeIcon,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  Button,
  Box,
  Flex
} from '@mantine/core';
import {
  IconCircleCheck,
  IconBriefcase as TbBriefcase,
  IconMapPin
} from '@tabler/icons-react';
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer';
import { socialLinks } from '@shared-components/organisms/Header/Header.logic';
import { SocialLink } from '@shared-components/organisms/Header/Header.types';
import { PROFILE } from './ProfileSection.constants';
import {
  ProfileContainer,
  ProfileDetails,
  ProfileImageWrapper,
  ProfileName,
  ProfileHeadline,
  ProfileMetaStack,
} from './ProfileSection.styles';
import { ProfileSectionProps } from './ProfileSection.types';
import { ProfileSectionMobile } from './ProfileSection.mobile';
import { ProfileSectionWeb } from './ProfileSection.web';

export const ProfileSection: React.FC<ProfileSectionProps> = (props) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <ProfileContainer className={props.className}>
      {isMobile ? (
        <ProfileSectionMobile {...props} />
      ) : (
        <ProfileSectionWeb {...props} />
      )}
    </ProfileContainer>
  );
}; 