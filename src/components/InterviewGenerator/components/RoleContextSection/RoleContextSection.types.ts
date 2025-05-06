import { FormValues } from '../../InterviewGenerator.types';

export interface RoleContextSectionProps {
    roleTitle: string;
    domainFocus: string;
    projectContext: string;
    handleChange: (field: string, value: any) => void;
} 