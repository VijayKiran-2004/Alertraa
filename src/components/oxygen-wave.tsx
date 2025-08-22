'use client';

interface OxygenWaveProps {
  percentage: number;
}

export default function OxygenWave({ percentage }: OxygenWaveProps) {
  // A simple wave animation. The speed can be adjusted if needed.
  return (
    <div className="w-20 h-10 overflow-hidden relative">
      <div className="absolute w-[200%] h-full">
        <svg
          width="160"
          height="40"
          viewBox="0 0 160 40"
          className="animate-oxygen-wave"
        >
          <path
            d="M 0 20 C 20 10, 30 10, 50 20 S 70 30, 90 20 C 110 10, 120 10, 140 20 S 160 30, 180 20"
            stroke="#22d3ee"
            fill="transparent"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
