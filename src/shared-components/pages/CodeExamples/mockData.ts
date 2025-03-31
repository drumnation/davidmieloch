import { Repository } from '../../types/Repository.types';

export const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'react-component-library',
    fullName: 'username/react-component-library',
    description: 'A comprehensive React component library built with TypeScript and styled-components. Includes buttons, forms, cards, modals, and more.',
    url: 'https://github.com/username/react-component-library',
    language: 'TypeScript',
    stars: 245,
    forks: 45,
    watchers: 120,
    issues: 12,
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-06-15T10:00:00Z',
    isPrivate: false,
    topics: ['react', 'typescript', 'ui', 'component-library', 'frontend'],
    owner: {
      login: 'username',
      id: 'user123',
      avatarUrl: 'https://github.com/username.png',
      url: 'https://github.com/username'
    }
  },
  {
    id: '2',
    name: 'next-auth-starter',
    fullName: 'username/next-auth-starter',
    description: 'A starter template for Next.js applications with authentication already set up. Uses Next-Auth for authentication with various providers.',
    url: 'https://github.com/username/next-auth-starter',
    language: 'TypeScript',
    stars: 178,
    forks: 32,
    watchers: 85,
    issues: 5,
    createdAt: '2023-02-20T14:30:00Z',
    updatedAt: '2023-07-22T14:30:00Z',
    isPrivate: false,
    topics: ['nextjs', 'auth', 'typescript', 'template'],
    owner: {
      login: 'username',
      id: 'user123',
      avatarUrl: 'https://github.com/username.png',
      url: 'https://github.com/username'
    }
  },
  {
    id: '3',
    name: 'data-visualization-dashboard',
    fullName: 'username/data-visualization-dashboard',
    description: 'An interactive dashboard for data visualization using D3.js and React. Features customizable charts, filters, and real-time updates.',
    url: 'https://github.com/username/data-visualization-dashboard',
    language: 'JavaScript',
    stars: 302,
    forks: 67,
    watchers: 150,
    issues: 21,
    createdAt: '2023-01-08T09:15:00Z',
    updatedAt: '2023-05-08T09:15:00Z',
    isPrivate: false,
    topics: ['d3', 'react', 'data-visualization', 'dashboard', 'javascript'],
    owner: {
      login: 'username',
      id: 'user123',
      avatarUrl: 'https://github.com/username.png',
      url: 'https://github.com/username'
    }
  },
  {
    id: '4',
    name: 'serverless-api',
    fullName: 'username/serverless-api',
    description: 'A serverless API built with AWS Lambda and API Gateway. Includes authentication, database integration, and comprehensive documentation.',
    url: 'https://github.com/username/serverless-api',
    language: 'JavaScript',
    stars: 124,
    forks: 28,
    watchers: 60,
    issues: 7,
    createdAt: '2023-01-30T11:45:00Z',
    updatedAt: '2023-04-30T11:45:00Z',
    isPrivate: false,
    topics: ['serverless', 'aws', 'lambda', 'api', 'backend'],
    owner: {
      login: 'username',
      id: 'user123',
      avatarUrl: 'https://github.com/username.png',
      url: 'https://github.com/username'
    }
  },
  {
    id: '5',
    name: 'python-ml-toolkit',
    fullName: 'username/python-ml-toolkit',
    description: 'A collection of tools and utilities for machine learning projects in Python. Includes data preprocessing, model training, and visualization.',
    url: 'https://github.com/username/python-ml-toolkit',
    language: 'Python',
    stars: 387,
    forks: 92,
    watchers: 180,
    issues: 16,
    createdAt: '2022-11-12T16:20:00Z',
    updatedAt: '2023-03-12T16:20:00Z',
    isPrivate: false,
    topics: ['python', 'machine-learning', 'data-science', 'toolkit'],
    owner: {
      login: 'username',
      id: 'user123',
      avatarUrl: 'https://github.com/username.png',
      url: 'https://github.com/username'
    }
  },
  {
    id: '6',
    name: 'go-microservices',
    fullName: 'username/go-microservices',
    description: 'A template for building microservices architecture with Go. Includes service discovery, API gateway, and message queues.',
    url: 'https://github.com/username/go-microservices',
    language: 'Go',
    stars: 156,
    forks: 41,
    watchers: 75,
    issues: 8,
    createdAt: '2023-02-05T08:30:00Z',
    updatedAt: '2023-08-05T08:30:00Z',
    isPrivate: false,
    topics: ['go', 'microservices', 'docker', 'kubernetes', 'backend'],
    owner: {
      login: 'username',
      id: 'user123',
      avatarUrl: 'https://github.com/username.png',
      url: 'https://github.com/username'
    }
  },
]; 