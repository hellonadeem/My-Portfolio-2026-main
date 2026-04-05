import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview',  id: 'sec-overview'  },
  { label: 'Context',   id: 'sec-context'   },
  { label: 'Evolution', id: 'sec-evolution' },
  { label: 'Impact',    id: 'sec-impact'    },
];

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <p className="text-[11px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-5">
      {num}. {label}
    </p>
  );
}

export default function SnippetsCaseStudy() {
  const [active, setActive] = useState('sec-overview');

  useEffect(() => {
    window.scrollTo(0, 0);

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 },
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-paper text-ink min-h-screen"
    >
      <div className="flex">

        {/* ── Left vertical sticky nav ─────────────────────────────── */}
        <aside className="hidden lg:block w-[160px] shrink-0 border-r border-border">
          <div className="sticky top-[48px] h-[calc(100vh-48px)] flex flex-col pt-16 px-7 gap-0.5 overflow-y-auto">
            {NAV_ITEMS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-left text-[11px] font-medium tracking-[0.07em] uppercase py-2 transition-all duration-200 ${
                  active === id ? 'text-ink' : 'text-ink-muted/50 hover:text-ink-muted'
                }`}
              >
                {active === id && (
                  <span className="inline-block w-3 h-px bg-accent mr-2 mb-[2px]" />
                )}
                {label}
              </button>
            ))}
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">

          {/* ── HERO ─────────────────────────────────────────────────── */}
          <section id="sec-overview" className="pt-14 pb-6 px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Link
                to="/#work"
                className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.08em] uppercase text-ink-muted hover:text-ink transition-colors mb-12"
              >
                <ArrowLeft size={13} /> All work
              </Link>

              <div className="flex flex-wrap gap-2 mb-7">
                {['Zero to One', 'Gojek', 'iOS · Android'].map((t) => (
                  <span key={t} className="text-[10px] tracking-[0.1em] uppercase border border-border px-2.5 py-1 rounded-full text-ink-muted">
                    {t}
                  </span>
                ))}
              </div>

              <h1 className="font-sans text-[clamp(28px,4.5vw,64px)] font-bold leading-[1.02] tracking-[-0.04em] text-ink max-w-[760px] mb-6">
                Snippets: Gojek's In-App Stories Channel
              </h1>

              <p className="text-[14px] text-ink-soft font-light mb-14">
                Mohd Nadeem&nbsp;·&nbsp;Gojek&nbsp;·&nbsp;2022–2024
              </p>
            </div>
          </section>

          {/* ── META ROW ─────────────────────────────────────────────── */}
          <section className="px-10 md:px-16 border-t border-b border-border">
            <div className="max-w-[800px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
              <div>
                <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-ink-muted mb-1.5">My Role</p>
                <p className="text-[13px] text-ink font-light">Lead Product Designer</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-ink-muted mb-1.5">Scope</p>
                <p className="text-[13px] text-ink font-light">Zero to One · Platform Scale</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-ink-muted mb-1.5">Platform</p>
                <p className="text-[13px] text-ink font-light">iOS &amp; Android</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-ink-muted mb-1.5">Timeline</p>
                <p className="text-[13px] text-ink font-light">2022 – 2024</p>
              </div>
            </div>
          </section>

          {/* ── CONTEXT ──────────────────────────────────────────────── */}
          <section id="sec-context" className="pt-16 pb-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="01" label="Context" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-10 text-ink max-w-[600px]">
                  Gojek needed a new way to talk to its users. The inbox wasn't it.
                </h2>
              </Reveal>

              <div className="space-y-5 text-[16px] font-light leading-[1.85] text-ink-soft max-w-[660px]">
                <Reveal>
                  <p>Snippets is an in-app communication channel inside the Gojek super-app that adopts the Stories format — short-lived, highly visual, and neatly sequenced, to deliver content across the entire Gojek ecosystem without being tethered to a single product surface.</p>
                </Reveal>
                <Reveal delay={0.04}>
                  <p>The original brief was to replace Gojek's inbox — a static, low-engagement channel where all in-app communication sat. The inbox wasn't designed for the pace or richness of what Gojek needed to communicate: new feature launches, merchant promotions, order feedback, cross-sell moments, and more.</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <p>Snippets gave product groups across GoFood, GoPay, GoMart, and Transport a shared channel to tell visual stories, run interactive campaigns, and collect granular feedback, all without fragmenting the user experience across separate surfaces.</p>
                </Reveal>
              </div>

              <Reveal delay={0.08}>
                <div className="mt-12">
                  <img src="/images/cadf/snippetsthumb.png" alt="Snippets — two homepage treatment explorations on Gojek" className="w-full h-auto block" />
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── EVOLUTION ────────────────────────────────────────────── */}
          <section id="sec-evolution" className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="02" label="Evolution" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-10 text-ink max-w-[600px]">
                  What started as a vague problem became a platform.
                </h2>
              </Reveal>

              <div className="space-y-0 mb-12">
                {[
                  {
                    phase: 'Phase 01',
                    year: '2022',
                    title: 'Stories as inbox replacement',
                    body: 'Launched the core Snippets format: short-lived Stories with images, GIFs, and video. Replaced the static Gojek inbox as the primary in-app communication surface. Product groups could now sequence content into narratives rather than single notification cards.',
                  },
                  {
                    phase: 'Phase 02',
                    year: '2023',
                    title: 'Interactive campaigns & feedback loops',
                    body: 'Introduced interactive components: polls, reactions, and granular feedback collection tied to recent orders. Product groups across GoFood, GoPay, and Transport began using Snippets for feature activation campaigns and user research at scale.',
                  },
                  {
                    phase: 'Phase 03',
                    year: '2023–2024',
                    title: 'GoFood discovery & add-to-cart',
                    body: 'Extended Snippets into GoFood as a merchant visibility and conversion channel. Merchants could showcase menu items with promos directly in the Snippets format. Users could add items to cart without leaving the Story — directly increasing AOV.',
                  },
                  {
                    phase: 'Phase 04',
                    year: '2024',
                    title: 'Live stream & GoMart commerce',
                    body: 'Scaled the format to live video and live stream shopping on GoMart. Cross-sell initiatives with GoTo partners brought Snippets into the commerce layer — turning a communication channel into a revenue and ad-generating surface across the entire super-app.',
                  },
                ].map(({ phase, year, title, body }, i) => (
                  <Reveal key={phase} delay={i * 0.06}>
                    <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-5 md:gap-10 py-8 border-t border-border">
                      <div>
                        <p className="text-[10px] tracking-[0.1em] uppercase text-ink-muted font-medium mb-1">{phase}</p>
                        <p className="text-[12px] text-ink-muted font-light">{year}</p>
                      </div>
                      <div>
                        <h4 className="font-sans text-[15px] font-semibold text-ink mb-3">{title}</h4>
                        <p className="text-[14px] font-light text-ink-soft leading-[1.75]">{body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
                <div className="border-t border-border" />
              </div>

              <Reveal delay={0.08}>
                <div className="mt-12">
                  <img src="/images/cadf/livestream.png" alt="Snippets — live stream shopping on GoMart" className="w-full h-auto block" />
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── IMPACT ───────────────────────────────────────────────── */}
          <section id="sec-impact" className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="03" label="Impact" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-5 text-ink max-w-[600px]">
                  A communication experiment that became infrastructure.
                </h2>
              </Reveal>

              <Reveal delay={0.04}>
                <p className="text-[16px] font-light leading-[1.85] text-ink-soft max-w-[660px] mb-12">
                  Snippets grew from a single team experiment into a shared platform used across GoFood, GoPay, GoMart, and Transport. By the time Video launched inside the format, it was generating real commerce outcomes, not just impressions. The numbers below are from Milestone 2, the GoFood Video experiment run across Jabodetabek.
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-7 border-y border-border mb-8">
                  {[
                    { val: '3.45%', label: 'Customer Open Rate', sub: '2× vs. shuffle banner' },
                    { val: '6.96%', label: 'Add-to-Cart Ratio', sub: 'Direct from video format' },
                    { val: '15.8K', label: 'Weekly transactions', sub: 'IDR 1.3B GMV · 4-card phase' },
                    { val: '+77.6%', label: 'CTR uplift', sub: 'After scaling to 8 cards' },
                  ].map(({ val, label, sub }) => (
                    <div key={val}>
                      <div className="text-[clamp(20px,2.4vw,30px)] font-semibold tracking-[-0.03em] text-ink mb-1">{val}</div>
                      <div className="text-[12px] font-medium text-ink mb-0.5">{label}</div>
                      <div className="text-[11px] font-light text-ink-muted">{sub}</div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="text-[14px] font-light leading-[1.8] text-ink-soft max-w-[660px] mb-12">
                  Hard churn re-engagement (users who had stopped ordering) showed the clearest signal: <span className="text-ink font-medium">+2.2% session conversion on Android</span>, +1.1% on iOS. A format originally built for communication was pulling dormant users back into the funnel.
                </p>
              </Reveal>
            </div>
          </section>

          {/* ── WORK IN PROGRESS NOTE ────────────────────────────────── */}
          <section className="py-16 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <div className="border-l-2 border-accent bg-accent/[0.04] p-8 md:p-10">
                  <p className="text-[10px] tracking-[0.12em] uppercase text-accent font-semibold mb-4">Full case study in progress</p>
                  <p className="text-[16px] font-light leading-[1.85] text-ink max-w-[580px] mb-5">
                    This project spans two years of design work across multiple product surfaces. The detailed write-up covering research, design decisions, experiment results, and visual explorations is being prepared.
                  </p>
                  <p className="text-[14px] font-light leading-[1.8] text-ink-soft max-w-[580px]">
                    Happy to walk through Snippets in depth during a conversation, including the zero-to-one process, how the format evolved, and the trade-offs made at each phase.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── Next project ─────────────────────────────────────────── */}
          <div className="px-10 md:px-16 w-full max-w-[800px] mx-auto">
            <Link
              to="/case-study/04"
              className="flex justify-between items-center group cursor-pointer py-14 border-t border-border"
            >
              <div>
                <p className="text-[10px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-2">Next Project</p>
                <p className="text-[18px] font-semibold text-ink group-hover:text-accent transition-colors">Driver to Customer Chat →</p>
              </div>
            </Link>
          </div>

        </main>
      </div>
    </motion.div>
  );
}
