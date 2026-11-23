import { motion } from "motion/react";
import { useSite } from "../context/SiteContext";

export default function Clients() {
  const { content } = useSite();
  const { clients } = content;

  return (
    <section
      id="clients"
      className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28"
      data-testid="clients-section"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-xs font-mono uppercase tracking-[0.25em] text-brand"
      >
        {clients.heading}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-[2.6rem] max-w-2xl"
        data-testid="clients-title"
      >
        Brands I've{" "}
        <span className="text-brand">planned, launched &amp; optimised</span>{" "}
        for
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.16 }}
        className="mt-4 text-fg-mut max-w-xl"
        data-testid="clients-description"
      >
        {clients.description}
      </motion.p>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {clients.items.map((c, i) => (
          <motion.div
            key={`${c.name}-${i}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.55,
              delay: (i % 4) * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -5 }}
            className="rounded-2xl border border-line bg-ink-surface/70 backdrop-blur p-5 flex flex-col items-center justify-center gap-4 hover:border-brand/50 hover:shadow-[0_14px_40px_rgba(111,130,86,0.12)] transition-all min-h-[150px]"
            data-testid={`client-card-${i}`}
          >
            <div className="w-20 h-14 rounded-xl bg-white flex items-center justify-center p-2.5 overflow-hidden">
              {c.logo ? (
                <img
                  src={c.logo}
                  alt={`${c.name} logo`}
                  loading="lazy"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span className="font-display font-extrabold text-brand text-lg">
                  {c.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-center leading-tight">
              {c.name}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
