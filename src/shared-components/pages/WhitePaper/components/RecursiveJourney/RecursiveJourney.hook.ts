import { useState, useEffect } from 'react';
import { RecursiveJourneyProps, BlockType } from './RecursiveJourney.types';
import { RECURSIVE_JOURNEY_CONTENT } from './RecursiveJourney.constants.tsx';

export const useRecursiveJourney = (props: RecursiveJourneyProps) => {
    const { className } = props;
    const [exampleContent, setExampleContent] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);

    // Load all required example files on component mount
    useEffect(() => {
        const loadExampleContent = async () => {
            setIsLoading(true);
            const contentMap: Record<string, string> = {};

            try {
                // Load all the example files
                const exampleFiles = RECURSIVE_JOURNEY_CONTENT.blocks
                    .flatMap((block: BlockType) => [block.exampleFile, block.secondExampleFile])
                    .filter(Boolean) as string[];

                // Use Set to deduplicate example files
                const uniqueExampleFiles = [...new Set(exampleFiles)];

                // Load each file
                await Promise.all(
                    uniqueExampleFiles.map(async (fileName) => {
                        try {
                            const response = await fetch(`/examples/${fileName}`);
                            if (response.ok) {
                                const text = await response.text();
                                contentMap[fileName] = text;
                            } else {
                                console.error(`Failed to load example file: ${fileName}`);
                                contentMap[fileName] = `Error loading ${fileName}: ${response.statusText}`;
                            }
                        } catch (err) {
                            console.error(`Error fetching ${fileName}:`, err);
                            contentMap[fileName] = `Error: Could not load ${fileName}`;
                        }
                    })
                );
            } catch (err) {
                console.error('Error loading examples:', err);
            } finally {
                setExampleContent(contentMap);
                setIsLoading(false);
            }
        };

        loadExampleContent();
    }, []);

    // TODO: Define actual block content, perhaps load from constants or fetch dynamically
    const blocks = RECURSIVE_JOURNEY_CONTENT.blocks; // Using placeholder from constants

    // TODO: Potentially implement reveal logic for animations
    const revealedBlocks = blocks; // Placeholder

    // TODO: Generate or fetch timeline items if needed
    const timelineItems: any[] = []; // Placeholder

    // Using placeholder nav IDs from constants
    const blockNavIds = RECURSIVE_JOURNEY_CONTENT.blockNavIds;

    return {
        className,
        enhancedHeroProps: RECURSIVE_JOURNEY_CONTENT.hero,
        blocks,
        revealedBlocks, // Return revealedBlocks if animation is implemented
        introduction: RECURSIVE_JOURNEY_CONTENT.introduction,
        conclusion: RECURSIVE_JOURNEY_CONTENT.conclusion,
        exampleContent,
        isLoading,
        timelineItems,
        blockNavIds,
        cta: RECURSIVE_JOURNEY_CONTENT.cta
    };
}; 