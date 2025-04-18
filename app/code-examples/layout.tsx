import React from 'react';
import { fetchGitHubRepos, transformGitHubRepo, fallbackRepositories } from './utils/github';
import { Repository } from '@shared-components/types/Repository.types';
import CodeExamplesClient from './page'; // Import the default export from page.tsx

async function getGitHubRepos(): Promise<{ repositories: Repository[], rateLimited: boolean }> {
  const correctUsername = 'drumnation';
  console.log(`Fetching GitHub repos for user: ${correctUsername}`);
  const repos = await fetchGitHubRepos(correctUsername);
  
  let rateLimited = false;
  let finalRepositories: Repository[];

  if (repos === null) { // Check for the null signal (403 error)
    console.warn(`GitHub API rate limit hit for ${correctUsername}. Using fallback repositories and signaling rate limit.`);
    rateLimited = true;
    finalRepositories = fallbackRepositories;
  } else if (repos.length === 0) { // Check for other errors or no initial data
    console.warn(`GitHub API fetch failed or returned no data for ${correctUsername}. Using fallback repositories.`);
    // rateLimited remains false
    finalRepositories = fallbackRepositories;
  } else {
    // Process normally if fetch was successful
    const transformedRepos = repos
      .map(transformGitHubRepo)
      .filter((repo): repo is Repository => repo !== null)
      .sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
    
    if (transformedRepos.length === 0) {
      console.warn(`No repositories matched the inclusion criteria for ${correctUsername} after transformation. Using fallback repositories.`);
      finalRepositories = fallbackRepositories;
    } else {
      finalRepositories = transformedRepos;
    }
    // rateLimited remains false
  }
  
  return { repositories: finalRepositories, rateLimited };
}

export default async function CodeExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get both repositories and the rateLimited flag
  const { repositories, rateLimited } = await getGitHubRepos();
  
  // Pass both down to the client page component
  return <CodeExamplesClient repositories={repositories} rateLimited={rateLimited}>{children}</CodeExamplesClient>; 
} 