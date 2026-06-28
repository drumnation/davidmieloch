import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildContentOpsSnapshot } from '../../../src/content-ops/server';
import { ContentOpsConsole } from '../../../src/shared-components/organisms/ContentOpsConsole';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Content Ops Console',
  description: 'Internal control room for davidmieloch.com content operations.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContentOpsAdminPage() {
  if (process.env.CONTENT_OPS_ENABLED !== '1') {
    notFound();
  }

  const snapshot = buildContentOpsSnapshot();

  return <ContentOpsConsole snapshot={snapshot} />;
}
