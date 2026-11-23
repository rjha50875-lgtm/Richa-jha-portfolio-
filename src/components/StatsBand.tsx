import { motion } from "motion/react";
import { useSite } from "../context/SiteContext";

export default function StatsBand() {
  const { content } = useSite();
  const { stats } = content;

  return (
    <section
      id="stats"
      className="relative px-5 sm:px-8 max-w-7xl mx-auto"
      data-testid="stats-band"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl bg-ink-deep border border-white/5 px-6 py-10 sm:px-12 sm:py-12 relative overflow-hidden"
      >
        <div className="absolute -top-24 left-1/3 w-[420px] h-[240px] bg-brand/15 blur-[110px] pointer-events-none" />
        <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
          {stats.items.map((stat, i) => (
            <motion.div
              key={`${stat.label}-${i}`}
              initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.65,
                delay: i * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-center lg:text-left"
              data-testid={`stat-item-${i}`}
            >
              <p
                className="font-display font-extrabold text-3xl lg:text-[2rem] text-brand leading-none tracking-tight"
                data-testid={`stat-value-${i}`}
              >
                {stat.value}
              </p>
              <p className="mt-2.5 text-[13px] text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative mt-10 pt-6 border-t border-white/10 text-center">
          <p
            className="text-[13px] text-slate-400 font-mono"
            data-testid="stats-footnote"
          >
            {stats.footnote}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
