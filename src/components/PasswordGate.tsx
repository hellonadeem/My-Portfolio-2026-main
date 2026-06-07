/**
 * PasswordGate — wraps case study routes with a password wall.
 *
 * TO CHANGE THE PASSWORD: update the constant below.
 */

const CASE_STUDY_PASSWORD = 'nadeem5188';
const STORAGE_KEY = 'portfolio_unlocked';

import { useState, useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check localStorage on mount
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      setUnlocked(true);
    }
  }, []);

  // Auto-focus the input when gate is shown
  useEffect(() => {
    if (!unlocked) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [unlocked]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === CASE_STUDY_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setInput('');
      setTimeout(() => setShake(false), 500);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="w-full max-w-sm">

        {/* Lock icon */}
        <div className="flex justify-center mb-8">
          <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-ink-muted">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2.5" y="7" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M5 7V5a3 3 0 1 1 6 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="8" cy="11" r="1" fill="currentColor"/>
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-[28px] font-light text-center text-ink mb-2">
          Protected Work
        </h1>
        <p className="text-[13px] text-ink-muted text-center mb-10 leading-relaxed">
          This case study is password&nbsp;protected.<br />
          Enter the password to continue.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div
            className={`transition-transform duration-100 ${shake ? 'animate-shake' : ''}`}
            style={shake ? { animation: 'shake 0.4s ease' } : {}}
          >
            <input
              ref={inputRef}
              type="password"
              value={input}
              onChange={e => { setInput(e.target.value); setError(false); }}
              placeholder="Password"
              autoComplete="current-password"
              className={`w-full bg-transparent border-b ${
                error ? 'border-accent' : 'border-border'
              } text-ink text-[14px] font-light py-3 px-0 outline-none placeholder:text-ink-muted tracking-wide transition-colors focus:border-ink`}
            />
          </div>

          {error && (
            <p className="text-accent text-[12px] mt-2 tracking-wide">
              Incorrect password. Try again.
            </p>
          )}

          <button
            type="submit"
            className="mt-8 w-full bg-ink text-paper text-[12px] tracking-[0.2em] uppercase font-medium py-3.5 hover:bg-accent transition-colors duration-300 cursor-pointer"
          >
            Unlock
          </button>
        </form>

        {/* Back link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-[12px] text-ink-muted hover:text-ink transition-colors tracking-wide underline underline-offset-4"
          >
            ← Back to work
          </a>
        </div>
      </div>

      {/* Shake keyframe */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-6px); }
          40%       { transform: translateX(6px); }
          60%       { transform: translateX(-4px); }
          80%       { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
