import React from 'react';
import { WhitePaper } from '@/shared-components/pages/WhitePaper/WhitePaper';
import PageTemplate from '@/shared-components/templates/PageTemplate';

export const metadata = {
  title: 'Enterprise AI Development Framework | David Mieloch',
  description: 'Learn about the Enterprise AI Development Framework and how it can transform your development process.',
};

export default function EnterpriseAIDevFrameworkPage() {
  return (
    <PageTemplate>
      <WhitePaper />
    </PageTemplate>
  );
} 