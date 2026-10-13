const metrics = [
  { label: 'Dataset entries', value: 'Not available yet' },
  { label: 'Verified entries', value: 'Not available yet' },
  { label: 'Pending review', value: 'Not available yet' },
  { label: 'Processed PDF pages', value: 'Not available yet' },
];

export function StatusSummary() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">{metric.label}</div>
          <div className="mt-4 text-3xl font-black text-navy">{metric.value}</div>
        </div>
      ))}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft md:col-span-2">
        <h2 className="text-2xl font-bold text-navy">Current features</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          <li>Local dictionary adapter and public JSONL dataset.</li>
          <li>Dictionary search with exact and prefix matching.</li>
          <li>Review status labels and public/private data separation.</li>
          <li>Community contribution review pipeline.</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft md:col-span-2">
        <h2 className="text-2xl font-bold text-navy">Known limitations</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          <li>No verified public Ho–Hindi dataset is currently configured.</li>
          <li>Sentence translation remains future work and must be evaluated before claiming functionality.</li>
          <li>OCR processing and public export require a permission-cleared PDF source and review workflow.</li>
        </ul>
      </div>
    </div>
  );
}
