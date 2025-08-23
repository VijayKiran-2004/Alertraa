'use client';

import { ArrowLeft, Info } from 'lucide-react';
import ProgressRing from './progress-ring';
import SectionCard from './section-card';
import MetricAreaChart from './metric-area-chart';
import { mockData } from '@/lib/mock-data';

interface MetricDetailsPageProps {
  metric: string;
  vitals: { heartRate: string; bloodPressure: string; bloodOxygen: string };
  onClose: () => void;
  isDarkMode: boolean;
}

export default function MetricDetailsPage({ metric, vitals, onClose, isDarkMode }: MetricDetailsPageProps) {
  const currentVitalValue = parseInt(vitals.heartRate);
  const chartData = mockData.vitals.pastReadings.filter(r => r.type === 'Heart Rate').slice(0, 12).map(r => ({
    time: r.date,
    today: r.value,
    yesterday: r.yesterdayValue,
    past_days: r.pastDaysValue,
  })).reverse();

  const textClasses = isDarkMode ? 'text-white' : 'text-slate-900';
  const secondaryTextClasses = isDarkMode ? 'text-slate-400' : 'text-gray-500';
  const cardClasses = isDarkMode ? 'bg-slate-800' : 'bg-white';

  return (
    <div className={`h-full flex flex-col animate-fade-in ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <header className={`p-4 flex items-center justify-between sticky top-0 z-10 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <button onClick={onClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-headline font-bold">Today</h1>
        <button className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
          <Info size={24} />
        </button>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <ProgressRing progress={currentVitalValue} isDarkMode={isDarkMode} size={160} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-cyan-500'}`}>{currentVitalValue}</span>
              <span className={`text-sm ${secondaryTextClasses}`}>Heart rate</span>
            </div>
          </div>
        </div>
        
        <SectionCard isDarkMode={isDarkMode}>
            <h2 className={`text-lg font-headline font-bold text-center mb-4 ${textClasses}`}>Heart rate in Graph</h2>
            <MetricAreaChart data={chartData} isDarkMode={isDarkMode} />
        </SectionCard>

        <SectionCard isDarkMode={isDarkMode}>
          <p className={textClasses}>
            Your heart rate is stable, but there's room to improve – maintaining consistency could help boost overall cardiovascular health and bring you closer to optimal performance.
          </p>
        </SectionCard>

        <SectionCard isDarkMode={isDarkMode}>
          <h3 className={`font-bold mb-2 ${textClasses}`}>Diet Recommendations:</h3>
          <p className={textClasses}>
            Your diet seems balanced, but there's room to improve – for personalized nutrition guidance and optimal health outcomes, please contact a doctor or certified dietitian.
          </p>
        </SectionCard>
      </main>
    </div>
  );
}
