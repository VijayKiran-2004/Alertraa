'use client';

import { Heart, Droplet, Flame, Moon, ChevronRight, FileText, Clock, Footprints, Wind, Gauge } from 'lucide-react';
import SectionCard from './section-card';
import { mockData } from '@/lib/mock-data';
import ProgressRing from './progress-ring';
import { cn } from '@/lib/utils';
import type { DailyActivity } from '@/types';
import EcgBeat from './ecg-beat';
import BpMeter from './bp-meter';

interface HomePageProps {
  onMetricClick: (metric: string) => void;
  onMapClick: () => void;
  vitals: { heartRate: string; bloodPressure: string; bloodOxygen: string };
  dailyActivity: { steps: string; sleepHours: string; caloriesBurnt: string; distanceWalked: string };
  onEmergencyClick: (date: string) => void;
  isDarkMode: boolean;
  onShowDailyPlan: () => void;
}


export default function HomePage({ onMetricClick, onMapClick, vitals, dailyActivity, onEmergencyClick, onShowDailyPlan, isDarkMode }: HomePageProps) {
  const textClasses = isDarkMode ? 'text-white' : 'text-slate-900';
  const secondaryTextClasses = isDarkMode ? 'text-slate-400' : 'text-gray-500';
  const cardBg = isDarkMode ? 'bg-slate-800' : 'bg-white';
  const itemBg = isDarkMode ? 'bg-slate-700' : 'bg-slate-100';

  const metrics = [
    { name: 'Heart Rate', value: vitals.heartRate, progress: parseInt(vitals.heartRate), icon: <Heart size={24} className="text-red-500" /> },
    { name: 'Sleep Hours', value: dailyActivity.sleepHours, progress: 82, icon: <Moon size={24} className="text-indigo-500" /> },
    { name: 'Blood Pressure', value: vitals.bloodPressure, progress: parseInt(vitals.bloodPressure.split('/')[0]), icon: <Gauge size={24} className="text-blue-500" /> },
    { name: 'Calories Burnt', value: dailyActivity.caloriesBurnt, progress: 65, icon: <Wind size={24} className="text-cyan-500" /> },
    { name: 'Blood Oxygen', value: vitals.bloodOxygen, progress: parseInt(vitals.bloodOxygen), icon: <Flame size={24} className="text-orange-500" /> },
    { name: 'Distance Walked', value: dailyActivity.distanceWalked, progress: 75, icon: <Footprints size={24} className="text-green-500" /> },
  ];

  const systolic = parseInt(vitals.bloodPressure.split('/')[0]);

  return (
    <div className="space-y-4 animate-fade-in pb-10">
      <div className={`grid grid-cols-2 gap-4 p-4 rounded-2xl shadow-md ${cardBg}`}>
        {metrics.map(metric => (
          <div key={metric.name} className={`p-4 rounded-xl flex items-center justify-between gap-3 cursor-pointer ${itemBg}`} onClick={() => onMetricClick(metric.name)}>
            <div className="flex items-center gap-3">
              <ProgressRing progress={metric.progress} isDarkMode={isDarkMode} icon={metric.icon} />
              <div className='text-left'>
                  <p className={`text-sm font-bold ${textClasses}`}>{metric.name}</p>
                   <div className="flex items-center gap-2">
                    <p className={`text-sm ${secondaryTextClasses}`}>{metric.value}</p>
                  </div>
              </div>
            </div>
            {metric.name === 'Heart Rate' && <EcgBeat bpm={parseInt(vitals.heartRate)} />}
            {metric.name === 'Blood Pressure' && <BpMeter systolic={systolic} />}
          </div>
        ))}
      </div>
      
      <div className={`p-4 rounded-2xl shadow-md ${cardBg}`}>
        <div className='flex justify-between items-center mb-2'>
            <h3 className={`font-bold ${textClasses}`}>TODAY'S ACTIVITIES</h3>
            <button><ChevronRight size={20}/></button>
        </div>
        <div className={`p-3 rounded-lg ${itemBg} mb-2`}>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <div className={cn('p-2 rounded-md', isDarkMode ? 'bg-slate-900' : 'bg-slate-600 text-white')}>
                        <Clock size={20}/>
                    </div>
                    <div>
                        <p className={`text-xs font-bold ${textClasses}`}>6:18 Hrs</p>
                        <p className={`text-xs ${secondaryTextClasses}`}>SLEEP</p>
                    </div>
                </div>
                <div className='text-right'>
                    <p className={`text-xs ${secondaryTextClasses}`}>11:08 PM</p>
                    <p className={`text-xs ${secondaryTextClasses}`}>05:34 AM</p>
                </div>
            </div>
        </div>
        <button onClick={onShowDailyPlan} className={`w-full p-3 rounded-lg flex items-center gap-3 text-left ${itemBg} mt-2`}>
            <FileText size={24} className='text-primary'/>
            <span className={`flex-1 font-semibold ${textClasses}`}>Your Daily plan</span>
            <ChevronRight size={20}/>
        </button>
      </div>
    </div>
  );
}
