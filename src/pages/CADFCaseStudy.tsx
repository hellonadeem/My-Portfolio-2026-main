import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview',    id: 'sec-overview'    },
  { label: 'Illuminate',  id: 'sec-research'    },
  { label: 'Archetypes',  id: 'sec-archetypes'  },
  { label: 'Design',      id: 'sec-design'      },
  { label: 'Experiments', id: 'sec-experiments' },
  { label: 'Impact',      id: 'sec-impact'      },
  { label: 'Reflection',  id: 'sec-reflection'  },
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
      {num} — {label}
    </p>
  );
}

export default function CADFCaseStudy() {
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

          {/* ── 1. HERO ──────────────────────────────────────────────── */}
          <section id="sec-overview" className="pt-14 pb-6 px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Link
                to="/#work"
                className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.08em] uppercase text-ink-muted hover:text-ink transition-colors mb-12"
              >
                <ArrowLeft size={13} /> All work
              </Link>

              <div className="flex flex-wrap gap-2 mb-7">
                {['CADF', 'GoCar', 'Android & iOS'].map((t) => (
                  <span key={t} className="text-[10px] tracking-[0.1em] uppercase border border-border px-2.5 py-1 rounded-full text-ink-muted">
                    {t}
                  </span>
                ))}
              </div>

              <h1 className="font-sans text-[clamp(28px,4.5vw,64px)] font-bold leading-[1.02] tracking-[-0.04em] text-ink max-w-[760px] mb-6">
                Reduce Cancellation from 25% to 16% in Bali
              </h1>

              <p className="text-[14px] text-ink-soft font-light mb-14">
                Mohd Nadeem&nbsp;·&nbsp;Gojek&nbsp;·&nbsp;2023
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
                <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-ink-muted mb-1.5">Team</p>
                <p className="text-[13px] text-ink font-light">UX Writers · Researcher · PM</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-ink-muted mb-1.5">Platform</p>
                <p className="text-[13px] text-ink font-light">Android &amp; iOS</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-ink-muted mb-1.5">Timeline</p>
                <p className="text-[13px] text-ink font-light">~3 Months · 2023</p>
              </div>
            </div>
          </section>

          {/* ── 2. CONTEXT ───────────────────────────────────────────── */}
          <section className="pt-16 pb-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="01" label="Context" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-10 text-ink max-w-[600px]">
                  One in four matched bookings cancelled. After a driver was already found.
                </h2>
              </Reveal>

              <div className="space-y-5 text-[16px] font-light leading-[1.85] text-ink-soft max-w-[660px]">
                <Reveal><p>GoCar is Gojek's four-wheel ride-hailing product, operating in one of Southeast Asia's most competitive mobility markets. In Bali, the pressure is particular: high tourist demand, seasonal supply fluctuations, and a rider base with ready access to alternatives ranging from ojeks to private car rentals.</p></Reveal>
                <Reveal delay={0.04}><p>Reliability, the ratio of bookings completed to bookings initiated, had been trending downward, averaging around 65% over a sustained two-week window. Within those lost bookings, Cancellation After Driver Found (CADF) was the dominant failure mode.</p></Reveal>
              </div>

              <Reveal delay={0.06}>
                <div className="grid grid-cols-3 gap-8 my-10 py-7 border-y border-border">
                  {[
                    { val: '25%', label: 'CADF Rate in Bali', sub: 'vs 20% national average' },
                    { val: '93%', label: 'Customer-Initiated', sub: 'not driver or system' },
                    { val: '65%', label: 'Avg Reliability (BCR)', sub: 'over a 2-week window' },
                  ].map(({ val, label, sub }) => (
                    <div key={val}>
                      <div className="text-[clamp(20px,2.4vw,30px)] font-semibold tracking-[-0.03em] text-ink mb-1">{val}</div>
                      <div className="text-[12px] font-medium text-ink mb-0.5">{label}</div>
                      <div className="text-[11px] font-light text-ink-muted">{sub}</div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <div className="space-y-5 text-[16px] font-light leading-[1.85] text-ink-soft max-w-[660px]">
                <Reveal><p>A CADF event isn't an abandoned search. It's a completed match that failed at the last mile. The driver has accepted, routing has begun, supply has been allocated. The cancellation wastes driver time, reduces their earnings-per-hour, and re-enters the customer into the queue, often at a higher ETA than before.</p></Reveal>
                <Reveal delay={0.04}><p>Over time, repeated CADF experiences erode trust in GoCar's reliability.</p></Reveal>
              </div>
            </div>
          </section>

          {/* ── MY ROLE & APPROACH ───────────────────────────────────── */}
          <section className="py-16 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <p className="text-[11px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-5">The Process</p>
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-10 text-ink max-w-[600px]">
                  My Role &amp; Approach
                </h2>
              </Reveal>
              <div className="space-y-0 max-w-[660px]">
                {[
                  { label: 'Ownership', body: 'As lead designer, I owned the full arc from problem definition to shipped solution.' },
                  { label: 'Data', body: 'Partnered with the data team to segment cancellation logs before any design work began.' },
                  { label: 'Engineering', body: 'Worked closely with ML and engineering to understand how the dispatch system works.' },
                  { label: 'Research', body: 'Collaborated with UX research to validate early hypotheses and anecdotal feedback.' },
                  { label: 'Writing', body: 'Worked closely with a UX writer throughout — this project was fundamentally about reassurance and communication.' },
                  { label: 'PM', body: 'Partnered with my PM to prioritise experiments and phase the solution rollout.' },
                ].map(({ label, body }, i) => (
                  <Reveal key={label} delay={i * 0.05}>
                    <div className="grid grid-cols-[100px_1fr] gap-6 py-4 border-t border-border">
                      <p className="text-[11px] tracking-[0.08em] uppercase text-ink-muted font-medium pt-0.5">{label}</p>
                      <p className="text-[14px] font-light leading-[1.75] text-ink-soft">{body}</p>
                    </div>
                  </Reveal>
                ))}
                <div className="border-t border-border" />
              </div>
            </div>
          </section>

          {/* ── 3. ILLUMINATE ────────────────────────────────────────── */}
          <section id="sec-research" className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">

              {/* — We dug into the data — */}
              <Reveal>
                <SectionLabel num="02" label="Illuminate" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-4 text-ink max-w-[600px]">
                  We dug into the data.
                </h2>
                <p className="text-[15px] font-light text-ink-muted mb-8 max-w-[500px]">Why are customers cancelling after a driver has already been found?</p>
              </Reveal>

              <Reveal delay={0.04}>
                <blockquote className="pl-6 border-l-2 border-accent space-y-3 text-[15px] font-light leading-[1.8] text-ink-soft mb-10 max-w-[660px]">
                  <p>We looked at quantitative insights on cancelled orders to understand why riders cancel.</p>
                  <p>The signals were then vetted through qualitative research to plan the approach.</p>
                </blockquote>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="mb-16"><img src="/images/cadf/firstcancel.jpg" alt="Cancellation rebooking tree — 60% didn't rebook · 40% booked again" className="w-full h-auto block" /></div>
              </Reveal>

              {/* — Why were users cancelling? (bar chart) — */}
              <Reveal>
                <h3 className="font-sans text-[clamp(1.1rem,1.8vw,1.5rem)] font-bold tracking-[-0.03em] mb-2 text-ink">
                  Why were users cancelling?
                </h3>
                <p className="text-[14px] font-light text-ink-muted mb-8">We also looked at the reasons customers selected when they cancelled their ride.</p>
              </Reveal>

              <Reveal delay={0.04}>
                <div className="space-y-4 mb-5 max-w-[640px]">
                  {[
                    { label: "I've waited too long", pct: 25.1, highlight: true },
                    { label: 'Driver is too far',    pct: 19.4, highlight: true },
                    { label: 'Driver not moving',    pct: 9.4,  highlight: true },
                    { label: 'Cancel with no reason',pct: 6,    highlight: false },
                    { label: 'Found another ride',   pct: 5,    highlight: false },
                    { label: 'Others',               pct: 35.1, highlight: false },
                  ].map(({ label, pct, highlight }) => (
                    <div key={label} className="flex items-center gap-4">
                      <span className={`text-[14px] w-[200px] shrink-0 ${highlight ? 'font-semibold text-ink' : 'font-normal text-ink-muted/50'}`}>{label}</span>
                      <div className="flex-1 h-[10px] rounded-full bg-ink/[0.06] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${highlight ? 'bg-accent' : 'bg-ink/[0.08]'}`}
                          style={{ width: `${(pct / 35.1) * 100}%` }}
                        />
                      </div>
                      <span className={`text-[14px] w-[48px] text-right shrink-0 ${highlight ? 'font-bold text-accent' : 'text-transparent'}`}>{pct}%</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <p className="text-[13px] font-light text-ink-soft mb-16 max-w-[660px] pt-3 border-t border-border">
                  <span className="font-semibold text-ink">Insight: </span>Cancellation risk spiked in the first 60 sec after driver assignment — before the customer saw any movement.
                </p>
              </Reveal>

              {/* — Key quotes — */}
              <Reveal>
                <h3 className="font-sans text-[clamp(1.1rem,1.8vw,1.5rem)] font-bold tracking-[-0.03em] mb-2 text-ink">
                  What drivers and riders told us.
                </h3>
                <p className="text-[14px] font-light text-ink-muted mb-8">We collaborated with research to gather driver and customer voices.</p>
              </Reveal>

              <div className="space-y-5 mb-6">
                {[
                  { quote: "If they don't reply to my first message I know they're going to cancel. I always message first now, early, before they have a chance to worry.", role: 'Driver' },
                  { quote: "If the driver is far I just cancel and rebook. Usually you get someone better the second time.", role: 'Rider' },
                  { quote: "The first minute is the dangerous one. After that they can see me moving and they relax. But in that first minute they can't see anything.", role: 'Driver' },
                ].map(({ quote, role }, i) => (
                  <Reveal key={i} delay={i * 0.07}>
                    <div className="flex gap-4 items-start">
                      <span className="text-[10px] tracking-[0.1em] uppercase font-bold text-ink mt-1 w-[44px] shrink-0">{role}</span>
                      <p className="text-[15px] font-light leading-[1.8] text-ink-soft border-l border-border pl-5 italic">"{quote}"</p>
                    </div>
                  </Reveal>
                ))}
              </div>

            </div>
          </section>

          {/* ── 4. ARCHETYPES ────────────────────────────────────────── */}
          <section id="sec-archetypes" className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="03" label="Archetypes" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-5 text-ink max-w-[600px]">
                  Not one problem. Three fundamentally different users.
                </h2>
              </Reveal>

              <Reveal delay={0.04}>
                <p className="text-[16px] font-light leading-[1.85] text-ink-soft max-w-[660px] mb-12">
                  Cancellation reason data allowed segmentation into three psychologically distinct archetypes — each requiring a fundamentally different design response. This framing became the shared language across product, engineering, and data discussions.
                </p>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
                {[
                  {
                    num: '01',
                    name: 'Driver not moving',
                    signal: '"Driver too far" · "Not moving"',
                    pct: '~20% of CADF',
                    insight: 'Does not want to cancel — wants to feel safe waiting. Needs reassurance, progress signals, and context.',
                  },
                  {
                    num: '02',
                    name: 'Waited too long',
                    signal: '"Waited too long"',
                    pct: '19.1% of CADF reasons',
                    insight: 'Has already passed their tolerance threshold. Needs earlier intervention — not friction after frustration peaks.',
                  },
                  {
                    num: '03',
                    name: 'Cancel and rebook',
                    signal: 'Cancels within first 60 sec',
                    pct: 'Serial re-booker pattern',
                    insight: 'Believes cancelling and restarting yields a faster driver. This is a perception problem — not an ETA problem.',
                  },
                ].map(({ num, name, signal, pct, insight }) => (
                  <Reveal key={num} delay={parseInt(num) * 0.07}>
                    <div className="border border-border p-6 space-y-3 h-full">
                      <p className="text-[10px] tracking-[0.1em] uppercase text-ink-muted font-medium">Pattern {num}</p>
                      <h4 className="font-sans text-[15px] font-semibold text-ink leading-[1.3]">{name}</h4>
                      <p className="text-[12px] font-medium text-accent">{pct}</p>
                      <p className="text-[11px] font-light text-ink-muted leading-[1.6]">{signal}</p>
                      <p className="text-[13px] font-light leading-[1.7] text-ink-soft">{insight}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

            </div>
          </section>

          {/* ── 5. DESIGN / TOUCHPOINTS ──────────────────────────────── */}
          <section id="sec-design" className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="04" label="Design" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-5 text-ink max-w-[600px]">
                  A coordinated system across four touchpoints.
                </h2>
              </Reveal>

              <Reveal delay={0.04}>
                <p className="text-[16px] font-light leading-[1.85] text-ink-soft max-w-[660px] mb-10">
                  The intervention was not a single screen redesign. It was a communication system spanning four distinct moments in the post-driver-assignment journey — each carrying a specific job tied to a specific archetype's anxiety.
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <blockquote className="pl-6 border-l-2 border-accent text-[15px] font-light leading-[1.8] text-ink-soft italic max-w-[600px] mb-12">
                  <p>Every touchpoint in the waiting experience should reduce uncertainty, not merely acknowledge it.</p>
                </blockquote>
              </Reveal>

              <div className="space-y-0 mb-12">
                {[
                  {
                    num: '01',
                    title: 'Push Notification',
                    broken: 'Static template regardless of driver distance, demand, or cold-start state.',
                    opportunity: 'Three dynamic PN themes — Urgency, Quality, Reliability — selected by ML dispatch signals.',
                  },
                  {
                    num: '02',
                    title: 'OTW Screen — Green Banner',
                    broken: "Static ETA and driver details. No context for why ETA was high or driver wasn't moving.",
                    opportunity: 'Dynamic contextual signals: traffic, cold-start state, or driver quality — triggered only when relevant.',
                  },
                  {
                    num: '03',
                    title: 'Chat Layer & 3PM Messaging',
                    broken: 'Chat buried two taps deep. No proactive communication from system during the wait.',
                    opportunity: 'System-initiated nudge after threshold. One-tap auto-populated message reduces anxiety on both sides simultaneously.',
                  },
                  {
                    num: '04',
                    title: 'Cancellation Friction',
                    broken: 'Selecting a reason immediately triggered cancellation — no confirmation, no context, no reconsideration.',
                    opportunity: 'Segmented friction personalised by cancellation timing and behaviour pattern. Different response for each archetype.',
                  },
                ].map(({ num, title, broken, opportunity }, i) => (
                  <Reveal key={num} delay={i * 0.06}>
                    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_1fr] gap-5 py-7 border-t border-border">
                      <div>
                        <p className="text-[10px] tracking-[0.1em] uppercase text-ink-muted font-medium mb-1">Touchpoint {num}</p>
                        <p className="text-[14px] font-semibold text-ink">{title}</p>
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.1em] uppercase text-ink-muted/60 font-medium mb-2">What was broken</p>
                        <p className="text-[13px] font-light leading-[1.7] text-ink-soft">{broken}</p>
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.1em] uppercase text-ink-muted/60 font-medium mb-2">The intervention</p>
                        <p className="text-[13px] font-light leading-[1.7] text-ink-soft">{opportunity}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
                <div className="border-t border-border" />
              </div>

              <Reveal delay={0.04}>
                <div className="mb-4"><img src="/images/cadf/CADF_Touchpoints.png" alt="Four touchpoints — system overview" className="w-full h-auto block" /></div>
              </Reveal>
            </div>
          </section>

          {/* ── 6. EXPERIMENTS ───────────────────────────────────────── */}
          <section id="sec-experiments" className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="05" label="Experiments" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-5 text-ink max-w-[600px]">
                  Testing in layers, not as a bundle.
                </h2>
              </Reveal>

              <Reveal delay={0.04}>
                <p className="text-[16px] font-light leading-[1.85] text-ink-soft max-w-[660px] mb-16">
                  Each touchpoint was designed to be testable in isolation — so metric movement could be attributed to specific interventions rather than a bundled release.
                </p>
              </Reveal>

              {/* Experiment 01 */}
              <Reveal>
                <div className="mb-16 pt-8 border-t border-border">
                  <p className="text-[10px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-2">Experiment 01</p>
                  <h3 className="font-sans text-[clamp(1.2rem,2vw,1.8rem)] font-bold tracking-[-0.03em] mb-8 text-ink">Push Notification</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-medium mb-3">Hypothesis</p>
                      <p className="text-[14px] font-light leading-[1.75] text-ink-soft">Dynamic, ML-triggered PN themes will reduce cold-start anxiety and early CADF events in the first 120 seconds of driver assignment.</p>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-medium mb-2">Control</p>
                        <p className="text-[13px] font-light leading-[1.7] text-ink-soft">Static PN template — same message regardless of driver distance, demand, or cold-start state.</p>
                      </div>
                      <div>
                        <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-medium mb-2">Treatment Variants</p>
                        <p className="text-[13px] font-light leading-[1.7] text-ink-soft"><span className="font-medium text-ink">Urgency</span> — confirms pickup is happening. <span className="font-medium text-ink">Quality</span> — leads with driver trust signals. <span className="font-medium text-ink">Reliability</span> — cold-start: explains delay, invites action.</p>
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 border border-border px-3 py-2 mb-8">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-medium text-accent">Primary Metric</span>
                    <span className="text-[12px] font-light text-ink-soft">Chat open rate in first 60 sec after assignment</span>
                  </div>
                  <div className="mb-8"><Img label="Push notification — control vs variants (Urgency / Quality / Reliability)" /></div>
                  <div className="flex items-start gap-3 p-4 bg-ink/[0.025] border border-border">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-semibold text-ink mt-0.5 shrink-0">Result</span>
                    <p className="text-[13px] font-light leading-[1.7] text-ink-soft">Chat open rate remained low in the first two weeks, suggesting PN alone wasn't enough to drive engagement. Reassurance without friction does not convert the Rational Re-booker.</p>
                  </div>
                </div>
              </Reveal>

              {/* Experiment 02 */}
              <Reveal>
                <div className="mb-16 pt-8 border-t border-border">
                  <p className="text-[10px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-2">Experiment 02</p>
                  <h3 className="font-sans text-[clamp(1.2rem,2vw,1.8rem)] font-bold tracking-[-0.03em] mb-8 text-ink">Chat Entry Point</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-medium mb-3">Hypothesis</p>
                      <p className="text-[14px] font-light leading-[1.75] text-ink-soft">Surfacing real-time contextual signals on the OTW screen will reduce "driver not moving" and "driver too far" as a share of CADF reasons.</p>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-medium mb-2">Control</p>
                        <p className="text-[13px] font-light leading-[1.7] text-ink-soft">No preemptive nudge for customer to reply to driver within first 60 sec.</p>
                      </div>
                      <div>
                        <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-medium mb-2">Treatment</p>
                        <p className="text-[13px] font-light leading-[1.7] text-ink-soft">Full-width prompt surfaced only when user signals cancel intent — high ETA or prior cancellation history detected.</p>
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 border border-border px-3 py-2 mb-8">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-medium text-accent">Primary Metric</span>
                    <span className="text-[12px] font-light text-ink-soft">Chat open rate in first 60 sec</span>
                  </div>
                  <div className="mb-8"><Img label="Chat entry point — control vs treatment" /></div>
                  <div className="flex items-start gap-3 p-4 bg-ink/[0.025] border border-border">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-semibold text-ink mt-0.5 shrink-0">Result</span>
                    <p className="text-[13px] font-light leading-[1.7] text-ink-soft">Chat open rate remained low. Confirmed: individual touchpoints were directionally positive but statistically inconclusive in isolation. The system had to work as a whole.</p>
                  </div>
                </div>
              </Reveal>

              {/* Experiment 03 */}
              <Reveal>
                <div className="pt-8 border-t border-border">
                  <p className="text-[10px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-2">Experiment 03</p>
                  <h3 className="font-sans text-[clamp(1.2rem,2vw,1.8rem)] font-bold tracking-[-0.03em] mb-8 text-ink">Dynamic Green Banner + Cancellation Friction</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-medium mb-3">Hypothesis</p>
                      <p className="text-[14px] font-light leading-[1.75] text-ink-soft">Combining contextual banner signals with segmented cancellation friction — personalised to archetype — will convert a meaningful share of about-to-cancel users into waiters.</p>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-medium mb-2">Control</p>
                        <p className="text-[13px] font-light leading-[1.7] text-ink-soft">Fixed ETA, no contextual communication. Selecting any cancellation reason immediately triggered cancellation.</p>
                      </div>
                      <div>
                        <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-medium mb-2">Variant 1 — Dynamic States</p>
                        <p className="text-[13px] font-light leading-[1.7] text-ink-soft">Banner surfaces system context: nearest driver search, cold-start state, driver quality — gives users the perception that the system is actively working.</p>
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 border border-border px-3 py-2 mb-8">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-medium text-accent">Primary Metric</span>
                    <span className="text-[12px] font-light text-ink-soft">Cancellation reasons "Driver is too far" and "I've waited too long" as share of CADF</span>
                  </div>
                  <div className="mb-10"><Img label="Dynamic green banner — control vs variant 1 (dynamic states)" /></div>

                  <div className="space-y-5 text-[15px] font-light leading-[1.75] text-ink-soft max-w-[660px] mb-10">
                    <p><span className="font-semibold text-ink">Variant 2 — Cancellation Friction (Rational Re-booker):</span> Friction copy challenges the core assumption: "Cancelling won't guarantee a faster driver — your current driver is already on their way." Primary CTA: Keep my driver.</p>
                    <p><span className="font-semibold text-ink">Variant 3 — Emotional Appeal (Frustrated Waiter):</span> Driver photo + personalised message. "I'm on my way and arriving shortly. Please hold on — ETA is 5 mins." Adds a human face to the wait before the user decides.</p>
                    <p><span className="font-semibold text-ink">Variant 4 — Repeat Canceller:</span> Reinforces that frequent cancellations may increase wait time. Offers GoCar Prioritas as an alternative for users in a hurry.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <Img label="Cancellation friction — rational re-booker variant" portrait />
                    <Img label="Cancellation friction — emotional appeal (frustrated waiter)" portrait />
                  </div>
                  <div className="mb-10"><Img label="Cancellation friction — repeat canceller / Prioritas upsell" /></div>

                  <div className="flex items-start gap-3 p-4 bg-ink/[0.025] border border-border">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-semibold text-ink mt-0.5 shrink-0">Result</span>
                    <p className="text-[13px] font-light leading-[1.7] text-ink-soft">Cancellation reasons dropped significantly across friction variants. Dynamic banner alone produced ~2–3% reduction. Full system — banner + segmented friction — produced the meaningful movement. The archetypes had to be treated differently; a single friction pattern across all three would not have worked.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── 7. IMPACT ────────────────────────────────────────────── */}
          <section id="sec-impact" className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="06" label="Impact" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-12 text-ink">
                  What the numbers said.
                </h2>
              </Reveal>

              <div className="mb-8">
                {[
                  {
                    val: '25% → 16%',
                    head: 'CADF Rate in Bali',
                    body: 'Nine percentage points off a rate that had been stable at 25%. The communication system — working as a whole — moved a metric that individual experiments could not shift in isolation.',
                  },
                  {
                    val: '~74%',
                    head: '4W Reliability (BCR) improved',
                    body: 'Booking Completion Rate improved from a 65% baseline. Fewer cancellations meant more completed rides — and more earnings per hour for drivers.',
                  },
                  {
                    val: '20%',
                    head: 'Nationwide CADF — unchanged',
                    body: 'The intervention was scoped to Bali as a market-specific pilot. The national number held at 20%. The measurement framework was handed to the inheriting team to scale.',
                  },
                ].map(({ val, head, body }, i) => (
                  <Reveal key={val} delay={i * 0.07}>
                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-5 md:gap-10 py-8 border-t border-border">
                      <div className="font-sans text-[clamp(20px,2.8vw,36px)] font-bold tracking-[-0.04em] leading-none text-ink">{val}</div>
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
                  Bali market, Phase 1. Post-ship instrumentation was not fully in place within the project tenure to capture clean cohort-level attribution. Numbers are directional.
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mb-4"><Img label="Early impact — Bali CADF reduction" /></div>
              </Reveal>
            </div>
          </section>

          {/* ── 8. REFLECTION ────────────────────────────────────────── */}
          <section id="sec-reflection" className="py-24 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="07" label="Reflection" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-12 text-ink">
                  What I'd do differently.
                </h2>
              </Reveal>

              <div className="max-w-[680px] space-y-6 text-[17px] font-light leading-[1.9] text-ink-soft mb-16">
                <Reveal><p>Instrument before you design. The measurement framework should have been scoped in Week 1 alongside the problem definition — not after the design was in development. The inability to attribute metric movement to individual touchpoints post-ship was a process failure, not a data failure.</p></Reveal>
                <Reveal delay={0.04}><p>Involve the ML team earlier. The discovery that the dispatch model was probabilistic — and that ETA was a distribution, not a point estimate — came mid-project. Had this been surfaced in discovery, the design direction would have shifted to progress signals from the start rather than arriving at it after a pivot.</p></Reveal>
                <Reveal delay={0.06}><p>Research the driver side. The cold-start problem and the driver's experience of customer anxiety were underexplored. A driver-side research sprint would have potentially unlocked a bidirectional communication design — something the final solution approached but never fully realised.</p></Reveal>
                <Reveal delay={0.08}><p>Prototype the failure state, not just the happy path. Most prototyping time was spent on the smooth scenario. More time should have been spent on the 12-minute ETA, peak demand, no-movement edge case — the conditions where the design was most likely to fail.</p></Reveal>
              </div>

              <Reveal delay={0.06}>
                <h3 className="font-sans text-[clamp(1.1rem,1.8vw,1.6rem)] font-bold tracking-[-0.03em] mb-7 text-ink">
                  What worked.
                </h3>
              </Reveal>

              <div className="max-w-[680px] space-y-6 text-[17px] font-light leading-[1.9] text-ink-soft">
                <Reveal><p><strong className="font-semibold text-ink">The archetype segmentation.</strong> Framing the problem through three distinct user archetypes gave the team a shared language that cut across product, engineering, and data discussions. It made disagreements about prioritisation resolvable.</p></Reveal>
                <Reveal delay={0.04}><p><strong className="font-semibold text-ink">The system framing.</strong> Insisting the solution be a coordinated touchpoint system rather than a single screen fix was the right call. The data confirmed it: individual touchpoints were directionally positive but statistically inconclusive in isolation.</p></Reveal>
                <Reveal delay={0.06}><p><strong className="font-semibold text-ink">Naming the ML constraint publicly.</strong> Rather than designing around the probabilistic ETA issue silently, surfacing it as a product design constraint in a cross-functional review changed how engineering communicated the system's limitations — and improved alignment across the team.</p></Reveal>
              </div>
            </div>
          </section>

          {/* ── Next project ─────────────────────────────────────────── */}
          <div className="px-10 md:px-16 w-full max-w-[800px] mx-auto">
            <Link
              to="/case-study/01"
              className="flex justify-between items-center group cursor-pointer py-14 border-t border-border"
            >
              <div>
                <p className="text-[10px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-2">Next Project</p>
                <p className="text-[18px] font-semibold text-ink group-hover:text-accent transition-colors">GoTransit Pre-Booking Experience →</p>
              </div>
            </Link>
          </div>

        </main>
      </div>
    </motion.div>
  );
}
