'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Title, Divider } from '@mantine/core';
import { FiSave, FiCopy } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Button as AtomButton } from '@/shared-components/atoms';
import { MarkdownRenderer } from '@/shared-components/molecules/MarkdownRenderer';
import { ResultPreviewProps } from './ResultPreview.types';
import {
    PreviewContainer,
    PreviewHeader,
    CopyButton
} from './ResultPreview.styles';

export const ResultPreview: React.FC<ResultPreviewProps> = ({
    markdown,
    copied,
    saveToFile,
    copyToClipboard,
    previewAnimation
}) => {
    const previewRef = useRef<HTMLDivElement>(null);
    const [hasScrolledToPreview, setHasScrolledToPreview] = useState(false);

    // Scroll to preview ONCE when markdown is first populated
    useEffect(() => {
        if (markdown && previewRef.current && !hasScrolledToPreview) {
            setTimeout(() => {
                previewRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                setHasScrolledToPreview(true); // Set flag to prevent re-scrolling
            }, 300); // Small delay to allow animation and initial rendering
        }
    }, [markdown, hasScrolledToPreview]); // Depend on markdown and the flag

    if (!markdown) return null; // Don't show anything if no markdown

    return (
        <>
            <motion.div
                ref={previewRef}
                initial="hidden"
                animate="visible"
                variants={previewAnimation}
                style={{ maxWidth: '768px', margin: '0 auto', width: '100%' }}
            >
                <Divider my="lg" />
                <PreviewHeader>
                    <Title order={2}>Preview</Title>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <AtomButton
                            onClick={saveToFile}
                            icon={<FiSave size={16} />}
                        >
                            Download .md
                        </AtomButton>
                    </div>
                </PreviewHeader>

                <PreviewContainer>
                    <CopyButton onClick={copyToClipboard}>
                        {copied ? 'Copied!' : <><FiCopy size={14} /> Copy</>}
                    </CopyButton>
                    <MarkdownRenderer content={markdown} />
                </PreviewContainer>
            </motion.div>
        </>
    );
}; 