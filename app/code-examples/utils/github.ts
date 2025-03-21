interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
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
      throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Fetched repositories count:', data.length);
    console.log('First few repos:', data.slice(0, 3).map((repo: GitHubRepo) => ({
      name: repo.name,
      updated_at: repo.updated_at,
      created_at: repo.created_at
    })));
    
    return data;
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}

// List of repositories from github-projects-plan.md that should be included
const INCLUDED_REPOS = [
  'ts-hot-react-vscode-starter',
  'ai-context-generator',
  'prompt-forge',
  'model-maestro',
  'browser-use-cli',
  'cursor-directory-structure-ts',
  'game-sage',
  'react-native-cross-platform-responsive-dimensions',
  'react-native-reactjs-quiz-challenges',
  'spotify-js-bindings',
  'BeatSaber2Ragnarock',
  'react-midi-sequencer',
  'javascript-es6-design-patterns',
  'ai-code-helper'
];

// Higher priority repositories to display first
const PRIORITY_REPOS = ['game-sage', 'cursor-directory-structure-ts'];

// Manual date overrides for repositories with incorrect GitHub API dates
const UPDATE_DATE_OVERRIDES: Record<string, string> = {
  'react-midi-sequencer': '2015-03-01T12:00:00Z', // 10 years ago (2015) - from March 2025
  'javascript-es6-design-patterns': '2016-05-15T12:00:00Z', // 9 years ago
  'react-native-cross-platform-responsive-dimensions': '2018-06-01T12:00:00Z',
  'BeatSaber2Ragnarock': '2020-08-01T12:00:00Z',
};

// Manual creation date overrides
const CREATION_DATE_OVERRIDES: Record<string, string> = {
  'react-midi-sequencer': '2015-01-01T12:00:00Z', // Created in early 2015
  'javascript-es6-design-patterns': '2016-01-01T12:00:00Z',
  'react-native-cross-platform-responsive-dimensions': '2018-01-01T12:00:00Z',
  'BeatSaber2Ragnarock': '2020-01-01T12:00:00Z',
};

export function transformGitHubRepo(repo: GitHubRepo) {
  console.log('Transforming repo:', repo.name);
  
  // Only transform repos that are in our INCLUDED_REPOS list
  if (!INCLUDED_REPOS.includes(repo.name)) {
    return null;
  }
  
  // Add a priority field for sorting
  const priorityIndex = PRIORITY_REPOS.indexOf(repo.name);
  
  // Use manual date override if available
  const lastUpdated = UPDATE_DATE_OVERRIDES[repo.name] || repo.updated_at;
  const createdAt = CREATION_DATE_OVERRIDES[repo.name] || repo.created_at;
  
  return {
    id: repo.name,
    name: repo.name,
    description: repo.description || '',
    url: repo.html_url,
    language: repo.language || 'Unknown',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    issues: repo.open_issues_count,
    createdAt,
    lastUpdated,
    isPrivate: false,
    topics: repo.topics || [],
    // Priority repos get negative values to sort first (higher priority)
    priority: priorityIndex >= 0 ? -100 + priorityIndex : 0
  };
} 