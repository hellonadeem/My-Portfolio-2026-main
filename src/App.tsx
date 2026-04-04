/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import GoTransitCaseStudy from './pages/GoTransitCaseStudy';
import CADFCaseStudy from './pages/CADFCaseStudy';
import SnippetsCaseStudy from './pages/SnippetsCaseStudy';
import ChatCaseStudy from './pages/ChatCaseStudy';
import Resume from './pages/Resume';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <div className="noise" />
      <Cursor />
      <Loader onComplete={() => setLoading(false)} />

      {!loading && (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/case-study/01" element={<GoTransitCaseStudy />} />
            <Route path="/case-study/02" element={<CADFCaseStudy />} />
            <Route path="/case-study/03" element={<SnippetsCaseStudy />} />
            <Route path="/case-study/04" element={<ChatCaseStudy />} />
            <Route path="/case-study/:id" element={<CaseStudy />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </>
      )}
    </Router>
  );
}
