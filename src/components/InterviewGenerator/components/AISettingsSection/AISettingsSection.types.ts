export interface AISettingsSectionProps {
    aiMaturityLevel: string;
    assessmentFormat: string;
    timeLimit: string;
    timeOptions: { value: string; label: string }[];
    handleChange: (field: string, value: any) => void;
} 