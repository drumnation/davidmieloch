'use client';

import { FiEdit, FiCode, FiUsers, FiLayers, FiMonitor, FiDatabase, FiCpu } from 'react-icons/fi';

export interface FormValues {
    roleTitle: string;
    domainFocus: string;
    projectContext: string;
    aiMaturityLevel: string;
    assessmentFormat: string;
    timeLimit: string;
    canUseAiTools: boolean;
    teamFluencyLevel: string;
}

export interface Preset {
    name: string;
    icon: React.ReactNode;
    values: FormValues;
}

export type ThinkingStep = string;

// Sample data for form fields
export const sampleData = {
    roleTitles: [
        'Senior Frontend Engineer',
        'AI/ML Engineer',
        'Backend Developer',
        'DevOps Specialist',
        'Full Stack Developer',
        'Mobile App Developer',
        'Data Scientist',
        'Platform Engineer',
        'Site Reliability Engineer',
        'Cloud Solutions Architect'
    ],
    domainFocuses: [
        'web-frontend',
        'backend',
        'fullstack',
        'mobile',
        'devops',
        'data-science',
        'ai-ml'
    ],
    projectContexts: [
        'Developing a customer-facing dashboard for a SaaS product that visualizes analytics data and allows users to create custom reports.',
        'Building a real-time collaboration tool that needs to handle concurrent edits and maintain data consistency across clients.',
        'Creating an AI-powered recommendation engine for an e-commerce platform based on user behavior and preferences.',
        'Implementing a CI/CD pipeline for a microservices architecture with automated testing and deployment.',
        'Designing a mobile app that integrates with IoT devices and displays real-time data from sensors.',
        'Developing an enterprise authentication system with SSO, MFA, and role-based access control.',
        'Building a data pipeline that processes large volumes of unstructured data for business intelligence.',
        'Creating a cross-platform application that needs to work consistently across web, mobile, and desktop environments.'
    ],
    aiMaturityLevels: [
        'beginner',
        'intermediate',
        'advanced',
        'expert'
    ],
    assessmentFormats: [
        'take-home',
        'live-coding',
        'pair-programming',
        'architecture-review'
    ],
    timeLimits: [
        '30-min',
        '1-hour',
        '2-hours',
        '3-hours',
        '4-hours',
        '8-hours',
        '24-hours',
        '48-hours'
    ],
    teamFluencyLevels: [
        'novice',
        'familiar',
        'proficient',
        'expert'
    ]
};

// Presets for common role combinations
export const presets: Preset[] = [
    {
        name: 'Frontend Engineer',
        icon: <FiMonitor size={16} />,
        values: {
            roleTitle: 'Senior Frontend Engineer',
            domainFocus: 'web-frontend',
            projectContext: 'Building a responsive web application with modern UI/UX best practices that integrates AI-powered features.',
            aiMaturityLevel: 'intermediate',
            assessmentFormat: 'take-home',
            timeLimit: '4-hours',
            canUseAiTools: true,
            teamFluencyLevel: 'familiar'
        }
    },
    {
        name: 'Backend Developer',
        icon: <FiDatabase size={16} />,
        values: {
            roleTitle: 'Senior Backend Developer',
            domainFocus: 'backend',
            projectContext: 'Designing and implementing a scalable API service that processes large volumes of data with AI-assisted optimizations.',
            aiMaturityLevel: 'intermediate',
            assessmentFormat: 'take-home',
            timeLimit: '4-hours',
            canUseAiTools: true,
            teamFluencyLevel: 'familiar'
        }
    },
    {
        name: 'AI Engineer',
        icon: <FiCpu size={16} />,
        values: {
            roleTitle: 'AI/ML Engineer',
            domainFocus: 'ai-ml',
            projectContext: 'Developing an LLM-powered feature that enhances user experience through personalized recommendations.',
            aiMaturityLevel: 'expert',
            assessmentFormat: 'pair-programming',
            timeLimit: '2-hours',
            canUseAiTools: true,
            teamFluencyLevel: 'expert'
        }
    }
];

// Thinking steps for the loading animation
export const thinkingSteps: ThinkingStep[] = [
    "Thinking through candidate judgment...",
    "Calibrating AI-native rubric...",
    "Designing a system-level challenge...",
    "Testing your challenge against hypothetical agents...",
    "Analyzing real-world pressure simulations...",
    "Estimating developer amplification potential...",
    "Loading context-aware instructions...",
    "Running reasoning trace diagnostics...",
    "Encoding prompt fluency into rubric weights...",
    "Injecting architectural ambiguity...",
    "Simulating common failure points...",
    "Evaluating cognitive overhead zones...",
    "Inferring delegation strategies...",
    "Scoring prompt self-awareness...",
    "Indexing prompt-chain density...",
    "Verifying agent orchestration coherence...",
    "Tuning reward function expectations...",
    "Adding chaos vectors for realism...",
    "Drafting misleading-but-tractable requirements...",
    "Detecting cargo-cult coding patterns...",
    "Scaffolding traceable test expectations...",
    "Optimizing for minimum viable creativity...",
    "Scoring DX empathy alignment...",
    "Toggling AI tool visibility heuristics...",
    "Weighing clarity against ambiguity...",
    "Finalizing judgment surface area..."
];

// Get available time limits based on assessment format
export const getTimeOptions = (format: string) => {
    switch (format) {
        case 'live-coding':
        case 'pair-programming':
            return [
                { value: '30-min', label: '30 min' },
                { value: '1-hour', label: '1 hr' },
                { value: '2-hours', label: '2 hrs' },
                { value: '3-hours', label: '3 hrs' }
            ];
        case 'architecture-review':
            return [
                { value: '1-hour', label: '1 hr' },
                { value: '2-hours', label: '2 hrs' },
                { value: '3-hours', label: '3 hrs' },
                { value: '4-hours', label: '4 hrs' }
            ];
        default: // take-home
            return [
                { value: '2-hours', label: '2 hrs' },
                { value: '3-hours', label: '3 hrs' },
                { value: '4-hours', label: '4 hrs' },
                { value: '8-hours', label: '8 hrs (1 day)' },
                { value: '24-hours', label: '24 hrs (1 day)' },
                { value: '48-hours', label: '48 hrs (2 days)' }
            ];
    }
};

// Generate random test data
export const generateTestData = (): FormValues => {
    const getRandomItem = (array: any[]) => array[Math.floor(Math.random() * array.length)];

    return {
        roleTitle: getRandomItem(sampleData.roleTitles),
        domainFocus: getRandomItem(sampleData.domainFocuses),
        projectContext: getRandomItem(sampleData.projectContexts),
        aiMaturityLevel: getRandomItem(sampleData.aiMaturityLevels),
        assessmentFormat: getRandomItem(sampleData.assessmentFormats),
        timeLimit: getRandomItem(sampleData.timeLimits),
        canUseAiTools: Math.random() > 0.3,
        teamFluencyLevel: getRandomItem(sampleData.teamFluencyLevels)
    };
};

// Animation variants for the preview
export const previewAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
}; 