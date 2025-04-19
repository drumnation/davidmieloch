import React from 'react';
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
} from './ProfileSection.styles';
import { ProfileSectionProps } from './ProfileSection.types';

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  photoUrl,
  name,
  headline,
  summary,
  specializingIn,
  className,
  children
}) => {
  return (
    <ProfileContainer className={className}>
      <ProfileDetails>
        <Stack align="center" gap="md" style={{ width: 'auto' }}>
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

          <Stack
            align="center"
            gap="sm"
            style={{ marginLeft: '-30px' }}
          >
            <Group gap="xs" wrap="nowrap">
              <ThemeIcon size="sm" variant="light" color="gray">
                <IconMapPin size="0.9rem" />
              </ThemeIcon>
              <Text size="sm" c="dimmed" ta="center">
                King of Prussia, PA
              </Text>
            </Group>

            <Group gap="xs">
              {socialLinks.map((link: SocialLink) => (
                <Tooltip key={link.name} label={link.name} position="bottom" withArrow>
                  <ActionIcon
                    component="a"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    variant="light"
                    color="gray"
                    radius="xl"
                    aria-label={link.name}
                  >
                    <link.icon size={20} />
                  </ActionIcon>
                </Tooltip>
              ))}
            </Group>

            <Button
              component="a"
              href={PROFILE.SOCIAL_LINKS.RESUME.URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
              size="sm"
              leftSection={<TbBriefcase size={18} />}
              style={{ width: 'fit-content' }}
            >
              Printable Resume
            </Button>
          </Stack>
        </Stack>

        <Stack style={{ flex: 1, position: 'relative' }}>
          <div>
            <ProfileName>{name}</ProfileName>
            <ProfileHeadline>{headline}</ProfileHeadline>
          </div>
          <Divider my={0} />

          <MarkdownRenderer disablePadding={true} content={summary} />

          {specializingIn && specializingIn.length > 0 && (
            <>
              <Divider my="md" />
              <Title order={4} mb="xs">Specializing In:</Title>
              <List
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon color="teal" size={18} radius="xl">
                    <IconCircleCheck size="0.8rem" />
                  </ThemeIcon>
                }
              >
                {specializingIn.map((item: string, index: number) => (
                  <List.Item key={index}>{item}</List.Item>
                ))}
              </List>
            </>
          )}

          {children && (
            <>
              <Divider my="lg" />
              {children}
            </>
          )}
        </Stack>
      </ProfileDetails>
    </ProfileContainer>
  );
}; 