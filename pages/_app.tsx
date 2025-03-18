import type { AppProps } from 'next/app';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ThemeProvider } from '../src/providers';
import { inter, manrope, lexend, workSans, ibmPlex } from '../src/styles/fonts';
import '../src/styles/globals.css'; // Import global CSS
import { Box } from '@mantine/core';
import { useState, useEffect } from 'react';

// Dynamically import components that are not needed for initial render
// Use { ssr: false } to ensure they're only loaded on the client
const PersistentFooter = dynamic(
  () => import('../src/shared-components/organisms/PersistentFooter').then(mod => mod.PersistentFooter),
  { ssr: false }
);

const PlayerProvider = dynamic(
  () => import('../src/providers').then(mod => mod.PlayerProvider),
  { ssr: false }
);

// Create a client-only wrapper component with a more reliable mounting check
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  if (!hasMounted) {
    return null;
  }
  
  return <>{children}</>;
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
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
          <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
            <Box style={{ flex: 1 }}>
              <Component {...pageProps} key={router.asPath} />
            </Box>
            
            {/* Always render the ClientOnly wrapper, which will handle the mounting check */}
            <ClientOnly>
              <PlayerProvider>
                <Box style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
                  <PersistentFooter />
                </Box>
              </PlayerProvider>
            </ClientOnly>
          </Box>
        </ThemeProvider>
      </main>
    </>
  );
} 