import React from 'react';

export const BackgroundGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Ambient radial highlights - soft in light mode, neon in dark mode */}
      <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 dark:bg-indigo-600/10 blur-[140px]" />
      <div className="absolute top-[35%] -right-[15%] w-[650px] h-[650px] rounded-full bg-violet-500/10 dark:bg-violet-600/10 blur-[160px]" />
      <div className="absolute bottom-[10%] left-[20%] w-[700px] h-[700px] rounded-full bg-cyan-500/8 dark:bg-cyan-600/8 blur-[180px]" />

      {/* Subtle fine technical grid - dark dots in light mode, white dots in dark mode */}
      <div
        className="absolute inset-0 block dark:hidden opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(rgba(15, 23, 42, 0.6) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
};
