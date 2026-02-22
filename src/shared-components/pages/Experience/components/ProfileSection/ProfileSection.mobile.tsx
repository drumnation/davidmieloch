import React from 'react';
import Image from 'next/image';
import {
    Stack,
    Text,
    Group,
    ActionIcon,
    Tooltip,
    Button,
    ThemeIcon,
    Divider,
    Title,
    List,
} from '@mantine/core';
import {
    IconCircleCheck,
    IconBriefcase as TbBriefcase,
    IconMapPin,
} from '@tabler/icons-react';
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer';
import { socialLinks } from '@shared-components/organisms/Header/Header.logic';
import { SocialLink } from '@shared-components/organisms/Header/Header.types';
import { PROFILE } from './ProfileSection.constants';
import {
    ProfileDetails, // Use the same container, it should center items vertically on mobile
    ProfileImageWrapper,
    ProfileName,
    ProfileHeadline,
} from './ProfileSection.styles';
import { ProfileSectionProps } from './ProfileSection.types';

export const ProfileSectionMobile: React.FC<ProfileSectionProps> = ({
    photoUrl,
    name,
    headline,
    summary,
    specializingIn,
    children,
}) => {
    return (
        // ProfileDetails should handle the column layout and centering
        <ProfileDetails>
            {/* Stack for all centered content */}
            <Stack align="center" gap="md">
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
                            height: '100%',
                        }}
                        priority
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.src = '/web-app-manifest-192x192.png';
                        }}
                    />
                </ProfileImageWrapper>

                <ProfileName>{name}</ProfileName>

                <Group gap="xs" wrap="nowrap">
                    <ThemeIcon size="sm" variant="light" color="blue">
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

                <ProfileHeadline>{headline}</ProfileHeadline>

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

            {/* Stack for the rest of the content (summary, specializingIn, children) - kept separate to allow for potential dividers */}
            <Stack style={{ width: '100%' }} mt="xl" gap="lg">
                <Divider />
                <MarkdownRenderer disablePadding={true} content={summary} />

                {specializingIn && specializingIn.length > 0 && (
                    <>
                        <Divider my="md" />
                        <Title order={4} mb="xs">
                            Specializing In:
                        </Title>
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
    );
}; 