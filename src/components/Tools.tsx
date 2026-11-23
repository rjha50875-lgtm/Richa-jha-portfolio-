import { motion } from "motion/react";
import { useSite } from "../context/SiteContext";

export default function Tools() {
  const { content } = useSite();
  const { tools } = content;

  return (
    <section
      id="tools"
      className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-24"
      data-testid="tools-section"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-xs font-mono uppercase tracking-[0.25em] text-brand"
      >
        Stack
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl"
        data-testid="tools-title"
      >
        {tools.heading}
      </motion.h2>

      <div className="mt-10 space-y-7">
        {tools.groups.map((g, gi) => (
          <motion.div
            key={`${g.name}-${gi}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: gi * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            data-testid={`tools-group-${gi}`}
          >
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-fg-dim mb-3">
              {g.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {g.items.map((t, ti) => (
                <span
                  key={t}
                  className="inline-flex items-center h-8 px-3.5 rounded-full border border-line bg-ink-surface/60 text-[13px] text-fg-mut hover:text-brand hover:border-brand/45 transition-all cursor-default"
                  data-testid={`tool-pill-${gi}-${ti}`}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
