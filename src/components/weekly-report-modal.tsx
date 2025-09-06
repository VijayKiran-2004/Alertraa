'use client';

import { X, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockData } from '@/lib/mock-data';

interface WeeklyReportModalProps {
  onClose: () => void;
  isDarkMode: boolean;
}

export default function WeeklyReportModal({ onClose, isDarkMode }: WeeklyReportModalProps) {
  const modalBgClasses = isDarkMode ? 'bg-card text-white' : 'bg-white text-slate-900';

  const weeklyData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => {
    const hr = mockData.vitals.pastReadings.find(r => r.date === day && r.type === 'Heart Rate')?.value || 0;
    const bp = mockData.vitals.pastReadings.find(r => r.date === day && r.type === 'Blood Pressure')?.value || 0;
    const bo = mockData.vitals.pastReadings.find(r => r.date === day && r.type === 'Blood Oxygen')?.value || 0;
    const steps = mockData.dailyActivity.pastReadings.find(r => r.date === day && r.type === 'Steps')?.value || 0;
    return { name: day, 'Heart Rate': hr, 'Blood Pressure': bp, 'Blood Oxygen': bo, 'Steps': steps / 100 }; // scale steps to fit chart
  });

  const chartColors = {
    'Heart Rate': '#ef4444',
    'Blood Pressure': '#3b82f6',
    'Blood Oxygen': '#22d3ee',
    'Steps': '#10b981',
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`p-6 rounded-2xl shadow-xl max-w-2xl w-full space-y-4 overflow-y-auto max-h-[90vh] ${modalBgClasses}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-headline font-bold flex items-center gap-2"><TrendingUp /> Weekly Vitals Report</h2>
          <button onClick={onClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
            <X size={24} />
          </button>
        </div>
        
        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
          Here's a comparison of your key vitals over the past week. Consistent tracking helps in identifying trends and maintaining good health.
        </p>

        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                data={weeklyData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
                <XAxis dataKey="name" stroke={isDarkMode ? '#94a3b8' : '#64748b'} />
                <YAxis stroke={isDarkMode ? '#94a3b8' : '#64748b'} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        border: 'none',
                        borderRadius: '0.5rem',
                    }}
                    cursor={{ fill: isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(100, 116, 139, 0.1)' }}
                 />
                <Legend />
                <Bar dataKey="Heart Rate" fill={chartColors['Heart Rate']} />
                <Bar dataKey="Blood Pressure" fill={chartColors['Blood Pressure']} />
                <Bar dataKey="Blood Oxygen" fill={chartColors['Blood Oxygen']} />
                <Bar dataKey="Steps" fill={chartColors['Steps']} name="Steps (x100)" />
                </BarChart>
            </ResponsiveContainer>
        </div>

        <div className="flex justify-end pt-4">
            <button
                onClick={onClose}
                className="py-2 px-6 bg-primary text-white rounded-md font-bold hover:opacity-90 transition-opacity"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
}
