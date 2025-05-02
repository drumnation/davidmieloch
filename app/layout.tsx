import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { lexend, inter, manrope, workSans, ibmPlex } from '../src/styles/fonts';
import ClientLayout from '@components/ClientLayout';
import { ThemeProvider } from '../src/providers/ThemeProvider';
import StyledComponentsRegistry from '@providers/StyledComponentsRegistry';
import '../src/styles/globals.css';
import '../src/styles/print.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { JoyrideProvider } from '@/providers/JoyrideProvider';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: 'David Mieloch Portfolio',
  description: 'Software developer and architect portfolio showing various projects and examples',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = headers();
  const theme = headerList.get('x-app-theme') || 'light';
  const themeClass = theme === 'dark' ? 'dark-theme' : 'light-theme';

  return (
    <html lang="en" className={`${themeClass} ${lexend.variable} ${inter.variable} ${manrope.variable} ${workSans.variable} ${ibmPlex.variable}`}>
      <head>
        <meta name="color-scheme" content={theme} />
      </head>
      <body style={{ overflowX: 'hidden' }}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <JoyrideProvider>
              <ClientLayout>{children}</ClientLayout>
            </JoyrideProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
        <SpeedInsights />
      </body>
    </html>
  );
}
