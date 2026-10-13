'use client';

import { FormEvent, useState } from 'react';

const initialState = {
  hoText: '',
  hindiMeaning: '',
  scriptUsed: 'Latin',
  context: '',
  dialect: '',
  contributorName: '',
  consent: false,
};

export function ContributionForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.consent) {
      setStatus({ type: 'error', message: 'You must confirm that your submission may be reviewed and used in the project workflow.' });
      return;
    }

    try {
      const response = await fetch('/api/contributions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ? JSON.stringify(payload.error) : 'Submission failed.');
      }

      setStatus({ type: 'success', message: 'Contribution sent to review queue. It remains pending until an authorized reviewer approves it.' });
      setForm(initialState);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'There was a problem submitting your contribution.',
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="hoText" className="mb-2 block text-sm font-medium text-slate-700">Ho text</label>
          <input id="hoText" value={form.hoText} onChange={(event) => setForm((current) => ({ ...current, hoText: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" />
        </div>
        <div>
          <label htmlFor="hindiMeaning" className="mb-2 block text-sm font-medium text-slate-700">Hindi meaning or translation</label>
          <input id="hindiMeaning" value={form.hindiMeaning} onChange={(event) => setForm((current) => ({ ...current, hindiMeaning: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" />
        </div>
        <div>
          <label htmlFor="scriptUsed" className="mb-2 block text-sm font-medium text-slate-700">Script used</label>
          <select id="scriptUsed" value={form.scriptUsed} onChange={(event) => setForm((current) => ({ ...current, scriptUsed: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20">
            <option>Latin</option>
            <option>Ol Chiki</option>
            <option>Devanagari</option>
            <option>Mixed script</option>
          </select>
        </div>
        <div>
          <label htmlFor="dialect" className="mb-2 block text-sm font-medium text-slate-700">Dialect information (optional)</label>
          <input id="dialect" value={form.dialect} onChange={(event) => setForm((current) => ({ ...current, dialect: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="context" className="mb-2 block text-sm font-medium text-slate-700">Optional context or sentence</label>
          <textarea id="context" rows={4} value={form.context} onChange={(event) => setForm((current) => ({ ...current, context: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="contributorName" className="mb-2 block text-sm font-medium text-slate-700">Contributor display name (optional)</label>
          <input id="contributorName" value={form.contributorName} onChange={(event) => setForm((current) => ({ ...current, contributorName: event.target.value }))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20" />
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <input type="checkbox" checked={form.consent} onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))} className="mt-1 h-4 w-4 rounded border-slate-300 text-navy focus:ring-saffron" />
        <span>I consent to this contribution being reviewed, sanitized, and used as part of the project’s dictionary review workflow. I understand submissions remain unverified until reviewed by an authorized reviewer.</span>
      </label>

      {status ? (
        <div className={`mt-5 rounded-2xl border p-3 text-sm ${status.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
          {status.message}
        </div>
      ) : null}

      <button type="submit" className="mt-6 rounded-full bg-navy px-6 py-3 font-semibold text-white transition hover:bg-navy/90">Submit for review</button>
    </form>
  );
}
