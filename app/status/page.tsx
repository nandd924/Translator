import { ContributionForm } from '@/components/contribution-form';

export default function ContributePage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">Contribute</p>
        <h1 className="text-4xl font-black tracking-tight text-navy">Submit words for review</h1>
      </div>
      <ContributionForm />
    </section>
  );
}
