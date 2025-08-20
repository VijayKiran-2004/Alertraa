'use client';

import React from 'react';

interface ProgressRingProps {
  progress: number;
  isDarkMode: boolean;
  icon?: React.ReactNode;
}

export default function ProgressRing({ progress, isDarkMode, icon }: ProgressRingProps) {
  const stroke = 4;
  const radius = 30;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const ringColor = isDarkMode ? '#4866FA' : '#4866FA';
  const trackColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <div className="relative flex items-center justify-center" style={{ height: radius * 2, width: radius * 2 }}>
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke={trackColor}
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={ringColor}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-out' }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      {icon && <div className="absolute flex items-center justify-center">{icon}</div>}
    </div>
  );
}
