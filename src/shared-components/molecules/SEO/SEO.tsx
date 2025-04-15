import React from 'react';
import Head from 'next/head';
import { SEOProps } from './SEO.types';
import { getSeoData } from './SEO.utils';

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  openGraph,
  twitter,
}) => {
  const seo = getSeoData({
    title,
    description,
    canonical,
    openGraph,
    twitter,
  });

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={seo.canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={seo.openGraph.title} />
      <meta property="og:description" content={seo.openGraph.description} />
      <meta property="og:url" content={seo.openGraph.url} />
      <meta property="og:type" content={seo.openGraph.type} />
      <meta property="og:image" content={seo.openGraph.image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={seo.twitter.cardType} />
      <meta name="twitter:creator" content={seo.twitter.handle} />
      <meta name="twitter:title" content={seo.openGraph.title} />
      <meta name="twitter:description" content={seo.openGraph.description} />
      <meta name="twitter:image" content={seo.openGraph.image} />
      
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}; 