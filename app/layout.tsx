import type { Metadata } from 'next';
import { lexend, inter, manrope, workSans, ibmPlex } from '../src/styles/fonts';
import ClientLayout from '@components/ClientLayout';
import { ThemeProvider } from '../src/providers/ThemeProvider';
import '../src/styles/globals.css';
import '../src/styles/print.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

export const metadata: Metadata = {
  title: 'David Mieloch Portfolio',
  description: 'Software developer and architect portfolio showing various projects and examples',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lexend.variable} ${inter.variable} ${manrope.variable} ${workSans.variable} ${ibmPlex.variable}`}>
      <body style={{ overflowX: 'hidden' }}>
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
