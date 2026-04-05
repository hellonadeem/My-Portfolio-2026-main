import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen relative bg-paper px-6 md:px-12 pt-[140px] pb-20 flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr_1.3fr] gap-12 lg:gap-[72px] items-center max-w-[1320px] mx-auto w-full">
        {/* Left: Headline + Footnote */}
        <div className="flex flex-col">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[clamp(36px,4.2vw,54px)] leading-[1.2] font-bold tracking-[-0.04em] text-ink max-w-[640px]"
          >
            <strong className="font-bold">Nadeem</strong> is a Product Designer who works at the intersection of systems, strategy, and craft.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[12px] text-ink-muted max-w-[360px] mt-6"
          >
            Based in Jakarta. Open to opportunities worldwide.
          </motion.p>
        </div>

        {/* Middle: Narrative */}
        <div className="flex flex-col gap-5">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[15px] leading-[1.9] text-ink-soft max-w-[420px]"
          >
            With 9+ years in product design, I work across superapp ecosystems, payments, and emerging technology, from early discovery through to launch.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="text-[15px] leading-[1.9] text-ink-soft max-w-[420px]"
          >
            At Gojek I work closely with product and engineering, shaping experiences that hold up commercially and for the people using them. Outside of work, I run, hike, and spend too much time finding the perfect flat white.
          </motion.p>
        </div>

        {/* Right: Portrait Image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative aspect-[3/4] w-full max-w-[480px] ml-auto overflow-hidden rounded-[6px] bg-ink group"
        >
          <img
            src="/images/IMG_1417.jpg"
            alt="Nadeem Portrait"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="absolute bottom-10 left-6 md:left-12 flex items-center gap-[10px] text-[11px] tracking-[0.1em] uppercase text-ink-muted"
      >
        <div className="w-10 h-px bg-ink-muted relative overflow-hidden">
          <motion.div
            animate={{ left: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 w-full h-full bg-ink"
          />
        </div>
        Selected work
      </motion.div>
    </section>
  );
}
