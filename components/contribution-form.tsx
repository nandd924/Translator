'use client';

import { useEffect, useState } from 'react';

const defaultLimit = 10;

type Entry = {
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

export function DictionaryBrowser() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        setSelectedId(null);
        setTotal(0);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/dictionary/search?q=${encodeURIComponent(query)}&direction=ho-hi&limit=${defaultLimit}&page=${currentPage}`);
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error ?? 'Dictionary lookup failed.');
        }

        setResults(payload.results ?? []);
        setTotal(payload.total ?? 0);
        setSelectedId(payload.results?.[0]?.id ?? null);
      } catch (lookupError) {
        setError(lookupError instanceof Error ? lookupError.message : 'Unable to load results.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timeout);
  }, [query, currentPage]);

  const selectedEntry = results.find((entry) => entry.id === selectedId) ?? results[0] ?? null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
        <label htmlFor="dictionary-query" className="mb-2 block text-sm font-medium text-slate-700">Search</label>
        <input
          id="dictionary-query"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search Ho or Hindi words..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20"
        />

        {loading ? <div className="mt-4 text-sm text-slate-500">Loading dictionary entries…</div> : null}
        {error ? <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}

        <div className="mt-6 space-y-3">
          {!query.trim() ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">Type a search term to scan the available entries.</div>
          ) : results.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">No matches in the current public dataset.</div>
          ) : (
            results.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setSelectedId(entry.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${selectedEntry?.id === entry.id ? 'border-saffron bg-saffron/5' : 'border-slate-200 bg-white hover:border-saffron/50'}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-bold text-navy">{entry.hoWord}</div>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${entry.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {entry.status}
                  </span>
                </div>
                <div className="mt-1 text-sm text-slate-600">{entry.hiWord}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">{entry.provenance}</div>
              </button>
            ))
          )}
        </div>

        {total > defaultLimit ? (
          <div className="mt-5 flex items-center justify-between">
            <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 disabled:opacity-40">
              Previous
            </button>
            <span className="text-sm text-slate-600">Page {currentPage}</span>
            <button type="button" onClick={() => setCurrentPage((page) => page + 1)} className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">
              Next
            </button>
          </div>
        ) : null}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        {selectedEntry ? (
          <div className="space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Headword</div>
                <h2 className="mt-1 text-3xl font-black text-navy">{selectedEntry.hoWord}</h2>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${selectedEntry.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {selectedEntry.status}
              </span>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Hindi translation</div>
              <div className="mt-2 text-xl font-bold text-slate-800">{selectedEntry.hiWord}</div>
            </div>

            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Meanings</div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                {selectedEntry.meanings.map((meaning) => <li key={meaning}>{meaning}</li>)}
              </ul>
            </div>

            {selectedEntry.alternateSpellings.length > 0 ? (
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Alternate spellings</div>
                <p className="mt-2 text-slate-700">{selectedEntry.alternateSpellings.join(', ')}</p>
              </div>
            ) : null}

            {selectedEntry.examples && selectedEntry.examples.length > 0 ? (
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Examples</div>
                <div className="mt-3 space-y-3">
                  {selectedEntry.examples.map((example, index) => (
                    <div key={`${example.ho}-${index}`} className="rounded-xl bg-slate-100 p-3">
                      <div className="font-medium text-slate-800">{example.ho}</div>
                      <div className="mt-1 text-slate-600">{example.hi}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-slate-500">
              <span>Provenance: {selectedEntry.provenance}</span>
              {selectedEntry.sourcePage ? <span>Page {selectedEntry.sourcePage}</span> : null}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">Select an entry to inspect its meaning and source information.</div>
        )}
      </div>
    </div>
  );
}
