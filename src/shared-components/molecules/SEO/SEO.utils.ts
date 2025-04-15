import { SEOProps } from './SEO.types';

interface SEOData {
  title: string;
  description: string;
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: string;
    image: string;
  };
  twitter: {
    cardType: string;
    handle: string;
  };
}

export const getSeoData = (props: SEOProps): SEOData => {
  const defaultTitle = 'David Mieloch | Senior Software Engineer & Technical Lead';
  const defaultDescription = 'Portfolio and resume of David Mieloch, Senior Software Engineer and Technical Lead specializing in React, TypeScript, and modern web technologies.';
  const siteUrl = 'https://davidmieloch.com';
  
  return {
    title: props.title || defaultTitle,
    description: props.description || defaultDescription,
    canonical: props.canonical || siteUrl,
    openGraph: {
      title: props.openGraph?.title || props.title || defaultTitle,
      description: props.openGraph?.description || props.description || defaultDescription,
      url: props.openGraph?.url || props.canonical || siteUrl,
      type: props.openGraph?.type || 'website',
      image: props.openGraph?.image || `${siteUrl}/images/og-image.jpg`,
    },
    twitter: {
      cardType: props.twitter?.cardType || 'summary_large_image',
      handle: props.twitter?.handle || '@davidmieloch',
    },
  };
}; 