export interface ResultPreviewProps {
    markdown: string;
    copied: boolean;
    saveToFile: () => void;
    copyToClipboard: () => void;
    previewAnimation: any; // Using any for Framer Motion variants
}
