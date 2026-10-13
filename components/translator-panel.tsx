import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-lg font-black uppercase tracking-[0.12em] text-navy">Ho–Hindi Translator</h2>
          <p className="mt-3 text-sm text-slate-600">A dictionary-first language project focused on reviewable, transparent Ho–Hindi data.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li><Link href="/translate">Translator</Link></li>
            <li><Link href="/dictionary">Dictionary</Link></li>
            <li><Link href="/status">Project status</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-saffron">Policies</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/data-policy">Data policy</Link></li>
            <li><Link href="/contribute">Contribute</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
