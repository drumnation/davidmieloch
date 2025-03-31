import React from 'react';
import Head from 'next/head';
import { SEOProps } from './SEO.types';

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  openGraph,
  twitter,
}) => {
  const defaultTitle = 'David Mieloch | Senior Software Engineer & Technical Lead';
  const defaultDescription = 'Portfolio and resume of David Mieloch, Senior Software Engineer and Technical Lead specializing in React, TypeScript, and modern web technologies.';
  const siteUrl = 'https://davidmieloch.com';
  
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    canonical: canonical || siteUrl,
    openGraph: {
      title: openGraph?.title || title || defaultTitle,
      description: openGraph?.description || description || defaultDescription,
      url: openGraph?.url || canonical || siteUrl,
      type: openGraph?.type || 'website',
      image: openGraph?.image || `${siteUrl}/images/og-image.jpg`,
    },
    twitter: {
      cardType: twitter?.cardType || 'summary_large_image',
      handle: twitter?.handle || '@davidmieloch',
    },
  };

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