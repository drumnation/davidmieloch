import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '../src/providers';
import { inter, manrope, lexend, workSans, ibmPlex } from '../src/styles/fonts';
import '../src/styles/globals.css'; // Import global CSS

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>David Mieloch - Developer Portfolio</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Full-stack developer specializing in AI-powered applications" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={`${inter.variable} ${manrope.variable} ${lexend.variable} ${workSans.variable} ${ibmPlex.variable}`}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
    </>
  );
} 