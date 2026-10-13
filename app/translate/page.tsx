import { TranslatorPanel } from '@/components/translator-panel';

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-saffron/30 bg-saffron/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-saffron">
              Ho–Hindi language project
            </span>
            <h1 className="text-4xl font-black tracking-tight text-navy sm:text-5xl lg:text-6xl">
              Discover Ho. Connect Through Language.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-700">
              यह परियोजना हो भाषा और हिन्दी के बीच शब्द-स्तर समझ, शब्दावली खोज और भाषा-सामग्री को समृद्ध बनाने पर केंद्रित है।
              हम शब्दकोश खोज को सत्यापित डेटा और समुदाय लेखन के साथ जोड़ते हैं, जबकि पूरा वाक्य-स्तर अनुवाद अभी भी भविष्य के विकास का भाग है।
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-700">
              <a href="/translate" className="rounded-full bg-navy px-5 py-3 font-medium text-white transition hover:bg-navy/90">Open translator</a>
              <a href="/dictionary" className="rounded-full border border-slate-300 bg-white px-5 py-3 font-medium text-slate-800 transition hover:border-saffron hover:text-saffron">Dictionary</a>
              <a href="/contribute" className="rounded-full border border-slate-300 bg-white px-5 py-3 font-medium text-slate-800 transition hover:border-saffron hover:text-saffron">Contribute</a>
            </div>
          </div>

          <TranslatorPanel />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">Dictionary lookup</p>
            <h2 className="mt-3 text-2xl font-bold text-navy">Word-first translation</h2>
            <p className="mt-3 text-slate-700">Search by Ho headword or Hindi meaning, explore multiple candidates, and inspect review status before using a result.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">Community review</p>
            <h2 className="mt-3 text-2xl font-bold text-navy">Verified vs pending</h2>
            <p className="mt-3 text-slate-700">Unverified OCR candidates remain clearly labeled. Public entries are only shown after review and approval.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">Future roadmap</p>
            <h2 className="mt-3 text-2xl font-bold text-navy">Sentence translation</h2>
            <p className="mt-3 text-slate-700">This interface is designed for dictionary lookup today. Full sentence translation remains explicitly future work.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">Language preservation</p>
            <h2 className="mt-3 text-3xl font-bold text-navy">Helping Ho remain visible in digital spaces</h2>
            <p className="mt-4 text-slate-700">Digital language tools are not only about convenience — they help preserve scripts, vocabulary, dialect nuance, and community ownership of knowledge. This project begins with the dictionary layer because structured public data is the foundation for broader language technology.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">Community mission</p>
            <h2 className="mt-3 text-3xl font-bold text-navy">A transparent and review-driven workflow</h2>
            <p className="mt-4 text-slate-700">This site explains the difference between dictionary lookup and full sentence translation, keeps review status visible, and encourages community contribution while protecting user privacy and data handling transparency.</p>
          </div>
        </div>
      </section>
    </>
  );
}
