import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

export type Direction = 'ho-hi' | 'hi-ho';
export type DictionaryStatus = 'verified' | 'unverified';

export type DictionaryEntry = {
  id: string;
  hoWord: string;
  hiWord: string;
  alternateSpellings: string[];
  meanings: string[];
  status: DictionaryStatus;
  provenance: string;
  reviewedAt?: string | null;
  sourcePage?: number | null;
  examples?: Array<{ ho: string; hi: string }>;
};

export function normalizeText(value: string) {
  return value.normalize('NFKC').trim().toLowerCase();
}

export function searchEntries(entries: DictionaryEntry[], query: string, direction: Direction = 'ho-hi') {
  const trimmed = normalizeText(query);

  if (!trimmed) return [];

  return entries
    .map((entry) => {
      const primary = direction === 'ho-hi' ? entry.hoWord : entry.hiWord;
      const secondary = direction === 'ho-hi' ? entry.hiWord : entry.hoWord;
      const textSources = [primary, secondary, ...entry.alternateSpellings, ...entry.meanings].map(normalizeText);
      let score = 999;

      if (textSources.some((value) => value === trimmed)) score = 0;
      else if (textSources.some((value) => value.startsWith(trimmed))) score = 1;
      else if (textSources.some((value) => value.includes(trimmed))) score = 2;
      else if (textSources.some((value) => value.includes(trimmed.slice(0, 2)))) score = 3;

      return { entry, score };
    })
    .filter(({ score }) => score < 999)
    .sort((left, right) => left.score - right.score)
    .map(({ entry }) => entry);
}

async function readJsonlFile(filePath: string): Promise<DictionaryEntry[]> {
  const text = await fs.readFile(filePath, 'utf8');
  return text
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line) as DictionaryEntry);
}

export async function getPublicEntries(): Promise<DictionaryEntry[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
      });
      const { data, error } = await supabase.from('dictionary_entries').select('*');
      if (!error && data) {
        return data as DictionaryEntry[];
      }
    } catch {
      // fall through to local file adapter
    }
  }

  const datasetPath = process.env.DATASET_PATH ?? path.join(process.cwd(), 'data', 'public', 'entries.jsonl');
  return readJsonlFile(datasetPath);
}
