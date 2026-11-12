import React from 'react';
import { motion as Motion } from 'motion/react';

function FormLoadingOverlay({ text = 'LOADING' }) {
  const letters = Array.from(text);
  const centerIndex = Math.floor(letters.length / 2);

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center rounded-xl overflow-hidden"
      style={{ backgroundColor: 'oklch(0.14 0 0)' }}
    >
      <div
        aria-label={text}
        className="relative flex select-none items-center justify-center uppercase leading-none"
        style={{
          fontFamily: 'Segoe UI, sans-serif',
          fontSize: 'clamp(3rem, 6vw, 8rem)',
          lineHeight: 0.9,
          letterSpacing: '-0.03em',
          fontWeight: 400,
        }}
      >
        {letters.map((letter, index) => {
          const delay = Math.abs(index - centerIndex) * 0.16;

          return (
            <span
              key={`${letter}-${index}`}
              style={{
                position: 'relative',
                display: 'inline-block',
                minWidth: '0.32em',
              }}
            >
              <span style={{ color: 'oklch(0.94 0.01 240)', opacity: 0.26 }}>{letter}</span>
              <Motion.span
                initial={{ width: '0%', opacity: 0.3 }}
                animate={{
                  width: ['0%', '35%', '65%', '100%'],
                  opacity: [0.3, 1, 1, 1],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  color: 'oklch(0.94 0.01 240)',
                  backgroundImage:
                    'linear-gradient(90deg, oklch(0.99 0.003 240) 0%, oklch(0.92 0.01 240) 22%, oklch(0.78 0.015 240) 48%, oklch(0.62 0.02 240) 72%, oklch(0.42 0.02 240) 100%)',
                  backgroundSize: '220% 100%',
                  backgroundPosition: '100% 0%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {letter}
              </Motion.span>
            </span>
          );
        })}
      </div>
    </Motion.div>
  );
}

export { FormLoadingOverlay };
