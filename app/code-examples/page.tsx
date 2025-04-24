import React from 'react';
import { fetchGitHubRepos, transformGitHubRepo, fallbackRepositories } from './utils/github';
import { Repository } from '@shared-components/types/Repository.types';
import CodeExamplesClient from './CodeExamplesClient';

async function getGitHubRepos(): Promise<{ repositories: Repository[], rateLimited: boolean }> {
  const correctUsername = 'drumnation';
  const repos = await fetchGitHubRepos(correctUsername);
  let rateLimited = false;
  let finalRepositories: Repository[];

  if (repos === null) {
    rateLimited = true;
    finalRepositories = fallbackRepositories;
  } else if (repos.length === 0) {
    finalRepositories = fallbackRepositories;
  } else {
    const transformedRepos = repos
      .map(transformGitHubRepo)
      .filter((repo): repo is Repository => repo !== null)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    finalRepositories = transformedRepos.length === 0 ? fallbackRepositories : transformedRepos;
  }
  return { repositories: finalRepositories, rateLimited };
}

export default async function Page() {
  const { repositories, rateLimited } = await getGitHubRepos();
  return <CodeExamplesClient repositories={repositories} rateLimited={rateLimited} />;
} 