'use client';

import type { Reading } from '@/types';

interface SleepChartProps {
  data: Reading[];
  isDarkMode: boolean;
}

export default function SleepChart({ data, isDarkMode }: SleepChartProps) {
  const chartHeight = 40;
  const barWidth = 8;
  const barMargin = 4;
  const maxHours = 10; // Assuming max 10 hours for scaling

  const chartData = data.slice(-7); // Get last 7 readings

  const barColor = isDarkMode ? '#818CF8' : '#6366F1'; // indigo colors

  return (
    <div className="w-20 h-10 flex items-end justify-center">
       <svg width="100%" height="100%" viewBox={`0 0 ${chartData.length * (barWidth + barMargin) - barMargin} ${chartHeight}`}>
        {chartData.map((reading, index) => {
          const barHeight = Math.max(0, (reading.value / maxHours) * chartHeight);
          return (
            <rect
              key={index}
              x={index * (barWidth + barMargin)}
              y={chartHeight - barHeight}
              width={barWidth}
              height={barHeight}
              fill={barColor}
              rx="2"
              ry="2"
            />
          );
        })}
      </svg>
    </div>
  );
}
