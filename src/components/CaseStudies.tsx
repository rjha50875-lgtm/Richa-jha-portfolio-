import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Image, Lock, Maximize2 } from "lucide-react";
import { useSite } from "../context/SiteContext";
import type { CaseScreenshot } from "../data/defaultContent";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function CaseStudies() {
  const { content } = useSite();
  const [lightbox, setLightbox] = useState<CaseScreenshot | null>(null);

  return (
    <section
      id="cases"
      className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28"
      data-testid="cases-section"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-xs font-mono uppercase tracking-[0.25em] text-brand"
      >
        Case studies
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-[2.6rem]"
        data-testid="cases-title"
      >
        Real campaigns. <span className="text-brand">Real numbers.</span>
      </motion.h2>

      <div className="mt-12 space-y-8">
        {content.caseStudies.map((cs, idx) => (
          <motion.article
            key={`${cs.client}-${idx}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-line bg-ink-surface/70 backdrop-blur p-6 sm:p-10 hover:border-brand/40 transition-colors"
            data-testid={`case-card-${slug(cs.client)}`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <h3
                className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight"
                data-testid={`case-client-${slug(cs.client)}`}
              >
                {cs.client}
              </h3>
              <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full bg-brand/12 border border-brand/30 text-brand">
                {cs.industry}
              </span>
              <span className="text-[11px] font-mono text-fg-dim ml-auto">
                {cs.date}
              </span>
            </div>

            <p
              className="mt-4 font-display font-bold text-xl sm:text-2xl leading-snug max-w-3xl text-fg"
              data-testid={`case-headline-${slug(cs.client)}`}
            >
              {cs.headline}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-mut max-w-3xl">
              {cs.summary}
            </p>

            <div className="mt-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {cs.metrics.map((m, i) => (
                <div
                  key={`${m.label}-${i}`}
                  className={`rounded-2xl border p-4 ${
                    i === 0
                      ? "border-brand/45 bg-brand/8"
                      : "border-line bg-ink-raised/60"
                  }`}
                  data-testid={`case-metric-${slug(cs.client)}-${i}`}
                >
                  <p className="text-[10px] font-mono uppercase tracking-wider text-fg-dim">
                    {m.label}
                  </p>
                  <p
                    className={`mt-1.5 font-bold text-sm sm:text-base ${
                      i === 0 ? "text-brand" : "text-fg"
                    }`}
                  >
                    {m.value}
                  </p>
                </div>
              ))}
            </div>

            {cs.reserved ? (
              <div
                className="mt-7 rounded-2xl border-2 border-dashed border-brand/35 bg-brand/5 p-8 flex flex-col items-center justify-center text-center gap-3"
                data-testid={`case-reserved-${slug(cs.client)}`}
              >
                <span className="w-12 h-12 rounded-2xl bg-brand/12 border border-brand/30 flex items-center justify-center text-brand">
                  <Image size={20} />
                </span>
                <p className="text-sm text-fg-mut max-w-sm flex items-center gap-2">
                  <Lock size={13} className="text-brand" /> {cs.reservedNote}
                </p>
              </div>
            ) : (
              cs.screenshots?.length > 0 && (
                <div className="mt-7 grid sm:grid-cols-2 gap-5">
                  {cs.screenshots.map((shot, i) => (
                    <figure
                      key={i}
                      className="group"
                      data-testid={`case-screenshot-${slug(cs.client)}-${i}`}
                    >
                      <button
                        type="button"
                        onClick={() => setLightbox(shot)}
                        className="relative block w-full rounded-2xl overflow-hidden border border-line group-hover:border-brand/50 transition-all cursor-zoom-in"
                        aria-label={`Open screenshot: ${shot.caption}`}
                      >
                        <img
                          src={shot.src}
                          alt={shot.caption}
                          loading="lazy"
                          className="w-full h-52 sm:h-60 object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 size={13} />
                        </span>
                      </button>
                      <figcaption className="mt-2.5 text-[11px] font-mono text-fg-dim leading-relaxed">
                        {shot.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )
            )}
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-5 cursor-zoom-out"
            data-testid="case-lightbox"
          >
            <motion.img
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              src={lightbox.src}
              alt={lightbox.caption}
              className="max-h-[82vh] max-w-full rounded-2xl border border-white/10 shadow-2xl"
            />
            <p className="mt-4 text-xs font-mono text-slate-300 text-center max-w-2xl">
              {lightbox.caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
