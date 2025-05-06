import { FormValues } from '../../InterviewGenerator.types';
import { Preset } from '../../InterviewGenerator.types';

export interface QuickStartSectionProps {
    presets: Preset[];
    applyPreset: (presetName: string) => void;
} 