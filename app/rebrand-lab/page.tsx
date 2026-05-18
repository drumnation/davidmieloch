import type { Metadata } from 'next';

import { RebrandLab } from './RebrandLab';

export const metadata: Metadata = {
  title: 'Rebrand Lab',
  description: 'Approval lab for the AI Architect software factory rebrand.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RebrandLabPage() {
  return <RebrandLab />;
}
