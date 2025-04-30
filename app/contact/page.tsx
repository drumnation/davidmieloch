'use client';

import { useEffect } from 'react';
import { ContactForm } from '@shared-components/organisms/ContactForm/ContactForm';
import { PageContainer } from '@shared-components/layouts/PageContainer/PageContainer';
import { useLoading } from '@contexts/LoadingContext';
import { Title, Divider, Group } from '@mantine/core';
import styled from 'styled-components';
import { LuMail } from 'react-icons/lu';

const HeaderWrapper = styled.div`
    margin-top: var(--mantine-spacing-xl);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default function ContactPage() {
    const { signalPageReady } = useLoading();

    useEffect(() => {
        signalPageReady();
    }, [signalPageReady]);

    return (
        <PageContainer>
            <HeaderWrapper>
                <Title order={2} fw={600}>
                    <Group gap="xs" align="center" justify="center">
                        <LuMail size="1.8rem" />
                        Let&apos;s Connect
                    </Group>
                </Title>
                <Divider
                    size="sm"
                    color="blue.5"
                    style={{ width: 60, marginTop: 'var(--mantine-spacing-xs)' }}
                />
            </HeaderWrapper>
            <ContactForm />
        </PageContainer>
    );
} 