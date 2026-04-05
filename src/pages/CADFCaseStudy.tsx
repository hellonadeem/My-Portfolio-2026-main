import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview',    id: 'sec-overview'    },
  { label: 'Illuminate',  id: 'sec-research'    },
  { label: 'Key Insights', id: 'sec-archetypes'  },
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
      {num}. {label}
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

              <h1 className="font-sans text-[clamp(28px,4.5vw,64px)] font-bold leading-[1.02] tracking-[-0.04em] text-ink max-w-[760px] mb-3">
                Reduce Cancellation from 25% to 16% in Bali
              </h1>

              <h3 className="font-sans text-[clamp(14px,1.4vw,18px)] font-normal tracking-[-0.01em] text-ink-muted mb-14">
                Cancellation After Driver Found (CADF)
              </h3>
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
                <p className="text-[13px] text-ink font-light">4 Weeks · 2024–25</p>
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
                <Reveal><p>A CADF event isn't an abandoned search. It's a completed match that failed after the driver was already assigned. The driver has accepted, routing has begun, supply has been allocated. The cancellation wastes driver time, reduces their earnings-per-hour, and re-enters the customer into the queue, often at a higher ETA than before.</p></Reveal>
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
                  { label: 'Ownership', body: 'Led the project from problem definition to shipped solution.' },
                  { label: 'Data', body: 'Partnered with the data team to segment cancellation logs before any design work began.' },
                  { label: 'Engineering', body: 'Worked closely with ML and engineering to understand how the dispatch system works.' },
                  { label: 'Research', body: 'Collaborated with UX research to validate early hypotheses and anecdotal feedback.' },
                  { label: 'Writing', body: 'Worked closely with a UX writer throughout. This project was fundamentally about reassurance and communication.' },
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
                  <p>We started with cancellation reason data to understand what riders were selecting when they cancelled. The numbers pointed to patterns. We then ran qualitative research with riders and drivers to understand the anxiety behind each one.</p>
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
                <div className="mb-16 max-w-[660px]">
                  <div className="flex items-start gap-3 bg-accent/[0.06] border-l-2 border-accent px-4 py-3">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-semibold text-accent mt-0.5 shrink-0">Data Point</span>
                    <p className="text-[13px] font-light text-ink-soft leading-[1.7]">Cancellation risk spiked in the first 60 sec after driver assignment, before the customer saw any movement.</p>
                  </div>
                </div>
              </Reveal>

              {/* — Key quotes — */}
              <Reveal>
                <h3 className="font-sans text-[clamp(1.1rem,1.8vw,1.5rem)] font-bold tracking-[-0.03em] mb-2 text-ink">
                  What drivers and riders told us.
                </h3>
                <p className="text-[14px] font-light text-ink-muted mb-8">Qualitative inputs from rider and driver research sessions.</p>
              </Reveal>

              <div className="space-y-5 mb-10">
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

              <Reveal delay={0.08}>
                <p className="text-[14px] font-light leading-[1.75] text-ink-soft max-w-[660px] border-t border-border pt-6">
                  The quant told us <span className="font-semibold text-ink">what</span> users were doing. The qual told us <span className="font-semibold text-ink">why</span>. Together, they pointed to something the raw numbers alone couldn't show: these weren't the same user cancelling for the same reason.
                </p>
              </Reveal>

            </div>
          </section>

          {/* ── 4. ARCHETYPES ────────────────────────────────────────── */}
          <section id="sec-archetypes" className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="03" label="Key Insights" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-5 text-ink max-w-[600px]">
                  Not one problem. Three fundamentally different users.
                </h2>
              </Reveal>

              <Reveal delay={0.04}>
                <p className="text-[16px] font-light leading-[1.85] text-ink-soft max-w-[660px] mb-12">
                  Combining cancellation reason data with driver and rider voices, we identified three distinct behavioural patterns. Not variations of the same problem. Three different anxieties, each requiring a different design response.
                </p>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
                {[
                  {
                    num: '01',
                    name: 'Driver not moving',
                    signal: '"Driver too far" · "Not moving"',
                    pct: '~29% of CADF reasons',
                    insight: 'Does not want to cancel. Wants to feel safe waiting. Needs context, not just an ETA.',
                  },
                  {
                    num: '02',
                    name: 'Waited too long',
                    signal: '"Waited too long"',
                    pct: '25.1% of CADF reasons',
                    insight: 'Frustration has already peaked by the time they cancel. Needs earlier intervention, before they reach that point.',
                  },
                  {
                    num: '03',
                    name: 'Cancel and rebook',
                    signal: 'Cancels within first 60 sec',
                    pct: 'Serial re-booker pattern',
                    insight: 'Believes cancelling and restarting yields a faster driver. This is a perception problem, not an ETA problem.',
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
                  Three anxieties. Four touchpoints. One system.
                </h2>
              </Reveal>

              <Reveal delay={0.04}>
                <p className="text-[16px] font-light leading-[1.85] text-ink-soft max-w-[660px] mb-10">
                  A single screen fix wouldn't move the metric. The hypothesis was a coordinated system of four touchpoints, each mapped to a specific archetype and moment in the post-assignment journey. Individual experiments were directional. The system is what moved the number.
                </p>
              </Reveal>


              <div className="space-y-0 mb-12">
                {[
                  {
                    num: '01',
                    title: 'Push Notification',
                    broken: 'Static template regardless of driver distance, demand, or cold-start state.',
                    opportunity: 'Three dynamic PN themes (Urgency, Quality, Reliability) selected by ML dispatch signals.',
                  },
                  {
                    num: '02',
                    title: 'OTW Screen: Green Banner',
                    broken: "Static ETA and driver details. No context for why ETA was high or driver wasn't moving.",
                    opportunity: 'Dynamic contextual signals: traffic, cold-start state, or driver quality. Triggered only when relevant.',
                  },
                  {
                    num: '03',
                    title: 'Chat & Auto-Response Messaging',
                    broken: 'Chat buried two taps deep. No proactive outreach during the wait.',
                    opportunity: 'System-initiated nudge after a wait threshold. One-tap auto-populated message sent on behalf of the driver reduces anxiety on both sides.',
                  },
                  {
                    num: '04',
                    title: 'Cancellation Friction',
                    broken: 'Selecting a reason immediately triggered cancellation, with no confirmation, no context, no reconsideration.',
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
                        <p className="text-[10px] tracking-[0.1em] uppercase text-ink-muted/60 font-medium mb-2">Hypothesis</p>
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
                  Each experiment built on the last.
                </h2>
              </Reveal>

              <Reveal delay={0.04}>
                <p className="text-[16px] font-light leading-[1.85] text-ink-soft max-w-[660px] mb-16">
                  Touchpoints were tested sequentially. Each one was directional on its own. Combined as a system, they produced the metric movement that no single experiment could achieve in isolation.
                </p>
              </Reveal>

              {/* Experiment 01 */}
              <Reveal>
                <div className="mb-16 pt-8 border-t border-border">
                  <p className="text-[10px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-2">Experiment 01</p>
                  <h3 className="font-sans text-[clamp(1.2rem,2vw,1.8rem)] font-bold tracking-[-0.03em] mb-4 text-ink">Push Notification</h3>
                  <p className="text-[14px] font-light leading-[1.75] text-ink-soft max-w-[600px] mb-6">An ML-triggered PN with context-aware copy will reduce cold-start anxiety in the first 120 seconds after driver assignment.</p>
                  <div className="inline-flex items-center gap-2 border border-border px-3 py-2 mb-8">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-medium text-accent">Primary Metric</span>
                    <span className="text-[12px] font-light text-ink-soft">Chat open rate in first 60 sec after assignment</span>
                  </div>
                  <div className="mb-8"><img src="/images/transit/PNs.png" alt="Push notification — control vs variants (Urgency / Quality / Reliability)" className="w-full h-auto block" /></div>
                  <div className="flex items-start gap-3 p-4 bg-ink/[0.025] border border-border">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-semibold text-ink mt-0.5 shrink-0">Result</span>
                    <p className="text-[13px] font-light leading-[1.7] text-ink-soft">Chat open rate didn't move in the first two weeks. PN alone wasn't enough. Reassurance at assignment doesn't hold a user who's already decided to cancel.</p>
                  </div>
                </div>
              </Reveal>

              {/* Experiment 02 */}
              <Reveal>
                <div className="mb-16 pt-8 border-t border-border">
                  <p className="text-[10px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-2">Experiment 02</p>
                  <h3 className="font-sans text-[clamp(1.2rem,2vw,1.8rem)] font-bold tracking-[-0.03em] mb-4 text-ink">Chat Entry Point</h3>
                  <p className="text-[14px] font-light leading-[1.75] text-ink-soft max-w-[600px] mb-6">A contextual chat nudge on the OTW screen will reduce "driver not moving" and "driver too far" as a share of CADF reasons.</p>
                  <div className="inline-flex items-center gap-2 border border-border px-3 py-2 mb-8">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-medium text-accent">Primary Metric</span>
                    <span className="text-[12px] font-light text-ink-soft">Chat open rate in first 60 sec</span>
                  </div>
                  <div className="mb-8"><img src="/images/transit/Chat_EntryPoint.png" alt="Chat entry point — control vs treatment" className="w-full h-auto block" /></div>
                  <div className="flex items-start gap-3 p-4 bg-ink/[0.025] border border-border">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-semibold text-ink mt-0.5 shrink-0">Result</span>
                    <p className="text-[13px] font-light leading-[1.7] text-ink-soft">Inconclusive in isolation. Directionally positive, contributing ~1–2pp to the overall reduction when the full system ran together. Confirmed that single touchpoints couldn't move the metric alone.</p>
                  </div>
                </div>
              </Reveal>

              {/* Experiment 03 */}
              <Reveal>
                <div className="mb-16 pt-8 border-t border-border">
                  <p className="text-[10px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-2">Experiment 03</p>
                  <h3 className="font-sans text-[clamp(1.2rem,2vw,1.8rem)] font-bold tracking-[-0.03em] mb-4 text-ink">Dynamic Green Banner</h3>
                  <p className="text-[14px] font-light leading-[1.75] text-ink-soft max-w-[600px] mb-6">Surfacing the driver's first order of the day, paired with a preemptive chat nudge, will give users a reason to wait rather than cancel.</p>
                  <div className="inline-flex items-center gap-2 border border-border px-3 py-2 mb-8">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-medium text-accent">Primary Metric</span>
                    <span className="text-[12px] font-light text-ink-soft">"Driver is too far" and "I've waited too long" as share of CADF</span>
                  </div>
                  <div className="mb-10"><img src="/images/transit/Dynamic_Banner_FU.png" alt="Dynamic green banner — control vs treatment" className="w-full h-auto block" /></div>
                  <div className="flex items-start gap-3 p-4 bg-ink/[0.025] border border-border">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-semibold text-ink mt-0.5 shrink-0">Result</span>
                    <p className="text-[13px] font-light leading-[1.7] text-ink-soft">~2–3pp reduction in CADF. The first-booking signal and preemptive chat together reduced early cancellations before anxiety built, but the use case is narrow. Not every trip qualifies.</p>
                  </div>
                </div>
              </Reveal>

              {/* Experiment 04 */}
              <Reveal>
                <div className="pt-8 border-t border-border">
                  <p className="text-[10px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-2">Experiment 04</p>
                  <h3 className="font-sans text-[clamp(1.2rem,2vw,1.8rem)] font-bold tracking-[-0.03em] mb-4 text-ink">Dynamic Banner: Surfacing the ML Logic</h3>
                  <p className="text-[14px] font-light leading-[1.75] text-ink-soft max-w-[600px] mb-6">Making the driver allocation ML logic visible during high-ETA waits will dilute the belief that cancelling and rebooking surfaces a faster driver.</p>
                  <div className="inline-flex items-center gap-2 border border-border px-3 py-2 mb-8">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-medium text-accent">Primary Metric</span>
                    <span className="text-[12px] font-light text-ink-soft">"Driver is too far" and "I've waited too long" as share of CADF</span>
                  </div>
                  <div className="mb-8"><img src="/images/transit/ML_Logic.png" alt="Dynamic banner — ML state variants (searching / on the way / closer driver found)" className="w-full h-auto block" /></div>
                  <div className="flex items-start gap-3 p-4 bg-ink/[0.025] border border-border">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-semibold text-ink mt-0.5 shrink-0">Result</span>
                    <p className="text-[13px] font-light leading-[1.7] text-ink-soft">"Driver too far" and "waited too long" dropped as a share of CADF, contributing approximately 3pp of the 9pp total reduction. Users who could see the system finding a closer driver were less likely to cancel and rebook.</p>
                  </div>
                </div>
              </Reveal>

              {/* Experiment 05 */}
              <Reveal>
                <div className="mt-16 pt-8 border-t border-border">
                  <p className="text-[10px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-2">Experiment 05</p>
                  <h3 className="font-sans text-[clamp(1.2rem,2vw,1.8rem)] font-bold tracking-[-0.03em] mb-4 text-ink">Cancellation Friction</h3>
                  <p className="text-[14px] font-light leading-[1.75] text-ink-soft max-w-[600px] mb-8">Friction at the point of cancellation, personalised to the user's situation, will reduce completed cancellations.</p>

                  <div className="space-y-6 mb-8">
                    <div className="p-5 border border-border">
                      <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-medium mb-2">Variant A · Repeat Canceller</p>
                      <p className="text-[13px] font-light leading-[1.7] text-ink-soft">Triggered on repeat cancellations. Adds a brief pause showing that frequent reorders extend wait time, then surfaces GoCar Prioritas as a faster alternative. Friction with a way out, not a block.</p>
                    </div>
                    <div className="p-5 border border-border">
                      <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-medium mb-2">Variant B · Driver Already OTW</p>
                      <p className="text-[13px] font-light leading-[1.7] text-ink-soft">Triggered when the driver has already covered significant distance. Surfaces their photo and live ETA, giving the user a reason to reconsider. Makes the driver's effort visible at the moment of decision.</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-8">
                    <div className="inline-flex items-center gap-2 border border-border px-3 py-2">
                      <span className="text-[10px] tracking-[0.1em] uppercase font-medium text-accent">Variant A Metric</span>
                      <span className="text-[12px] font-light text-ink-soft">Cancellation screen abandonment rate + concurrent booking rate</span>
                    </div>
                    <div className="inline-flex items-center gap-2 border border-border px-3 py-2">
                      <span className="text-[10px] tracking-[0.1em] uppercase font-medium text-accent">Variant B Metric</span>
                      <span className="text-[12px] font-light text-ink-soft">"I've waited too long" as share of CADF</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <img src="/images/transit/cancel_friction.png" alt="Cancellation friction — Variant A and Variant B" className="w-full h-auto block" />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-ink/[0.025] border border-border">
                    <span className="text-[10px] tracking-[0.1em] uppercase font-semibold text-ink mt-0.5 shrink-0">Result</span>
                    <p className="text-[13px] font-light leading-[1.7] text-ink-soft">Contributed ~2-3pp of the 9pp total reduction. Variant A increased cancellation screen abandonment and reduced concurrent rebooking. Variant B reduced "I've waited too long" as a share of CADF.</p>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border mb-8">
                {[
                  {
                    from: '25%', to: '16%',
                    head: 'CADF Rate in Bali',
                    body: '9pp reduction off a rate that had plateaued. Achieved across five sequential experiments in the Bali market pilot.',
                  },
                  {
                    from: '65%', to: '74%',
                    head: 'Booking Completion Rate (4W)',
                    body: 'BCR had been trending down before the intervention. Reducing post-match cancellations pushed it back up.',
                  },
                ].map(({ from, to, head, body }, i) => (
                  <Reveal key={head} delay={i * 0.07}>
                    <div className="p-8 bg-paper flex flex-col gap-5">
                      <div className="flex items-end gap-3">
                        <span className="font-sans text-[clamp(28px,3.5vw,48px)] font-bold tracking-[-0.04em] leading-none text-ink-muted/40">{from}</span>
                        <span className="text-[18px] text-ink-muted/30 mb-1">→</span>
                        <span className="font-sans text-[clamp(28px,3.5vw,48px)] font-bold tracking-[-0.04em] leading-none text-ink">{to}</span>
                      </div>
                      <div>
                        <h4 className="font-sans text-[13px] font-semibold text-ink mb-1.5">{head}</h4>
                        <p className="text-[13px] font-light text-ink-soft leading-[1.7]">{body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1}>
                <p className="text-[11px] font-light text-ink-muted italic max-w-[600px] border-t border-border pt-5">
                  Bali market pilot. Post-ship instrumentation was not fully in place to capture clean cohort-level attribution. Numbers are directional.
                </p>
              </Reveal>

            </div>
          </section>

          {/* ── 8. REFLECTION ────────────────────────────────────────── */}
          <section id="sec-reflection" className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="07" label="Reflection" />
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                <div>
                  <Reveal>
                    <h3 className="font-sans text-[clamp(1.1rem,1.8vw,1.5rem)] font-bold tracking-[-0.03em] mb-5 text-ink">What worked</h3>
                    <div className="space-y-4">
                      <Reveal><p className="text-[13px] font-light leading-[1.75] text-ink-soft"><strong className="font-semibold text-ink">Archetype segmentation.</strong> Framing three distinct user patterns gave the team a common reference point. It made prioritisation conversations between product, engineering, and data much easier to resolve.</p></Reveal>
                      <Reveal delay={0.04}><p className="text-[13px] font-light leading-[1.75] text-ink-soft"><strong className="font-semibold text-ink">System framing.</strong> Treating the solution as a coordinated set of touchpoints, not a single screen fix, was the right call. The 9pp reduction came from the system working together, not any one experiment.</p></Reveal>
                    </div>
                  </Reveal>
                </div>

                <div>
                  <Reveal>
                    <h3 className="font-sans text-[clamp(1.1rem,1.8vw,1.5rem)] font-bold tracking-[-0.03em] mb-5 text-ink">What could be better</h3>
                    <div className="space-y-4">
                      <Reveal><p className="text-[13px] font-light leading-[1.75] text-ink-soft"><strong className="font-semibold text-ink">Cold start problem.</strong> The chat entry point experiment didn't conclude strongly. New users with no ride history had no prior context to trust the channel. That cold start problem wasn't scoped before the experiment ran.</p></Reveal>
                      <Reveal delay={0.04}><p className="text-[13px] font-light leading-[1.75] text-ink-soft"><strong className="font-semibold text-ink">Driver-side research.</strong> The driver's experience of customer anxiety was underexplored. More research on the driver side could have shaped a two-way communication design the final solution hinted at but didn't fully get to.</p></Reveal>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

          {/* ── Next project ─────────────────────────────────────────── */}
          <div className="px-10 md:px-16 w-full max-w-[800px] mx-auto">
            <Link
              to="/case-study/03"
              className="flex justify-between items-center group cursor-pointer py-14 border-t border-border"
            >
              <div>
                <p className="text-[10px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-2">Next Project</p>
                <p className="text-[18px] font-semibold text-ink group-hover:text-accent transition-colors">Snippets: Gojek's Stories →</p>
              </div>
            </Link>
          </div>

        </main>
      </div>
    </motion.div>
  );
}
