/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import PasswordGate from './components/PasswordGate';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import GoTransitCaseStudy from './pages/GoTransitCaseStudy';
import CADFCaseStudy from './pages/CADFCaseStudy';
import SnippetsCaseStudy from './pages/SnippetsCaseStudy';
import ChatCaseStudy from './pages/ChatCaseStudy';
import Resume from './pages/Resume';

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <div className="noise" />
      <Cursor />
      <Loader onComplete={() => setLoading(false)} />

      {!loading && (
        <>
          <ScrollToHash />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/case-study/01" element={<PasswordGate><GoTransitCaseStudy /></PasswordGate>} />
            <Route path="/case-study/02" element={<PasswordGate><CADFCaseStudy /></PasswordGate>} />
            <Route path="/case-study/03" element={<PasswordGate><SnippetsCaseStudy /></PasswordGate>} />
            <Route path="/case-study/04" element={<PasswordGate><ChatCaseStudy /></PasswordGate>} />
            <Route path="/case-study/:id" element={<PasswordGate><CaseStudy /></PasswordGate>} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </>
      )}
    </Router>
  );
}
