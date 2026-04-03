import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('/#') && window.location.pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const links = [
    { name: 'Work', href: '/#work', num: '01/', isExternal: false },
    { name: 'Resume', href: '/resume', num: '02/', isExternal: false },
    { name: 'Contact', href: '/#contact', num: '03/', isExternal: false },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-3 transition-all duration-300 ${
        scrolled 
          ? 'bg-paper/88 backdrop-blur-xl border-b border-border py-2' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1320px] mx-auto w-full flex items-center justify-between">
        <Link 
          to="/" 
          onClick={scrollToTop}
          className="font-sans text-[1.4rem] font-bold tracking-tight text-ink group"
        >
          Nadeem<em className="not-italic text-accent group-hover:italic transition-all duration-300">®</em>
        </Link>
        <ul className="flex gap-9 list-none">
          {links.map((link) => (
            <li key={link.name}>
              {link.isExternal ? (
                <a
                  href={link.href}
                  className="text-ink/50 hover:text-ink text-[0.78rem] tracking-[0.12em] uppercase font-medium transition-colors duration-300 relative group"
                >
                  <span className="text-[0.65rem] text-accent mr-1.5 not-italic font-sans">
                    {link.num}
                  </span>
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-400 group-hover:w-full" />
                </a>
              ) : (
                <Link
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-ink/50 hover:text-ink text-[0.78rem] tracking-[0.12em] uppercase font-medium transition-colors duration-300 relative group"
                >
                  <span className="text-[0.65rem] text-accent mr-1.5 not-italic font-sans">
                    {link.num}
                  </span>
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-400 group-hover:w-full" />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
