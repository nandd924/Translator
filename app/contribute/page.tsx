export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">About the project</p>
        <h1 className="text-4xl font-black tracking-tight text-navy">Why Ho needs accessible digital tools</h1>
        <p className="text-lg leading-8 text-slate-700">The Ho language deserves tools that make it discoverable, teachable, and usable in digital settings. Many low-resource languages struggle with limited public data and few interfaces that are easy for learners, teachers, and community members to engage with.</p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-navy">Project goal</h2>
            <p className="mt-3 text-slate-700">Create a dictionary-first public resource for Ho–Hindi search, community review, and long-term language preservation work.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-navy">Dataset preparation</h2>
            <p className="mt-3 text-slate-700">A scanned dictionary PDF may be used as a source for OCR and review, but only approved, copyright-cleared entries are promoted into the public dataset.</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-bold text-navy">Why review matters</h2>
          <p className="mt-3 text-slate-700">Native-speaker verification and editorial review are essential to prevent incorrect translations, distorted spellings, and poor OCR candidate selection. This project keeps review status visible so users know what is verified and what remains pending.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-bold text-navy">Current limitations</h2>
          <p className="mt-3 text-slate-700">The website is fully functional as a public interface and backend prototype with a local dataset adapter, but it does not claim full dictionary coverage until a permitted and reviewed data source is added. Sentence-level translation remains future work and should be evaluated separately.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-bold text-navy">Future roadmap</h2>
          <p className="mt-3 text-slate-700">The roadmap includes dataset import, review workflow, open community contributions, public release of approved entries, and eventually a sentence-translation pipeline only after benchmarked evaluation.</p>
        </div>
      </div>
    </section>
  );
}
