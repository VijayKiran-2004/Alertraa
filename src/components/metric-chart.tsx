'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MetricChartProps {
  data: { date: string; value: number }[];
  isDarkMode: boolean;
  metric: string;
  onPointClick: (data: any) => void;
}

export default function MetricChart({ data, isDarkMode, metric, onPointClick }: MetricChartProps) {
  const chartColor = '#4866FA';

  const getUnit = () => {
    if (metric.includes('Hours')) return 'hrs';
    if (metric.includes('Pressure')) return 'mmHg';
    if (metric.includes('Heart')) return 'bpm';
    if (metric.includes('Oxygen')) return '%';
    if (metric.includes('Steps')) return 'steps';
    if (metric.includes('Calories')) return 'kcal';
    if (metric.includes('Distance')) return 'km';
    return '';
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
        onClick={onPointClick}
      >
        <XAxis dataKey="date" stroke={isDarkMode ? '#99BCF2' : '#36454F'} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke={isDarkMode ? '#99BCF2' : '#36454F'} fontSize={12} tickLine={false} axisLine={false}/>
        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
            border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
            borderRadius: '0.5rem',
          }}
          labelStyle={{
            color: isDarkMode ? '#F9FAFB' : '#1F2937',
            fontWeight: 'bold',
          }}
          itemStyle={{
            color: chartColor,
          }}
          formatter={(value) => `${value} ${getUnit()}`}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={chartColor}
          strokeWidth={2}
          activeDot={{ r: 8, style: { fill: chartColor, stroke: isDarkMode ? '#36454F' : '#FFFFFF', strokeWidth: 2 } }}
          dot={{r: 4, fill: chartColor}}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
