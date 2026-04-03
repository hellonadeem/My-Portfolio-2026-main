import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   Helpers
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Dark-rectangle image placeholder */
function Img({
  label,
  ratio = '16/9',
  cols = 1,
}: {
  label: string;
  ratio?: string;
  cols?: number;
}) {
  const box = (key: string | number) => (
    <div
      key={key}
      style={{ aspectRatio: ratio }}
      className="w-full bg-ink/[0.05] border border-dashed border-ink-muted/30 flex items-center justify-center"
    >
      <span className="text-[10px] tracking-[0.14em] uppercase text-ink-muted/40 font-medium px-8 text-center leading-relaxed">
        {label}
      </span>
    </div>
  );

  if (cols === 1) return box('single');
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {Array.from({ length: cols }).map((_, i) => box(i))}
    </div>
  );
}

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-[11px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-8">
      <span className="block w-6 h-px bg-border" />
      <span>{num} — {label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main component
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

      {/* ── Sticky section nav ──────────────────────────────────────────── */}
      <div className="sticky top-[48px] z-40 bg-paper/90 backdrop-blur-md border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16 flex items-center gap-0.5 overflow-x-auto py-2.5">
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`shrink-0 text-[11px] font-medium tracking-[0.07em] uppercase px-3 py-1.5 rounded transition-all duration-200 ${
                active === id
                  ? 'text-ink bg-ink/[0.07]'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section id="sec-overview" className="pt-16 pb-24 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16">

          <Link
            to="/#work"
            className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.08em] uppercase text-ink-muted hover:text-ink transition-colors mb-14"
          >
            <ArrowLeft size={13} /> All work
          </Link>

          {/* tag strip */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['Redesign', 'Multimodal Transit', 'Android & iOS'].map((t) => (
              <span
                key={t}
                className="text-[10px] tracking-[0.1em] uppercase border border-border px-2.5 py-1 rounded-full text-ink-muted"
              >
                {t}
              </span>
            ))}
          </div>

          {/* headline */}
          <h1 className="font-sans text-[clamp(30px,5vw,68px)] font-bold leading-[1.02] tracking-[-0.04em] text-ink max-w-[880px] mb-7">
            GoTransit's homepage was signalling the wrong product identity.
          </h1>

          {/* meta */}
          <p className="text-[14px] text-ink-soft font-light mb-16">
            Mohd Nadeem&nbsp;·&nbsp;Lead Product Designer&nbsp;·&nbsp;Gojek&nbsp;·&nbsp;2024
          </p>

          {/* hero image */}
          <Reveal>
            <Img label="GoTransit homepage — 2023 before state" ratio="16/9" />
          </Reveal>
        </div>
      </section>

      {/* ── 2. THE FEATURE NOBODY USED ──────────────────────────────────── */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16">
          <div className="max-w-[680px]">
            <Reveal>
              <div className="flex items-center gap-3 text-[11px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-8">
                <span className="block w-6 h-px bg-border" />
                <span>01</span>
              </div>
              <h2 className="font-sans text-[clamp(1.5rem,2.8vw,2.5rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-10 text-ink">
                The Feature Nobody Used
              </h2>
            </Reveal>
            <div className="space-y-5 text-[17px] font-light leading-[1.85] text-ink-soft">
              <Reveal><p>Late 2023. GoTransit launched multimodal booking. GoRide to the station, KRL train, GoRide out the other end. One order. One payment. First mile to last mile, connected inside Gojek.</p></Reveal>
              <Reveal delay={0.04}><p className="font-medium text-ink">It should have changed how Jakarta moved.</p></Reveal>
              <Reveal delay={0.06}><p className="font-medium text-ink">It didn't.</p></Reveal>
              <Reveal delay={0.08}><p>Users kept doing what they always did. Open GoTransit. Buy a train ticket. Leave. Book a GoRide separately, somewhere else. The multimodal feature was live, technically working, and practically invisible.</p></Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHY THIS MATTERED ────────────────────────────────────────── */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16">
          <div className="max-w-[680px]">
            <Reveal>
              <div className="flex items-center gap-3 text-[11px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-8">
                <span className="block w-6 h-px bg-border" />
                <span>02</span>
              </div>
              <h2 className="font-sans text-[clamp(1.5rem,2.8vw,2.5rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-10 text-ink">
                Why This Mattered
              </h2>
              <div className="space-y-5 text-[17px] font-light leading-[1.85] text-ink-soft mb-10">
                <p>GoTransit carried a real partnership cost to sell KRL tickets on Gojek. A train ticket priced in the low thousands of rupiah barely moved the margin. GoRide did. Every multimodal booking was where the unit economics worked. Every train-only booking was a missed opportunity the product couldn't afford.</p>
              </div>
            </Reveal>

            {/* pull quote */}
            <Reveal delay={0.05}>
              <div className="my-10 py-8 px-10 bg-ink text-paper">
                <p className="font-sans text-[clamp(17px,2vw,22px)] font-bold leading-[1.35] tracking-[-0.02em]">
                  The business target: ~900K multimodal bookings per month to reach breakeven.
                </p>
                <p className="mt-4 text-[15px] font-light text-paper/55">We were nowhere near it.</p>
              </div>
            </Reveal>

            {/* blockquote — PM vs designer tension */}
            <Reveal delay={0.08}>
              <blockquote className="mt-10 pl-6 border-l-2 border-accent space-y-4 text-[16px] font-light leading-[1.8] text-ink-soft italic">
                <p>The instinct from the product team was upsell prompts. Surface GoRide after a KRL booking. Fast to ship. Reasonable.</p>
                <p>My read was different. Upsell mechanics work when users understand the product and need a nudge. They don't work when users have already decided what the product is for — and decided wrong.</p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. THE FUNNEL ───────────────────────────────────────────────── */}
      <section id="sec-research" className="py-24 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16">
          <Reveal>
            <SectionLabel num="03" label="Research" />
            <h2 className="font-sans text-[clamp(1.5rem,2.8vw,2.5rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-14 text-ink max-w-[560px]">
              The Funnel Told Us Where to Look
            </h2>
          </Reveal>

          {/* 3 large stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { val: '2.1M',   lbl: 'users reached the GoTransit homepage every month' },
              { val: '12.98%', lbl: 'tapped the multimodal entry point' },
              { val: '4.37%',  lbl: 'completed a multimodal booking' },
            ].map(({ val, lbl }, i) => (
              <Reveal key={val} delay={i * 0.07}>
                <div className="border-t-2 border-ink pt-6">
                  <div className="font-sans text-[clamp(40px,5vw,60px)] font-bold tracking-[-0.04em] leading-none text-ink mb-3">{val}</div>
                  <div className="text-[14px] font-light text-ink-soft leading-[1.6]">{lbl}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="text-[16px] font-medium text-ink mb-2">An 87% drop before users even entered the flow.</p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-[18px] font-bold text-accent mb-12">42% of all bookings were middle-mile only.</p>
          </Reveal>

          <Reveal>
            <div className="mb-12">
              <Img label="Funnel data visualisation" ratio="16/9" />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="max-w-[680px] space-y-5 text-[17px] font-light leading-[1.85] text-ink-soft">
              <p>On paper this looked like a discoverability problem. Make the button bigger. Add a nudge. Ship a banner.</p>
              <p>That would have been the wrong diagnosis entirely.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. ASSUMPTIONS AUDIT ────────────────────────────────────────── */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16">
          <Reveal>
            <h2 className="font-sans text-[clamp(1.5rem,2.8vw,2.5rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-6 text-ink max-w-[560px]">
              What We Assumed Before We Researched Anything
            </h2>
            <p className="text-[17px] font-light leading-[1.85] text-ink-soft mb-12 max-w-[680px]">
              Before going to the field, we ran a heuristic audit of the existing homepage. We wanted to document our assumptions clearly so we would know later what the research confirmed, contradicted, or surprised us with.
            </p>
          </Reveal>

          {/* 3 assumption cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              {
                num: '01',
                title: 'Search bar misread',
                body: '"Enter your end destination" under a train banner felt like it was priming station lookup, not journey planning.',
              },
              {
                num: '02',
                title: 'Masthead teaching wrong product',
                body: 'A rotating carousel featuring a train prominently was signalling single-mode transit, not multimodal.',
              },
              {
                num: '03',
                title: 'Service grid anchoring tickets',
                body: '"Buy KRL ticket" and "Buy TransJakarta ticket" as the first two interactions on the page.',
              },
            ].map(({ num, title, body }, i) => (
              <Reveal key={num} delay={i * 0.07}>
                <div className="bg-paper-warm border border-border p-8 h-full">
                  <div className="text-[11px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-5">
                    Assumption {num}
                  </div>
                  <h4 className="font-sans text-[15px] font-semibold text-ink mb-3">{title}</h4>
                  <p className="text-[14px] font-light leading-[1.7] text-ink-soft">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.05}>
            <p className="text-[15px] font-light text-ink-soft mb-10 max-w-[680px]">
              These were hypotheses, not conclusions. We needed to go find out whether real users experienced what we thought they were experiencing — and whether we were even asking the right questions.
            </p>
          </Reveal>

          <Reveal>
            <Img label="Heuristic audit annotations" ratio="4/3" />
          </Reveal>
        </div>
      </section>

      {/* ── 6. FIELD RESEARCH ───────────────────────────────────────────── */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16">
          <Reveal>
            <h2 className="font-sans text-[clamp(1.5rem,2.8vw,2.5rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-10 text-ink max-w-[560px]">
              Field Research
            </h2>
            <div className="max-w-[680px] space-y-5 text-[17px] font-light leading-[1.85] text-ink-soft mb-12">
              <p>I was new to Indonesian commuter culture. I knew the data. I didn't know the experience.</p>
              <p>Before touching Figma, I pushed for field research. Together with Iqi, our researcher, we rode KRL during peak and off-peak hours. We shadowed commuters end-to-end, from home to station to train to destination. We sat with users in their homes and offices and watched them plan and book their commutes in real conditions.</p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mb-12">
              <Img label="Field research — KRL, peak hours, commuters" ratio="3/2" cols={2} />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="max-w-[680px] space-y-5 text-[17px] font-light leading-[1.85] text-ink-soft mb-20">
              <p>We also ran a problem discovery workshop and usability testing on the existing flow with a mix of user types: first-time GoTransit users, KRL regulars who had never tried multimodal, and users who had booked multimodal at least once.</p>
              <p>What I saw reframed everything.</p>
            </div>
          </Reveal>

          {/* 2 bold typographic insight statements */}
          <div className="border-t border-border pt-14 space-y-12">
            <Reveal>
              <p className="font-sans text-[clamp(22px,3.5vw,44px)] font-bold tracking-[-0.03em] leading-[1.15] text-ink max-w-[800px]">
                The Jakarta commute is not a single decision.
              </p>
            </Reveal>
            <Reveal delay={0.04}>
              <p className="text-[17px] font-light leading-[1.85] text-ink-soft max-w-[680px]">
                It is a chain of micro-decisions made under pressure. Which entrance. Which platform. Will I make this train. Is there a GoRide available at that station at 7am. Every decision made in motion, with noise, with crowds, on a phone that has to be read fast.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-[15px] font-light text-ink-soft max-w-[680px]">
                But the biggest thing I noticed was not in any analytics report.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="font-sans text-[clamp(22px,3.5vw,44px)] font-bold tracking-[-0.03em] leading-[1.15] text-ink max-w-[800px]">
                Users had fixed mental models about what each app was for.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[17px] font-light leading-[1.85] text-ink-soft max-w-[680px]">
                Gojek was for rides. GoTransit was for train tickets. Not journeys. Not planning. Tickets. The UI was not creating this belief. It was confirming one that already existed — and cementing it deeper with every visit.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 7. WHAT THE RESEARCH CONFIRMED ─────────────────────────────── */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16">
          <Reveal>
            <h2 className="font-sans text-[clamp(1.5rem,2.8vw,2.5rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-12 text-ink max-w-[560px]">
              What the Research Confirmed
            </h2>
          </Reveal>

          <Reveal delay={0.04}>
            <div className="mb-14">
              <Img label="Research synthesis / affinity map" ratio="4/3" />
            </div>
          </Reveal>

          {/* 3 insight blocks */}
          <div className="mb-14 max-w-[760px]">
            {[
              {
                head: 'The pre-booking flow was reinforcing the wrong mental model.',
                body: 'Users arrived believing GoTransit was a train ticketing tool. The surface confirmed it before they interacted with anything.',
              },
              {
                head: 'Context shapes behavior more than interface does.',
                body: 'Users near a station were in execution mode: narrow bandwidth, one job, committed to the train leg already. Users at home or the office were in planning mode: open to thinking about the full journey.',
              },
              {
                head: 'The commute is a chain of decisions, not one task.',
                body: 'Each leg is its own cognitive event. The interface had to meet users at each of those moments, not assume they were thinking in three-leg journeys from the start.',
              },
            ].map(({ head, body }, i) => (
              <Reveal key={head} delay={i * 0.07}>
                <div className="flex gap-6 py-8 border-t border-border">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                  <div>
                    <h4 className="font-sans text-[17px] font-semibold text-ink mb-2 leading-[1.4]">{head}</h4>
                    <p className="text-[15px] font-light text-ink-soft leading-[1.75]">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* blockquote */}
          <Reveal delay={0.1}>
            <blockquote className="pl-8 border-l-2 border-accent max-w-[640px] space-y-3 text-[16px] font-light leading-[1.8] text-ink-soft italic">
              <p>Our audit assumptions were right. But the research gave us something the audit couldn't: the reason behind the behavior.</p>
              <p>It was not that users couldn't find multimodal. It was that they had already decided what the product was before they looked for anything.</p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── 8. PROBLEM LOCKED ───────────────────────────────────────────── */}
      <section id="sec-strategy" className="py-28 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 text-[11px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-10">
              <span className="block w-6 h-px bg-border" />
              <span>Problem Locked</span>
              <span className="block w-6 h-px bg-border" />
            </div>
            <h2 className="font-sans text-[clamp(26px,4.5vw,58px)] font-bold tracking-[-0.04em] leading-[1.1] text-ink max-w-[820px] mx-auto mb-8">
              GoTransit's homepage was teaching users to ignore the feature we needed them to use.
            </h2>
            <p className="text-[17px] font-light leading-[1.85] text-ink-soft max-w-[540px] mx-auto">
              The surface was not broken. It was systematically signalling the wrong identity. No upsell prompt fixes a perception problem baked into the first fold.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 9. ALIGNMENT ────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16">
          <div className="max-w-[680px]">
            <Reveal>
              <h2 className="font-sans text-[clamp(1.5rem,2.8vw,2.5rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-10 text-ink">
                The Hardest Design Work Was Not in Figma
              </h2>
              <div className="space-y-5 text-[17px] font-light leading-[1.85] text-ink-soft">
                <p>When we brought our findings back and proposed redesigning the homepage, we hit a wall.</p>
                <p>GoTransit was a new product. Engineering was conservative — any significant change touched a legacy search system shared across Gojek's booking flows. Product leadership questioned the investment.</p>
                <p>The honest answer was: this was exactly the moment to fix it. Mental models cement early. If we didn't fix this now, we would spend years fighting a perception we had let harden.</p>
                <p>But conviction doesn't move roadmaps. Strategy does.</p>
              </div>
            </Reveal>

            {/* pull quote */}
            <Reveal delay={0.06}>
              <div className="my-12 py-8 border-t border-b border-border">
                <p className="font-serif text-[clamp(22px,3vw,36px)] italic leading-[1.35] text-ink">
                  "Conviction doesn't move roadmaps. Strategy does."
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="space-y-5 text-[17px] font-light leading-[1.85] text-ink-soft mb-10">
                <p>So I built a <strong className="font-semibold text-ink">2-year design vision for GoTransit.</strong> Not a mood board, but a phased roadmap with timelines — explicitly connected to the path toward 900K multimodal bookings.</p>
                <p>I presented this to product leadership, the engineering lead, and the VP of Design. The goal was not approval for everything. It was to show we had a coherent theory — that this was not a designer wanting to redraw screens, but a team with a clear strategy for how design could close the gap to 900K.</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <div className="mb-10">
              <Img label="2-year design vision roadmap" ratio="16/9" />
            </div>
          </Reveal>

          {/* bold reframe callout */}
          <Reveal delay={0.06}>
            <div className="bg-paper-warm border-l-4 border-accent px-8 py-7 max-w-[680px] mb-8">
              <p className="font-sans text-[17px] font-semibold text-ink leading-[1.45]">
                Instead of "homepage revamp," we proposed "first-fold improvement" — just the search bar, masthead, and service grid. The slice users see before they scroll. The slice doing the most damage to perception.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="max-w-[680px] text-[17px] font-light leading-[1.85] text-ink-soft">
              Engineering could scope it. Leadership could see the logic. We had our green light.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 10. DESIGN EXPLORATION ──────────────────────────────────────── */}
      <section id="sec-design" className="py-24 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16">
          <Reveal>
            <SectionLabel num="04" label="Design" />
            <h2 className="font-sans text-[clamp(1.5rem,2.8vw,2.5rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-6 text-ink max-w-[560px]">
              Diverging Hard
            </h2>
            <p className="text-[17px] font-light leading-[1.85] text-ink-soft mb-12 max-w-[680px]">
              Before screens, we mapped how different users actually move through the product. Four user types. Four different intents. One homepage trying to serve all of them.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mb-12">
              <Img label="User flow diagram" ratio="16/9" />
            </div>
          </Reveal>

          {/* user type table */}
          <Reveal delay={0.06}>
            <div className="mb-14 overflow-x-auto">
              <table className="w-full border-collapse text-[14px]">
                <thead>
                  <tr className="border-b border-border">
                    {['User type', 'Intent', 'What they need'].map((h) => (
                      <th key={h} className="text-left py-3 pr-10 text-[11px] tracking-[0.1em] uppercase text-ink-muted font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['New transit user',  'Never booked before',      'Understand what the product does first'],
                    ['First mile user',   'GoRide then KRL',          'Start with location, think in legs'],
                    ['Middle mile user',  'Train ticket only',        'Fast path to KRL, already decided'],
                    ['Multimodal user',   'GoRide + KRL + GoRide',    'One search, one order, no switching'],
                  ].map(([type, intent, need]) => (
                    <tr key={type} className="border-b border-border/50 hover:bg-paper-warm transition-colors">
                      <td className="py-4 pr-10 font-medium text-ink">{type}</td>
                      <td className="py-4 pr-10 text-ink-soft">{intent}</td>
                      <td className="py-4 text-ink-soft">{need}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-5 text-[14px] font-light text-ink-soft max-w-[680px]">
                The tension: the homepage was optimised for the middle mile user, the simplest intent. But the business needed it to serve the multimodal user, the most valuable one.
              </p>
            </div>
          </Reveal>

          {/* ── sub: Search Exploration ── */}
          <Reveal>
            <h3 className="font-sans text-[clamp(1.2rem,2vw,1.8rem)] font-bold tracking-[-0.03em] mb-6 text-ink">
              Search Exploration
            </h3>
            <div className="max-w-[680px] space-y-5 text-[17px] font-light leading-[1.85] text-ink-soft mb-10">
              <p>The search bar was the first interactive element on the page. It was also doing the most damage — priming station lookup instead of journey planning.</p>
              <p>Our first instinct was to make search the hero. Two fields, clearly labelled. Where you are, where you're going. Auto-detect location. Make it feel like a journey planner, not a ticket counter.</p>
              <p>We explored several directions in parallel:</p>
            </div>
          </Reveal>

          {/* 4 exploration directions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              {
                label: 'Personalised search states',
                desc: "Detect the user's proximity to a station and pre-fill it as origin. Pull from GoRide history to surface frequent routes. Make the search feel like it already knows the commute.",
              },
              {
                label: 'Animated journey icon',
                desc: 'Motorbike to train to motorbike, a subtle motion inside the search field. A visual metaphor baked into the moment before you type.',
              },
              {
                label: 'Reframed copy variants',
                desc: '"Book your full journey." "GoRide + KRL, one order." "Where are you headed today?" Testing whether language alone could shift the mental model.',
              },
              {
                label: 'Dynamic history',
                desc: 'Surface recent GoRide routes as multimodal suggestions, making new behavior feel like a natural extension of the old.',
              },
            ].map(({ label, desc }, i) => (
              <Reveal key={label} delay={i * 0.06}>
                <div className="bg-paper-warm border border-border p-6 h-full">
                  <h5 className="font-sans text-[14px] font-semibold text-ink mb-2">{label}</h5>
                  <p className="text-[13px] font-light text-ink-soft leading-[1.7]">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.05}>
            <div className="grid grid-cols-2 gap-3 mb-12">
              <Img label="Search exploration screens" ratio="9/16" />
              <Img label="Figma iterations" ratio="9/16" />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="max-w-[680px] space-y-5 text-[17px] font-light leading-[1.85] text-ink-soft mb-8">
              <p className="font-medium text-ink">Then we hit a constraint.</p>
              <p>Engineering flagged that the dual-field search required changes to a legacy system shared across Gojek's primary booking flow. Not a styling change — a significant backend decision, not scoped for Phase 1.</p>
              <p>We pushed back. We presented the user research. We showed that a single-field search, regardless of copy, would still read as station lookup in the existing page context — because it was structurally identical to what it replaced.</p>
              <p className="font-semibold text-ink">Engineering came around. We aligned on the two-field search as the right architecture for communicating journey planning intent.</p>
            </div>
          </Reveal>

          <Reveal delay={0.07}>
            <div className="mb-16">
              <Img label="Engineering alignment screenshot" ratio="16/9" />
            </div>
          </Reveal>

          {/* ── sub: The Masthead Problem ── */}
          <Reveal>
            <h3 className="font-sans text-[clamp(1.2rem,2vw,1.8rem)] font-bold tracking-[-0.03em] mb-6 text-ink">
              The Masthead Problem
            </h3>
            <div className="max-w-[680px] space-y-5 text-[17px] font-light leading-[1.85] text-ink-soft mb-10">
              <p>The original masthead: static banner, Gojek 2D illustration library, standard value props. Clean. On-brand. Forgettable. Featuring a train.</p>
              <p>The creative team, Hashir and Soozy, ran a benchmarking exercise across transit apps globally — Citymapper, Transit, Moovit, regional Southeast Asian players. What came back: almost every competitor defaulted to iconography and feature lists in the hero space. Almost nobody was telling a story.</p>
              <p>That was the opening.</p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mb-10">
              <Img label="Masthead benchmarking" ratio="16/9" />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="max-w-[680px] space-y-5 text-[17px] font-light leading-[1.85] text-ink-soft mb-10">
              <p>Our conviction: the masthead needed to narrate the actual GoTransit experience. Not list benefits. Tell the story of the journey in sequence, the way it actually happens.</p>
              <p>We pushed for a <strong className="font-semibold text-ink">horizontal scrolling narrative carousel</strong> — not auto-rotating, but inviting the user to move through moments:</p>
            </div>

            {/* 4 carousel frames as italic sequential lines */}
            <div className="pl-8 border-l-2 border-border max-w-[520px] space-y-5 mb-12">
              {[
                "Frame 1: You're home. You need to get somewhere.",
                'Frame 2: A GoRide picks you up.',
                'Frame 3: You tap your QR at the station gate.',
                "Frame 4: You're on the train. Another GoRide is waiting at the other end.",
              ].map((frame, i) => (
                <p key={i} className="font-serif text-[17px] italic text-ink-soft leading-[1.6]">{frame}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.07}>
            <Img label="Masthead narrative frames" ratio="16/9" />
          </Reveal>
        </div>
      </section>

      {/* ── 11. TESTING ─────────────────────────────────────────────────── */}
      <section id="sec-testing" className="py-24 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16">
          <Reveal>
            <SectionLabel num="05" label="Testing" />
            <h2 className="font-sans text-[clamp(1.5rem,2.8vw,2.5rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-6 text-ink max-w-[600px]">
              Testing — What Broke, What We Fixed
            </h2>
            <div className="max-w-[680px] space-y-5 text-[17px] font-light leading-[1.85] text-ink-soft mb-10">
              <p>With designs converged, we moved into structured prototype testing — two rounds, with deliberate changes between them.</p>
              <p>We wanted to understand something specific beyond the UI: <strong className="font-semibold text-ink">do users naturally think in legs?</strong> When someone opens GoTransit, are they thinking about the full journey — or one leg at a time?</p>
              <p>So we recruited across two distinct contexts:</p>
            </div>
          </Reveal>

          {/* context split */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-[680px]">
            {[
              {
                head: 'Near or at a station',
                body: 'Users already in transit mode, mid-commute, making booking decisions under time pressure.',
              },
              {
                head: 'At home or at the office',
                body: 'Users planning ahead, with more cognitive space to think through the full journey.',
              },
            ].map(({ head, body }) => (
              <Reveal key={head} className="flex-1">
                <div className="bg-paper-warm border border-border px-6 py-5 h-full">
                  <h5 className="font-semibold text-ink text-[14px] mb-2">{head}</h5>
                  <p className="text-[13px] font-light text-ink-soft leading-[1.7]">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.04}>
            <div className="mb-14">
              <Img label="Testing setup" ratio="3/2" />
            </div>
          </Reveal>

          {/* Round 1 */}
          <Reveal>
            <h3 className="font-sans text-[clamp(1.2rem,2vw,1.8rem)] font-bold tracking-[-0.03em] mb-5 text-ink">
              Round 1 — Testing Core Hypotheses
            </h3>
            <p className="text-[15px] font-light text-ink-soft mb-5">12 participants split across context and usage profile:</p>
            {/* participant pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {[
                '3 users at / near a KRL station',
                '3 users at home or office',
                '3 KRL regulars — never tried multimodal',
                '3 users — booked multimodal at least once',
              ].map((p) => (
                <span key={p} className="text-[11px] tracking-[0.05em] border border-border px-3 py-1.5 text-ink-soft">
                  {p}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <div className="mb-10">
              <Img label="Round 1 prototype screens" ratio="16/9" />
            </div>
          </Reveal>

          {/* 4 findings blocks */}
          <div className="space-y-0 mb-16 max-w-[760px]">
            {[
              {
                head: 'On mental model',
                body: 'The shift was happening but unevenly. 8 of 12 participants described the new search as "booking a trip" rather than "finding a station." Meaningful progress over baseline — but users near the station defaulted faster to single-leg behavior. They were already committed to the train leg. The homepage had a narrow window.',
              },
              {
                head: 'On leg-booking behavior',
                body: 'Users at home or planning ahead were significantly more open to booking two or three legs. Users near the station almost universally booked one leg at a time. The environment was shaping cognition as much as the interface was.',
              },
              {
                head: 'On the masthead',
                body: 'It was not reading as a sequence. 6 of 12 users consumed the carousel frames as independent illustrations — they appreciated the visual quality but missed the narrative arc connecting them. The story we had worked hard to tell was not landing as a story.',
              },
              {
                head: 'On the search',
                body: 'The two-field structure created an unexpected question — "Does it know where I am, or do I type it?" — that the original single-field search never triggered. A new friction point we had introduced ourselves.',
              },
            ].map(({ head, body }, i) => (
              <Reveal key={head} delay={i * 0.06}>
                <div className="border-t border-border py-7">
                  <h5 className="font-sans text-[12px] font-semibold text-ink mb-2 uppercase tracking-[0.08em]">{head}</h5>
                  <p className="text-[15px] font-light text-ink-soft leading-[1.75]">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Changes before Round 2 */}
          <Reveal>
            <h3 className="font-sans text-[clamp(1.1rem,1.8vw,1.6rem)] font-bold tracking-[-0.03em] mb-8 text-ink">
              What We Changed Before Round 2
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              {
                label: 'Search field location state',
                body: 'Added a location-detect indicator to the first field — a pulsing state showing "Your current location." It answered the question before it became friction.',
              },
              {
                label: 'Masthead: from 2D to 3D illustration',
                body: 'The Round 1 feedback pointed at something deeper than narrative structure. The standard Gojek 2D library was not visually distinct enough to hold attention. The frames were blending into the green homepage. Users were scanning past them.',
              },
            ].map(({ label, body }, i) => (
              <Reveal key={label} delay={i * 0.06}>
                <div className="bg-paper-warm border border-border p-8 h-full">
                  <h5 className="font-semibold text-ink text-[15px] mb-3">{label}</h5>
                  <p className="text-[14px] font-light text-ink-soft leading-[1.75]">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.05}>
            <div className="max-w-[680px] space-y-5 text-[17px] font-light leading-[1.85] text-ink-soft mb-10">
              <p>We made the call to push toward monochromatic 3D illustration. More sculptural, more tactile, a visual language that felt elevated — genuinely fresh within Gojek's broader design system.</p>
              <p>I pushed the creative team hard on this. There were rounds where the colour sat too heavy against the page. Rounds where characters felt stiff. Rounds where contrast was wrong and the frames weren't reading as connected.</p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mb-14">
              <Img label="Masthead 3D exploration and iterations" ratio="4/3" />
            </div>
          </Reveal>

          {/* Round 2 */}
          <Reveal>
            <h3 className="font-sans text-[clamp(1.2rem,2vw,1.8rem)] font-bold tracking-[-0.03em] mb-5 text-ink">
              Round 2 — Validating Changes, Testing Copy Variants
            </h3>
            <p className="text-[15px] font-light text-ink-soft mb-8">
              10 participants. 5 returning from Round 1 to measure mental model shift, 5 new as a fresh signal. Same context split.
            </p>
          </Reveal>

          <Reveal delay={0.04}>
            <div className="mb-10">
              <Img label="Round 2 masthead — final" ratio="16/9" />
            </div>
          </Reveal>

          <div className="space-y-0 max-w-[760px]">
            {[
              {
                head: 'The 3D masthead was working',
                body: '9 of 10 participants described the carousel as showing "steps" or "a journey" — up from 6 of 12 in Round 1. The visual elevation was doing more than aesthetic work: it was slowing users down enough to actually read the sequence.',
              },
              {
                head: 'The station-context pattern held',
                body: 'Users near stations still defaulted to single-leg booking regardless of which variant they saw. This confirmed our Round 1 hypothesis — the homepage redesign was the right lever for the planning mindset, not the in-motion user. We documented this clearly as input for Phase 2, where a different intervention would be needed.',
              },
            ].map(({ head, body }, i) => (
              <Reveal key={head} delay={i * 0.06}>
                <div className="border-t border-border py-7">
                  <h5 className="font-sans text-[14px] font-semibold text-ink mb-2">{head}</h5>
                  <p className="text-[15px] font-light text-ink-soft leading-[1.75]">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. WHAT SHIPPED ────────────────────────────────────────────── */}
      <section id="sec-impact" className="py-24 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16">
          <Reveal>
            <SectionLabel num="06" label="Shipped" />
            <h2 className="font-sans text-[clamp(1.5rem,2.8vw,2.5rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-3 text-ink">
              What Shipped
            </h2>
            <p className="text-[14px] font-light text-ink-muted mb-12">Phase 1 — the new first fold</p>
          </Reveal>

          <Reveal delay={0.04}>
            <div className="mb-12">
              <Img label="Final shipped screens — Search, Masthead, Service Grid" ratio="16/9" />
            </div>
          </Reveal>

          {/* 3 delivery cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                label: 'Search',
                desc: 'Two-field journey planner with location detection, contextual empty states, and copy that frames the interaction as trip planning.',
              },
              {
                label: 'Masthead',
                desc: "Horizontal narrative carousel with monochromatic 3D illustrations. Five frames telling the GoTransit journey from home to destination. A new visual direction for the product and for Gojek's illustration language.",
              },
              {
                label: 'Service Grid',
                desc: 'Reordered to lead with the multimodal journey entry point ahead of individual ticket purchases.',
              },
            ].map(({ label, desc }, i) => (
              <Reveal key={label} delay={i * 0.07}>
                <div className="border-t-2 border-ink pt-6">
                  <h4 className="font-sans text-[15px] font-bold text-ink mb-3">{label}</h4>
                  <p className="text-[14px] font-light text-ink-soft leading-[1.7]">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. THE UNSOLVED PROBLEM ────────────────────────────────────── */}
      <section id="sec-reflection" className="py-24 border-b border-border bg-paper-warm">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16">
          <Reveal>
            <div className="flex items-center gap-3 text-[11px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-8">
              <span className="block w-6 h-px bg-border" />
              <span>Phase 2 Thinking</span>
            </div>
            <h2 className="font-sans text-[clamp(1.5rem,2.8vw,2.5rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-6 text-ink max-w-[560px]">
              The Unsolved Problem
            </h2>
            <div className="max-w-[680px] space-y-5 text-[17px] font-light leading-[1.85] text-ink-soft mb-12">
              <p>The near-station user remains a fundamentally different cognitive state. First mile is done. They're at the platform in execution mode — time, platform, tap, go. Cognitive bandwidth is narrow. The homepage redesign could not reach them.</p>
              <p>That population needed a different intervention, further into the booking flow or in the post-booking experience. We documented three directions for Phase 2:</p>
            </div>
          </Reveal>

          {/* 3 phase 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: 'Destination-triggered last mile prompt',
                desc: "When a near-station user enters their destination, surface a single contextual line before they confirm: \"GoRide from [arrival station] — usually available in 3 mins.\" No modal. No extra screen. Ambient reassurance that the last leg is one tap away.",
              },
              {
                label: 'Flip the default on results',
                desc: 'Rather than presenting KRL-only as the top result, show the two-leg option as the recommended result with a clear time and cost breakdown.',
              },
              {
                label: 'Arrival anticipation during journey',
                desc: "Once the user is on the train, surface a nudge as they approach their destination: \"Arriving at [station] in ~8 mins. Add a GoRide for the last mile?\" They now have idle time. Cognitive bandwidth is back. The ask feels helpful rather than intrusive.",
              },
            ].map(({ label, desc }, i) => (
              <Reveal key={label} delay={i * 0.07}>
                <div className="bg-paper border border-border p-8 h-full">
                  <h4 className="font-sans text-[15px] font-semibold text-ink mb-3">{label}</h4>
                  <p className="text-[13px] font-light text-ink-soft leading-[1.75] italic">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 14. IMPACT ──────────────────────────────────────────────────── */}
      <section className="py-24 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16">
          <Reveal>
            <SectionLabel num="07" label="Impact" />
            <h2 className="font-sans text-[clamp(1.5rem,2.8vw,2.5rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-14 text-ink">
              What the Numbers Said
            </h2>
          </Reveal>

          <Reveal delay={0.04}>
            <div className="mb-14">
              <Img label="Impact metrics" ratio="16/9" />
            </div>
          </Reveal>

          {/* 3 metric rows */}
          <div className="mb-10">
            {[
              {
                val: '+48%',
                head: 'CTR on the multimodal search bar',
                body: "Users who previously ignored the multimodal entry point were clicking in. The reframed search, the narrative masthead, the identity shift — something in that combination moved the first interaction significantly.",
              },
              {
                val: '+12%',
                head: 'Conversion to multimodal booking',
                body: 'The signal travelled all the way through the funnel. Users entering the search flow were converting to completed multimodal bookings at a meaningfully higher rate. Perception change was translating into behavior change.',
              },
              {
                val: '−3.5%',
                head: 'Individual ticket booking conversion',
                body: "This one looks like a regression. It isn't. Users who previously came to buy a train ticket were now entering the multimodal flow instead. They were being redirected from a low-margin behavior to a higher-margin one. That decline was the behavioral shift we designed for.",
              },
            ].map(({ val, head, body }, i) => (
              <Reveal key={val} delay={i * 0.07}>
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12 py-10 border-t border-border">
                  <div className="font-sans text-[clamp(40px,5vw,60px)] font-bold tracking-[-0.04em] leading-none text-ink">
                    {val}
                  </div>
                  <div>
                    <h4 className="font-sans text-[16px] font-semibold text-ink mb-3">{head}</h4>
                    <p className="text-[15px] font-light text-ink-soft leading-[1.75]">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="text-[12px] font-light text-ink-muted italic max-w-[640px] border-t border-border pt-6">
              iOS results following Phase 1 launch. No formal A/B test was run. Other product changes were running in parallel — these numbers are directional, not causally attributed to the redesign alone.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 15. WHAT I LEARNED ──────────────────────────────────────────── */}
      <section className="py-28 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16">
          <Reveal>
            <SectionLabel num="08" label="Reflection" />
            <h2 className="font-sans text-[clamp(1.5rem,2.8vw,2.5rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-14 text-ink">
              What I Learned
            </h2>
          </Reveal>

          <div className="max-w-[720px] space-y-7 text-[18px] font-light leading-[1.9] text-ink-soft mb-20">
            <Reveal><p>The decisions that mattered most in this project happened before I opened Figma.</p></Reveal>
            <Reveal delay={0.04}><p>Correctly reading the 87% drop as a comprehension failure, not a conversion problem. Pushing design into an OKR conversation that was heading toward upsell prompts. Building the organizational alignment for a phased strategy when the easier path was to ship a banner. Knowing when to push back on engineering constraints and when to hold the line.</p></Reveal>
            <Reveal delay={0.06}><p>A lead-level contribution is not measured in beautiful screens. It is measured in whether you diagnosed the right problem, built the conditions for the right solution to reach users, and left something the team could build on after you moved on.</p></Reveal>
            <Reveal delay={0.08}><p>GoTransit's pre-booking experience is clearer than it was. The multimodal story lands. The numbers moved in the right direction.</p></Reveal>
            <Reveal delay={0.1}><p>But what I'm most proud of is not the 48% CTR uplift. It's the vision document — the thing that gave a new, under-resourced product a design strategy it could actually grow into.</p></Reveal>
          </div>

          {/* final typographic statement */}
          <Reveal delay={0.12}>
            <p className="font-sans text-[clamp(26px,4.5vw,58px)] font-bold tracking-[-0.04em] leading-[1.1] text-ink max-w-[800px]">
              That's the work that outlasts the pixels.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 16. TEAM CREDITS ────────────────────────────────────────────── */}
      <section className="py-7 border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 md:px-16">
          <p className="text-[12px] font-light text-ink-muted">
            <span className="uppercase tracking-[0.1em] text-[10px] font-medium text-ink-muted/60 mr-3">Team</span>
            Mita (PM) · Iqi (Research) · Hashir and Soozy (Creative) · Binoy (Motion) · Vaibhav (Design Mentor)
          </p>
        </div>
      </section>

      {/* ── Next project ────────────────────────────────────────────────── */}
      <div className="max-w-[1100px] mx-auto px-6 md:px-16">
        <Link
          to="/case-study/02"
          className="flex justify-between items-center group cursor-pointer py-14 border-t border-border mt-0"
        >
          <div>
            <div className="text-[11px] font-medium tracking-[0.12em] uppercase text-ink-muted mb-2">
              Next case study
            </div>
            <div className="font-sans text-[24px] font-bold tracking-[-0.03em] text-ink group-hover:text-accent transition-colors">
              Agoda Design System
            </div>
          </div>
          <span className="text-[32px] text-ink-muted group-hover:translate-x-1.5 group-hover:text-accent transition-all duration-200">→</span>
        </Link>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-border px-6 md:px-12 py-6">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-bold">Nadeem©2025</p>
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        </div>
      </footer>

    </motion.div>
  );
}
