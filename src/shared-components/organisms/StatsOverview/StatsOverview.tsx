import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Loader } from 'lucide-react';
import { StatsOverviewProps } from './StatsOverview.types';
import {
  formatNumber,
  prepareLanguageChartData,
  prepareTopicsChartData,
  prepareContributionsChartData,
} from './StatsOverview.logic';
import {
  Container,
  Header,
  Title,
  Subtitle,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  ChartSection,
  ChartCard,
  ChartTitle,
  ChartContainer,
  LoadingContainer,
  ErrorContainer,
  ErrorMessage,
  RetryButton,
} from './StatsOverview.styles';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize="12"
    >
      {`${name} (${(percent * 100).toFixed(1)}%)`}
    </text>
  );
};

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  stats,
  title = 'Repository Statistics',
  subtitle = 'Overview of your GitHub activity and contributions',
  isLoading = false,
  error,
  onRetry,
}) => {
  if (isLoading) {
    return (
      <LoadingContainer>
        <Loader size={48} />
        <ErrorMessage>Loading statistics...</ErrorMessage>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorMessage>{error}</ErrorMessage>
        {onRetry && <RetryButton onClick={onRetry}>Try again</RetryButton>}
      </ErrorContainer>
    );
  }

  const languageChartData = prepareLanguageChartData(stats.topLanguages);
  const topicsChartData = prepareTopicsChartData(stats.topTopics);
  const contributionsChartData = prepareContributionsChartData(stats.contributionsByMonth);

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatValue>{formatNumber(stats.totalRepositories)}</StatValue>
          <StatLabel>Total Repositories</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{formatNumber(stats.totalStars)}</StatValue>
          <StatLabel>Total Stars</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{formatNumber(stats.totalForks)}</StatValue>
          <StatLabel>Total Forks</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{formatNumber(stats.totalIssues)}</StatValue>
          <StatLabel>Open Issues</StatLabel>
        </StatCard>
      </StatsGrid>

      <ChartSection>
        <ChartCard>
          <ChartTitle>Top Languages</ChartTitle>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {languageChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Top Topics</ChartTitle>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topicsChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {topicsChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Monthly Contributions</ChartTitle>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contributionsChartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={COLORS[0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartCard>
      </ChartSection>
    </Container>
  );
}; 