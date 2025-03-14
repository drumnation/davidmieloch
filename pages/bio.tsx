import Bio from '../src/shared-components/sections/Bio';
import PageTemplate from '../src/shared-components/templates/PageTemplate';
import Head from 'next/head';

export default function BioPage() {
  return (
    <>
      <Head>
        <title>David Mieloch | Bio</title>
        <meta name="description" content="David Mieloch - Software architect, full-stack developer, and team lead with a background in music composition." />
      </Head>
      <PageTemplate>
        <Bio />
      </PageTemplate>
    </>
  );
} 