import { describe, expect, it } from 'vitest';

import { safeRedirectUrl } from '../app/api/draft-lab/redirect';

describe('Draft Lab route redirects', () => {
  it('uses forwarded public host instead of the internal Next bind address', () => {
    const request = new Request('https://0.0.0.0:3311/api/draft-lab', {
      headers: {
        'x-forwarded-host': 'davidmieloch.brain-garden.io',
        'x-forwarded-proto': 'https',
      },
    });

    expect(
      safeRedirectUrl(
        request,
        '/draft-lab/articles/the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter',
      ).toString(),
    ).toBe(
      'https://davidmieloch.brain-garden.io/draft-lab/articles/the-ai-cost-rug-pull-isnt-a-bubble-its-a-filter',
    );
  });

  it('falls back to Draft Lab for external return targets', () => {
    const request = new Request('https://0.0.0.0:3311/api/draft-lab', {
      headers: {
        'x-forwarded-host': 'davidmieloch.brain-garden.io',
        'x-forwarded-proto': 'https',
      },
    });

    expect(safeRedirectUrl(request, 'https://example.com/steal').toString()).toBe(
      'https://davidmieloch.brain-garden.io/draft-lab',
    );
  });
});
