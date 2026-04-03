import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { projects, Section } from '../data/projects';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Markdown from 'react-markdown';

const RenderSection = ({ section }: { section: Section }) => {
  switch (section.type) {
    case 'text':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-[72px]"
        >
          {section.num && (
            <div className="flex items-center gap-3 text-[11px] tracking-[0.12em] uppercase text-ink-muted font-medium mb-6">
              <span className="block w-6 h-px bg-border" />
              <span>{section.num}</span>
            </div>
          )}
          {section.title && (
            <h2 className="font-sans text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-5 text-ink">
              {section.title.replace(/\*/g, '')}
            </h2>
          )}
          <div className="cs-prose max-w-none">
            <Markdown>{section.body}</Markdown>
          </div>
        </motion.div>
      );

    case 'metrics':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`grid gap-6 my-10 p-10 bg-paper-warm border border-border rounded-md mb-[72px] ${section.items.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}
        >
          {section.items.map((metric, i) => (
            <div key={i} className="text-center">
              <div className="font-sans text-[42px] font-bold tracking-[-0.04em] text-ink leading-none mb-2">
                {metric.value}
              </div>
              <div className="text-[12px] text-ink-muted leading-[1.5]">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>
      );

    case 'quote':
      return (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="my-12 px-10 py-10 border-l-[3px] border-accent bg-paper-warm mb-[72px]"
        >
          <blockquote className="font-serif text-[22px] leading-[1.5] text-ink italic mb-4">
            {section.text}
          </blockquote>
          <cite className="text-[12px] text-ink-muted tracking-[0.06em] not-italic">
            {section.cite}
          </cite>
        </motion.div>
      );

    case 'process':
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-[72px]">
          {section.items.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex flex-col"
            >
              <div className="font-sans text-[42px] font-bold text-ink/10 leading-none mb-4">
                {step.num}
              </div>
              <h4 className="font-sans text-[13px] font-semibold tracking-wider text-ink mb-2 uppercase">
                {step.title}
              </h4>
              <p className="text-[13px] leading-relaxed text-ink-soft font-light">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      );

    case 'image':
      return (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full my-10 overflow-hidden mb-[72px]"
        >
          {section.placeholder ? (
            <div className="w-full aspect-video flex flex-col items-center justify-center gap-3 text-ink-muted">
              <div className="w-8 h-8 border-2 border-dashed border-ink-muted/40 rounded flex items-center justify-center">
                <span className="text-[18px] opacity-40">+</span>
              </div>
              <span className="text-[11px] tracking-[0.1em] uppercase font-medium opacity-60">
                {section.caption || 'Image placeholder'}
              </span>
            </div>
          ) : (
            <img
              src={section.url}
              alt={section.caption || 'Project detail'}
              className="w-full h-auto block"
            />
          )}
        </motion.div>
      );

    case 'grid':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10 mb-[72px]">
          {section.images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-paper-warm border border-border rounded-md overflow-hidden"
            >
              <img
                src={img}
                alt={`Project image ${i + 1}`}
                className="w-full h-auto block"
                style={{ aspectRatio: '4/3', objectFit: 'cover' }}
              />
            </motion.div>
          ))}
        </div>
      );

    default:
      return null;
  }
};

export default function CaseStudy() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-paper flex flex-col items-center justify-center text-ink p-6">
        <h1 className="font-serif text-4xl mb-8">Project not found</h1>
        <Link to="/" className="text-accent border-b border-accent pb-1">Back to Home</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-paper text-ink min-h-screen"
    >
      <article className="max-w-[800px] mx-auto px-6 md:px-12 pt-36 pb-28">

        {/* Back link */}
        <Link
          to="/#work"
          className="inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.08em] uppercase text-ink-muted hover:text-ink transition-colors mb-16"
        >
          <ArrowLeft size={14} />
          All work
        </Link>

        {/* Eyebrow */}
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-accent mb-5">
          {project.tags[0]} · Gojek · {project.year}
        </p>

        {/* Title */}
        <h1 className="font-sans text-[clamp(38px,6vw,80px)] font-bold leading-[0.95] tracking-[-0.04em] text-ink mb-6">
          {project.name}{project.nameItalic}
        </h1>

        {/* Subtitle */}
        <p className="text-[18px] font-light leading-[1.7] text-ink-soft mb-14">
          {project.description}
        </p>

        {/* Meta row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-b border-border mb-20">
          <div>
            <div className="text-[10px] font-medium tracking-[0.1em] uppercase text-ink-muted mb-1.5">My Role</div>
            <div className="text-[14px] text-ink">{project.type}</div>
          </div>
          <div>
            <div className="text-[10px] font-medium tracking-[0.1em] uppercase text-ink-muted mb-1.5">Timeline</div>
            <div className="text-[14px] text-ink">{project.year}</div>
          </div>
          <div>
            <div className="text-[10px] font-medium tracking-[0.1em] uppercase text-ink-muted mb-1.5">Scope</div>
            <div className="text-[14px] text-ink">{project.scope}</div>
          </div>
          <div>
            <div className="text-[10px] font-medium tracking-[0.1em] uppercase text-ink-muted mb-1.5">Platform</div>
            <div className="text-[14px] text-ink">{project.platform}</div>
          </div>
        </div>

        {/* Sections */}
        {project.sections.map((section, index) => (
          <RenderSection key={index} section={section} />
        ))}

        {/* Next project */}
        <Link
          to={`/case-study/${project.nextProjectId}`}
          className="mt-24 pt-12 border-t border-border flex justify-between items-center group cursor-pointer"
        >
          <div>
            <div className="text-[11px] font-medium tracking-[0.12em] uppercase text-ink-muted mb-2">
              Next case study
            </div>
            <div className="font-sans text-[24px] font-bold tracking-[-0.03em] text-ink group-hover:text-accent transition-colors">
              {project.nextProjectName}
            </div>
          </div>
          <span className="text-[32px] text-ink-muted group-hover:translate-x-1.5 group-hover:text-accent transition-all duration-200">
            →
          </span>
        </Link>

      </article>

      {/* Footer */}
      <footer className="border-t border-border px-6 md:px-12 py-6">
        <div className="max-w-[800px] mx-auto flex items-center justify-between">
          <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-bold">Nadeem©2025</p>
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        </div>
      </footer>
    </motion.div>
  );
}
