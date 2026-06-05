import { describe, expect, it } from 'vitest';

import { getVoiceTrackIdFromPathname } from './voiceTrackRouting';

describe('voice track routing', () => {
  it('maps root and top-level routes to voice track ids', () => {
    expect(getVoiceTrackIdFromPathname('/')).toBe('home');
    expect(getVoiceTrackIdFromPathname('/bio')).toBe('bio');
    expect(getVoiceTrackIdFromPathname('/contact/')).toBe('contact');
  });

  it('maps blog article routes to article slugs', () => {
    expect(getVoiceTrackIdFromPathname('/blog/the-factory')).toBe('the-factory');
    expect(getVoiceTrackIdFromPathname('/blog/reality-needs-observers/')).toBe(
      'reality-needs-observers',
    );
  });
});
