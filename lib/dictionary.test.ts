import { describe, expect, it } from 'vitest';
import { normalizeText, searchEntries } from './dictionary';

const sampleEntries = [
  {
    id: 'fixture-ho-001',
    hoWord: 'ᱡᱟᱜᱟ',
    hiWord: 'जागना',
    alternateSpellings: ['जगा', 'जागा'],
    meanings: ['उठना', 'सतर्क रहना'],
    status: 'verified',
    provenance: 'Synthetic test fixture',
    reviewedAt: '2026-01-01T00:00:00.000Z',
    sourcePage: 18,
    examples: [{ ho: 'ᱡᱟᱜᱟ ᱠᱟᱫᱟ', hi: 'वह जाग रहा है' }],
  },
  {
    id: 'fixture-ho-002',
    hoWord: 'ᱦᱟᱨᱟ',
    hiWord: 'पानी',
    alternateSpellings: ['हारा'],
    meanings: ['जल'],
    status: 'unverified',
    provenance: 'OCR candidate only',
    reviewedAt: null,
    sourcePage: 22,
  },
] as const;

describe('normalizeText', () => {
  it('normalizes Unicode and spacing safely', () => {
    expect(normalizeText('  जागना  ')).toBe('जागना');
    expect(normalizeText(' ᱡᱟᱜᱟ')).toBe('ᱡᱟᱜᱟ');
  });
});

describe('searchEntries', () => {
  it('returns exact Ho matches first', () => {
    expect(searchEntries(sampleEntries as any, 'ᱡᱟᱜᱟ', 'ho-hi')[0]?.id).toBe('fixture-ho-001');
  });

  it('returns Hindi matches when direction is hi-ho', () => {
    expect(searchEntries(sampleEntries as any, 'जागना', 'hi-ho')[0]?.id).toBe('fixture-ho-001');
  });

  it('returns empty results when there is no match', () => {
    expect(searchEntries(sampleEntries as any, 'xyz', 'ho-hi')).toEqual([]);
  });
});
