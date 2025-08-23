'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { SleepPerformanceData } from '@/types';

interface SleepDetailsChartProps {
  data: SleepPerformanceData[];
  isDarkMode: boolean;
}

export default function SleepDetailsChart({ data, isDarkMode }: SleepDetailsChartProps) {
  const chartColors = {
    'Normal Sleep': '#8b5cf6',
    'Average Sleep': '#f87171',
    'Deep Sleep': '#38bdf8',
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
          <XAxis dataKey="day" stroke={isDarkMode ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke={isDarkMode ? '#94a3b8' : '#64748b'} fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
          <Tooltip
            contentStyle={{
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                border: 'none',
                borderRadius: '0.5rem',
            }}
            cursor={{ fill: isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(100, 116, 139, 0.1)' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          <Bar dataKey="Normal Sleep" fill={chartColors['Normal Sleep']} radius={[4, 4, 0, 0]} />
          <Bar dataKey="Average Sleep" fill={chartColors['Average Sleep']} radius={[4, 4, 0, 0]} />
          <Bar dataKey="Deep Sleep" fill={chartColors['Deep Sleep']} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
