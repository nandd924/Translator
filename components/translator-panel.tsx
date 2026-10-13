'use client';

import { useMemo, useState } from 'react';

const directions = {
  'ho-hi': 'Ho → Hindi',
  'hi-ho': 'Hindi → Ho',
} as const;

type ResultEntry = {
  id: string;
  hoWord: string;
  hiWord: string;
  meanings: string[];
  alternateSpellings: string[];
  status: 'verified' | 'unverified';
  provenance: string;
  sourcePage?: number;
  examples?: Array<{ ho: string; hi: string }>;
};

export function TranslatorPanel() {
  const [direction, setDirection] = useState<'ho-hi' | 'hi-ho'>('ho-hi');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ results: ResultEntry[]; total: number; empty: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placeholder = useMemo(
    () => (direction === 'ho-hi' ? 'Type a Ho word to look up...' : 'Type a Hindi word to look up...'),
    [direction],
  );

  async function handleSubmit() {
    const trimmed = input.trim();
    if (!trimmed) {
      setError('Please enter a word before searching.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/dictionary/search?q=${encodeURIComponent(trimmed)}&direction=${direction}`);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? 'Dictionary request failed.');
      }

      setResult(payload);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Something went wrong.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  async function copyResult() {
    if (!result || result.empty) return;
    const text = result.results[0]?.meanings?.join('; ') ?? '';
    await navigator.clipboard.writeText(text);
  }

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-soft sm:p-6">
      <div className="mb-4 flex flex-wrap gap-2 rounded-full bg-slate-100 p-1">
        {Object.entries(directions).map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${direction === value ? 'bg-navy text-white' : 'text-slate-600 hover:text-slate-900'}`}
            onClick={() => setDirection(value as 'ho-hi' | 'hi-ho')}
          >
            {label}
          </button>
        ))}
      </div>

      <label htmlFor="lookup-input" className="mb-2 block text-sm font-medium text-slate-700">Input</label>
      <textarea
        id="lookup-input"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        rows={4}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base text-slate-800 outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-slate-500">{input.length} characters</div>
        <div className="flex gap-2">
          <button type="button" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-saffron hover:text-saffron" onClick={() => setInput('')}>
            Clear
          </button>
          <button type="button" className="rounded-full bg-saffron px-4 py-2 text-sm font-semibold text-navy transition hover:bg-saffron/90" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Searching...' : 'Translate / Search'}
          </button>
        </div>
      </div>

      {error ? <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">Results</p>
          {result && !result.empty ? (
            <button type="button" className="text-sm font-medium text-navy hover:text-saffron" onClick={copyResult}>Copy result</button>
          ) : null}
        </div>

        {!result ? (
          <p className="mt-4 text-sm text-slate-500">No search has been run yet. Results will appear here when a valid item is found.</p>
        ) : result.empty ? (
          <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">
            No verified match found for this term in the current public dataset. This project does not fabricate translations when no result is available.
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {result.results.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-sm uppercase tracking-[0.2em] text-slate-500">{direction === 'ho-hi' ? 'Ho' : 'Hindi'} word</div>
                    <div className="mt-1 text-2xl font-black text-navy">{direction === 'ho-hi' ? entry.hoWord : entry.hiWord}</div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${entry.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {entry.status === 'verified' ? 'Verified entry' : 'Unverified candidate'}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="text-sm font-medium text-slate-500">{direction === 'ho-hi' ? 'Hindi meaning' : 'Ho meaning'}</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                    {entry.meanings.map((meaning) => <li key={meaning}>{meaning}</li>)}
                  </ul>
                </div>

                {entry.alternateSpellings.length > 0 ? (
                  <div className="mt-3 text-sm text-slate-600">
                    <span className="font-semibold">Alternate spellings:</span> {entry.alternateSpellings.join(', ')}
                  </div>
                ) : null}

                {entry.sourcePage ? <div className="mt-2 text-sm text-slate-600">Source page: {entry.sourcePage}</div> : null}
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">Provenance: {entry.provenance}</div>

                {entry.examples && entry.examples.length > 0 ? (
                  <div className="mt-3">
                    <div className="text-sm font-semibold text-slate-700">Examples</div>
                    {entry.examples.map((example, index) => (
                      <div key={`${example.ho}-${index}`} className="mt-2 rounded-lg bg-slate-100 p-2 text-sm text-slate-700">
                        <div>{example.ho}</div>
                        <div className="mt-1 text-slate-500">{example.hi}</div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
