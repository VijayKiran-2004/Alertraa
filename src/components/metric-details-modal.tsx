
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Info, Dumbbell, BookOpen, Salad, ShieldCheck, Wind, Flame, Footprints, Moon, Clock, Zap } from 'lucide-react';
import { PieChart, Pie, ResponsiveContainer, Legend, Tooltip, Cell } from 'recharts';
import ProgressRing from './progress-ring';
import SectionCard from './section-card';
import MetricAreaChart from './metric-area-chart';
import RecommendationModal from './recommendation-modal';
import WeeklyReportModal from './weekly-report-modal';
import { mockData } from '@/lib/mock-data';
import type { DailyActivity, Vital, MaintenanceTip, SleepDetails } from '@/types';
import SleepDetailsChart from './sleep-details-chart';
import { cn } from '@/lib/utils';

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

const MainContent = ({ metric, value, unit, color, isDarkMode, secondaryTextClasses, textClasses, chartData, yAxisDomain, recommendation, tips, setSelectedTip }: { metric: string, value: number, unit: string, color: string, isDarkMode: boolean, secondaryTextClasses: string, textClasses: string, chartData: any[], yAxisDomain: [number, number] | undefined, recommendation: string, tips: MaintenanceTip[], setSelectedTip: (tip: MaintenanceTip) => void }) => (
    <>
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
          <h2 className={`text-lg font-headline font-bold text-center mb-4 ${textClasses}`}>Recent Activity Comparison</h2>
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
    </>
  );

const SleepContent = ({ metric, color, isDarkMode, secondaryTextClasses, textClasses, recommendation, tips, setSelectedTip }: { metric: string, color: string, isDarkMode: boolean, secondaryTextClasses: string, textClasses: string, recommendation: string, tips: MaintenanceTip[], setSelectedTip: (tip: MaintenanceTip) => void }) => {
    const sleepDetails = mockData.dailyActivity.sleepDetails;
    const [activeIndex, setActiveIndex] = useState(0);

    const sleepPieData = useMemo(() => {
        const { hoursVsNeeded, consistency, efficiency, highStress } = sleepDetails;
        const hoursPercentage = Math.round((hoursVsNeeded.actual / hoursVsNeeded.needed) * 100);
        return [
            { name: 'Hours vs Needed', value: hoursPercentage, fill: '#8b5cf6' },
            { name: 'Consistency', value: consistency, fill: '#ef4444' },
            { name: 'Efficiency', value: efficiency, fill: '#3b82f6' },
            { name: 'High Stress', value: highStress, fill: '#f97316' },
        ];
    }, [sleepDetails]);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % sleepPieData.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [sleepPieData.length]);

    const activeSegment = sleepPieData[activeIndex];

    return (
      <>
        <div className="flex flex-col items-center">
            <div className="relative">
                <ProgressRing progress={sleepDetails.performance} isDarkMode={isDarkMode} size={160} />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <span className={`text-5xl font-bold ${color}`}>{sleepDetails.performance}%</span>
                    <span className={`text-sm tracking-wider ${secondaryTextClasses}`}>SLEEP<br/>PERFORMANCE</span>
                </div>
            </div>
        </div>

        <SectionCard isDarkMode={isDarkMode}>
            <h2 className={`text-lg font-headline font-bold text-center mb-4 ${textClasses}`}>Sleep performance in Graph</h2>
            <SleepDetailsChart isDarkMode={isDarkMode} data={sleepDetails.weeklyPerformance} />
        </SectionCard>

        <SectionCard isDarkMode={isDarkMode}>
            <div className="w-full h-64 relative">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={sleepPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        paddingAngle={5}
                        stroke="none"
                    >
                    {sleepPieData.map((entry, index) => (
                        <Cell 
                            key={`cell-${index}`} 
                            fill={entry.fill} 
                            opacity={index === activeIndex ? 1 : 0.5}
                            className="transition-opacity duration-500"
                            style={{ outline: 'none' }}
                        />
                    ))}
                    </Pie>
                    <Tooltip content={() => null} cursor={false} />
                </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className={`text-2xl font-bold transition-opacity duration-300`} style={{ color: activeSegment.fill }}>
                        {activeSegment.value}%
                    </p>
                    <p className={`text-sm font-medium text-center max-w-[100px] transition-opacity duration-300 ${secondaryTextClasses}`}>
                        {activeSegment.name}
                    </p>
                </div>
            </div>
        </SectionCard>

        <SectionCard isDarkMode={isDarkMode}>
            <p className={textClasses}>
                your sleep performance is sufficient, but there's room to improve - sleep consistency could use attention to help you get to optimal sleep.
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
      </>
    );
  }

export default function MetricDetailsModal({ metric, vitals, dailyActivity, onClose, isDarkMode }: { metric: string, vitals: Vital, dailyActivity: DailyActivity, onClose: () => void, isDarkMode: boolean }) {
  const [selectedTip, setSelectedTip] = useState<MaintenanceTip | null>(null);
  const [showWeeklyReport, setShowWeeklyReport] = useState(false);
  
  const getMetricData = useCallback(() => {
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
          yAxisDomain: [0, 8] as [number, number],
        };
      case 'Sleep Hours':
        return {
          value: parseFloat(dailyActivity.sleepHours),
          unit: 'hrs',
          data: mockData.dailyActivity,
          color: isDarkMode ? 'text-indigo-400' : 'text-indigo-500',
          yAxisDomain: [0, 10] as [number, number],
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
  }, [metric, vitals, dailyActivity, isDarkMode]);

  const { value, unit, data, color, yAxisDomain } = getMetricData();
  
  const chartData = useMemo(() => data.pastReadings
      .filter((r) => r.type === metric)
      .slice(0, 12)
      .map((r) => ({
        time: r.date,
        today: r.value,
        yesterday: r.yesterdayValue,
        past_days: r.pastDaysValue,
      }))
      .reverse(), [data.pastReadings, metric]);

  const textClasses = isDarkMode ? 'text-white' : 'text-slate-900';
  const secondaryTextClasses = isDarkMode ? 'text-slate-400' : 'text-gray-500';
  const recommendation = data.recommendations[metric] || "No recommendations available.";
  const tips = maintenanceTips[metric] || [];
  const modalBgClasses = isDarkMode ? 'bg-[#36454F] text-white' : 'bg-white text-slate-900';

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`p-6 rounded-2xl shadow-xl max-w-4xl w-full flex flex-col space-y-4 max-h-[90vh] ${modalBgClasses}`}>
        <header className="flex items-center justify-between sticky top-0">
          <h1 className="text-xl font-headline font-bold">Today</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowWeeklyReport(true)} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
              <Info size={24} />
            </button>
            <button onClick={onClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
              <X size={24} />
            </button>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto space-y-6 pr-2">
          {metric === 'Sleep Hours' ? (
             <SleepContent 
                metric={metric}
                color={color}
                isDarkMode={isDarkMode}
                secondaryTextClasses={secondaryTextClasses}
                textClasses={textClasses}
                recommendation={recommendation}
                tips={tips}
                setSelectedTip={setSelectedTip}
            />
          ) : (
            <MainContent 
                metric={metric}
                value={value}
                unit={unit}
                color={color}
                isDarkMode={isDarkMode}
                secondaryTextClasses={secondaryTextClasses}
                textClasses={textClasses}
                chartData={chartData}
                yAxisDomain={yAxisDomain}
                recommendation={recommendation}
                tips={tips}
                setSelectedTip={setSelectedTip}
            />
          )}
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
    </div>
  );
}

    