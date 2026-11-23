import React, { useEffect, useState } from "react";
import axios from "axios";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import { toast } from "sonner";
import {
  Briefcase,
  ChartColumn,
  Clock,
  ExternalLink,
  Eye,
  FolderOpen,
  ImagePlus,
  Info,
  LoaderCircle,
  LockKeyhole,
  LogOut,
  Mail,
  Plus,
  RotateCcw,
  Save,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { useSite } from "../context/SiteContext";
import { defaultContent, type SiteContent } from "../data/defaultContent";

const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl bg-background border border-input text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand/50 transition";

function formatApiError(detail: unknown): string {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((e) =>
        e && typeof (e as { msg?: unknown }).msg === "string"
          ? (e as { msg: string }).msg
          : JSON.stringify(e)
      )
      .filter(Boolean)
      .join(" ");
  }
  if (
    typeof detail === "object" &&
    typeof (detail as { msg?: unknown }).msg === "string"
  ) {
    return (detail as { msg: string }).msg;
  }
  return String(detail);
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="block text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
    {children}
  </span>
);

function TextIn({
  label,
  value,
  onChange,
  testid,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  testid?: string;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <input
        className={inputCls}
        value={value ?? ""}
        data-testid={testid}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function AreaIn({
  label,
  value,
  onChange,
  rows = 4,
  testid,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  rows?: number;
  testid?: string;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <textarea
        className={`${inputCls} resize-y leading-relaxed`}
        rows={rows}
        value={value ?? ""}
        data-testid={testid}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function RowCard({
  children,
  onRemove,
  testid,
}: {
  children: React.ReactNode;
  onRemove: () => void;
  testid?: string;
}) {
  return (
    <div
      className="relative rounded-2xl border border-border bg-card/60 p-4 pr-10"
      data-testid={testid}
    >
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove"
        data-testid={testid ? `${testid}-remove` : undefined}
        className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition"
      >
        <Trash2 size={14} />
      </button>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ImageUpload({
  label,
  value,
  onChange,
  testid,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  testid?: string;
}) {
  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        {value ? (
          <img
            src={value}
            alt=""
            className="w-16 h-12 rounded-lg object-cover border border-border"
          />
        ) : (
          <span className="w-16 h-12 rounded-lg border border-dashed border-border flex items-center justify-center text-muted-foreground">
            <ImagePlus size={16} />
          </span>
        )}
        <div className="flex-1 min-w-0">
          <input
            className={`${inputCls} mb-1.5`}
            placeholder="/path/to/image.jpg or upload"
            value={value ?? ""}
            data-testid={testid ? `${testid}-url` : undefined}
            onChange={(e) => onChange(e.target.value)}
          />
          <label className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-brand hover:underline">
            <ImagePlus size={12} /> Upload image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              data-testid={testid ? `${testid}-file` : undefined}
              onChange={onPick}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

const TABS = [
  ["hero", "Hero", User],
  ["stats", "Stats", ChartColumn],
  ["about", "About", Info],
  ["services", "Services", Briefcase],
  ["cases", "Case Studies", FolderOpen],
  ["clients", "Clients", Users],
  ["xptools", "Experience & Tools", Clock],
  ["contact", "Contact", Mail],
] as const;

type TabId = (typeof TABS)[number][0];

interface AdminUser {
  email: string;
}

export default function Admin() {
  const { content, saveContent } = useSite();
  const [user, setUser] = useState<AdminUser | null | undefined>(undefined);
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<TabId>("hero");
  const [caseIdx, setCaseIdx] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios
      .get<AdminUser>("/api/auth/me", { withCredentials: true })
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (content && !draft) {
      setDraft(cloneDeep(content));
    }
  }, [content, draft]);

  const edit = (path: string, value: unknown) =>
    setDraft((d) => {
      if (!d) return d;
      const n = cloneDeep(d);
      set(n as unknown as Record<string, unknown>, path, value);
      return n;
    });

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      await saveContent(cloneDeep(draft));
      toast.success("Saved — your site is updated");
    } catch (e: unknown) {
      const err = e as { response?: { data?: { detail?: unknown } }; message?: string };
      toast.error(
        formatApiError(err.response?.data?.detail) || err.message || "Error"
      );
    }
    setSaving(false);
  };

  const reset = () => {
    setDraft(cloneDeep(defaultContent));
    toast("Reset to defaults — press Save to publish");
  };

  const logout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true }).catch(() => {});
    setUser(null);
  };

  if (user === undefined || !draft) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <LoaderCircle className="animate-spin text-brand" />
      </div>
    );
  }

  if (!user) return <LoginCard onLogin={setUser} />;

  const cs = draft.caseStudies[caseIdx] ?? draft.caseStudies[0];

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      data-testid="admin-dashboard"
    >
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-display font-bold text-xs">
              RJ
            </span>
            <div className="min-w-0">
              <p className="font-display font-bold text-sm leading-tight truncate">
                Portfolio Admin
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              data-testid="admin-view-site"
              className="h-9 px-3.5 rounded-xl border border-input text-xs font-semibold flex items-center gap-1.5 hover:border-brand/50 transition"
            >
              <Eye size={13} /> View site
            </a>
            <button
              onClick={reset}
              data-testid="admin-reset"
              className="h-9 px-3.5 rounded-xl border border-input text-xs font-semibold flex items-center gap-1.5 hover:border-red-400 hover:text-red-400 transition"
            >
              <RotateCcw size={13} /> Reset
            </button>
            <button
              onClick={save}
              disabled={saving}
              data-testid="admin-save"
              className="h-9 px-4 rounded-xl bg-brand text-white text-xs font-bold flex items-center gap-1.5 hover:bg-brand-deep disabled:opacity-60 transition"
            >
              <span style={{ display: "contents" }}>
                {saving ? (
                  <LoaderCircle size={13} className="animate-spin" />
                ) : (
                  <Save size={13} />
                )}
              </span>{" "}
              Save
            </button>
            <button
              onClick={logout}
              data-testid="admin-logout"
              aria-label="Logout"
              className="h-9 w-9 rounded-xl border border-input flex items-center justify-center text-muted-foreground hover:text-red-400 transition"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-6 flex flex-col md:flex-row gap-6 items-start">
        <nav className="hidden md:flex flex-col gap-1 sticky top-24 w-52 shrink-0">
          {TABS.map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              data-testid={`admin-tab-${id}`}
              className={`flex items-center gap-2.5 h-10 px-4 rounded-xl text-sm font-semibold transition ${
                tab === id
                  ? "bg-brand/12 text-brand border border-brand/30"
                  : "text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </nav>

        <div className="md:hidden flex gap-1.5 overflow-x-auto pb-2 w-full">
          {TABS.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`h-9 px-3.5 rounded-xl text-xs font-semibold border transition whitespace-nowrap ${
                tab === id
                  ? "bg-brand/12 text-brand border-brand/30"
                  : "text-muted-foreground border-input"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <main className="flex-1 min-w-0 w-full space-y-5 pb-20">
          {tab === "hero" && (
            <>
              <TextIn
                label="Badge text"
                value={draft.hero.badge}
                onChange={(v) => edit("hero.badge", v)}
                testid="hero-badge-input"
              />
              <TextIn
                label="Name"
                value={draft.hero.nameLine}
                onChange={(v) => edit("hero.nameLine", v)}
                testid="hero-name-input"
              />
              <TextIn
                label="Title line"
                value={draft.hero.titleLine}
                onChange={(v) => edit("hero.titleLine", v)}
                testid="hero-title-input"
              />
              <AreaIn
                label="Description"
                value={draft.hero.description}
                onChange={(v) => edit("hero.description", v)}
                testid="hero-description-input"
              />
              <div className="grid sm:grid-cols-3 gap-4">
                <TextIn
                  label="Experience badge"
                  value={draft.hero.experienceBadge}
                  onChange={(v) => edit("hero.experienceBadge", v)}
                  testid="hero-exp-input"
                />
                <TextIn
                  label="Experience label"
                  value={draft.hero.experienceLabel}
                  onChange={(v) => edit("hero.experienceLabel", v)}
                  testid="hero-exp-label-input"
                />
                <TextIn
                  label="Monogram"
                  value={draft.hero.monogram}
                  onChange={(v) => edit("hero.monogram", v)}
                  testid="hero-monogram-input"
                />
              </div>
              <AreaIn
                label="Skill pills (comma separated)"
                rows={2}
                value={draft.hero.skills.join(", ")}
                onChange={(v) =>
                  edit(
                    "hero.skills",
                    v
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
                testid="hero-skills-input"
              />
            </>
          )}

          {tab === "stats" && (
            <>
              {draft.stats.items.map((s, i) => (
                <RowCard
                  key={i}
                  testid={`stats-row-${i}`}
                  onRemove={() =>
                    edit(
                      "stats.items",
                      draft.stats.items.filter((_, x) => x !== i)
                    )
                  }
                >
                  <div className="grid sm:grid-cols-2 gap-3">
                    <TextIn
                      label="Value"
                      value={s.value}
                      onChange={(v) => edit(`stats.items.${i}.value`, v)}
                      testid={`stats-value-${i}`}
                    />
                    <TextIn
                      label="Label"
                      value={s.label}
                      onChange={(v) => edit(`stats.items.${i}.label`, v)}
                      testid={`stats-label-${i}`}
                    />
                  </div>
                </RowCard>
              ))}
              <button
                data-testid="stats-add"
                onClick={() =>
                  edit("stats.items", [
                    ...draft.stats.items,
                    { value: "", label: "" },
                  ])
                }
                className="flex items-center gap-1.5 text-sm text-brand font-semibold hover:underline"
              >
                <Plus size={14} /> Add stat
              </button>
              <AreaIn
                label="Footnote"
                rows={2}
                value={draft.stats.footnote}
                onChange={(v) => edit("stats.footnote", v)}
                testid="stats-footnote-input"
              />
            </>
          )}

          {tab === "about" && (
            <>
              <TextIn
                label="Title"
                value={draft.about.title}
                onChange={(v) => edit("about.title", v)}
                testid="about-title-input"
              />
              <AreaIn
                label="Description"
                value={draft.about.description}
                onChange={(v) => edit("about.description", v)}
                testid="about-description-input"
              />
              {draft.about.bullets.map((b, i) => (
                <RowCard
                  key={i}
                  testid={`about-bullet-row-${i}`}
                  onRemove={() =>
                    edit(
                      "about.bullets",
                      draft.about.bullets.filter((_, x) => x !== i)
                    )
                  }
                >
                  <TextIn
                    label={`Bullet ${i + 1}`}
                    value={b}
                    onChange={(v) => edit(`about.bullets.${i}`, v)}
                    testid={`about-bullet-${i}`}
                  />
                </RowCard>
              ))}
              <button
                data-testid="about-bullet-add"
                onClick={() =>
                  edit("about.bullets", [...draft.about.bullets, ""])
                }
                className="flex items-center gap-1.5 text-sm text-brand font-semibold hover:underline"
              >
                <Plus size={14} /> Add bullet
              </button>
              {draft.about.facts.map((f, i) => (
                <RowCard
                  key={i}
                  testid={`about-fact-row-${i}`}
                  onRemove={() =>
                    edit(
                      "about.facts",
                      draft.about.facts.filter((_, x) => x !== i)
                    )
                  }
                >
                  <div className="grid sm:grid-cols-2 gap-3">
                    <TextIn
                      label="Label"
                      value={f.label}
                      onChange={(v) => edit(`about.facts.${i}.label`, v)}
                      testid={`about-fact-label-${i}`}
                    />
                    <TextIn
                      label="Value"
                      value={f.value}
                      onChange={(v) => edit(`about.facts.${i}.value`, v)}
                      testid={`about-fact-value-${i}`}
                    />
                  </div>
                </RowCard>
              ))}
              <button
                data-testid="about-fact-add"
                onClick={() =>
                  edit("about.facts", [
                    ...draft.about.facts,
                    { label: "", value: "" },
                  ])
                }
                className="flex items-center gap-1.5 text-sm text-brand font-semibold hover:underline"
              >
                <Plus size={14} /> Add fact
              </button>
            </>
          )}

          {tab === "services" && (
            <>
              {draft.services.map((s, i) => (
                <RowCard
                  key={i}
                  testid={`service-row-${i}`}
                  onRemove={() =>
                    edit(
                      "services",
                      draft.services.filter((_, x) => x !== i)
                    )
                  }
                >
                  <TextIn
                    label="Title"
                    value={s.title}
                    onChange={(v) => edit(`services.${i}.title`, v)}
                    testid={`service-title-${i}`}
                  />
                  <AreaIn
                    label="Description"
                    rows={2}
                    value={s.description}
                    onChange={(v) => edit(`services.${i}.description`, v)}
                    testid={`service-desc-${i}`}
                  />
                </RowCard>
              ))}
              <button
                data-testid="service-add"
                onClick={() =>
                  edit("services", [
                    ...draft.services,
                    { title: "", description: "" },
                  ])
                }
                className="flex items-center gap-1.5 text-sm text-brand font-semibold hover:underline"
              >
                <Plus size={14} /> Add service
              </button>
            </>
          )}

          {tab === "cases" && cs && (
            <>
              <div className="flex flex-wrap gap-2">
                {draft.caseStudies.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setCaseIdx(i)}
                    data-testid={`case-select-${i}`}
                    className={`h-9 px-4 rounded-xl text-xs font-semibold border transition ${
                      caseIdx === i
                        ? "bg-brand/12 text-brand border-brand/30"
                        : "text-muted-foreground border-input"
                    }`}
                  >
                    {c.client || `Case ${i + 1}`}
                  </button>
                ))}
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <TextIn
                  label="Client"
                  value={cs.client}
                  onChange={(v) => edit(`caseStudies.${caseIdx}.client`, v)}
                  testid="case-client-input"
                />
                <TextIn
                  label="Industry"
                  value={cs.industry}
                  onChange={(v) => edit(`caseStudies.${caseIdx}.industry`, v)}
                  testid="case-industry-input"
                />
                <TextIn
                  label="Date"
                  value={cs.date}
                  onChange={(v) => edit(`caseStudies.${caseIdx}.date`, v)}
                  testid="case-date-input"
                />
              </div>
              <TextIn
                label="Headline"
                value={cs.headline}
                onChange={(v) => edit(`caseStudies.${caseIdx}.headline`, v)}
                testid="case-headline-input"
              />
              <AreaIn
                label="Summary"
                value={cs.summary}
                onChange={(v) => edit(`caseStudies.${caseIdx}.summary`, v)}
                testid="case-summary-input"
              />
              {cs.metrics.map((m, i) => (
                <RowCard
                  key={i}
                  testid={`case-metric-row-${caseIdx}-${i}`}
                  onRemove={() =>
                    edit(
                      `caseStudies.${caseIdx}.metrics`,
                      cs.metrics.filter((_, x) => x !== i)
                    )
                  }
                >
                  <div className="grid sm:grid-cols-2 gap-3">
                    <TextIn
                      label="Metric label"
                      value={m.label}
                      onChange={(v) =>
                        edit(`caseStudies.${caseIdx}.metrics.${i}.label`, v)
                      }
                      testid={`case-metric-label-${caseIdx}-${i}`}
                    />
                    <TextIn
                      label="Metric value"
                      value={m.value}
                      onChange={(v) =>
                        edit(`caseStudies.${caseIdx}.metrics.${i}.value`, v)
                      }
                      testid={`case-metric-value-${caseIdx}-${i}`}
                    />
                  </div>
                </RowCard>
              ))}
              <button
                data-testid="case-metric-add"
                onClick={() =>
                  edit(`caseStudies.${caseIdx}.metrics`, [
                    ...cs.metrics,
                    { label: "", value: "" },
                  ])
                }
                className="flex items-center gap-1.5 text-sm text-brand font-semibold hover:underline"
              >
                <Plus size={14} /> Add metric
              </button>
              <label
                className="flex items-center gap-2.5 text-sm font-semibold"
                data-testid="case-reserved-toggle-wrap"
              >
                <input
                  type="checkbox"
                  checked={!!cs.reserved}
                  data-testid="case-reserved-toggle"
                  onChange={(e) =>
                    edit(`caseStudies.${caseIdx}.reserved`, e.target.checked)
                  }
                  className="w-4 h-4 accent-[#F43F85]"
                />
                Reserved screenshot slot (shows dashed placeholder instead of
                images)
              </label>
              <TextIn
                label="Reserved note"
                value={cs.reservedNote}
                onChange={(v) => edit(`caseStudies.${caseIdx}.reservedNote`, v)}
                testid="case-reserved-note-input"
              />
              {cs.screenshots.map((shot, i) => (
                <RowCard
                  key={i}
                  testid={`case-shot-row-${caseIdx}-${i}`}
                  onRemove={() =>
                    edit(
                      `caseStudies.${caseIdx}.screenshots`,
                      cs.screenshots.filter((_, x) => x !== i)
                    )
                  }
                >
                  <ImageUpload
                    label={`Screenshot ${i + 1}`}
                    value={shot.src}
                    onChange={(v) =>
                      edit(`caseStudies.${caseIdx}.screenshots.${i}.src`, v)
                    }
                    testid={`case-shot-src-${caseIdx}-${i}`}
                  />
                  <TextIn
                    label="Caption"
                    value={shot.caption}
                    onChange={(v) =>
                      edit(`caseStudies.${caseIdx}.screenshots.${i}.caption`, v)
                    }
                    testid={`case-shot-caption-${caseIdx}-${i}`}
                  />
                </RowCard>
              ))}
              <button
                data-testid="case-shot-add"
                onClick={() =>
                  edit(`caseStudies.${caseIdx}.screenshots`, [
                    ...cs.screenshots,
                    { src: "", caption: "" },
                  ])
                }
                className="flex items-center gap-1.5 text-sm text-brand font-semibold hover:underline"
              >
                <Plus size={14} /> Add screenshot
              </button>
            </>
          )}

          {tab === "clients" && (
            <>
              <TextIn
                label="Section heading"
                value={draft.clients.heading}
                onChange={(v) => edit("clients.heading", v)}
                testid="clients-heading-input"
              />
              <AreaIn
                label="Description"
                rows={2}
                value={draft.clients.description}
                onChange={(v) => edit("clients.description", v)}
                testid="clients-description-input"
              />
              {draft.clients.items.map((c, i) => (
                <RowCard
                  key={i}
                  testid={`client-row-${i}`}
                  onRemove={() =>
                    edit(
                      "clients.items",
                      draft.clients.items.filter((_, x) => x !== i)
                    )
                  }
                >
                  <TextIn
                    label="Client name"
                    value={c.name}
                    onChange={(v) => edit(`clients.items.${i}.name`, v)}
                    testid={`client-name-${i}`}
                  />
                  <ImageUpload
                    label="Logo"
                    value={c.logo}
                    onChange={(v) => edit(`clients.items.${i}.logo`, v)}
                    testid={`client-logo-${i}`}
                  />
                </RowCard>
              ))}
              <button
                data-testid="client-add"
                onClick={() =>
                  edit("clients.items", [
                    ...draft.clients.items,
                    { name: "", logo: "" },
                  ])
                }
                className="flex items-center gap-1.5 text-sm text-brand font-semibold hover:underline"
              >
                <Plus size={14} /> Add client
              </button>
            </>
          )}

          {tab === "xptools" && (
            <>
              <Label>Experience</Label>
              {draft.experience.map((xp, i) => (
                <RowCard
                  key={i}
                  testid={`xp-row-${i}`}
                  onRemove={() =>
                    edit(
                      "experience",
                      draft.experience.filter((_, x) => x !== i)
                    )
                  }
                >
                  <div className="grid sm:grid-cols-3 gap-3">
                    <TextIn
                      label="Role"
                      value={xp.role}
                      onChange={(v) => edit(`experience.${i}.role`, v)}
                      testid={`xp-role-${i}`}
                    />
                    <TextIn
                      label="Company"
                      value={xp.company}
                      onChange={(v) => edit(`experience.${i}.company`, v)}
                      testid={`xp-company-${i}`}
                    />
                    <TextIn
                      label="Duration"
                      value={xp.duration}
                      onChange={(v) => edit(`experience.${i}.duration`, v)}
                      testid={`xp-duration-${i}`}
                    />
                  </div>
                  <AreaIn
                    label="Description"
                    rows={2}
                    value={xp.description}
                    onChange={(v) => edit(`experience.${i}.description`, v)}
                    testid={`xp-desc-${i}`}
                  />
                </RowCard>
              ))}
              <button
                data-testid="xp-add"
                onClick={() =>
                  edit("experience", [
                    ...draft.experience,
                    { role: "", company: "", duration: "", description: "" },
                  ])
                }
                className="flex items-center gap-1.5 text-sm text-brand font-semibold hover:underline"
              >
                <Plus size={14} /> Add role
              </button>

              <Label>Tools</Label>
              {draft.tools.groups.map((g, i) => (
                <RowCard
                  key={i}
                  testid={`tools-row-${i}`}
                  onRemove={() =>
                    edit(
                      "tools.groups",
                      draft.tools.groups.filter((_, x) => x !== i)
                    )
                  }
                >
                  <TextIn
                    label="Group name"
                    value={g.name}
                    onChange={(v) => edit(`tools.groups.${i}.name`, v)}
                    testid={`tools-name-${i}`}
                  />
                  <AreaIn
                    label="Items (comma separated)"
                    rows={2}
                    value={g.items.join(", ")}
                    onChange={(v) =>
                      edit(
                        `tools.groups.${i}.items`,
                        v
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                      )
                    }
                    testid={`tools-items-${i}`}
                  />
                </RowCard>
              ))}
              <button
                data-testid="tools-add"
                onClick={() =>
                  edit("tools.groups", [
                    ...draft.tools.groups,
                    { name: "", items: [] },
                  ])
                }
                className="flex items-center gap-1.5 text-sm text-brand font-semibold hover:underline"
              >
                <Plus size={14} /> Add tool group
              </button>
            </>
          )}

          {tab === "contact" && (
            <>
              <TextIn
                label="Heading"
                value={draft.contact.heading}
                onChange={(v) => edit("contact.heading", v)}
                testid="contact-heading-input"
              />
              <TextIn
                label="Subheading"
                value={draft.contact.subheading}
                onChange={(v) => edit("contact.subheading", v)}
                testid="contact-subheading-input"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <TextIn
                  label="Phone"
                  value={draft.contact.phone}
                  onChange={(v) => edit("contact.phone", v)}
                  testid="contact-phone-input"
                />
                <TextIn
                  label="Email"
                  value={draft.contact.email}
                  onChange={(v) => edit("contact.email", v)}
                  testid="contact-email-input"
                />
                <TextIn
                  label="LinkedIn URL"
                  value={draft.contact.linkedin}
                  onChange={(v) => edit("contact.linkedin", v)}
                  testid="contact-linkedin-input"
                />
                <TextIn
                  label="LinkedIn label"
                  value={draft.contact.linkedinLabel}
                  onChange={(v) => edit("contact.linkedinLabel", v)}
                  testid="contact-linkedin-label-input"
                />
              </div>
              <TextIn
                label="Location"
                value={draft.contact.location}
                onChange={(v) => edit("contact.location", v)}
                testid="contact-location-input"
              />
              <TextIn
                label="WhatsApp link"
                value={draft.contact.whatsapp ?? ""}
                onChange={(v) => edit("contact.whatsapp", v)}
                testid="contact-whatsapp-input"
              />
              <TextIn
                label="Footer note"
                value={draft.footer.note}
                onChange={(v) => edit("footer.note", v)}
                testid="footer-note-input"
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function LoginCard({ onLogin }: { onLogin: (user: AdminUser) => void }) {
  const [email, setEmail] = useState("admin@richajha.in");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post<AdminUser>(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      onLogin(data);
    } catch (err: unknown) {
      const e2 = err as { response?: { data?: { detail?: unknown } }; message?: string };
      setError(
        formatApiError(e2.response?.data?.detail) || e2.message || "Error"
      );
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground flex items-center justify-center p-5"
      data-testid="admin-login-page"
    >
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-7">
          <span className="w-11 h-11 rounded-2xl bg-brand flex items-center justify-center text-white">
            <LockKeyhole size={19} />
          </span>
          <div>
            <h1 className="font-display font-bold text-lg leading-tight">
              Portfolio Admin
            </h1>
            <p className="text-xs text-muted-foreground">
              Sign in to edit your site
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <Label>Email</Label>
            <input
              type="email"
              required
              value={email}
              data-testid="admin-login-email"
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
            />
          </label>
          <label className="block">
            <Label>Password</Label>
            <input
              type="password"
              required
              value={password}
              data-testid="admin-login-password"
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
            />
          </label>
          {error && (
            <p
              className="text-sm text-red-400 bg-red-500/10 border border-red-500/25 rounded-xl px-3.5 py-2.5"
              data-testid="admin-login-error"
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            data-testid="admin-login-submit"
            className="w-full h-11 rounded-xl bg-brand text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-brand-deep disabled:opacity-60 transition"
          >
            <span style={{ display: "contents" }}>
              {loading ? (
                <LoaderCircle size={15} className="animate-spin" />
              ) : (
                <ExternalLink size={14} />
              )}
            </span>{" "}
            Sign in
          </button>
        </form>

        <p className="mt-5 text-[11px] text-muted-foreground text-center leading-relaxed">
          Default login: admin@richajha.in / richa2026
        </p>

        <a
          href="/"
          className="mt-4 block text-center text-xs text-muted-foreground hover:text-brand transition"
        >
          Back to site
        </a>
      </div>
    </div>
  );
}
