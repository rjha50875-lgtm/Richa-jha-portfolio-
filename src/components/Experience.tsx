import { motion } from "motion/react";
import { BadgeCheck, GraduationCap } from "lucide-react";
import { useSite } from "../context/SiteContext";

export default function Experience() {
  const { content } = useSite();

  return (
    <section
      id="experience"
      className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28"
      data-testid="experience-section"
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-xs font-mono uppercase tracking-[0.25em] text-brand"
      >
        Experience
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-[2.6rem]"
        data-testid="experience-title"
      >
        Where I've <span className="text-brand">run the ads</span>
      </motion.h2>

      <div className="mt-12 grid lg:grid-cols-[1.15fr_0.85fr] gap-12">
        <div className="relative pl-8 border-l border-line">
          {content.experience.map((xp, i) => (
            <motion.div
              key={`${xp.company}-${i}`}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative pb-10 last:pb-0"
              data-testid={`experience-item-${i}`}
            >
              <span className="absolute -left-[41px] top-1.5 w-3.5 h-3.5 rounded-full bg-brand ring-4 ring-brand/15" />
              <div className="flex flex-wrap items-center gap-3">
                <h3
                  className="font-display font-bold text-xl tracking-tight"
                  data-testid={`experience-role-${i}`}
                >
                  {xp.role}
                </h3>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-ink-raised border border-line text-fg-mut">
                  {xp.duration}
                </span>
              </div>
              <p
                className="mt-1 text-sm font-semibold text-brand"
                data-testid={`experience-company-${i}`}
              >
                {xp.company}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-mut max-w-lg">
                {xp.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-line bg-ink-surface/70 backdrop-blur p-7"
            data-testid="education-card"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-brand/12 border border-brand/25 flex items-center justify-center text-brand">
                <GraduationCap size={18} />
              </span>
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-brand">
                Education
              </p>
            </div>
            <p className="mt-5 font-display font-bold text-lg">
              BBA — Pursuing
            </p>
            <p className="text-sm text-fg-mut mt-1">
              IGNOU · Bachelor of Business Administration
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-line bg-ink-surface/70 backdrop-blur p-7"
            data-testid="certification-card"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-brand/12 border border-brand/25 flex items-center justify-center text-brand">
                <BadgeCheck size={18} />
              </span>
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-brand">
                Certification
              </p>
            </div>
            <p className="mt-5 font-display font-bold text-lg">
              Digital Marketing
            </p>
            <p className="text-sm text-fg-mut mt-1">HubSpot</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
