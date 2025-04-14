import { SideProject } from './components/SideProjectsSection/SideProjectsSection.types';

export const sampleProjects: SideProject[] = [
  {
    title: 'Media Layout Showcase',
    category: 'Personal Innovation Lab',
    description: 'This project demonstrates the powerful media layout capabilities with grouped and stacked content.',
    technologies: ['React', 'TypeScript', 'Styled Components'],
    url: 'https://example.com/media-showcase',
    repoUrl: 'https://github.com/example/media-showcase',
    startDate: 'March 2023',
    endDate: 'May 2023',
    impact: 'Created a flexible media layout system that can be used across projects.',
    media: [
      {
        type: 'group',
        layout: 'default',
        url: '#',
        items: [
          {
            type: 'image',
            url: 'https://picsum.photos/id/1/800/400',
            title: 'Main Dashboard View',
            description: 'The primary interface showing key analytics',
            width: '48%'
          },
          {
            type: 'group',
            layout: 'stack',
            url: '#',
            width: '48%',
            items: [
              {
                type: 'image',
                url: 'https://picsum.photos/id/20/400/200',
                title: 'Mobile View',
                description: 'Responsive design for mobile devices'
              },
              {
                type: 'image',
                url: 'https://picsum.photos/id/42/400/200',
                title: 'Settings Panel',
                description: 'Customizable user preferences'
              }
            ]
          }
        ]
      }
    ],
    halfWidth: false
  }
]; 