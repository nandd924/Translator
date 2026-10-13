export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">Privacy</p>
        <h1 className="text-4xl font-black tracking-tight text-navy">Privacy and data-use notice</h1>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-slate-700">We collect only the minimum information required to operate the application and improve the public dataset. This may include search queries, contribution content, and metadata relevant to submission review. We do not claim to provide deletion or compliance guarantees beyond the implementation actually shipped.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-bold text-navy">What is collected</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            <li>Dictionary search queries used for debugging and validation.</li>
            <li>Community contribution text, meaning, script, language context, and optional contributor name.</li>
            <li>Review outcomes pending approval.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-bold text-navy">Why it is used</h2>
          <p className="mt-3 text-slate-700">This information helps maintain the dictionary, monitor quality, and support public review of entries. Private contributor information is not exposed publicly and is kept separate from approved public entries.</p>
        </div>
      </div>
    </section>
  );
}
