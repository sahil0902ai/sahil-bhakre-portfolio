'use client';

export function PremiumBackground() {
  return (
    <div 
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Global CSS Grid Overlay */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.4] mix-blend-normal"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* 2. Soft Light Reflection Strips */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.02]"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(255, 255, 255, 0.4) 0%, 
              rgba(255, 255, 255, 0) 40%, 
              rgba(255, 255, 255, 0.3) 60%, 
              rgba(255, 255, 255, 0) 100%)
          `
        }}
      />

      {/* 3. Animated Gradient Mesh */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent-primary/5 blur-[120px] animate-mesh-1" />
      <div className="absolute top-[35%] right-[-15%] w-[550px] h-[550px] rounded-full bg-accent-highlight/4 blur-[110px] animate-mesh-2" />
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[750px] h-[450px] rounded-full bg-accent-primary/[0.04] blur-[130px]" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-accent-success/[0.03] blur-[100px] animate-mesh-2" />

      {/* 4. Analog Faint Noise Overlay */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
