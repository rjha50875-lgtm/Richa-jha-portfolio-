import { motion } from "motion/react";
import { ArrowUpRight, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useSite } from "../context/SiteContext";

export default function Contact() {
  const { content } = useSite();
  const { contact } = content;

  const channels = [
    {
      icon: Phone,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
      testid: "contact-phone",
    },
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      testid: "contact-email",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: contact.linkedinLabel,
      href: contact.linkedin,
      testid: "contact-linkedin",
    },
    {
      icon: MapPin,
      label: "Location",
      value: contact.location,
      href: null,
      testid: "contact-location",
    },
  ];

  return (
    <section
      id="contact"
      className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 lg:py-28"
      data-testid="contact-section"
    >
      <div className="relative rounded-[2rem] border border-line bg-ink-surface/70 backdrop-blur p-8 sm:p-14 overflow-hidden">
        <div className="absolute -top-28 -right-20 w-[420px] h-[320px] bg-brand/15 blur-[110px] pointer-events-none" />
        <div className="relative">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono uppercase tracking-[0.25em] text-brand"
          >
            Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-display font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-3xl"
            data-testid="contact-heading"
          >
            {contact.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-5 text-fg-mut max-w-xl"
            data-testid="contact-subheading"
          >
            {contact.subheading}
          </motion.p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {channels.map((c, i) => {
              const Icon = c.icon;
              const inner = (
                <>
                  <span className="w-10 h-10 rounded-xl bg-brand/12 border border-brand/25 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all shrink-0">
                    <Icon size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-fg-dim">
                      {c.label}
                    </span>
                    <span className="block mt-1 text-sm font-semibold truncate">
                      {c.value}
                    </span>
                  </span>
                  {c.href && (
                    <ArrowUpRight
                      size={15}
                      className="ml-auto text-fg-dim group-hover:text-brand transition-colors shrink-0"
                    />
                  )}
                </>
              );
              const cls =
                "group flex items-center gap-3.5 rounded-2xl border border-line bg-ink-raised/60 p-4 hover:border-brand/50 hover:shadow-[0_10px_30px_rgba(111,130,86,0.12)] transition-all w-full text-left";
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className={cls}
                      data-testid={c.testid}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cls} data-testid={c.testid}>
                      {inner}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
