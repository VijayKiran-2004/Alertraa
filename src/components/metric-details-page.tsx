'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, Info, Dumbbell, BookOpen, Salad, ShieldCheck, Wind, Flame, Footprints, Moon } from 'lucide-react';
import ProgressRing from './progress-ring';
import SectionCard from './section-card';
import MetricAreaChart from './metric-area-chart';
import RecommendationModal from './recommendation-modal';
import WeeklyReportModal from './weekly-report-modal';
import { mockData } from '@/lib/mock-data';
import type { DailyActivity, Vital, MaintenanceTip } from '@/types';

const maintenanceTips: Record<string, MaintenanceTip[]> = {
    'Heart Rate': [
      { id: 'hr1', icon: <Dumbbell size={24} />, title: 'Regular exercise', text: 'Engage in at least 30 minutes of moderate-intensity aerobic activity, like brisk walking or cycling, most days of the week. This strengthens your heart and improves circulation.' },
      { id: 'hr2', icon: <Salad size={24} />, title: 'Balanced diet', text: 'Focus on a diet rich in fruits, vegetables, whole grains, and lean proteins. Limit processed foods, sodium, and unhealthy fats to maintain a healthy heart.' },
      { id: 'hr3', icon: <BookOpen size={24} />, title: 'Stress management', text: 'Practice relaxation techniques like deep breathing, meditation, or yoga. Chronic stress can contribute to a higher resting heart rate.' },
    ],
    'Blood Pressure': [
      { id: 'bp1', icon: <Salad size={24} />, title: 'Low-sodium diet', text: 'Reducing your sodium intake is crucial. Avoid processed foods, canned soups, and fast food. Cook with herbs and spices instead of salt.' },
      { id: 'bp2', icon: <Dumbbell size={24} />, title: 'Maintain healthy weight', text: 'Losing even a small amount of weight can make a significant difference in your blood pressure. Combine a balanced diet with regular physical activity.' },
      { id: 'bp3', icon: <ShieldCheck size={24} />, title: 'Limit alcohol', text: 'Drinking too much alcohol can raise your blood pressure. If you drink, do so in moderation—up to one drink per day for women, two for men.' },
    ],
    'Blood Oxygen': [
      { id: 'bo1', icon: <Wind size={24} />, title: 'Breathing exercises', text: 'Practice pursed-lip and diaphragmatic (belly) breathing. These techniques can help you empty your lungs more effectively and take in more fresh air.' },
      { id: 'bo2', icon: <ShieldCheck size={24} />, title: 'Stay hydrated', text: 'Proper hydration supports lung function and ensures that your blood can efficiently transport oxygen throughout your body. Drink plenty of water daily.' },
      { id: 'bo3', icon: <Flame size={24} />, title: 'Avoid smoking', text: 'Smoking damages your lungs and reduces their ability to absorb oxygen. Quitting is the single most important step you can take for your lung health.' },
    ],
    'Calories Burnt': [
      { id: 'cb1', icon: <Dumbbell size={24} />, title: 'Cardio & strength', text: 'Combine cardiovascular exercises like running or swimming with strength training. Building muscle mass increases your resting metabolic rate, helping you burn more calories.' },
      { id: 'cb2', icon: <Salad size={24} />, title: 'Balanced diet', text: 'Fuel your body with a mix of macronutrients—protein, carbs, and healthy fats. Protein, in particular, has a higher thermic effect, meaning your body burns more calories digesting it.' },
      { id: 'cb3', icon: <ShieldCheck size={24} />, title: 'Stay hydrated', text: 'Drinking enough water can temporarily boost your metabolism. Aim for around 8 glasses a day, more if you are active.' },
    ],
    'Distance Walked': [
      { id: 'dw1', icon: <Footprints size={24} />, title: 'Supportive shoes', text: 'Invest in good-quality walking shoes that provide proper support and cushioning. This helps prevent injuries and makes walking more comfortable.' },
      { id: 'dw2', icon: <Dumbbell size={24} />, title: 'Increase pace gradually', text: 'Challenge yourself by gradually increasing your walking speed or incorporating intervals of brisk walking. This improves cardiovascular fitness.' },
      { id: 'dw3', icon: <ShieldCheck size={24} />, title: 'Stay motivated', text: 'Walk with a friend, listen to music or a podcast, or explore new routes to keep your routine interesting and enjoyable.' },
    ],
    'Sleep Hours': [
      { id: 'sh1', icon: <Moon size={24} />, title: 'Consistent schedule', text: 'Go to bed and wake up at the same time every day, even on weekends. This helps regulate your body`s internal clock.' },
      { id: 'sh2', icon: <BookOpen size={24} />, title: 'Relaxing routine', text: 'Develop a calming pre-sleep routine. This could include reading a book, taking a warm bath, or listening to soothing music.' },
      { id: 'sh3', icon: <ShieldCheck size={24} />, title: 'Avoid screens', text: 'The blue light from phones, tablets, and computers can interfere with melatonin production. Put screens away at least an hour before bedtime.' },
    ],
};

const TipCard = ({ tip, isDarkMode, onClick }: { tip: MaintenanceTip, isDarkMode: boolean, onClick: () => void }) => (
    <div 
        className={`flex flex-col items-center justify-center text-center p-4 rounded-lg cursor-pointer transition-transform hover:scale-105 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}
        onClick={onClick}
    >
        <div className="text-primary mb-2">{tip.icon}</div>
        <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{tip.title}</p>
    </div>
);

export default function MetricDetailsPage({ metric, vitals, dailyActivity, onClose, isDarkMode }: MetricDetailsPageProps) {
  const [selectedTip, setSelectedTip] = useState<MaintenanceTip | null>(null);
  const [showWeeklyReport, setShowWeeklyReport] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  const getMetricData = () => {
    switch (metric) {
      case 'Heart Rate':
        return {
          value: parseInt(vitals.heartRate),
          unit: 'bpm',
          data: mockData.vitals,
          color: isDarkMode ? 'text-red-400' : 'text-red-500',
          yAxisDomain: [40, 120] as [number, number],
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
  
  useEffect(() => {
    const initialChartData = data.pastReadings
      .filter((r) => r.type === metric)
      .slice(0, 12)
      .map((r) => ({
        time: r.date,
        today: r.value,
        yesterday: r.yesterdayValue,
        past_days: r.pastDaysValue,
      }))
      .reverse();
    setChartData(initialChartData);
  }, [metric, data]);


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
        <button onClick={() => setShowWeeklyReport(true)} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
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
            {tips.map((tip) => (
              <TipCard key={tip.id} tip={tip} isDarkMode={isDarkMode} onClick={() => setSelectedTip(tip)} />
            ))}
          </div>
          <p className={`text-xs text-center mt-4 ${secondaryTextClasses}`}>
            Disclaimer: These are general recommendations. Consult with a healthcare professional for personalized advice.
          </p>
        </SectionCard>
      </main>

      {selectedTip && createPortal(
        <RecommendationModal tip={selectedTip} onClose={() => setSelectedTip(null)} isDarkMode={isDarkMode} />,
        document.body
      )}
      {showWeeklyReport && createPortal(
        <WeeklyReportModal onClose={() => setShowWeeklyReport(false)} isDarkMode={isDarkMode} />,
        document.body
      )}
    </div>
  );
}
