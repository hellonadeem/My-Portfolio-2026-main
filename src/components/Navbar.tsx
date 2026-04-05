import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setMenuOpen(false);
    if (href.startsWith('/#') && window.location.pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        const offset = el.getBoundingClientRect().top + window.scrollY - 48;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    setMenuOpen(false);
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const links = [
    { name: 'Work',    href: '/#work',    num: '01' },
    { name: 'Resume',  href: '/resume',   num: '02' },
    { name: 'Contact', href: '/#contact', num: '03' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-3 transition-all duration-300 ${
          scrolled
            ? 'bg-paper/88 backdrop-blur-xl border-b border-border py-2'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1320px] mx-auto w-full flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={scrollToTop}
            className="font-sans text-[1.4rem] font-bold tracking-tight text-ink group"
          >
            Nadeem<em className="not-italic text-accent group-hover:italic transition-all duration-300">®</em>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-9 list-none">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-ink/50 hover:text-ink text-[0.78rem] tracking-[0.12em] uppercase font-medium transition-colors duration-300 relative group"
                >
                  <span className="text-[0.65rem] text-accent mr-1.5 font-sans">{link.num}/</span>
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-400 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex items-center justify-center w-9 h-9 text-ink z-[110]"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99] bg-paper flex flex-col pt-24 px-8 pb-12 md:hidden"
          >
            <ul className="flex flex-col gap-1 flex-1">
              {links.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-baseline gap-3 py-5 border-b border-border group"
                  >
                    <span className="text-[11px] text-accent font-medium tracking-[0.08em]">{link.num}/</span>
                    <span className="text-[2rem] font-bold tracking-[-0.03em] text-ink group-hover:text-accent transition-colors duration-200">
                      {link.name}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <p className="text-[11px] tracking-[0.1em] uppercase text-ink-muted font-medium">
              mohdnadeem.com
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
