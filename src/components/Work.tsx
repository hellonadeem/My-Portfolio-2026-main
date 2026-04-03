import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';

const TABS = [
  { key: 'gojek', label: 'Gojek' },
  { key: 'other', label: 'Other Projects' },
] as const;

type TabKey = typeof TABS[number]['key'];

export default function Work() {
  const [activeTab, setActiveTab] = useState<TabKey>('gojek');

  const filtered = projects;

  return (
    <section id="work" className="bg-paper px-6 md:px-12 pt-16 pb-0">
      <div className="max-w-[1100px] mx-auto w-full">

        {/* Tab bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-4 py-2 text-[12px] tracking-[0.06em] uppercase font-medium rounded-full transition-colors duration-200 ${
                  activeTab === tab.key
                    ? 'bg-ink text-paper'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <span className="text-[11px] tracking-[0.12em] uppercase text-ink-muted font-medium">
            {projects.length} projects
          </span>
        </div>

        {/* Project list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
                className="border-t border-border last:border-b"
              >
                <Link
                  to={`/case-study/${project.id}`}
                  className="group flex items-stretch h-[280px] px-4 transition-colors duration-300 hover:bg-paper-warm"
                >
                  {/* Number */}
                  <span className="hidden md:block text-[12px] text-ink-muted font-medium tracking-wider w-10 shrink-0 self-center">
                    {project.id}
                  </span>

                  {/* Content: tags → title → description */}
                  <div className="flex flex-col justify-center gap-3 flex-1 py-6 pr-8">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] tracking-[0.08em] uppercase border border-border px-2.5 py-1 rounded-full text-ink-muted transition-colors duration-300 group-hover:border-ink/30 group-hover:text-ink"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-sans text-[26px] md:text-[32px] font-bold tracking-[-0.03em] leading-[1.1] text-ink group-hover:text-accent transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="text-[13px] font-light text-ink-soft leading-relaxed max-w-[400px]">
                      {project.description}
                    </p>
                  </div>

                  {/* Thumbnail — 2:1 landscape, py keeps it off the dividers */}
                  <div className="hidden md:block shrink-0 w-[400px] py-5 pr-2">
                    <div className="relative w-full h-full rounded-lg overflow-hidden bg-border/15">
                      {project.img ? (
                        <img
                          src={project.img}
                          alt={project.name}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-ink/5">
                          <span className="text-[11px] tracking-[0.15em] uppercase text-ink-muted/40 font-medium">
                            {project.name.split(' ')[0]}
                          </span>
                        </div>
                      )}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-paper/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                        <ArrowRight size={12} className="text-ink" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
