'use client';

interface OxygenWaveProps {
  percentage: number;
}

export default function OxygenWave({ percentage }: OxygenWaveProps) {
  // A simple wave animation. The speed can be adjusted if needed.
  return (
    <div className="w-20 h-10 overflow-hidden">
      <svg width="80" height="40" viewBox="0 0 80 40">
        <path
          d="M 0 20 C 20 10, 30 10, 50 20 S 70 30, 90 20"
          stroke="#22d3ee"
          fill="transparent"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-oxygen-wave"
        />
      </svg>
    </div>
  );
}
