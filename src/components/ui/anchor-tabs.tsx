export interface AnchorTabItem {
  id: string;
  label: string;
}

export function AnchorTabs({ items }: { items: AnchorTabItem[] }) {
  return (
    <nav
      aria-label="Section quick links"
      className="sticky top-14 z-30 -mx-4 mb-6 border-b border-blood-100/70 bg-cream/90 px-4 py-2.5 backdrop-blur-md"
    >
      <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-blood-200/80 bg-white px-4 text-xs font-semibold text-stone-700 shadow-2xs transition-colors hover:border-blood-400 hover:bg-blood-50 hover:text-blood-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-500"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
