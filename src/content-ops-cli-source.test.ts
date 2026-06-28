import { readFileSync } from 'fs';
import { describe, expect, it } from 'vitest';

describe('content ops CLI source', () => {
  it('registers read-only and write-gated ops commands', () => {
    const source = readFileSync('scripts/content-pipeline.mjs', 'utf8');

    expect(source).toContain('ops:next');
    expect(source).toContain('ops:approved-unscheduled');
    expect(source).toContain('ops:schedule-approved-unscheduled');
    expect(source).toContain('--write');
  });
});
