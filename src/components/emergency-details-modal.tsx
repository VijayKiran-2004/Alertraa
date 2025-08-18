'use client';

import { X, Heart, Globe } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockData } from '@/lib/mock-data';

interface EmergencyDetailsModalProps {
  emergency: string;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function EmergencyDetailsModal({ emergency, onClose, isDarkMode }: EmergencyDetailsModalProps) {
  const details = mockData.emergencyDetails[emergency];
  const emergencySummary = mockData.emergencies.find((e) => e.date === emergency)?.summary;

  const modalBgClasses = isDarkMode ? 'bg-[#36454F] text-white' : 'bg-white text-slate-900';
  const listBgClasses = isDarkMode ? 'bg-slate-700' : 'bg-gray-100';
  const listTextClasses = isDarkMode ? 'text-white' : 'text-gray-700';
  
  if (!details) return null;

  const chartData = [
    { name: 'HR', value: parseInt(details.vitals.heartRate, 10), fill: '#ef4444' },
    { name: 'BP-S', value: parseInt(details.vitals.bloodPressure.split('/')[0], 10), fill: '#3b82f6' },
    { name: 'BP-D', value: parseInt(details.vitals.bloodPressure.split('/')[1], 10), fill: '#60a5fa' },
    { name: 'O2', value: parseInt(details.vitals.bloodOxygen, 10), fill: '#22d3ee' },
  ];

  const Gauge = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
  const Footprints = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 16v-2.38c0-.97.5-1.84 1.3-2.39l1.4-1.05a2.5 2.5 0 0 1 3.6 0l1.4 1.05c.8.55 1.3 1.42 1.3 2.39V16"/><path d="M12 16v-2.38c0-.97.5-1.84 1.3-2.39l1.4-1.05a2.5 2.5 0 0 1 3.6 0l1.4 1.05c.8.55 1.3 1.42 1.3 2.39V16"/><path d="M4.68 12.55a2.5 2.5 0 0 1 0-5.1"/><path d="M12.68 12.55a2.5 2.5 0 0 1 0-5.1"/></svg>
  const Moon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`p-6 rounded-2xl shadow-xl max-w-lg w-full space-y-4 overflow-y-auto max-h-[90vh] ${modalBgClasses}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-headline font-bold">Emergency Details</h2>
          <button onClick={onClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
            <X size={24} />
          </button>
        </div>

        <p className="text-md font-semibold text-red-500">
          <strong>{emergency}</strong>: {emergencySummary}
        </p>

        <div className="space-y-4 mt-4">
          <div>
            <h3 className="text-lg font-headline font-semibold mb-2">Vitals at Time of Emergency</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className={`text-center p-3 rounded-lg ${listBgClasses}`}>
                    <Heart size={24} className="text-red-500 mx-auto mb-1" />
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Heart Rate</p>
                    <p className={`font-bold ${listTextClasses}`}>{details.vitals.heartRate}</p>
                </div>
                 <div className={`text-center p-3 rounded-lg ${listBgClasses}`}>
                    <Gauge size={24} className="text-primary mx-auto mb-1" />
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Blood Pressure</p>
                    <p className={`font-bold ${listTextClasses}`}>{details.vitals.bloodPressure}</p>
                </div>
                 <div className={`text-center p-3 rounded-lg ${listBgClasses}`}>
                    <Globe size={24} className="text-cyan-500 mx-auto mb-1" />
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Blood Oxygen</p>
                    <p className={`font-bold ${listTextClasses}`}>{details.vitals.bloodOxygen}</p>
                </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-headline font-semibold mb-2">Vitals Chart</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey="name" stroke={isDarkMode ? '#99BCF2' : '#36454F'} fontSize={12} />
                <YAxis stroke={isDarkMode ? '#99BCF2' : '#36454F'} fontSize={12} />
                <Tooltip
                    contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF', border: 'none', borderRadius: '0.5rem' }}
                    labelStyle={{ color: isDarkMode ? '#F9FAFB' : '#1F2937' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="text-lg font-headline font-semibold mb-2">Activity Summary for the Day</h3>
            <div className={`flex justify-between p-3 rounded-lg ${listBgClasses} mb-2`}>
              <p className={`flex items-center space-x-2 ${listTextClasses}`}><Footprints size={18} className="text-pink-500" /> <span>Steps Walked:</span></p>
              <span className="font-medium">{details.activity.steps}</span>
            </div>
            <div className={`flex justify-between p-3 rounded-lg ${listBgClasses}`}>
              <p className={`flex items-center space-x-2 ${listTextClasses}`}><Moon size={18} className="text-indigo-500" /> <span>Sleep Hours:</span></p>
              <span className="font-medium">{details.activity.sleepHours}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
