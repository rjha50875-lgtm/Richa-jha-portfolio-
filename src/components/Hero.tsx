import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowDown,
  ChartColumn,
  Hand,
  Megaphone,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { useSite } from "../context/SiteContext";
import { scrollToId } from "../lib/scroll";

const line = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: "0%",
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.2 + i * 0.13,
    },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.55 + i * 0.1,
    },
  }),
};

const PILL_ICONS = [Target, Megaphone, Sparkles, TrendingUp, ChartColumn, Sparkles];

export default function Hero() {
  const { content } = useSite();
  const { hero } = content;
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [0, 2.5]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative pt-36 pb-16 lg:pt-44 lg:pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
      <motion.div
        style={{ y: glowY }}
        className="absolute -top-32 right-[8%] w-[520px] h-[520px] rounded-full bg-brand/20 blur-[140px] pointer-events-none"
      />
      <div className="absolute top-40 -left-40 w-[420px] h-[420px] rounded-full bg-brand-deep/15 blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.3fr_0.7fr] gap-14 lg:gap-8 items-center">
        <div>
          <motion.div
            variants={fade}
            custom={0}
            initial="hidden"
            animate="show"
            data-testid="hero-badge"
            className="inline-flex items-center gap-2.5 h-10 pl-4 pr-5 rounded-full border border-line bg-ink-surface/70 backdrop-blur"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand" />
            </span>
            <span className="text-sm text-fg-mut flex items-center gap-1.5">
              <Hand size={14} className="text-brand" /> {hero.badge}
            </span>
          </motion.div>

          <h1 className="mt-7 font-display font-extrabold tracking-tight leading-[1.06] text-[clamp(2rem,4.6vw,3.7rem)]">
            <span className="block overflow-hidden pb-1">
              <motion.span
                variants={line}
                custom={0}
                initial="hidden"
                animate="show"
                className="block"
                data-testid="hero-name"
              >
                I'm{" "}
                <span className="text-brand text-glow">{hero.nameLine}</span>
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                variants={line}
                custom={1}
                initial="hidden"
                animate="show"
                className="block"
                data-testid="hero-title"
              >
                {hero.titleLine}
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fade}
            custom={1}
            initial="hidden"
            animate="show"
            className="mt-7 max-w-md text-base leading-relaxed text-fg-mut border-l-2 border-brand pl-5"
            data-testid="hero-description"
          >
            {hero.description}
          </motion.p>

          <motion.div
            variants={fade}
            custom={2}
            initial="hidden"
            animate="show"
            className="mt-7 flex flex-wrap gap-2.5 max-w-lg"
          >
            {hero.skills.map((skill, i) => {
              const Icon = PILL_ICONS[i % PILL_ICONS.length];
              return (
                <span
                  key={skill}
                  data-testid={`hero-skill-pill-${i}`}
                  className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-ink-raised border border-line text-[13px] font-medium hover:border-brand/50 hover:text-brand transition-all cursor-default"
                >
                  <Icon size={13} className="text-brand" /> {skill}
                </span>
              );
            })}
          </motion.div>

          <motion.div
            variants={fade}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-cta-cases"
              onClick={() => scrollToId("cases")}
              className="h-12 px-7 rounded-full bg-brand text-white text-sm font-semibold hover:bg-brand-deep hover:shadow-[0_0_36px_rgba(111,130,86,0.5)] hover:-translate-y-0.5 transition-all"
            >
              View Case Studies
            </button>
            <button
              data-testid="hero-cta-contact"
              onClick={() => scrollToId("contact")}
              className="h-12 px-7 rounded-full border border-line-strong text-sm font-semibold hover:bg-brand/10 transition-all"
            >
              Get in Touch
            </button>
          </motion.div>
        </div>

        <motion.div
          style={{ y: cardY, rotate: cardRotate }}
          className="relative mx-auto w-full max-w-md"
          data-testid="hero-monogram-card"
        >
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand/25 via-transparent to-brand-deep/20 blur-xl" />
          <div className="relative rounded-[2rem] border border-line bg-ink-surface/80 backdrop-blur-xl p-8 overflow-hidden">
            <div className="flex items-start justify-between gap-3">
              <div className="shrink-0" data-testid="hero-experience-badge">
                <p className="font-display font-extrabold text-3xl leading-none whitespace-nowrap">
                  {hero.experienceBadge}
                </p>
                <p className="text-xs text-fg-mut mt-1.5 font-mono tracking-wider whitespace-nowrap">
                  {hero.experienceLabel}
                </p>
              </div>
              <span className="shrink-0 text-[11px] font-mono uppercase tracking-[0.22em] text-brand border border-brand/30 rounded-full px-3 py-1.5 mt-1">
                Portfolio
              </span>
            </div>

            <div className="relative mt-6 aspect-square max-w-[320px] mx-auto">
              <div className="absolute inset-0 rounded-full border border-dashed border-brand/30 animate-spin-slower" />
              <div className="absolute inset-6 rounded-full border border-brand/15" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-44 h-44 rounded-3xl bg-gradient-to-br from-brand via-brand-deep to-[#2E3A22] flex items-center justify-center shadow-[0_20px_70px_rgba(111,130,86,0.4)] rotate-3">
                  <span
                    className="font-display font-extrabold text-white text-6xl tracking-tight"
                    data-testid="hero-monogram"
                  >
                    {hero.monogram}
                  </span>
                </div>
              </div>
              <span className="absolute top-3 -left-1 animate-floaty text-[10px] font-mono px-2.5 py-1.5 rounded-lg bg-ink-raised border border-line text-fg-mut">
                Meta Ads Manager
              </span>
              <span
                className="absolute bottom-4 -right-2 animate-floaty text-[10px] font-mono px-2.5 py-1.5 rounded-lg bg-ink-raised border border-line text-fg-mut"
                style={{ animationDelay: "1.4s" }}
              >
                Google Ads
              </span>
              <span
                className="absolute top-1/2 -right-4 animate-floaty text-[10px] font-mono px-2.5 py-1.5 rounded-lg bg-ink-raised border border-line text-fg-mut"
                style={{ animationDelay: "2.6s" }}
              >
                GA4
              </span>
            </div>

            <p className="mt-6 text-center text-[13px] text-fg-dim font-mono">
              Ghaziabad, India · Meta &amp; Google Ads
            </p>
          </div>
        </motion.div>
      </div>

      <motion.button
        variants={fade}
        custom={4}
        initial="hidden"
        animate="show"
        onClick={() => scrollToId("stats")}
        data-testid="hero-scroll-cue"
        className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-fg-dim hover:text-brand transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
          Scroll
        </span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
