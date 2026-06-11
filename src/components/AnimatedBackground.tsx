import React from 'react';

const AnimatedBackground: React.FC = () => {
  const emojis = ['⚽', '🥅', '🏆', '⭐', '🔥', '🎯', '👟', '🧤'];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-emerald-950 to-slate-950" />

      {/* Field lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white transform -translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white transform -translate-x-1/2" />
      </div>

      {/* Floating emojis */}
      {emojis.map((emoji, i) => (
        <div
          key={i}
          className="absolute text-2xl opacity-10 animate-bounce"
          style={{
            left: `${(i * 13 + 5) % 90}%`,
            top: `${(i * 17 + 10) % 80}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${3 + (i % 3)}s`,
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
