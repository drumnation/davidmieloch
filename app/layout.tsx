import type { Metadata } from 'next';
import { lexend, inter, manrope, workSans, ibmPlex } from '../src/styles/fonts';
import ClientLayout from '../src/components/ClientLayout';
import { PlayerProvider } from '../src/providers/PlayerProvider';
import '../src/styles/loading-utils.css';

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
      <body>
        <PlayerProvider>
          <ClientLayout>{children}</ClientLayout>
        </PlayerProvider>
      </body>
    </html>
  );
}
