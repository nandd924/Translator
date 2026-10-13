import { TranslatorPanel } from '@/components/translator-panel';

export default function TranslatePage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">Dictionary translator</p>
        <h1 className="text-4xl font-black tracking-tight text-navy">Word lookup and dictionary search</h1>
        <p className="max-w-2xl text-lg text-slate-700">This interface supports Ho → Hindi and Hindi → Ho dictionary lookup. It is not a full sentence translation tool and it explicitly avoids fabricated results when no verified match exists.</p>
      </div>
      <TranslatorPanel />
    </section>
  );
}
