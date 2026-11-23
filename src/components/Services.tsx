import { motion } from "motion/react";
import {
  ChartColumn,
  Megaphone,
  Search,
  SlidersHorizontal,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { useSite } from "../context/SiteContext";

const ICONS = [
  Megaphone,
  Search,
  UserPlus,
  TrendingUp,
  SlidersHorizontal,
  ChartColumn,
];

export default function Services() {
  const { content } = useSite();

  return (
    <section
      id="services"
      className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28"
      data-testid="services-section"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-xs font-mono uppercase tracking-[0.25em] text-brand"
      >
        What I do
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-[2.6rem]"
        data-testid="services-title"
      >
        Services built around{" "}
        <span className="text-brand">measurable results</span>
      </motion.h2>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {content.services.map((s, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.div
              key={`${s.title}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: (i % 3) * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl border border-line bg-ink-surface/70 backdrop-blur p-7 hover:border-brand/50 hover:shadow-[0_18px_50px_rgba(244,63,133,0.14)] transition-colors h-full"
              data-testid={`service-card-${i}`}
            >
              <div className="flex items-start justify-between">
                <span className="w-11 h-11 rounded-2xl bg-brand/12 border border-brand/25 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all">
                  <Icon size={19} />
                </span>
                <span className="font-mono text-sm text-brand/60 font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3
                className="mt-6 font-display font-bold text-xl tracking-tight"
                data-testid={`service-title-${i}`}
              >
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-mut">
                {s.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
