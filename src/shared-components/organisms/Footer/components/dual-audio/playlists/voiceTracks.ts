import { AudioTrack } from '../DualAudio.types'; // Assuming AudioTrack type is shared

// Debug log to verify this file is loaded - use IIFE to ensure it runs only once when imported
(() => {
    console.log('[DEBUG] voiceTracks.ts loaded, will provide these tracks:', [
        'bio',
        'contact',
        'code-examples',
        'enterprise-ai-development-framework',
        'experience',
        'fullstack-react-best-practices-integration',
        'home'
    ]);
})();

// Voice Tracks are mostly page-specific spoken narration
export const voiceTracks: AudioTrack[] = [
    {
        id: 'interview-generator',
        title: "Interview Generator",
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/interview-generator.mp3',
        description: 'Narrated interview generator page and information.'
    },
    {
        id: 'thank-you-job',
        title: "Thank You Job Page",
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/thank-you-job.mp3',
        description: 'Narrated thank you job page and information.'
    },
    {
        id: 'contact',
        title: "Let's Connect Page",
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/contact.mp3',
        description: 'Narrated contact page and information.'
    },
    {
        id: 'bio',
        title: 'Personal Bio',
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/bio.mp3',
        description: 'Narrated personal biography and background story.'
    },
    {
        id: 'code-examples',
        title: 'Code Example Walkthroughs',
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/code-examples.mp3',
        description: 'Narrated walkthroughs explaining major code patterns.'
    },
    {
        id: 'enterprise-ai-development-framework',
        title: 'Enterprise AI Framework Overview',
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/enterprise-ai-development-framework.mp3',
        description: 'Spoken overview of the Enterprise AI Development Framework.'
    },
    {
        id: 'experience',
        title: 'Career Experience',
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/experience.mp3',
        description: 'Spoken summary of professional engineering and leadership experience.'
    },
    {
        id: 'fullstack-react-best-practices-integration',
        title: 'Fullstack React Best Practices',
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/fullstack-react-best-practices-integration.mp3',
        description: 'Narrated guide covering fullstack React development best practices.'
    },
    {
        id: 'home',
        title: 'Home Page Welcome',
        artist: 'Narration by David Mieloch',
        src: '/audio/voice/home.mp3',
        description: 'Welcome message for new site visitors and overview of Brain Garden.'
    },
];