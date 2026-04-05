import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview',  id: 'sec-overview'  },
  { label: 'Platform',  id: 'sec-platform'  },
  { label: 'Features',  id: 'sec-features'  },
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

const FEATURES = [
  {
    num: '01',
    name: 'Internet Calling',
    type: 'Connectivity',
    desc: 'In-app voice calls between drivers and customers, replacing phone number exposure with a privacy-preserving, data-based calling layer built directly into the order flow.',
  },
  {
    num: '02',
    name: 'Tipping',
    type: 'Gratitude & Retention',
    desc: 'A post-trip tipping flow that gave customers a frictionless way to reward drivers. Designed to fit naturally at the end of the order without adding unwanted pressure to the interaction.',
  },
  {
    num: '03',
    name: 'Auto Response Templates',
    type: 'Communication Speed',
    desc: 'Pre-set message templates for common driver-to-customer moments: arriving, running late, can\'t find location. Reduced typing friction for drivers and improved response times during active orders.',
  },
  {
    num: '04',
    name: 'Help Ticket',
    type: 'Support Integration',
    desc: 'Integrated in-app support ticket creation within the chat surface. Users could raise order issues without leaving the conversation context, reducing support handling time and duplicate contact volume.',
  },
];

export default function ChatCaseStudy() {
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
                {['Platform', 'Gojek', 'iOS · Android'].map((t) => (
                  <span key={t} className="text-[10px] tracking-[0.1em] uppercase border border-border px-2.5 py-1 rounded-full text-ink-muted">
                    {t}
                  </span>
                ))}
              </div>

              <h1 className="font-sans text-[clamp(28px,4.5vw,64px)] font-bold leading-[1.02] tracking-[-0.04em] text-ink max-w-[760px] mb-6">
                Driver to Customer Chat
              </h1>

              <p className="text-[14px] text-ink-soft font-light mb-14">
                Mohd Nadeem&nbsp;·&nbsp;Gojek&nbsp;·&nbsp;2021–2023
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
                <p className="text-[13px] text-ink font-light">Platform Design · Feature 0→1</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-ink-muted mb-1.5">Platform</p>
                <p className="text-[13px] text-ink font-light">iOS &amp; Android</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[0.1em] uppercase text-ink-muted mb-1.5">Timeline</p>
                <p className="text-[13px] text-ink font-light">2021 – 2023</p>
              </div>
            </div>
          </section>

          {/* ── PLATFORM ─────────────────────────────────────────────── */}
          <section id="sec-platform" className="pt-16 pb-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="01" label="Platform" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-10 text-ink max-w-[600px]">
                  One surface for every conversation between a driver and a customer.
                </h2>
              </Reveal>

              <div className="space-y-5 text-[16px] font-light leading-[1.85] text-ink-soft max-w-[660px]">
                <Reveal>
                  <p>Before GoChat, driver-to-customer communication was fragmented: phone calls that exposed personal numbers, no structured way to raise order issues, and no shared space where operational messages and support lived together.</p>
                </Reveal>
                <Reveal delay={0.04}>
                  <p>GoChat was built to consolidate all of it. A single in-app communication platform that handled order-related messaging, real-time coordination, and help, without pushing either party outside the Gojek ecosystem.</p>
                </Reveal>
                <Reveal delay={0.06}>
                  <p>For the business, the goal was twofold: improve the quality of order-related communication, and reduce the cost of support contact by resolving more issues inside the product before they reached an agent.</p>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ── FEATURES ─────────────────────────────────────────────── */}
          <section id="sec-features" className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="02" label="Features" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-10 text-ink max-w-[600px]">
                  Four features. Each a 0→1 design problem inside the platform.
                </h2>
              </Reveal>

              <div className="space-y-0">
                {FEATURES.map(({ num, name, type, desc }, i) => (
                  <Reveal key={num} delay={i * 0.06}>
                    <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-5 md:gap-10 py-8 border-t border-border">
                      <div>
                        <p className="text-[10px] tracking-[0.1em] uppercase text-ink-muted font-medium mb-1">{num}</p>
                        <p className="text-[12px] text-ink-muted font-light">{type}</p>
                      </div>
                      <div>
                        <h4 className="font-sans text-[15px] font-semibold text-ink mb-3">{name}</h4>
                        <p className="text-[14px] font-light text-ink-soft leading-[1.75]">{desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
                <div className="border-t border-border" />
              </div>
            </div>
          </section>

          {/* ── IMPACT ───────────────────────────────────────────────── */}
          <section id="sec-impact" className="py-20 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <SectionLabel num="03" label="Impact" />
                <h2 className="font-sans text-[clamp(1.4rem,2.6vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-5 text-ink max-w-[600px]">
                  Fewer support contacts. Better order communication.
                </h2>
              </Reveal>

              <Reveal delay={0.04}>
                <p className="text-[16px] font-light leading-[1.85] text-ink-soft max-w-[660px] mb-12">
                  GoChat's success was measured against two things: whether order-related communication improved (fewer failed pickups, faster driver-customer coordination) and whether bringing Help into the chat surface deflected inbound support volume. Both tracks ran simultaneously across a two-year design cycle.
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-7 border-y border-border mb-12">
                  {[
                    { val: '4+', label: 'Feature areas', sub: 'Calling · Tipping · Templates · Help' },
                    { val: '2yrs', label: 'Platform lifecycle', sub: '0→1 through scale' },
                    { val: '2-sided', label: 'Product', sub: 'Driver app + Customer app' },
                  ].map(({ val, label, sub }) => (
                    <div key={val}>
                      <div className="text-[clamp(20px,2.4vw,30px)] font-semibold tracking-[-0.03em] text-ink mb-1">{val}</div>
                      <div className="text-[12px] font-medium text-ink mb-0.5">{label}</div>
                      <div className="text-[11px] font-light text-ink-muted">{sub}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── WORK IN PROGRESS NOTE ────────────────────────────────── */}
          <section className="py-16 border-b border-border px-10 md:px-16">
            <div className="max-w-[800px] mx-auto">
              <Reveal>
                <div className="border-l-2 border-accent bg-accent/[0.04] p-8 md:p-10">
                  <p className="text-[10px] tracking-[0.12em] uppercase text-accent font-semibold mb-4">Individual feature case studies in progress</p>
                  <p className="text-[16px] font-light leading-[1.85] text-ink max-w-[580px] mb-5">
                    GoChat is a platform. Each feature (Internet Calling, Tipping, Auto Response, Help Ticket) has its own research, design decisions, and experiment results. The individual write-ups are being prepared separately.
                  </p>
                  <p className="text-[14px] font-light leading-[1.8] text-ink-soft max-w-[580px]">
                    Happy to walk through any of these in depth: the platform strategy, how the features were sequenced, and the trade-offs in designing for both the driver and customer sides simultaneously.
                  </p>
                </div>
              </Reveal>
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
