const ITEMS = [
  "ევაკუატორის გამოძახება",
  "სტანდარტული ევაკუატორი",
  "ობობა ევაკუატორი",
  "ავარიული ევაკუაცია",
  "თბილისი და რეგიონები",
];

/** გამჭოლი მოძრავი ზოლი — ორჯერ გამეორებული სია უწყვეტი მოძრაობისთვის. */
export default function Marquee() {
  return (
    <div className="marquee overflow-hidden border-y border-white/10 bg-ink py-4">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {ITEMS.map((t) => (
              <li key={t} className="flex items-center gap-6 whitespace-nowrap px-6">
                <span className="text-sm font-bold uppercase tracking-wider text-white/70">{t}</span>
                <span className="size-1.5 rounded-full bg-brand" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
