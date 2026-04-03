import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="bg-paper px-6 md:px-12 py-16 border-t border-border overflow-hidden">
      <div className="max-w-[1320px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-end">
          
          {/* Message Window */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            <div className="bg-paper-warm border border-border p-8 rounded-2xl relative z-10 overflow-hidden">
              {/* Decorative dots (Terminal style) */}
              <div className="flex gap-1.5 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-ink/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-ink/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-ink/10" />
              </div>
              
              <p className="font-serif text-[24px] md:text-[32px] leading-[1.2] text-ink italic tracking-tight mb-4">
                "Let's build something meaningful together."
              </p>
              <p className="text-[13px] text-ink-soft font-medium uppercase tracking-widest">
                — A note from Nadeem
              </p>
              
              {/* Abstract background shape */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-700" />
            </div>
            
            {/* Shadow/Offset effect */}
            <div className="absolute inset-0 border border-ink/5 rounded-2xl translate-x-3 translate-y-3 -z-0" />
          </motion.div>

          {/* Social & Info */}
          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink-muted">Connect</span>
                <div className="flex flex-col gap-2">
                  <a href="https://www.linkedin.com/in/hellonadeem/" target="_blank" className="text-[14px] font-medium text-ink-soft hover:text-accent transition-colors">LinkedIn</a>
                  <a href="https://instagram.com/nadeem.design" target="_blank" className="text-[14px] font-medium text-ink-soft hover:text-accent transition-colors">Instagram</a>
                  <a href="https://twitter.com/hellonadeeem" target="_blank" className="text-[14px] font-medium text-ink-soft hover:text-accent transition-colors">Twitter</a>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink-muted">Contact</span>
                <div className="flex flex-col gap-2">
                  <a href="mailto:md17nadeem@gmail.com" className="text-[14px] font-medium text-ink-soft hover:text-accent transition-colors">Email</a>
                  <span className="text-[14px] font-medium text-ink-soft">+62 81295928637</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink-muted">Location</span>
                <span className="text-[14px] font-medium text-ink-soft">Jakarta, Indonesia</span>
              </div>
            </div>

            <div className="pt-8 border-t border-border flex justify-between items-center">
              <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-bold">
                Nadeem©2025
              </p>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
