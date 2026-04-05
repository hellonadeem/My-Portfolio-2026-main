import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────────────── */

const NAV_ITEMS = [
  { label: 'Overview',   id: 'sec-overview'  },
  { label: 'Research',   id: 'sec-research'  },
  { label: 'Strategy',   id: 'sec-strategy'  },
  { label: 'Design',     id: 'sec-design'    },
  { label: 'Testing',    id: 'sec-testing'   },
  { label: 'Impact',     id: 'sec-impact'    },
  { label: 'Reflection', id: 'sec-reflection'},
];

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────────────── */

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

/**
 * Lightweight image placeholder — compact height, barely-there styling.
 * portrait=true → taller box (for mobile UI screens)
 * cols > 1 → side-by-side grid
 */
function Img({
  label,
  portrait = false,
  cols = 1,
}: {
  label: string;
  portrait?: boolean;
  cols?: number;
}) {
  const h = portrait ? 'h-[260px]' : 'h-[180px]';

  const box = (key: string | number) => (
    <div
      key={key}
      className={`w-full ${h} bg-ink/[0.025] border border-dashed border-ink-muted/20 flex items-center justify-center`}
    >
      <span className="text-[9px] tracking-[0.14em] uppercase text-ink-muted/35 font-medium px-8 text-center leading-loose">
        {label}
      </span>
    </div>
  );

  if (cols === 1) return <>{box('single')}</>;
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: cols }).map((_, i) => box(i))}
    </div>
  );
}

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <p className="text-[11px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-5">
      {num}. {label}
    </p>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main
───────────────────────────────────────────────────────────────────────────── */

export default function GoTransitCaseStudy() {
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

        {/* ── Left vertical sticky nav (lg+) ───────────────────────────── */}
        <aside className="hidden lg:block w-[160px] shrink-0 border-r border-border">
          <div className="sticky top-[48px] h-[calc(100vh-48px)] flex flex-col pt-16 px-7 gap-0.5 overflow-y-auto">
            {NAV_ITEMS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-left text-[11px] font-medium tracking-[0.07em] uppercase py-2 transition-all duration-200 ${
                  active === id
                    ? 'text-ink'
                    : 'text-ink-muted/50 hover:text-ink-muted'
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

        {/* ── Main content ─────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">

          {/* ── 1. HERO ─────────────────────────────────────────────── */}
          <section id="sec-overview" className="pt-14 pb-6 px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Link
                to="/#work"
                className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.08em] uppercase text-ink-muted hover:text-ink transition-colors mb-12"
              >
                <ArrowLeft size={13} /> All work
              </Link>

              <div className="flex flex-wrap gap-2 mb-7">
                {['Redesign', 'Multimodal Transit', 'Android & iOS'].map((t) => (
                  <span key={t} className="text-[10px] tracking-[0.1em] uppercase border border-border px-2.5 py-1 rounded-full text-ink-muted">
                    {t}
                  </span>
                ))}
              </div>

              <h1 className="font-sans text-[clamp(28px,4.5vw,64px)] font-bold leading-[1.02] tracking-[-0.04em] text-ink max-w-[760px] mb-6">
                GoTransit's homepage was signalling the wrong product identity.
              </h1>

              <p className="text-[14px] text-ink-soft font-light mb-14">
                Mohd Nadeem&nbsp;·&nbsp;Gojek&nbsp;·&nbsp;2024
              </p>

            </div>
          </section>

          {/* ── META ROW ────────────────────────────────────────────── */}
          <section className="px-10 md:px-16 border-t border-b border-border">
            <div className="max-w-[800px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
              <div>
                <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-ink-muted mb-1.5">My Role</p>
                <p className="text-[13px] text-ink font-light">Lead Product Designer</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-ink-muted mb-1.5">Team</p>
                <p className="text-[13px] text-ink font-light">Mita · Iqi · Hashir · Soozy · Binoy · Vaibhav</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-ink-muted mb-1.5">Platform</p>
                <p className="text-[13px] text-ink font-light">Android &amp; iOS</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-ink-muted mb-1.5">Year</p>
                <p className="text-[13px] text-ink font-light">2024</p>
              </div>
            </div>
          </section>

          {/* ── 2. THE FEATURE NOBODY USED ──────────────────────────── */}
          <section className="pt-12 pb-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <p className="text-[11px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-5">01</p>
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-10 text-ink max-w-[600px]">
                  The Feature Nobody Used
                </h2>
              </Reveal>
              <div className="space-y-5 text-[16px] font-light leading-[1.85] text-ink-soft max-w-[660px]">
                <Reveal><p>Late 2023. GoTransit launched multimodal booking. GoRide to the station, KRL train, GoRide out the other end. One order. One payment. First mile to last mile, connected inside Gojek.</p></Reveal>
                <Reveal delay={0.04}><p className="font-medium text-ink">It should have changed how Jakarta moved.</p></Reveal>
                <Reveal delay={0.06}><p className="font-medium text-ink">It didn't.</p></Reveal>
                <Reveal delay={0.08}><p>Users kept doing what they always did. Open GoTransit. Buy a train ticket. Leave. Book a GoRide separately, somewhere else. The multimodal feature was live, technically working, and practically invisible.</p></Reveal>
              </div>
              <Reveal delay={0.1}>
                <img src="/images/transit/Intro.png" alt="GoTransit homepage — 2023 before state" className="w-full h-auto block mt-10" />
              </Reveal>
            </div>
          </section>

          {/* ── 3. WHY THIS MATTERED ────────────────────────────────── */}
          <section className="pt-16 pb-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <p className="text-[11px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-5">02</p>
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-10 text-ink max-w-[600px]">
                  Why This Mattered
                </h2>
                <div className="space-y-5 text-[16px] font-light leading-[1.85] text-ink-soft mb-10 max-w-[660px]">
                  <p>GoTransit carried a real partnership cost to sell KRL tickets on Gojek. A train ticket priced in the low thousands of rupiah barely moved the margin. GoRide did. Every multimodal booking was where the unit economics worked. Every train-only booking was a missed opportunity the product couldn't afford. <strong className="font-semibold text-ink">The business target: ~900K multimodal bookings per month to reach breakeven. We were nowhere near it.</strong></p>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <img src="/images/transit/PartnershipCost.png" alt="Partnership cost breakdown" className="w-full h-auto block mb-10" />
              </Reveal>

              <Reveal delay={0.08}>
                <blockquote className="mt-10 pl-6 border-l-2 border-accent space-y-4 text-[15px] font-light leading-[1.8] text-ink-soft italic max-w-[660px]">
                  <p>The instinct from the product team was upsell prompts. Surface GoRide after a KRL booking. Fast to ship. Reasonable.</p>
                  <p>My read was different. Upsell mechanics work when users understand the product and need a nudge. They don't work when users have already decided what the product is for. And decided wrong.</p>
                </blockquote>
              </Reveal>
            </div>
          </section>

          {/* ── 4. THE FUNNEL ───────────────────────────────────────── */}
          <section id="sec-research" className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="03" label="Research" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-12 text-ink max-w-[520px]">
                  The Funnel Told Us Where to Look
                </h2>
              </Reveal>

              <div className="grid grid-cols-3 gap-8 mb-10 py-7 border-y border-border">
                {[
                  { val: '2.1M',   lbl: 'users reached the GoTransit homepage every month' },
                  { val: '12.98%', lbl: 'tapped the multimodal entry point' },
                  { val: '4.37%',  lbl: 'completed a multimodal booking' },
                ].map(({ val, lbl }, i) => (
                  <Reveal key={val} delay={i * 0.07}>
                    <div>
                      <div className="font-sans text-[clamp(20px,2.4vw,30px)] font-semibold tracking-[-0.03em] leading-none text-ink mb-2">{val}</div>
                      <div className="text-[12px] font-light text-ink-soft leading-[1.6]">{lbl}</div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1}>
                <div className="max-w-[660px] space-y-4 text-[15px] font-light leading-[1.8] text-ink-soft mb-10">
                  <p>An <strong className="font-semibold text-ink">87% drop</strong> before users even entered the flow. <strong className="font-semibold text-accent">42% of all bookings were middle-mile only.</strong></p>
                  <p>On paper this looked like a discoverability problem. Make the button bigger. Add a nudge. Ship a banner. That would have been the wrong diagnosis entirely.</p>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <img src="/images/transit/funnel.png" alt="Funnel data visualisation" className="w-full h-auto block" />
              </Reveal>
            </div>
          </section>

          {/* ── 5. ASSUMPTIONS AUDIT ────────────────────────────────── */}
          <section className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-5 text-ink max-w-[520px]">
                  What We Assumed Before We Researched Anything
                </h2>
                <p className="text-[16px] font-light leading-[1.85] text-ink-soft mb-10 max-w-[660px]">
                  Before going to the field, we ran a heuristic audit of the existing homepage. We wanted to document our assumptions clearly so we would know later what the research confirmed, contradicted, or surprised us with.
                </p>
              </Reveal>

              <Reveal>
                <img src="/images/transit/Audit.png" alt="Heuristic audit annotations" className="w-full h-auto block mb-10" />
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {[
                  { num: '01', title: 'Search bar misread', body: '"Enter your end destination" under a train banner felt like it was priming station lookup, not journey planning.' },
                  { num: '02', title: 'Masthead teaching wrong product', body: 'A rotating carousel featuring a train prominently was signalling single-mode transit, not multimodal.' },
                  { num: '03', title: 'Service grid anchoring tickets', body: '"Buy KRL ticket" and "Buy TransJakarta ticket" as the first two interactions on the page.' },
                ].map(({ num, title, body }, i) => (
                  <Reveal key={num} delay={i * 0.07}>
                    <div className="bg-paper-warm border border-border p-7 h-full">
                      <div className="text-[10px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-4">Assumption {num}</div>
                      <h4 className="font-sans text-[14px] font-semibold text-ink mb-2">{title}</h4>
                      <p className="text-[13px] font-light leading-[1.7] text-ink-soft">{body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.05}>
                <p className="text-[14px] font-light text-ink-soft mb-8 max-w-[660px]">
                  These were hypotheses, not conclusions. We needed to go find out whether real users experienced what we thought they were experiencing, and whether we were even asking the right questions.
                </p>
              </Reveal>
            </div>
          </section>

          {/* ── 6. FIELD RESEARCH ───────────────────────────────────── */}
          <section className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-8 text-ink max-w-[520px]">
                  Field Research
                </h2>
                <div className="max-w-[660px] space-y-4 text-[16px] font-light leading-[1.85] text-ink-soft mb-10">
                  <p>I was new to Indonesian commuter culture. I knew the data. I didn't know the experience.</p>
                  <p>Before touching Figma, I pushed for field research. Together with Iqi, our researcher, we rode KRL during peak and off-peak hours. We shadowed commuters end-to-end, from home to station to train to destination. We sat with users in their homes and offices and watched them plan and book their commutes in real conditions.</p>
                </div>
              </Reveal>

              <Reveal delay={0.04}>
                <div className="mb-10">
                  <img src="/images/transit/field_Research.png" alt="Field research — KRL, peak hours, commuters" className="w-full h-auto block" />
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="max-w-[660px] space-y-4 text-[16px] font-light leading-[1.85] text-ink-soft mb-10">
                  <p>We also ran a problem discovery workshop and usability testing on the existing flow with a mix of user types: first-time GoTransit users, KRL regulars who had never tried multimodal, and users who had booked multimodal at least once.</p>
                  <p>What I saw reframed everything.</p>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-medium">Observation 01</p>
                    <h4 className="font-sans text-[15px] font-semibold text-ink leading-[1.4]">The Jakarta commute is not a single decision.</h4>
                    <p className="text-[13px] font-light leading-[1.8] text-ink-soft">It is a chain of micro-decisions made under pressure. Which entrance. Which platform. Will I make this train. Is there a GoRide available at that station at 7am. Every decision made in motion, with noise, with crowds, on a phone that has to be read fast.</p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-medium">Observation 02</p>
                    <h4 className="font-sans text-[15px] font-semibold text-ink leading-[1.4]">Users had fixed mental models about what each app was for.</h4>
                    <p className="text-[13px] font-light leading-[1.8] text-ink-soft">Gojek was for rides. GoTransit was for train tickets. Not journeys. Not planning. Tickets. The UI was not creating this belief. It was confirming one that already existed, cementing it deeper with every visit.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── 7. WHAT THE RESEARCH CONFIRMED ──────────────────────── */}
          <section className="pt-12 pb-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <h3 className="font-sans text-[clamp(1.1rem,1.8vw,1.6rem)] font-bold tracking-[-0.03em] mb-5 text-ink">
                  What the Research Confirmed
                </h3>
              </Reveal>

              <Reveal delay={0.04}>
                <div className="mb-12"><img src="/images/transit/ideation.png" alt="Research synthesis / affinity map" className="w-full h-auto block" /></div>
              </Reveal>

              <div className="mb-12 max-w-[720px]">
                {[
                  { head: 'The pre-booking flow was reinforcing the wrong mental model.', body: 'Users arrived believing GoTransit was a train ticketing tool. The surface confirmed it before they interacted with anything.' },
                  { head: 'Context shapes behavior more than interface does.', body: 'Users near a station were in execution mode: narrow bandwidth, one job, committed to the train leg already. Users at home or the office were in planning mode: open to thinking about the full journey.' },
                  { head: 'The commute is a chain of decisions, not one task.', body: 'Each leg is its own cognitive event. The interface had to meet users at each of those moments, not assume they were thinking in three-leg journeys from the start.' },
                ].map(({ head, body }, i) => (
                  <Reveal key={head} delay={i * 0.07}>
                    <div className="flex gap-5 py-5 border-t border-border">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <div>
                        <h4 className="font-sans text-[16px] font-semibold text-ink mb-1.5 leading-[1.4]">{head}</h4>
                        <p className="text-[14px] font-light text-ink-soft leading-[1.75]">{body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1}>
                <blockquote className="pl-7 border-l-2 border-accent max-w-[620px] space-y-3 text-[15px] font-light leading-[1.8] text-ink-soft italic">
                  <p>Our audit assumptions were right. But the research gave us something the audit couldn't: the reason behind the behavior.</p>
                  <p>It was not that users couldn't find multimodal. It was that they had already decided what the product was before they looked for anything.</p>
                </blockquote>
              </Reveal>
            </div>
          </section>

          {/* ── 8. STRATEGY ─────────────────────────────────────────── */}
          <section id="sec-strategy" className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="04" label="Strategy" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-8 text-ink max-w-[600px]">
                  Alignment: The hardest design work wasn't in Figma
                </h2>
                <div className="space-y-4 text-[16px] font-light leading-[1.85] text-ink-soft max-w-[660px]">
                  <p>When we brought our findings back and proposed redesigning the homepage, we hit a wall.</p>
                  <p>GoTransit was a new product. Engineering was conservative. Any significant change touched a legacy search system shared across Gojek's booking flows. Product leadership questioned the investment.</p>
                  <p>The honest answer was: this was exactly the moment to fix it. Mental models cement early. If we didn't fix this now, we would spend years fighting a perception we had let harden.</p>
                  <p>But conviction doesn't move roadmaps. Strategy does.</p>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="my-10 py-7 border-t border-b border-border max-w-[660px]">
                  <p className="font-serif text-[clamp(20px,2.8vw,32px)] italic leading-[1.35] text-ink">
                    "Conviction doesn't move roadmaps. Strategy does."
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.07}>
                <img src="/images/transit/vision1.png" alt="Design vision — strategy framing" className="w-full h-auto block mb-10" />
              </Reveal>

              <Reveal delay={0.08}>
                <div className="space-y-4 text-[16px] font-light leading-[1.85] text-ink-soft mb-10 max-w-[660px]">
                  <p>So I built a <strong className="font-semibold text-ink">2-year design vision for GoTransit.</strong> Not a mood board, but a phased roadmap with timelines, explicitly connected to the path toward 900K multimodal bookings.</p>
                  <p>I presented this to product leadership, the engineering lead, and the VP of Design. The goal was not approval for everything. It was to show we had a coherent theory: this was not a designer wanting to redraw screens, but a team with a clear strategy for how design could close the gap to 900K.</p>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="mb-8"><img src="/images/transit/vision2.png" alt="2-year design vision roadmap" className="w-full h-auto block" /></div>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="bg-paper-warm border-l-4 border-accent px-7 py-6 max-w-[660px] mb-7">
                  <p className="font-sans text-[16px] font-semibold text-ink leading-[1.45]">
                    Instead of "homepage revamp," we proposed "first-fold improvement": just the search bar, masthead, and service grid. The slice users see before they scroll. The slice doing the most damage to perception.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="max-w-[660px] text-[16px] font-light leading-[1.85] text-ink-soft">
                  Engineering could scope it. Leadership could see the logic. We had our green light.
                </p>
              </Reveal>
            </div>
          </section>

          {/* ── 10. DESIGN EXPLORATION ──────────────────────────────── */}
          <section id="sec-design" className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="05" label="Design" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-5 text-ink max-w-[520px]">
                  Diverging Hard
                </h2>
                <p className="text-[16px] font-light leading-[1.85] text-ink-soft mb-10 max-w-[660px]">
                  Before screens, we mapped how different users actually move through the product. Four user types. Four different intents. One homepage trying to serve all of them.
                </p>
              </Reveal>

              <Reveal delay={0.04}>
                <div className="mb-10"><img src="/images/transit/userflow.jpg" alt="User flow diagram" className="w-full h-auto block" /></div>
              </Reveal>

              {/* user type table */}
              <Reveal delay={0.05}>
                <div className="mb-8 overflow-x-auto">
                  <table className="w-full border-collapse text-[13px]">
                    <thead>
                      <tr className="border-b border-border">
                        {['User type', 'Intent', 'What they need'].map((h) => (
                          <th key={h} className="text-left py-3 pr-10 text-[10px] tracking-[0.1em] uppercase text-ink-muted font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['New transit user',  'Never booked before',   'Understand what the product does first'],
                        ['First mile user',   'GoRide then KRL',       'Start with location, think in legs'],
                        ['Middle mile user',  'Train ticket only',     'Fast path to KRL, already decided'],
                        ['Multimodal user',   'GoRide + KRL + GoRide', 'One search, one order, no switching'],
                      ].map(([type, intent, need]) => (
                        <tr key={type} className="border-b border-border/50 hover:bg-paper-warm transition-colors">
                          <td className="py-3.5 pr-10 font-medium text-ink">{type}</td>
                          <td className="py-3.5 pr-10 text-ink-soft">{intent}</td>
                          <td className="py-3.5 text-ink-soft">{need}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>

              {/* Search sub-section */}
              <Reveal>
                <h3 className="font-sans text-[clamp(1.1rem,1.8vw,1.6rem)] font-bold tracking-[-0.03em] mb-5 text-ink">Search Exploration</h3>
                <div className="max-w-[660px] space-y-4 text-[16px] font-light leading-[1.85] text-ink-soft mb-8">
                  <p>The search bar was the first interactive element on the page. It was also doing the most damage, priming station lookup instead of journey planning.</p>
                  <p>Our first instinct was to make search the hero. Two fields, clearly labelled. Where you are, where you're going. Auto-detect location. Make it feel like a journey planner, not a ticket counter.</p>
                  <p>We explored several directions in parallel:</p>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {[
                  { label: 'Personalised search states', desc: "Detect the user's proximity to a station and pre-fill it as origin. Pull from GoRide history to surface frequent routes." },
                  { label: 'Animated journey icon', desc: 'Motorbike to train to motorbike, a subtle motion inside the search field. A visual metaphor baked into the moment before you type.' },
                  { label: 'Reframed copy variants', desc: '"Book your full journey." "GoRide + KRL, one order." "Where are you headed today?" Testing whether language alone could shift the mental model.' },
                  { label: 'Dynamic history', desc: 'Surface recent GoRide routes as multimodal suggestions, making new behavior feel like a natural extension of the old.' },
                ].map(({ label, desc }, i) => (
                  <Reveal key={label} delay={i * 0.06}>
                    <div className="bg-paper-warm border border-border p-5 h-full">
                      <h5 className="font-sans text-[13px] font-semibold text-ink mb-1.5">{label}</h5>
                      <p className="text-[12px] font-light text-ink-soft leading-[1.7]">{desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.04}>
                <div className="mb-10">
                  <img src="/images/transit/searchexploration.png" alt="Search exploration screens" className="w-full h-auto block" />
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="max-w-[660px] space-y-4 text-[16px] font-light leading-[1.85] text-ink-soft mb-7">
                  <p className="font-medium text-ink">Then we hit a constraint.</p>
                  <p>Engineering flagged that the dual-field search required changes to a legacy system shared across Gojek's primary booking flow. Not a styling change. A significant backend decision, not scoped for Phase 1.</p>
                  <p>We pushed back. We presented the user research. We showed that a single-field search, regardless of copy, would still read as station lookup in the existing page context, because it was structurally identical to what it replaced.</p>
                  <p className="font-semibold text-ink">Engineering came around. We aligned on the two-field search as the right architecture for communicating journey planning intent.</p>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="mb-10">
                  <img src="/images/transit/Iteration.png" alt="Design iterations" className="w-full h-auto block" />
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="mb-14"><img src="/images/transit/engineering Flagged.jpg" alt="Engineering alignment" className="w-full h-auto block" /></div>
              </Reveal>

              {/* Masthead sub-section */}
              <Reveal>
                <h3 className="font-sans text-[clamp(1.1rem,1.8vw,1.6rem)] font-bold tracking-[-0.03em] mb-5 text-ink">The Masthead Problem</h3>
                <div className="max-w-[660px] space-y-4 text-[16px] font-light leading-[1.85] text-ink-soft mb-8">
                  <p>The original masthead: static banner, Gojek 2D illustration library, standard value props. Clean. On-brand. Forgettable. Featuring a train.</p>
                  <p>The creative team, Hashir and Soozy, ran a benchmarking exercise across transit apps globally: Citymapper, Transit, Moovit, regional Southeast Asian players. What came back: almost every competitor defaulted to iconography and feature lists in the hero space. Almost nobody was telling a story.</p>
                  <p>That was the opening.</p>
                </div>
              </Reveal>

              <Reveal delay={0.04}>
                <div className="mb-8"><img src="/images/transit/Msthead_Benchmark.png" alt="Masthead benchmarking" className="w-full h-auto block" /></div>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="mb-8"><img src="/images/transit/masthead.jpg" alt="Masthead narrative exploration" className="w-full h-auto block" /></div>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="max-w-[660px] space-y-4 text-[16px] font-light leading-[1.85] text-ink-soft mb-8">
                  <p>Our conviction: the masthead needed to narrate the actual GoTransit experience. Not list benefits. Tell the story of the journey in sequence, the way it actually happens.</p>
                  <p>We pushed for a <strong className="font-semibold text-ink">horizontal scrolling narrative carousel</strong>, not auto-rotating, but inviting the user to move through moments:</p>
                </div>
                <div className="pl-7 border-l-2 border-border max-w-[500px] space-y-4 mb-10">
                  {[
                    "Frame 1: You're home. You need to get somewhere.",
                    'Frame 2: A GoRide picks you up.',
                    'Frame 3: You tap your QR at the station gate.',
                    "Frame 4: You're on the train. Another GoRide is waiting at the other end.",
                  ].map((frame, i) => (
                    <p key={i} className="font-serif text-[16px] italic text-ink-soft leading-[1.6]">{frame}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <img src="/images/transit/masthead1.jpg" alt="Masthead narrative frames" className="w-full h-auto block" />
              </Reveal>
            </div>
          </section>

          {/* ── 11. TESTING ─────────────────────────────────────────── */}
          <section id="sec-testing" className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="06" label="Testing" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-5 text-ink max-w-[560px]">
                  Testing: What Broke, What We Fixed
                </h2>
                <div className="max-w-[660px] space-y-4 text-[16px] font-light leading-[1.85] text-ink-soft mb-8">
                  <p>With designs converged, we moved into structured prototype testing across two rounds, with deliberate changes between them.</p>
                  <p>We wanted to understand something specific beyond the UI: <strong className="font-semibold text-ink">do users naturally think in legs?</strong> When someone opens GoTransit, are they thinking about the full journey, or one leg at a time?</p>
                  <p>So we recruited across two distinct contexts:</p>
                </div>
              </Reveal>

              <div className="flex flex-col md:flex-row gap-3 mb-10 max-w-[660px]">
                {[
                  { head: 'Near or at a station', body: 'Users already in transit mode, mid-commute, making booking decisions under time pressure.' },
                  { head: 'At home or at the office', body: 'Users planning ahead, with more cognitive space to think through the full journey.' },
                ].map(({ head, body }) => (
                  <Reveal key={head} className="flex-1">
                    <div className="bg-paper-warm border border-border px-5 py-4 h-full">
                      <h5 className="font-semibold text-ink text-[13px] mb-1.5">{head}</h5>
                      <p className="text-[12px] font-light text-ink-soft leading-[1.7]">{body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.04}>
                <div className="mb-12"><img src="/images/transit/prelaunchtesting.jpg" alt="Testing setup" className="w-full h-auto block" /></div>
              </Reveal>

              {/* Round 1 */}
              <Reveal>
                <h3 className="font-sans text-[clamp(1.1rem,1.8vw,1.5rem)] font-bold tracking-[-0.03em] mb-4 text-ink">Round 1: Testing Core Hypotheses</h3>
                <p className="text-[14px] font-light text-ink-soft mb-4">12 participants split across context and usage profile:</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['3 users at / near a KRL station', '3 users at home or office', '3 KRL regulars, never tried multimodal', '3 users, booked multimodal at least once'].map((p) => (
                    <span key={p} className="text-[10px] tracking-[0.05em] border border-border px-3 py-1.5 text-ink-soft">{p}</span>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.04}>
                <div className="mb-8"><img src="/images/transit/Testing1.jpg" alt="Round 1 prototype screens" className="w-full h-auto block" /></div>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <img src="/images/transit/testing2.jpg" alt="Round 1 testing — session 2" className="w-full h-auto block" />
                  <img src="/images/transit/Testing3.jpg" alt="Round 1 testing — session 3" className="w-full h-auto block" />
                </div>
              </Reveal>

              <div className="space-y-0 mb-14">
                {[
                  { head: 'On mental model', body: 'The shift was happening but unevenly. 8 of 12 participants described the new search as "booking a trip" rather than "finding a station." Meaningful progress over baseline, but users near the station defaulted faster to single-leg behavior. They were already committed to the train leg. The homepage had a narrow window.' },
                  { head: 'On leg-booking behavior', body: 'Users at home or planning ahead were significantly more open to booking two or three legs. Users near the station almost universally booked one leg at a time. The environment was shaping cognition as much as the interface was.' },
                  { head: 'On the masthead', body: 'It was not reading as a sequence. 6 of 12 users consumed the carousel frames as independent illustrations; they appreciated the visual quality but missed the narrative arc connecting them. The story we had worked hard to tell was not landing as a story.' },
                  { head: 'On the search', body: 'The two-field structure created an unexpected question ("Does it know where I am, or do I type it?") that the original single-field search never triggered. A new friction point we had introduced ourselves.' },
                ].map(({ head, body }, i) => (
                  <Reveal key={head} delay={i * 0.05}>
                    <div className="border-t border-border py-6">
                      <h5 className="font-sans text-[11px] font-semibold text-ink mb-2 uppercase tracking-[0.08em]">{head}</h5>
                      <p className="text-[14px] font-light text-ink-soft leading-[1.75]">{body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <h3 className="font-sans text-[clamp(1rem,1.6vw,1.4rem)] font-bold tracking-[-0.02em] mb-6 text-ink">What We Changed Before Round 2</h3>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {[
                  { label: 'Search field location state', body: 'Added a location-detect indicator to the first field, a pulsing state showing "Your current location." It answered the question before it became friction.' },
                  { label: 'Masthead: from 2D to 3D illustration', body: 'The Round 1 feedback pointed at something deeper than narrative structure. The standard Gojek 2D library was not visually distinct enough to hold attention. The frames were blending into the green homepage.' },
                ].map(({ label, body }, i) => (
                  <Reveal key={label} delay={i * 0.06}>
                    <div className="bg-paper-warm border border-border p-6 h-full">
                      <h5 className="font-semibold text-ink text-[14px] mb-2">{label}</h5>
                      <p className="text-[13px] font-light text-ink-soft leading-[1.75]">{body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.05}>
                <div className="max-w-[660px] space-y-4 text-[16px] font-light leading-[1.85] text-ink-soft mb-8">
                  <p>We made the call to push toward monochromatic 3D illustration. More sculptural, more tactile, a visual language that felt elevated, genuinely fresh within Gojek's broader design system.</p>
                  <p>I pushed the creative team hard on this. There were rounds where the colour sat too heavy against the page. Rounds where characters felt stiff. Rounds where contrast was wrong and the frames weren't reading as connected.</p>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="mb-12"><img src="/images/transit/Masthead_new.jpg" alt="Masthead 3D exploration and iterations" className="w-full h-auto block" /></div>
              </Reveal>

              {/* Round 2 */}
              <Reveal>
                <h3 className="font-sans text-[clamp(1.1rem,1.8vw,1.5rem)] font-bold tracking-[-0.03em] mb-3 text-ink">Round 2: Validating Changes, Testing Copy Variants</h3>
                <p className="text-[14px] font-light text-ink-soft mb-6">10 participants. 5 returning from Round 1 to measure mental model shift, 5 new as a fresh signal. Same context split.</p>
              </Reveal>

              <Reveal delay={0.04}>
                <div className="mb-8"><img src="/images/transit/Masthead_Narrative.jpg" alt="Round 2 masthead — final" className="w-full h-auto block" /></div>
              </Reveal>

              <div className="space-y-0">
                {[
                  { head: 'The 3D masthead was working', body: '9 of 10 participants described the carousel as showing "steps" or "a journey", up from 6 of 12 in Round 1. The visual elevation was doing more than aesthetic work: it was slowing users down enough to actually read the sequence.' },
                  { head: 'The station-context pattern held', body: 'Users near stations still defaulted to single-leg booking regardless of which variant they saw. This confirmed our Round 1 hypothesis: the homepage redesign was the right lever for the planning mindset, not the in-motion user. We documented this clearly as input for Phase 2.' },
                ].map(({ head, body }, i) => (
                  <Reveal key={head} delay={i * 0.06}>
                    <div className="border-t border-border py-6">
                      <h5 className="font-sans text-[13px] font-semibold text-ink mb-2">{head}</h5>
                      <p className="text-[14px] font-light text-ink-soft leading-[1.75]">{body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── 12. WHAT SHIPPED ────────────────────────────────────── */}
          <section id="sec-impact" className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="07" label="Shipped" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-2 text-ink">What Shipped</h2>
                <p className="text-[13px] font-light text-ink-muted mb-10">Phase 1: the new first fold</p>
              </Reveal>

              <Reveal delay={0.04}>
                <div className="mb-10"><img src="/images/transit/what_shipped.jpg" alt="Final shipped screens — Search, Masthead, Service Grid" className="w-full h-auto block" /></div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { label: 'Search', desc: 'Two-field journey planner with location detection, contextual empty states, and copy that frames the interaction as trip planning.' },
                  { label: 'Masthead', desc: "Horizontal narrative carousel with monochromatic 3D illustrations. Five frames telling the GoTransit journey from home to destination. A new visual direction for the product and for Gojek's illustration language." },
                  { label: 'Service Grid', desc: 'Reordered to lead with the multimodal journey entry point ahead of individual ticket purchases.' },
                ].map(({ label, desc }, i) => (
                  <Reveal key={label} delay={i * 0.07}>
                    <div className="border-t-2 border-ink pt-5">
                      <h4 className="font-sans text-[14px] font-bold text-ink mb-2">{label}</h4>
                      <p className="text-[13px] font-light text-ink-soft leading-[1.7]">{desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── 13. THE UNSOLVED PROBLEM ────────────────────────────── */}
          <section id="sec-reflection" className="py-20 border-b border-border px-10 md:px-16 bg-paper-warm">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <p className="text-[11px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-5">Phase 2 Thinking</p>
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-5 text-ink max-w-[520px]">
                  The Unsolved Problem
                </h2>
                <div className="max-w-[660px] space-y-4 text-[16px] font-light leading-[1.85] text-ink-soft mb-10">
                  <p>The near-station user remains a fundamentally different cognitive state. First mile is done. They're at the platform in execution mode: time, platform, tap, go. Cognitive bandwidth is narrow. The homepage redesign could not reach them.</p>
                  <p>That population needed a different intervention, further into the booking flow or in the post-booking experience. We documented three directions for Phase 2:</p>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Destination-triggered last mile prompt', desc: "When a near-station user enters their destination, surface a single contextual line before they confirm: \"GoRide from [arrival station] — usually available in 3 mins.\" No modal. No extra screen." },
                  { label: 'Flip the default on results', desc: 'Rather than presenting KRL-only as the top result, show the two-leg option as the recommended result with a clear time and cost breakdown.' },
                  { label: 'Arrival anticipation during journey', desc: "Once the user is on the train, surface a nudge as they approach their destination: \"Arriving in ~8 mins. Add a GoRide for the last mile?\" Cognitive bandwidth is back. The ask feels helpful." },
                ].map(({ label, desc }, i) => (
                  <Reveal key={label} delay={i * 0.07}>
                    <div className="bg-paper border border-border p-7 h-full">
                      <h4 className="font-sans text-[14px] font-semibold text-ink mb-2">{label}</h4>
                      <p className="text-[12px] font-light text-ink-soft leading-[1.75] italic">{desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── 14. IMPACT ──────────────────────────────────────────── */}
          <section className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="08" label="Impact" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-12 text-ink">
                  What the Numbers Said
                </h2>
              </Reveal>

              <div className="mb-8">
                {[
                  { val: '+48%', head: 'CTR on the multimodal search bar', body: "Users who previously ignored the multimodal entry point were clicking in. The reframed search, the narrative masthead, the identity shift. Something in that combination moved the first interaction significantly." },
                  { val: '+12%', head: 'Conversion to multimodal booking', body: 'The signal travelled all the way through the funnel. Users entering the search flow were converting to completed multimodal bookings at a meaningfully higher rate. Perception change was translating into behavior change.' },
                  { val: '−3.5%', head: 'Individual ticket booking conversion', body: "This one looks like a regression. It isn't. Users who previously came to buy a train ticket were now entering the multimodal flow instead. They were being redirected from a low-margin behavior to a higher-margin one. That decline was the behavioral shift we designed for." },
                ].map(({ val, head, body }, i) => (
                  <Reveal key={val} delay={i * 0.07}>
                    <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-5 md:gap-10 py-8 border-t border-border">
                      <div className="font-sans text-[clamp(36px,4.5vw,52px)] font-bold tracking-[-0.04em] leading-none text-ink">{val}</div>
                      <div>
                        <h4 className="font-sans text-[15px] font-semibold text-ink mb-2">{head}</h4>
                        <p className="text-[14px] font-light text-ink-soft leading-[1.75]">{body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1}>
                <p className="text-[11px] font-light text-ink-muted italic max-w-[600px] border-t border-border pt-5 mb-12">
                  iOS results following Phase 1 launch. No formal A/B test was run. Other product changes were running in parallel, so these numbers are directional, not causally attributed to the redesign alone.
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mb-4"><img src="/images/transit/Impact.jpg" alt="Impact metrics" className="w-full h-auto block" /></div>
              </Reveal>
            </div>
          </section>

          {/* ── 15. WHAT I LEARNED ──────────────────────────────────── */}
          <section className="py-24 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="09" label="Reflection" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-12 text-ink">
                  What I Learned
                </h2>
              </Reveal>

              <div className="max-w-[680px] space-y-6 text-[17px] font-light leading-[1.9] text-ink-soft mb-16">
                <Reveal><p>The decisions that mattered most in this project happened before I opened Figma.</p></Reveal>
                <Reveal delay={0.04}><p>Correctly reading the 87% drop as a comprehension failure, not a conversion problem. Pushing design into an OKR conversation that was heading toward upsell prompts. Building the organizational alignment for a phased strategy when the easier path was to ship a banner. Knowing when to push back on engineering constraints and when to hold the line.</p></Reveal>
                <Reveal delay={0.06}><p>A lead-level contribution is not measured in beautiful screens. It is measured in whether you diagnosed the right problem, built the conditions for the right solution to reach users, and left something the team could build on after you moved on.</p></Reveal>
                <Reveal delay={0.08}><p>But what I'm most proud of is not the 48% CTR uplift. It's the vision document, the thing that gave a new, under-resourced product a design strategy it could actually grow into.</p></Reveal>
              </div>

              <Reveal delay={0.12}>
                <p className="font-sans text-[clamp(24px,4vw,52px)] font-bold tracking-[-0.04em] leading-[1.1] text-ink max-w-[720px]">
                  That's the work that outlasts the pixels.
                </p>
              </Reveal>
            </div>
          </section>

          {/* ── Next project ─────────────────────────────────────────── */}
          <div className="px-10 md:px-16 w-full max-w-[800px] mx-auto">
            <Link
              to="/case-study/02"
              className="flex justify-between items-center group cursor-pointer py-14 border-t border-border"
            >
              <div>
                <div className="text-[11px] font-medium tracking-[0.12em] uppercase text-ink-muted mb-2">Next case study</div>
                <div className="font-sans text-[22px] font-bold tracking-[-0.03em] text-ink group-hover:text-accent transition-colors">
                  Agoda Design System
                </div>
              </div>
              <span className="text-[28px] text-ink-muted group-hover:translate-x-1.5 group-hover:text-accent transition-all duration-200">→</span>
            </Link>
          </div>

          {/* ── Footer ───────────────────────────────────────────────── */}
          <footer className="border-t border-border px-10 md:px-16 py-6">
            <div className="flex items-center justify-between">
              <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-bold">Nadeem©2025</p>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>
          </footer>

        </main>
      </div>
    </motion.div>
  );
}
