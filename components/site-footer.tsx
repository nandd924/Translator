import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/translate', label: 'Translate' },
  { href: '/dictionary', label: 'Dictionary' },
  { href: '/about', label: 'About' },
  { href: '/contribute', label: 'Contribute' },
  { href: '/status', label: 'Status' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-ivory/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-lg font-black text-white shadow-soft">H</div>
          <div>
            <div className="text-base font-black uppercase tracking-[0.12em] text-navy">Ho–Hindi</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Translator</div>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 transition hover:text-saffron">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
