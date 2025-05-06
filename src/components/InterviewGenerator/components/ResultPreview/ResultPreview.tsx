'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Title, Divider, Modal } from '@mantine/core';
import { FiSave, FiCopy, FiMaximize } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Button as AtomButton } from '@/shared-components/atoms';
import { MarkdownRenderer } from '@/shared-components/molecules/MarkdownRenderer';
import { ResultPreviewProps } from './ResultPreview.types';
import {
    PreviewContainer,
    PreviewHeader,
    CopyButton,
    ModalContent
} from './ResultPreview.styles';

export const ResultPreview: React.FC<ResultPreviewProps> = ({
    markdown,
    copied,
    saveToFile,
    copyToClipboard,
    previewAnimation
}) => {
    const previewRef = useRef<HTMLDivElement>(null);
    const [displayedMarkdown, setDisplayedMarkdown] = useState('');
    const [hasScrolledToPreview, setHasScrolledToPreview] = useState(false);

    // Typewriter effect for markdown
    useEffect(() => {
        if (markdown) {
            setDisplayedMarkdown(''); // Reset if markdown changes
            setHasScrolledToPreview(false); // Reset scroll flag when new markdown arrives
            let i = 0;
            const interval = setInterval(() => {
                setDisplayedMarkdown((prev) => prev + markdown.charAt(i));
                i++;
                if (i >= markdown.length) {
                    clearInterval(interval);
                }
            }, 20); // Adjust speed as needed (e.g., 20ms per character)
            return () => clearInterval(interval);
        }
    }, [markdown]);

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

    if (!markdown) return null; // Show component as soon as markdown is available, typewriter will fill it

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
                    <MarkdownRenderer content={displayedMarkdown} />
                </PreviewContainer>
            </motion.div>
        </>
    );
}; 