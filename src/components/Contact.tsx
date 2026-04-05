import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Coffee, Copy, Check } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'md17nadeem@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="bg-paper px-6 md:px-12 pt-16 pb-16 md:pt-20 md:pb-24 flex flex-col relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-12 md:mb-20">
          {/* Left Side: Title */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[clamp(48px,8vw,120px)] leading-[0.9] font-bold tracking-[-0.04em] text-ink"
            >
              Want to<br />reach out?
            </motion.h2>
          </div>

          {/* Right Side: Email + Copy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full max-w-md lg:ml-auto pt-4 lg:pt-12"
          >
            <p className="text-[11px] tracking-[0.2em] uppercase font-bold text-ink-muted mb-4">
              Email
            </p>
            <div className="flex items-center justify-between border-b-2 border-ink/20 pb-4 group">
              <a
                href={`mailto:${email}`}
                className="text-[18px] md:text-[22px] font-light text-ink hover:text-accent transition-colors"
              >
                {email}
              </a>
              <button
                onClick={handleCopy}
                className="ml-4 shrink-0 text-ink/30 hover:text-accent transition-colors"
                title="Copy email"
              >
                {copied
                  ? <Check className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  : <Copy className="w-5 h-5" strokeWidth={1.5} />
                }
              </button>
            </div>
            <p className="mt-3 text-[11px] tracking-[0.1em] uppercase text-ink-muted font-medium">
              {copied ? 'Copied to clipboard!' : 'Click the email or copy the address'}
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar: Info & Socials (Pinned to bottom) */}
        <div className="mt-8 md:mt-12 relative">
          <div className="flex items-center gap-8 md:gap-12">
            {/* Social Links */}
            <div className="flex gap-8 md:gap-12 shrink-0 items-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center h-4"
              >
                <a
                  href="https://www.linkedin.com/in/hellonadeem/"
                  target="_blank"
                  className="text-[11px] tracking-[0.2em] uppercase font-bold text-ink-soft hover:text-ink transition-colors leading-none"
                >
                  LinkedIn
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center h-4"
              >
                <Link
                  to="/resume"
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-[11px] tracking-[0.2em] uppercase font-bold text-ink-soft hover:text-ink transition-colors leading-none"
                >
                  Resume
                </Link>
              </motion.div>
            </div>

            {/* The Separator Line - Flexes to fill space between links and badge */}
            <div className="flex-1 h-[1px] bg-border/60" />

            {/* Rotating Badge Container with Padding */}
            <div className="pl-8 md:pl-12 shrink-0 relative w-32 md:w-48 lg:w-56 aspect-square">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                className="absolute inset-0 pointer-events-none"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                      />
                    </defs>
                    <text className="text-[9px] font-bold tracking-[0.25em] uppercase fill-ink/30">
                      <textPath xlinkHref="#circlePath" textLength="238">
                        Mohd Nadeem • Senior Product Designer • 
                      </textPath>
                    </text>
                  </svg>
                </motion.div>
                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Coffee className="w-8 h-8 text-accent fill-accent/10" strokeWidth={1.2} />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
