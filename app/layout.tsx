import type { Metadata } from 'next';
import { lexend, inter, manrope, workSans, ibmPlex } from '../src/styles/fonts';
import ClientLayout from '@components/ClientLayout';
import { ThemeProvider } from '../src/providers/ThemeProvider';
import StyledComponentsRegistry from '@providers/StyledComponentsRegistry';
import '../src/styles/globals.css';
import '../src/styles/print.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { JoyrideProvider } from '@/providers/JoyrideProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://davidmieloch.com'),
  title: {
    default: 'David Mieloch',
    template: '%s | David Mieloch',
  },
  description: 'AI-native software engineer and systems builder writing about agents, developer tools, and software factories.',
  alternates: {
    canonical: 'https://davidmieloch.com',
    types: {
      'application/rss+xml': 'https://davidmieloch.com/rss.xml',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lexend.variable} ${inter.variable} ${manrope.variable} ${workSans.variable} ${ibmPlex.variable}`}>
      <body style={{ overflowX: 'hidden' }}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <JoyrideProvider>
              <ClientLayout>{children}</ClientLayout>
            </JoyrideProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
