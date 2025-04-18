import { Repository } from '@shared-components/types/Repository.types';

interface GitHubRepoOwner {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  topics: string[];
  private: boolean;
  owner?: GitHubRepoOwner;
  created_at: string;
  watchers_count: number;
}

// Restore the correct list of included repositories from commit b81a2bf3
const INCLUDED_REPOS = [
  'ts-hot-react-vscode-starter',
  'ai-context-generator',
  'prompt-forge',
  'model-maestro',
  'browser-use-cli',
  'cursor-directory-structure-ts',
  'game-sage',
  'unsplash-smart-mcp-server',
  'ts-import-move',
  'react-native-cross-platform-responsive-dimensions',
  'react-native-reactjs-quiz-challenges',
  'spotify-js-bindings',
  'BeatSaber2Ragnarock',
  'react-midi-sequencer',
  'javascript-es6-design-patterns',
  'ai-code-helper'
];

// Define simple fallback data
const fallbackRepositories: Repository[] = [
  {
    id: 'fallback-1',
    name: 'Fallback Repo 1',
    fullName: 'user/fallback-repo-1',
    description: 'This is fallback data shown when the GitHub API fails or is rate-limited.',
    url: '#',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    watchers: 0,
    issues: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPrivate: false,
    topics: ['fallback', 'example'],
    owner: { id: '0', login: 'user', avatarUrl: '', url: '#' },
  },
  {
    id: 'fallback-2',
    name: 'Fallback Repo 2',
    fullName: 'user/fallback-repo-2',
    description: 'Another example fallback repository.',
    url: '#',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    watchers: 0,
    issues: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPrivate: false,
    topics: ['fallback'],
    owner: { id: '0', login: 'user', avatarUrl: '', url: '#' },
  },
];

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[] | null> {
  console.log('Fetching GitHub repos for:', username);
  try {
    console.log(`Making API request to: https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      },
      // This forces a fresh network request instead of using cached responses
      cache: 'no-store'
    });
    
    console.log('API response status:', response.status, response.statusText);
    
    if (!response.ok) {
      console.error('GitHub API response not OK:', response.status, response.statusText);
      // Specifically check for 403 (Rate Limit Exceeded)
      if (response.status === 403) {
        console.warn('GitHub API rate limit exceeded.');
        return null; // Signal rate limit error
      }
      // Return empty array for other fetch errors
      return []; 
    }
    
    const data = await response.json();
    console.log('Fetched repositories count:', data.length);
    
    // Basic check if data is an array
    if (!Array.isArray(data)) {
      console.error('GitHub API did not return an array:', data);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    // Return empty array for general exceptions
    return []; 
  }
}

export function transformGitHubRepo(repo: GitHubRepo): Repository | null {
  if (!INCLUDED_REPOS.includes(repo.name)) {
    return null;
  }

  return {
    id: repo.id.toString(),
    name: repo.name,
    fullName: `${repo.owner?.login || 'user'}/${repo.name}`,
    description: repo.description || '',
    url: repo.html_url,
    language: repo.language || 'Unknown',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    watchers: repo.watchers_count,
    issues: repo.open_issues_count,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    isPrivate: repo.private,
    topics: repo.topics,
    owner: repo.owner 
      ? { 
          id: repo.owner.id.toString(),
          login: repo.owner.login, 
          avatarUrl: repo.owner.avatar_url, 
          url: repo.owner.html_url
        } 
      : { id: '0', login: 'unknown', avatarUrl: '', url: '#' },
  };
}

// Export the fallback data so the layout can use it
export { fallbackRepositories }; 