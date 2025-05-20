export interface ProblemCardsProps {
    problems: Array<{
        title: string;
        description: string;
        plainTextContent?: string;
        codeExample?: string;
    }>;
    style?: string;
    className?: string;
} 