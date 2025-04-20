import React from 'react';
import { ExperienceSection } from './ExperienceSection';
import { ExperienceItem } from './ExperienceSection.types';

export const BulletPointsExample: React.FC = () => {
    // Example experience data with markdown formatting in bullet points
    const experiencesWithMarkdown: ExperienceItem[] = [
        {
            company: 'Example Tech',
            title: 'Senior Software Engineer',
            location: 'Remote',
            startDate: 'Jan 2022',
            endDate: 'Present',
            description: 'This example shows how **markdown formatting** can be used in bullet points to make your resume more scannable and highlight key information.',
            bulletPoints: [
                'Led a team of **5 developers** in adopting modern React patterns, TypeScript, and Atomic Design principles.',
                'Conducted regular code reviews and one-on-ones to boost efficiency, code quality, and team performance by **30%**.',
                'Spearheaded the re-architecture of flagship "**Designer**" graphic design product and the Scala Cloud Platform.',
                'Managed the development of key features, including a *template builder tool* and **device monitoring module**.',
                'Built Node.js microservices and 24-hour scheduled project player with **99.9% uptime**.'
            ],
            logoPath: '/company-logos/example-tech.png',
            technologies: ['React', 'TypeScript', 'Node.js', 'GraphQL']
        },
        {
            company: 'Creative Solutions',
            title: 'Frontend Engineer',
            location: 'New York, NY',
            startDate: 'Jun 2020',
            endDate: 'Dec 2021',
            description: 'Creative Solutions specializes in innovative event technology.',
            bulletPoints: [
                'Developed award-winning React Native app (iOS/Android) that won "**Best of NYC Toy Fair**" (*Parents Magazine*).',
                'Created interactive applications for high-profile events including:',
                '- **TD/Ameritrade**: Custom event registration system',
                '- **Novartis Pharma**: Interactive product visualization',
                '- **Jack Daniels**: Social media integration platform',
                'Published `react-native-cross-platform-dimensions` npm package with **25 Stars / 5 Forks**.'
            ],
            logoPath: '/company-logos/creative-solutions.png',
            technologies: ['React Native', 'JavaScript', 'Node.js']
        }
    ];

    return (
        <div className="markdown-bullet-points-example">
            <h2>Resume with Markdown-Formatted Bullet Points</h2>
            <p>This example shows how markdown can be used in bullet points to make content more scannable:</p>

            <ExperienceSection
                experiences={experiencesWithMarkdown}
                title="Professional Experience"
                generateId={(item) => item.company + item.title}
            />

            <div className="usage-tips">
                <h3>Markdown Tips for Bullet Points:</h3>
                <ul>
                    <li>Use <code>**bold**</code> for important achievements and metrics</li>
                    <li>Use <code>*italic*</code> for emphasis and secondary highlights</li>
                    <li>Use <code>- Sub bullets</code> for creating hierarchical points</li>
                    <li>Use <code>[Link text](url)</code> for adding links to portfolios or projects</li>
                    <li>Keep formatting consistent across bullet points for a clean look</li>
                </ul>
            </div>
        </div>
    );
}; 