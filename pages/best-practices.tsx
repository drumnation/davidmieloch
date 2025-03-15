import BestPractices from '../src/shared-components/sections/BestPractices';
import PageTemplate from '../src/shared-components/templates/PageTemplate';
import Head from 'next/head';

export default function BestPracticesPage() {
  return (
    <>
      <Head>
        <title>David Mieloch | Best Practices</title>
        <meta name="description" content="Best practices and development guidelines by David Mieloch" />
      </Head>
      <PageTemplate>
        <BestPractices />
      </PageTemplate>
    </>
  );
} 