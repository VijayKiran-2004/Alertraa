'use client';

import { ArrowLeft, Info, Heart, Droplet, Wind, Flame, Footprints, Moon, Dumbbell, BookOpen, Salad, ShieldCheck } from 'lucide-react';
import ProgressRing from './progress-ring';
import SectionCard from './section-card';
import MetricAreaChart from './metric-area-chart';
import { mockData } from '@/lib/mock-data';
import type { DailyActivity, Vital } from '@/types';

interface MetricDetailsPageProps {
  metric: string;
  vitals: { heartRate: string; bloodPressure: string; bloodOxygen: string };
  dailyActivity: { steps: string; sleepHours: string; caloriesBurnt: string; distanceWalked: string };
  onClose: () => void;
  isDarkMode: boolean;
}

const maintenanceTips: Record<string, { icon: React.ReactNode, text: string }[]> = {
    'Heart Rate': [
      { icon: <Dumbbell size={24} />, text: 'Regular exercise' },
      { icon: <Salad size={24} />, text: 'Balanced diet' },
      { icon: <BookOpen size={24} />, text: 'Stress management' },
    ],
    'Blood Pressure': [
      { icon: <Salad size={24} />, text: 'Low-sodium diet' },
      { icon: <Dumbbell size={24} />, text: 'Maintain healthy weight' },
      { icon: <ShieldCheck size={24} />, text: 'Limit alcohol' },
    ],
    'Blood Oxygen': [
      { icon: <Wind size={24} />, text: 'Breathing exercises' },
      { icon: <ShieldCheck size={24} />, text: 'Stay hydrated' },
      { icon: <Flame size={24} />, text: 'Avoid smoking' },
    ],
    'Calories Burnt': [
      { icon: <Dumbbell size={24} />, text: 'Cardio & strength' },
      { icon: <Salad size={24} />, text: 'Balanced diet' },
      { icon: <ShieldCheck size={24} />, text: 'Stay hydrated' },
    ],
    'Distance Walked': [
      { icon: <Footprints size={24} />, text: 'Supportive shoes' },
      { icon: <Dumbbell size={24} />, text: 'Increase pace gradually' },
      { icon: <ShieldCheck size={24} />, text: 'Stay motivated' },
    ],
    'Sleep Hours': [
      { icon: <Moon size={24} />, text: 'Consistent schedule' },
      { icon: <BookOpen size={24} />, text: 'Relaxing routine' },
      { icon: <ShieldCheck size={24} />, text: 'Avoid screens' },
    ],
};

const TipCard = ({ icon, text, isDarkMode }: { icon: React.ReactNode, text: string, isDarkMode: boolean }) => (
    <div className={`flex flex-col items-center justify-center text-center p-4 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
        <div className="text-primary mb-2">{icon}</div>
        <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{text}</p>
    </div>
);

export default function MetricDetailsPage({ metric, vitals, dailyActivity, onClose, isDarkMode }: MetricDetailsPageProps) {
  const getMetricData = () => {
    switch (metric) {
      case 'Heart Rate':
        return {
          value: parseInt(vitals.heartRate),
          unit: 'bpm',
          data: mockData.vitals,
          color: isDarkMode ? 'text-red-400' : 'text-red-500',
          yAxisDomain: [50, 150] as [number, number],
        };
      case 'Blood Pressure':
        return {
          value: parseInt(vitals.bloodPressure.split('/')[0]),
          unit: 'mmHg',
          data: mockData.vitals,
          color: isDarkMode ? 'text-blue-400' : 'text-blue-500',
          yAxisDomain: [60, 180] as [number, number],
        };
      case 'Blood Oxygen':
        return {
          value: parseInt(vitals.bloodOxygen),
          unit: '%',
          data: mockData.vitals,
          color: isDarkMode ? 'text-cyan-400' : 'text-cyan-500',
          yAxisDomain: [80, 100] as [number, number],
        };
      case 'Calories Burnt':
         return {
          value: parseInt(dailyActivity.caloriesBurnt),
          unit: 'kcal',
          data: mockData.dailyActivity,
          color: isDarkMode ? 'text-orange-400' : 'text-orange-500',
          yAxisDomain: [0, 800] as [number, number],
        };
      case 'Distance Walked':
        return {
          value: parseFloat(dailyActivity.distanceWalked),
          unit: 'km',
          data: mockData.dailyActivity,
          color: isDarkMode ? 'text-green-400' : 'text-green-500',
          yAxisDomain: [0, 12] as [number, number],
        };
      case 'Sleep Hours':
        return {
          value: parseFloat(dailyActivity.sleepHours),
          unit: 'hrs',
          data: mockData.dailyActivity,
          color: isDarkMode ? 'text-indigo-400' : 'text-indigo-500',
          yAxisDomain: [0, 12] as [number, number],
        };
      default:
        return {
          value: 0,
          unit: '',
          data: mockData.vitals,
          color: isDarkMode ? 'text-white' : 'text-black',
          yAxisDomain: undefined,
        };
    }
  };

  const { value, unit, data, color, yAxisDomain } = getMetricData();
  
  const chartData = data.pastReadings
    .filter((r) => r.type === metric)
    .slice(0, 12)
    .map((r) => ({
      time: r.date,
      today: r.value,
      yesterday: r.yesterdayValue,
      past_days: r.pastDaysValue,
    }))
    .reverse();

  const textClasses = isDarkMode ? 'text-white' : 'text-slate-900';
  const secondaryTextClasses = isDarkMode ? 'text-slate-400' : 'text-gray-500';
  const recommendation = data.recommendations[metric] || "No recommendations available.";
  const tips = maintenanceTips[metric] || [];

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
            <ProgressRing progress={value} isDarkMode={isDarkMode} size={160} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <span className={`text-5xl font-bold ${color}`}>{value}</span>
              <span className={`text-sm ${secondaryTextClasses} max-w-[100px] break-words`}>{metric} ({unit})</span>
            </div>
          </div>
        </div>
        
        <SectionCard isDarkMode={isDarkMode}>
            <h2 className={`text-lg font-headline font-bold text-center mb-4 ${textClasses}`}>{metric} in Graph</h2>
            <MetricAreaChart data={chartData} isDarkMode={isDarkMode} yAxisDomain={yAxisDomain} />
        </SectionCard>

        <SectionCard isDarkMode={isDarkMode}>
          <h3 className={`font-bold mb-2 ${textClasses}`}>Analysis:</h3>
          <p className={textClasses}>
            Your {metric.toLowerCase()} is stable, but there's room to improve – maintaining consistency could help boost overall cardiovascular health and bring you closer to optimal performance.
          </p>
        </SectionCard>

        <SectionCard isDarkMode={isDarkMode}>
          <h3 className={`font-bold mb-2 ${textClasses}`}>Diet Recommendations:</h3>
          <p className={textClasses}>
            {recommendation} For personalized nutrition guidance and optimal health outcomes, please contact a doctor or certified dietitian.
          </p>
        </SectionCard>

        <SectionCard isDarkMode={isDarkMode}>
          <h3 className={`font-bold mb-4 text-center ${textClasses}`}>For Good Maintenance of {metric}</h3>
          <div className="grid grid-cols-3 gap-4">
            {tips.map((tip, index) => (
              <TipCard key={index} icon={tip.icon} text={tip.text} isDarkMode={isDarkMode} />
            ))}
          </div>
          <p className={`text-xs text-center mt-4 ${secondaryTextClasses}`}>
            Disclaimer: These are general recommendations. Consult with a healthcare professional for personalized advice.
          </p>
        </SectionCard>
      </main>
    </div>
  );
}
