import { afterEach, describe, expect, it } from 'vitest';

const originalEnabled = process.env.CONTENT_OPS_ENABLED;
const originalWriteEnabled = process.env.CONTENT_OPS_WRITE_ENABLED;

afterEach(() => {
  process.env.CONTENT_OPS_ENABLED = originalEnabled;
  process.env.CONTENT_OPS_WRITE_ENABLED = originalWriteEnabled;
});

describe('Content Ops API route source contracts', () => {
  it('keeps read API disabled unless CONTENT_OPS_ENABLED is set', async () => {
    process.env.CONTENT_OPS_ENABLED = '0';

    const { GET } = await import('../app/api/admin/content/overview/route');
    const response = await GET();

    expect(response.status).toBe(404);
  });

  it('keeps read API enabled when CONTENT_OPS_ENABLED is set', async () => {
    process.env.CONTENT_OPS_ENABLED = '1';

    const { GET } = await import('../app/api/admin/content/overview/route');
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.data.publicPublishingPerformed).toBeUndefined();
    expect(body.data.counts).toBeDefined();
  });

  it('keeps write API disabled unless CONTENT_OPS_WRITE_ENABLED is set', async () => {
    process.env.CONTENT_OPS_ENABLED = '1';
    process.env.CONTENT_OPS_WRITE_ENABLED = '0';

    const { POST } = await import(
      '../app/api/admin/content/schedule/upsert/route'
    );
    const response = await POST(
      new Request('https://davidmieloch.com/api/admin/content/schedule/upsert', {
        method: 'POST',
        body: JSON.stringify({
          slug: 'draft',
          scheduledAt: '2026-07-01T12:00:00.000Z',
        }),
      }),
    );

    expect(response.status).toBe(404);
  });
});
