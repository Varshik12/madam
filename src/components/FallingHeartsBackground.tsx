import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  symbol: string;
  swayDistance: number;
  rotateDirection: number;
  glowColor: string;
}

export const FallingHeartsBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const romanticElements = [
      { char: '🌹', glow: 'rgba(244, 63, 94, 0.8)' },
      { char: '❤️', glow: 'rgba(239, 68, 68, 0.85)' },
      { char: '💖', glow: 'rgba(236, 72, 153, 0.8)' },
      { char: '🌸', glow: 'rgba(251, 113, 133, 0.75)' },
      { char: '💕', glow: 'rgba(244, 114, 182, 0.75)' },
      { char: '✨', glow: 'rgba(252, 211, 77, 0.9)' },
      { char: '💫', glow: 'rgba(244, 63, 94, 0.7)' },
      { char: '💓', glow: 'rgba(244, 63, 94, 0.8)' },
      { char: '🌺', glow: 'rgba(251, 113, 133, 0.8)' },
    ];

    const generated: Particle[] = Array.from({ length: 36 }).map((_, i) => {
      const item = romanticElements[Math.floor(Math.random() * romanticElements.length)];
      return {
        id: i,
        left: Math.random() * 96 + 2, // 2% to 98%
        size: Math.random() * 12 + 12, // 12px to 24px
        duration: Math.random() * 7 + 8, // 8s to 15s (graceful gentle drift)
        delay: Math.random() * 10, // staggered entrance
        opacity: Math.random() * 0.45 + 0.35, // 0.35 - 0.8
        symbol: item.char,
        swayDistance: (Math.random() * 40 + 20) * (Math.random() > 0.5 ? 1 : -1),
        rotateDirection: Math.random() > 0.5 ? 1 : -1,
        glowColor: item.glow,
      };
    });
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dreamy Romantic Ambient Lighting (Velvet Rose, Soft Crimson & Warm Glow) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-600/15 rounded-full blur-[100px] animate-pulse [animation-duration:8s] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] bg-pink-600/12 rounded-full blur-[120px] animate-pulse [animation-duration:10s] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-[36rem] h-[36rem] bg-rose-900/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Floating & Swaying Romantic Elements */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute -top-10 animate-romantic-fall"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            filter: `drop-shadow(0 0 8px ${p.glowColor})`,
            ['--sway-x' as any]: `${p.swayDistance}px`,
            ['--rot-mult' as any]: p.rotateDirection,
          }}
        >
          {p.symbol}
        </span>
      ))}

      <style>{`
        @keyframes romanticFall {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(0.7);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          25% {
            transform: translate3d(var(--sway-x), 25vh, 0) rotate(calc(var(--rot-mult) * 15deg)) scale(1);
          }
          50% {
            transform: translate3d(calc(var(--sway-x) * -0.6), 50vh, 0) rotate(calc(var(--rot-mult) * -18deg)) scale(1.05);
            opacity: 0.75;
          }
          75% {
            transform: translate3d(calc(var(--sway-x) * 0.8), 75vh, 0) rotate(calc(var(--rot-mult) * 22deg)) scale(0.95);
          }
          95% {
            opacity: 0.4;
          }
          100% {
            transform: translate3d(0, 108vh, 0) rotate(calc(var(--rot-mult) * 40deg)) scale(0.75);
            opacity: 0;
          }
        }
        .animate-romantic-fall {
          animation-name: romanticFall;
          animation-timing-function: cubic-bezier(0.37, 0, 0.63, 1);
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};
