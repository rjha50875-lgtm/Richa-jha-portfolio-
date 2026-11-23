import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useSite } from "../context/SiteContext";

export default function About() {
  const { content } = useSite();
  const { about } = content;

  return (
    <section
      id="about"
      className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28"
      data-testid="about-section"
    >
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono uppercase tracking-[0.25em] text-brand"
          >
            {about.heading}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight"
            data-testid="about-title"
          >
            {about.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base leading-relaxed text-fg-mut max-w-xl"
            data-testid="about-description"
          >
            {about.description}
          </motion.p>
          <ul className="mt-8 space-y-3.5">
            {about.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-3 text-[15px] text-fg"
                data-testid={`about-bullet-${i}`}
              >
                <span className="mt-0.5 w-5 h-5 rounded-full bg-brand/15 border border-brand/40 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-brand" />
                </span>
                {b}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-line bg-ink-surface/70 backdrop-blur p-7 sm:p-8"
          data-testid="about-facts-card"
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-brand mb-6">
            Quick facts
          </p>
          <dl className="space-y-4">
            {about.facts.map((f, i) => (
              <div
                key={`${f.label}-${i}`}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-2 border-b border-line last:border-0 group"
                data-testid={`about-fact-${i}`}
              >
                <dt className="text-xs font-mono uppercase tracking-wider text-fg-dim">
                  {f.label}
                </dt>
                <dd className="text-sm font-semibold text-fg group-hover:text-brand transition-colors text-right">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
