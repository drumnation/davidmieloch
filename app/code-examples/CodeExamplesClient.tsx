"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CodeExamples } from '@shared-components/pages/CodeExamples';
import { Repository } from '@shared-components/types/Repository.types';
import { useLoading } from '@contexts/LoadingContext';

interface CodeExamplesClientProps {
    repositories: Repository[];
    rateLimited: boolean;
}

export default function CodeExamplesClient({ repositories, rateLimited }: CodeExamplesClientProps) {
    const { signalPageReady } = useLoading();
    const router = useRouter();

    useEffect(() => {
        if (rateLimited) {
            router.push('/experience');
        }
    }, [rateLimited, router]);

    useEffect(() => {
        if (!rateLimited) {
            signalPageReady();
        }
    }, [signalPageReady, rateLimited]);

    if (rateLimited) {
        return null;
    }

    return <CodeExamples repositories={repositories} />;
} 