import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function Cursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Ring */}
      <motion.div
        className="fixed w-9 h-9 border border-cream/40 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: ringX,
          top: ringY,
          width: isHovering ? 60 : 36,
          height: isHovering ? 60 : 36,
          borderColor: isHovering ? 'var(--color-accent)' : 'rgba(244, 240, 232, 0.4)',
        }}
        transition={{ width: { duration: 0.3 }, height: { duration: 0.3 } }}
      />
      {/* Dot */}
      <motion.div
        className="fixed w-2 h-2 bg-cream rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: mouseX,
          top: mouseY,
        }}
      />
    </div>
  );
}
