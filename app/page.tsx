import Home from '../src/shared-components/pages/Home';
import { PageWrapper } from '@shared-components/templates/PageWrapper';
import { getPublishedArticles } from '../src/content/articles';

export default function HomePage() {
  const launchArticles = getPublishedArticles()
    .filter((article) => article.coverImage)
    .slice(0, 10)
    .map((article) => ({
      slug: article.slug,
      title: article.title,
      description: article.description,
      publishedAt: article.publishedAt,
      series: article.series,
      coverImage: article.coverImage,
    }));

  return (
    <PageWrapper>
      <Home launchArticles={launchArticles} />
    </PageWrapper>
  );
}
