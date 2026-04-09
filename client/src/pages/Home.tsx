/*
 * AUDIT ARMY — Home Page
 * Design: Swiss International Typographic Style meets Intelligence Briefing
 * Sections: Hero, Three-Layer Architecture, Agent Dynamics, Open Tensions, Footer
 */

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Shield, Target, Palette, Cpu, AlertTriangle, CheckCircle, XCircle, Clock, Database, Zap } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Challenge {
  id: number;
  title: string;
  tension: string;
  question: string;
  status: "open" | "resolved";
}

interface LayerItem {
  label: string;
  type: "pass" | "analytical" | "qualitative";
}

// ─── Data ────────────────────────────────────────────────────────────────────

const LAYERS = [
  {
    id: "A",
    title: "Platform & Technical Validation",
    subtitle: "Objective Pass / Fail",
    description:
      "The foundational gatekeeper layer. Every item here is binary — it either works or it does not. A failure at this layer triggers a Critical status that blocks meaningful analysis of Layers B and C.",
    icon: Shield,
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    items: [
      { label: "Pixel / CAPI conversion events firing correctly", type: "pass" },
      { label: "CRM integration active and routing leads", type: "pass" },
      { label: "Campaign objective set to Leads", type: "pass" },
      { label: "Conversion location set to Instant Forms", type: "pass" },
      { label: "Privacy Policy link present on form", type: "pass" },
      { label: "Form type selection matches strategic intent", type: "pass" },
    ] as LayerItem[],
  },
  {
    id: "B",
    title: "Campaign Setup & Strategic Alignment",
    subtitle: "Analytical & Comparative",
    description:
      "This layer compares execution against the intended media plan and challenges the underlying strategy. The agent does not just verify — it interrogates whether the planned audience logically matches the product offering.",
    icon: Target,
    color: "text-blue-800",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    items: [
      { label: "Audience targeting matches documented media plan", type: "analytical" },
      { label: "Audience logic challenged against product/ICP fit", type: "analytical" },
      { label: "Advantage+ Campaign Budget applied appropriately", type: "analytical" },
      { label: "Placements optimized (not unnecessarily restricted)", type: "analytical" },
      { label: "Budget pacing aligned with lead volume capacity", type: "analytical" },
    ] as LayerItem[],
  },
  {
    id: "C",
    title: "Creative & Form Cohesion",
    subtitle: "Qualitative + Best Practices",
    description:
      "The most advanced layer, relying on external tools and LLM evaluation. The Ad Attention tool provides heatmap analysis of visual hierarchy, while Claude evaluates narrative cohesion between the ad unit and the Instant Form.",
    icon: Palette,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    items: [
      { label: "Ad Attention heatmap: CTA in primary visual zone", type: "qualitative" },
      { label: "Ad copy and creative aligned with form intro section", type: "qualitative" },
      { label: "Form type appropriate for campaign intent", type: "qualitative" },
      { label: "Custom qualifying questions present (1–3 recommended)", type: "qualitative" },
      { label: "Multiple-choice questions used over short-answer", type: "qualitative" },
      { label: "Completion screen has a meaningful next-step CTA", type: "qualitative" },
    ] as LayerItem[],
  },
];

const DYNAMICS = [
  {
    icon: Cpu,
    title: "Human-in-the-Loop Interface",
    body: "The system is strictly an Advisor, not an Executor. Automated signals are collected and processed by AI, which generates a Scoring System, a populated Checklist, and a list of Suggested Actions. The human makes every final decision on execution.",
  },
  {
    icon: Clock,
    title: "Dynamic Audit Cadence",
    body: "Audits are not time-based. They are triggered by volume thresholds (e.g., after 5,000 impressions or 50 leads) and statistical significance checks. This prevents over-correction that would disrupt Meta's machine learning optimization algorithms.",
  },
  {
    icon: Database,
    title: "Benchmarking & Baseline",
    body: "The agent ingests past campaign data to establish a client-specific baseline for CPL, CTR, and lead-to-conversion rate. If no historical data exists, industry benchmarks serve as a temporary proxy until the self-feeding loop accumulates enough signal.",
  },
  {
    icon: Zap,
    title: "The Self-Feeding Learning Loop",
    body: "As the human approves or rejects suggestions, and as those decisions yield measurable results, the agent feeds outcomes back into its baseline. Over time, the definition of 'good' becomes specific to the account, not generic to the industry.",
  },
];

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: "The Product/Brand Bible",
    tension:
      "For the agent to challenge audience strategy meaningfully — not just generically — it needs to understand the product at a deep level.",
    question:
      "Does the agent receive a structured brief (product, price point, ICP, goals) at the start of each audit? Or is the challenge logic purely comparative against the media plan document?",
    status: "open",
  },
  {
    id: 2,
    title: "Scoring Architecture",
    tension:
      "A broken CRM integration is fatal to the campaign. A sub-optimal headline is merely inefficient. These failures are not equal and should not be weighted equally.",
    question:
      "Should Layer A act as a hard gatekeeper — producing a 'Critical Failure' that blocks scoring of Layers B and C entirely? Or is the score cumulative across all three layers?",
    status: "open",
  },
  {
    id: 3,
    title: "Ad Attention Output Format",
    tension:
      "The pipeline's stability depends on how the Ad Attention tool delivers its output to the auditor agent.",
    question:
      "Will the Ad Attention tool provide a structured JSON object (e.g., cta_visibility_score: 85) that the agent can ingest directly, or will the agent need to interpret raw heatmap images via vision capabilities?",
    status: "open",
  },
  {
    id: 4,
    title: "Memory & The Learning Loop",
    tension:
      "LLMs do not natively retain memory across sessions without a structured external database. The learning loop requires persistent storage of audit decisions and outcomes.",
    question:
      "For the MVP: (a) Manual upload of historical_learnings.csv per session, (b) Persistent database access, or (c) Deferred to Phase 2?",
    status: "open",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function TypeBadge({ type }: { type: LayerItem["type"] }) {
  const config = {
    pass: { label: "PASS/FAIL", color: "text-red-600 border-red-300" },
    analytical: { label: "ANALYTICAL", color: "text-blue-700 border-blue-300" },
    qualitative: { label: "QUALITATIVE", color: "text-amber-700 border-amber-300" },
  };
  const { label, color } = config[type];
  return (
    <span className={`layer-badge ${color} text-[0.6rem]`}>{label}</span>
  );
}

function LayerCard({ layer, index }: { layer: typeof LAYERS[0]; index: number }) {
  const { ref, visible } = useIntersectionObserver();
  const Icon = layer.icon;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`border ${layer.borderColor} bg-white rounded-sm overflow-hidden`}>
        {/* Layer Header */}
        <div className={`${layer.bgColor} border-b ${layer.borderColor} px-6 py-5`}>
          <div className="flex items-start gap-4">
            <div className={`font-display text-5xl font-black ${layer.color} opacity-20 leading-none select-none`}>
              {layer.id}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${layer.color}`} />
                <span className={`font-mono-label ${layer.color}`}>{layer.subtitle}</span>
              </div>
              <h3 className={`font-display text-xl font-semibold ${layer.color}`}>
                {layer.title}
              </h3>
            </div>
          </div>
          <p className="text-sm text-foreground/70 mt-3 leading-relaxed font-body">
            {layer.description}
          </p>
        </div>

        {/* Checklist Items */}
        <div className="px-6 py-4 divide-y divide-border/50">
          {layer.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border border-border rounded-sm flex-shrink-0" />
                <span className="text-sm font-body text-foreground/80">{item.label}</span>
              </div>
              <TypeBadge type={item.type} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DynamicCard({ item, index }: { item: typeof DYNAMICS[0]; index: number }) {
  const { ref, visible } = useIntersectionObserver();
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="border border-border bg-white rounded-sm p-6 h-full hover:border-accent/50 hover:-translate-y-0.5 transition-all duration-200">
        <div className="w-8 h-8 rounded-sm bg-foreground/5 flex items-center justify-center mb-4">
          <Icon className="w-4 h-4 text-foreground/60" />
        </div>
        <h4 className="font-display text-base font-semibold text-foreground mb-2">
          {item.title}
        </h4>
        <p className="text-sm font-body text-foreground/65 leading-relaxed">
          {item.body}
        </p>
      </div>
    </div>
  );
}

function ChallengeAccordion({ challenge, index }: { challenge: Challenge; index: number }) {
  const [open, setOpen] = useState(false);
  const { ref, visible } = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="border border-border rounded-sm overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-foreground/[0.02] transition-colors"
        >
          <div className="flex items-center gap-4">
            <span className="font-mono-label text-accent">CH.0{challenge.id}</span>
            <span className="font-display font-semibold text-foreground">{challenge.title}</span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="layer-badge text-amber-600 border-amber-300">OPEN</span>
            {open ? (
              <ChevronUp className="w-4 h-4 text-foreground/40" />
            ) : (
              <ChevronDown className="w-4 h-4 text-foreground/40" />
            )}
          </div>
        </button>

        {open && (
          <div className="px-6 pb-6 border-t border-border/50 pt-5 bg-foreground/[0.015]">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-mono-label text-foreground/40 mb-2">The Tension</p>
                <p className="text-sm font-body text-foreground/75 leading-relaxed">
                  {challenge.tension}
                </p>
              </div>
              <div>
                <p className="font-mono-label text-amber-600 mb-2">The Open Question</p>
                <p className="text-sm font-body text-foreground/75 leading-relaxed italic">
                  {challenge.question}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sidebar Navigation ───────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "dynamics", label: "Agent Dynamics" },
  { id: "challenges", label: "Open Tensions" },
];

function Sidebar({ active }: { active: string }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside className="hidden lg:flex flex-col w-56 flex-shrink-0">
      <div className="sticky top-8">
        {/* Logo */}
        <div className="mb-10">
          <div className="amber-rule mb-3" />
          <div className="font-mono-label text-foreground/40 mb-1">AUDIT ARMY</div>
          <div className="font-display text-sm font-semibold text-foreground/70">
            Meta Lead Ads<br />Audit Framework
          </div>
        </div>

        {/* Nav */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full text-left px-0 py-2 text-sm font-body transition-all duration-200 border-l-2 pl-3 ${
                active === item.id
                  ? "border-accent text-foreground font-medium"
                  : "border-transparent text-foreground/45 hover:text-foreground/70 hover:border-border"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Status indicator */}
        <div className="mt-10 pt-6 border-t border-border">
          <div className="font-mono-label text-foreground/30 mb-3">MVP STATUS</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span className="text-xs font-body text-foreground/50">Architecture defined</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span className="text-xs font-body text-foreground/50">Agent role scoped</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-amber-500" />
              <span className="text-xs font-body text-foreground/50">4 tensions open</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-3 h-3 text-red-400" />
              <span className="text-xs font-body text-foreground/50">Master Prompt pending</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border bg-foreground text-primary-foreground">
        <div className="container flex items-center justify-between h-12">
          <div className="flex items-center gap-4">
            <span className="font-mono-label text-primary-foreground/60">AUDIT ARMY</span>
            <span className="text-primary-foreground/20">|</span>
            <span className="font-mono-label text-primary-foreground/60">META LEAD ADS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono-label text-primary-foreground/50">BRAINSTORM PHASE</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="flex gap-12 lg:gap-16 py-12">
          {/* Sidebar */}
          <Sidebar active={activeSection} />

          {/* Main content */}
          <main className="flex-1 min-w-0 space-y-24">

            {/* ── HERO / OVERVIEW ─────────────────────────────────────────── */}
            <section id="overview" className="relative">
              {/* Hero image */}
              <div className="relative w-full h-56 md:h-72 overflow-hidden rounded-sm mb-10 border border-border">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663528589364/RoUbPsbhb83VTW4ArXQvQx/audit-army-hero-YYAPmwdeB9raeNLEErqMpR.webp"
                  alt="Audit Army — Intelligence Briefing"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="amber-rule mb-4" />
                  <div className="font-mono-label text-foreground/60 mb-2">STRATEGIC FRAMEWORK — MVP v0.1</div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight max-w-xl">
                    Audit Army:<br />
                    <span className="italic font-normal">Meta Lead Form Ads</span>
                  </h1>
                </div>
              </div>

              {/* Overview text */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <p className="font-body text-base text-foreground/75 leading-relaxed mb-4">
                    The Audit Army is a multi-agent system designed to systematically evaluate the performance and configuration of Meta Lead Form Ad campaigns. Rather than relying on periodic human review, the system automates signal collection and analysis across three sequential audit layers — from technical validation through to creative cohesion.
                  </p>
                  <p className="font-body text-base text-foreground/75 leading-relaxed">
                    The agent operates strictly as an <strong className="text-foreground font-semibold">Advisor</strong>, not an Executor. Every recommendation passes through a human decision layer before any action is taken. This document defines the architecture, operational dynamics, and the open design tensions that must be resolved before the Master Prompt is written.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="border border-border rounded-sm p-4 bg-white">
                    <div className="font-mono-label text-foreground/40 mb-3">SCOPE</div>
                    <div className="space-y-2 text-sm font-body text-foreground/70">
                      <div className="flex justify-between">
                        <span>Platform</span>
                        <span className="font-medium text-foreground">Meta Ads</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Format</span>
                        <span className="font-medium text-foreground">Lead Form (Instant)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Audit Layers</span>
                        <span className="font-medium text-foreground">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Agent Role</span>
                        <span className="font-medium text-foreground">Advisor Only</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Open Tensions</span>
                        <span className="font-medium text-amber-600">4</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── ARCHITECTURE ────────────────────────────────────────────── */}
            <section id="architecture">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="amber-rule" />
                  <span className="font-mono-label text-foreground/40">SECTION 01</span>
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  The Three-Layer<br />
                  <span className="italic font-normal">Audit Architecture</span>
                </h2>
                <p className="font-body text-foreground/65 max-w-2xl leading-relaxed">
                  The auditor operates sequentially. Foundational elements must be verified before strategic or creative components are evaluated. This prevents the agent from optimizing a campaign that is fundamentally broken at a technical level.
                </p>
              </div>

              {/* Sequential flow indicator */}
              <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
                {["A — Platform", "B — Campaign", "C — Creative"].map((label, i) => (
                  <div key={i} className="flex items-center gap-2 flex-shrink-0">
                    <div className="border border-border rounded-sm px-4 py-2 bg-white text-sm font-body text-foreground/70 whitespace-nowrap">
                      <span className="font-display font-semibold text-foreground">{label.split("—")[0]}</span>
                      <span className="text-foreground/50">—{label.split("—")[1]}</span>
                    </div>
                    {i < 2 && <div className="text-foreground/25 text-lg">→</div>}
                  </div>
                ))}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="text-foreground/25 text-lg">→</div>
                  <div className="border border-accent/50 rounded-sm px-4 py-2 bg-accent/5 text-sm font-body text-amber-700 whitespace-nowrap">
                    Score + Report
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {LAYERS.map((layer, i) => (
                  <LayerCard key={layer.id} layer={layer} index={i} />
                ))}
              </div>
            </section>

            {/* ── AGENT DYNAMICS ──────────────────────────────────────────── */}
            <section id="dynamics">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="amber-rule" />
                  <span className="font-mono-label text-foreground/40">SECTION 02</span>
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Operational Dynamics<br />
                  <span className="italic font-normal">of the Auditor Agent</span>
                </h2>
                <p className="font-body text-foreground/65 max-w-2xl leading-relaxed">
                  The agent's behavior is governed by four operational principles that define how it collects signals, when it triggers an audit, how it establishes baselines, and how it learns from outcomes over time.
                </p>
              </div>

              {/* Layer diagram image */}
              <div className="flex gap-8 mb-10">
                <div className="hidden md:block w-32 flex-shrink-0">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663528589364/RoUbPsbhb83VTW4ArXQvQx/audit-army-layer-diagram-FgdVXGxjfXBipWSCvwpD8q.webp"
                    alt="Three-layer architecture diagram"
                    className="w-full rounded-sm border border-border"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 flex-1">
                  {DYNAMICS.map((item, i) => (
                    <DynamicCard key={i} item={item} index={i} />
                  ))}
                </div>
              </div>

              {/* The Observer Effect callout */}
              <div className="border-l-2 border-accent bg-amber-50/60 rounded-sm px-6 py-5">
                <div className="font-mono-label text-amber-600 mb-2">THE OBSERVER EFFECT</div>
                <p className="font-body text-sm text-foreground/75 leading-relaxed">
                  In quantum physics, observing a system changes it. The same risk applies here: an auditor that recommends changes too frequently disrupts Meta's machine learning algorithms during their learning phase. The dynamic cadence model — triggered by statistical significance rather than a fixed clock — is the primary safeguard against this failure mode.
                </p>
              </div>
            </section>

            {/* ── OPEN TENSIONS ───────────────────────────────────────────── */}
            <section id="challenges">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="amber-rule" />
                  <span className="font-mono-label text-foreground/40">SECTION 03</span>
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Open Tensions<br />
                  <span className="italic font-normal">Design Challenges to Resolve</span>
                </h2>
                <p className="font-body text-foreground/65 max-w-2xl leading-relaxed">
                  These four challenges must be resolved before the Master Prompt is written. Each represents a genuine architectural decision — not a detail — that will define how the system behaves at its boundaries.
                </p>
              </div>

              <div className="space-y-3">
                {CHALLENGES.map((challenge, i) => (
                  <ChallengeAccordion key={challenge.id} challenge={challenge} index={i} />
                ))}
              </div>

              {/* Next step callout */}
              <div className="mt-10 border border-foreground/10 rounded-sm p-6 bg-foreground text-primary-foreground">
                <div className="font-mono-label text-primary-foreground/40 mb-3">NEXT STEP</div>
                <h3 className="font-display text-xl font-semibold text-primary-foreground mb-3">
                  Resolve the tensions. Write the Master Prompt.
                </h3>
                <p className="font-body text-sm text-primary-foreground/65 leading-relaxed max-w-xl">
                  Once the four open challenges above are answered — specifically the Product Bible, Scoring Architecture, Ad Attention integration format, and Memory mechanics — this document will be converted into a Master Prompt markdown file for the execution agent.
                </p>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border pt-8 pb-12">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <div className="amber-rule mb-3" />
                  <div className="font-mono-label text-foreground/30">AUDIT ARMY — META LEAD ADS AUDIT FRAMEWORK</div>
                  <div className="font-mono-label text-foreground/20 mt-1">BRAINSTORM PHASE — MVP v0.1 — APR 2026</div>
                </div>
                <div className="font-mono-label text-foreground/20 text-right">
                  SUPER NOVA PROJECT<br />
                  INTERNAL REFERENCE DOCUMENT
                </div>
              </div>
            </footer>

          </main>
        </div>
      </div>
    </div>
  );
}
