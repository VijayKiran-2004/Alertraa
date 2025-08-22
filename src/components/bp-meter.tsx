'use client';

interface BpMeterProps {
  systolic: number;
}

export default function BpMeter({ systolic }: BpMeterProps) {
  // Map systolic value (e.g., 60-180) to a rotation angle (e.g., -90 to 90 degrees)
  const normalizedValue = Math.max(60, Math.min(180, systolic));
  const rotation = (normalizedValue - 120) * 1.5; // (value - center) * scale

  return (
    <div className="w-20 h-12 relative">
      <svg viewBox="0 0 100 50" className="w-full h-full">
        {/* Gauge background arc */}
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        {/* Gauge active arc */}
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          stroke="#3b82f6"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        {/* Needle */}
        <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '50px 50px', transition: 'transform 0.5s ease-out' }}>
          <path d="M 50 50 L 50 15" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="50" r="3" fill="hsl(var(--foreground))" />
        </g>
      </svg>
    </div>
  );
}
