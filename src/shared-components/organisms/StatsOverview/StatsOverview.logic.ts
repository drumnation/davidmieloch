import { RepositoryStats } from './StatsOverview.types';

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const prepareLanguageChartData = (languages: RepositoryStats['topLanguages']) => {
  return languages.map(({ name, percentage }) => ({
    name,
    value: percentage,
  }));
};

export const prepareTopicsChartData = (topics: RepositoryStats['topTopics']) => {
  return topics.map(({ name, percentage }) => ({
    name,
    value: percentage,
  }));
};

export const prepareContributionsChartData = (
  contributions: RepositoryStats['contributionsByMonth']
) => {
  return contributions.map(({ month, count }) => ({
    name: month,
    value: count,
  }));
}; 