import { readFileSync } from 'fs';
import { describe, expect, it } from 'vitest';

describe('content ops admin route source', () => {
  it('is env-gated and noindexed', () => {
    const source = readFileSync('app/admin/content/page.tsx', 'utf8');

    expect(source).toContain('CONTENT_OPS_ENABLED');
    expect(source).toContain('notFound');
    expect(source).toContain('index: false');
    expect(source).toContain('follow: false');
  });

  it('is not linked from public navigation', () => {
    const pageSource = readFileSync('app/page.tsx', 'utf8');
    const layoutSource = readFileSync('app/layout.tsx', 'utf8');

    expect(pageSource).not.toContain('/admin/content');
    expect(layoutSource).not.toContain('/admin/content');
  });
});
