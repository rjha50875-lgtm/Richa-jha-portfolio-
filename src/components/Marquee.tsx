import { useSite } from "../context/SiteContext";

export default function Marquee() {
  const { content } = useSite();
  const items = content.marquee;
  const row = [...items, ...items];

  return (
    <section
      className="relative py-16 overflow-hidden"
      aria-label="Skills marquee"
    >
      <div className="-rotate-2 scale-[1.03]">
        <div className="bg-brand py-4 overflow-hidden shadow-[0_18px_60px_rgba(111,130,86,0.3)]">
          <div className="flex w-max animate-marquee">
            {row.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-6 pr-6 whitespace-nowrap"
                aria-hidden={i >= items.length}
              >
                <span className="font-display font-bold uppercase tracking-wide text-white text-lg sm:text-xl">
                  {item}
                </span>
                <span className="text-white/70 text-sm">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
