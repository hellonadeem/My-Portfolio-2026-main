import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { useRef, useEffect } from 'react';

export default function Resume() {
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownloadPDF = () => {
    const externalPdfUrl = "https://drive.google.com/file/d/1RQ5jjbnTbT0oKMjjhz71u5znuoRYlSiR/view?usp=sharing";
    window.open(externalPdfUrl, '_blank');
  };

  const experience = [
    {
      company: 'Gojek',
      role: 'Lead Product Designer [Mobility & Midtrans]',
      period: 'Jan 2024 - Present',
      points: [
        'Led product design for GoTransit, running experiments to improve multimodal booking flow.',
        'Drove bottoms-up design initiatives within Transport booking flows, including experiments to reduce cancellations and improve overall booking reliability.',
        'Partnered with PM and Engineering to structure problem statements, Design Roadmap and ship incremental improvements.',
        'Contributed to Midtrans design system strategy to improve consistency and delivery speed across product squads.'
      ]
    },
    {
      company: 'Gojek',
      role: 'Product Design Manager [Mobility & Platform]',
      period: 'Jan 2023 - Jan 2024',
      points: [
        'Managed a team of 3 designers (two L3s, one L2) while double-hatting as an IC designer, stepping into a role previously handled by an L5 Design Manager.',
        'Led design across the Caretech and Comms platform, partnering directly with 6 PMs and the Product Head to drive alignment, clarify problem spaces, and set design direction.',
        'Worked closely with the Engineering Head and multiple EMs to streamline delivery, improve collaboration, and ensure technical-design alignment.',
        'Established a strong planning and KR alignment process, improving cross-functional clarity and giving designers a stronger role in roadmap definition.',
        'Built individual growth plans for designers, mentored them through delivery cycles, and raised overall design quality and accountability.'
      ]
    },
    {
      company: 'Gojek',
      role: 'Product Designer [Platform]',
      period: 'July 2021 - Jan 2023',
      points: [
        'Led design across key Platform areas including Driver-to-Customer Chat, Identity, and Gojek Help.',
        'Partnered with PMs to run VOIP experiments that saved the business USD 1M in H1 across 77M driver-customer calls.',
        'Initiated Snippets onboarding experiments for GoFood, improving booking conversion by 2% for new users and 0.2% for existing users.',
        'Improved App Rating Widget (ARW) conversion from 23% → 40%, helping uplift app ratings to 4.5 on Android and 4.2 on iOS.',
        'Co-facilitated design workshops, bottoms-up OKR planning, and cross-team alignment sessions to bring structure to discovery.'
      ]
    },
    {
      company: 'Synup',
      role: 'Product Design Lead',
      period: 'Nov 2019 - June 2021',
      points: [
        'Worked closely with PMs and Tech-Leads to define and evolve product roadmaps.',
        'Drove entire product design process, from problem solving and user research, through to detailed UI and interaction design.',
        'Created frameworks and guidelines for the team to deliver better and faster.'
      ]
    },
    {
      company: 'PayU',
      role: 'Senior UX Designer',
      period: 'June 2018 - Oct 2019',
      points: [
        'Led design for merchant-facing fintech experiences including invoicing, onboarding flows, payment pages, and merchant dashboards.'
      ]
    },
    {
      company: 'Appster',
      role: 'UX Designer',
      period: 'Oct 2015 - May 2018',
      points: [
        'Designed 30+ mobile and web apps for global founders across industries.',
        'Led product discovery workshops to translate ideas into clear MVPs and scalable feature sets.',
        'Delivered complete design cycles from research and ideation to interaction design and prototypes on fast timelines.'
      ]
    }
  ];

  const skills = [
    'Design Strategy', 'Visual Design', 'User Research', 
    'Rapid Iteration', 'Design Systems', 'UX Analytics', 
    'Data-Informed Decision Making'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-paper min-h-screen text-ink selection:bg-accent selection:text-ink"
      ref={resumeRef}
    >

      <main className="max-w-[1100px] mx-auto px-6 md:px-12 pt-40 pb-32">
        {/* Header Section */}
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-sans text-[clamp(48px,8vw,100px)] font-bold tracking-[-0.05em] leading-[0.9] mb-8">
              Mohd Nadeem
            </h1>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div className="max-w-[600px]">
                <p className="text-[18px] md:text-[22px] leading-[1.6] text-ink-soft font-light">
                  A multi-disciplinary product designer with 9+ years of experience building and scaling digital products across startup and enterprise environments. Currently a Lead Product Designer at Gojek.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 no-print">
                <button 
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase font-bold text-accent border border-accent/20 px-6 py-3 rounded-full hover:bg-accent hover:text-ink transition-all duration-300"
                >
                  <Download size={14} />
                  Download PDF
                </button>
              </div>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-20">
          {/* Left Column: Experience */}
          <section>
            <h2 className="font-sans text-[12px] tracking-[0.25em] uppercase text-accent font-bold mb-12 border-b border-border pb-4">
              Experience
            </h2>
            <div className="space-y-16">
              {experience.map((job, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-4">
                    <h3 className="font-sans text-[20px] md:text-[24px] font-bold tracking-[-0.03em]">
                      {job.role}
                    </h3>
                    <span className="text-[13px] text-ink-muted font-medium whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>
                  <div className="text-[14px] tracking-[0.1em] uppercase font-bold text-ink-soft mb-6">
                    {job.company}
                  </div>
                  <ul className="space-y-4">
                    {job.points.map((point, j) => (
                      <li key={j} className="text-[15px] leading-[1.7] text-ink-soft/80 font-light flex gap-4">
                        <span className="text-accent mt-1.5">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Right Column: Skills, Education, Awards */}
          <aside className="space-y-20">
            {/* Skills */}
            <section>
              <h2 className="font-sans text-[12px] tracking-[0.25em] uppercase text-accent font-bold mb-8 border-b border-border pb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="text-[11px] tracking-[0.05em] font-medium bg-ink/5 px-3 py-1.5 rounded-md text-ink-soft">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="font-sans text-[12px] tracking-[0.25em] uppercase text-accent font-bold mb-8 border-b border-border pb-4">
                Education
              </h2>
              <div className="space-y-8">
                <div>
                  <h4 className="text-[14px] font-bold uppercase tracking-wider mb-1">Arena Animation</h4>
                  <p className="text-[13px] text-ink-soft">AAASP (Digital & Animation)</p>
                  <p className="text-[12px] text-ink-muted mt-1">2008 - 2011</p>
                </div>
                <div>
                  <h4 className="text-[14px] font-bold uppercase tracking-wider mb-1">Delhi University</h4>
                  <p className="text-[13px] text-ink-soft">Undergraduate Coursework</p>
                  <p className="text-[12px] text-ink-muted mt-1">2013 - 2015</p>
                </div>
              </div>
            </section>

            {/* Awards */}
            <section>
              <h2 className="font-sans text-[12px] tracking-[0.25em] uppercase text-accent font-bold mb-8 border-b border-border pb-4">
                Awards
              </h2>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[14px] font-bold uppercase tracking-wider mb-1">PayU Global Recognition</h4>
                  <p className="text-[13px] text-ink-soft">2 Thank You Awards by Global CEO</p>
                </div>
              </div>
            </section>

            {/* Contact Info */}
            <section>
              <h2 className="font-sans text-[12px] tracking-[0.25em] uppercase text-accent font-bold mb-8 border-b border-border pb-4">
                Contact
              </h2>
              <div className="space-y-4 text-[14px]">
                <p className="flex justify-between">
                  <span className="text-ink-muted">Email</span>
                  <a href="mailto:md17nadeem@gmail.com" className="font-bold hover:text-accent transition-colors">md17nadeem@gmail.com</a>
                </p>
                <p className="flex justify-between">
                  <span className="text-ink-muted">WhatsApp</span>
                  <span className="font-bold">+62 81295928637</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-ink-muted">Twitter</span>
                  <a href="https://twitter.com/hellonadeeem" target="_blank" className="font-bold hover:text-accent transition-colors">@hellonadeeem</a>
                </p>
              </div>
            </section>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="no-print border-t border-border px-6 md:px-12 py-6">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-bold">Nadeem©2025</p>
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        </div>
      </footer>
    </motion.div>
  );
}
