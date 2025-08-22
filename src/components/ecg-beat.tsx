'use client';

interface EcgBeatProps {
  bpm: number;
}

export default function EcgBeat({ bpm }: EcgBeatProps) {
  const animationDuration = 60 / bpm;

  return (
    <div className="w-20 h-10">
      <svg
        viewBox="0 0 100 40"
        className="w-full h-full animate-ecg-pulse"
        style={{ '--animation-duration': `${animationDuration}s` } as React.CSSProperties}
      >
        <path
          d="M0 20 H15 L20 25 L25 15 L30 22 L35 20 L40 18 L45 20 L50 20 L55 28 L60 10 L65 20 H100"
          stroke="#F87171"
          fill="none"
          strokeWidth="2"
          strokeDasharray="150"
          strokeDashoffset="150"
          className="animate-ecg-draw"
          style={{ '--animation-duration': `${animationDuration}s` } as React.CSSProperties}
        />
      </svg>
    </div>
  );
}
