import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800);
          }, 400);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 bg-beige z-[9000] flex flex-col items-center justify-center gap-6"
        >
          <div className="font-serif text-[clamp(2rem,6vw,5rem)] italic tracking-tight text-ink">
            Nadeem<span className="text-accent">®</span>
          </div>
          <div className="w-[200px] h-px bg-ink/15 overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${progress}%` }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            />
          </div>
          <div className="text-[0.75rem] tracking-[0.2em] text-mid font-light uppercase">
            {Math.round(progress)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
