'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MetricAreaChartProps {
  data: any[];
  isDarkMode: boolean;
  yAxisDomain?: [number, number];
}

const CustomTooltip = ({ active, payload, label, isDarkMode }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-2 rounded-md shadow-lg ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'}`}>
        <p className="label">{`${label}`}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} style={{ color: pld.color }}>
            {`${pld.name}: ${pld.value}`}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function MetricAreaChart({ data, isDarkMode, yAxisDomain }: MetricAreaChartProps) {
  const textColor = isDarkMode ? '#cbd5e1' : '#475569';

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
          <XAxis dataKey="time" tick={{ fill: textColor, fontSize: 12 }} />
          <YAxis tick={{ fill: textColor, fontSize: 12 }} domain={yAxisDomain} />
          <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
          <Legend wrapperStyle={{ fontSize: '12px' }}/>
          <defs>
            <linearGradient id="colorYesterday" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fca5a5" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#fca5a5" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorToday" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#86efac" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#86efac" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPast" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#93c5fd" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="yesterday" stroke="#f87171" fillOpacity={1} fill="url(#colorYesterday)" />
          <Area type="monotone" dataKey="today" stroke="#4ade80" fillOpacity={1} fill="url(#colorToday)" />
          <Area type="monotone" dataKey="past_days" stroke="#60a5fa" fillOpacity={1} fill="url(#colorPast)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
