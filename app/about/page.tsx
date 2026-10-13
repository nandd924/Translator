import { DictionaryBrowser } from '@/components/dictionary-browser';

export default function DictionaryPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">Public dictionary</p>
        <h1 className="text-4xl font-black tracking-tight text-navy">Search Ho and Hindi entries</h1>
      </div>
      <DictionaryBrowser />
    </section>
  );
}
