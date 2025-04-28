// Define props and other types here

// Placeholder for the block type until we define it properly
export interface BlockType {
    title: string;
    content: string[] | string; // Allow content to be string or string array
    icon?: React.ReactNode; // Add optional icon prop
    // Add other properties as needed
}

export interface RecursiveJourneyProps {
    blocks: BlockType[];
    className?: string; // Add optional className prop
    // Add other props as needed
} 