import { IconArrowRight, IconArticle, IconBrain } from '@tabler/icons-react'; // Keep using Tabler for now, will replace later
import { GoBriefcase } from 'react-icons/go';
import { LiaBlogSolid } from 'react-icons/lia';
import { GiArtificialIntelligence } from 'react-icons/gi';
import type { ResourceCardData } from './ThankYouJob.types'; // Import type

// Define actual icons here to avoid relying on strings in component
const icons = {
    Portfolio: GoBriefcase,
    'My AI Dev Philosophy': GiArtificialIntelligence,
    'Blog Post': LiaBlogSolid,
};

export const resourceCards: ResourceCardData[] = [
    {
        icon: icons.Portfolio, // Use icon map
        title: 'Portfolio',
        description: 'Visit my portfolio homepage for an overview of my background, projects, and thought leadership.',
        link: 'https://davidmieloch.com',
        linkLabel: 'Visit Portfolio',
        thumbnail: '/home-screenshot-3:2.png' // Updated path
    },
    {
        icon: icons['My AI Dev Philosophy'], // Use icon map
        title: 'My AI Dev Philosophy',
        description: 'My approach to building scalable AI-native developer workflows',
        link: 'https://davidmieloch.com/enterprise-ai-development-framework',
        linkLabel: 'Learn More',
        thumbnail: '/brain-garden-recursive-journey-3:2.png' // Updated path to 3:2 version
    },
    {
        icon: icons['Blog Post'], // Use icon map
        title: 'Blog Post',
        description: 'What I Learned Building a Photoshop in the Browser',
        link: 'https://medium.com/@davidmieloch/what-i-learned-building-a-photoshop-in-the-browser-da72c963b185',
        linkLabel: 'Read Post',
        thumbnail: '/scala.jpeg' // Updated path
    },
    // Add video card data here if needed later
]; 