'use client';

import { useState, useEffect } from 'react';
import { Heart, Droplet, Flame, Moon, ChevronRight, FileText, Clock, Footprints, Wind, Gauge, AlertTriangle, Sun, Utensils, Pill, Quote, MapPin } from 'lucide-react';
import SectionCard from './section-card';
import { mockData } from '@/lib/mock-data';
import ProgressRing from './progress-ring';
import { cn } from '@/lib/utils';
import type { DailyActivity } from '@/types';
import EcgBeat from './ecg-beat';
import BpMeter from './bp-meter';
import OxygenWave from './oxygen-wave';
import SleepChart from './sleep-chart';
import GoogleMap from './google-map';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

interface HomePageProps {
  onMetricClick: (metric: string) => void;
  onMapClick: () => void;
  vitals: { heartRate: string; bloodPressure: string; bloodOxygen: string };
  dailyActivity: { steps: string; sleepHours: string; caloriesBurnt: string; distanceWalked: string };
  onEmergencyClick: (date: string) => void;
  isDarkMode: boolean;
  onShowDailyPlan: () => void;
}

const FlameAnimation = () => (
    <div className="w-20 h-10 flex items-center justify-center">
      <Flame size={32} className="text-orange-500 animate-flame-flicker" />
    </div>
);

const WalkingAnimation = () => (
  <div className="w-20 h-10 flex items-center justify-center">
    <Footprints size={32} className="text-green-500 animate-pulse" />
  </div>
);

const PlanSection = ({ title, icon, children, isDarkMode }: { title: string; icon: React.ReactNode; children: React.ReactNode; isDarkMode: boolean }) => (
  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'}`}>
    <h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{icon}{title}</h3>
    <div className="space-y-3 text-sm">
      {children}
    </div>
  </div>
);

const PlanItem = ({ time, description, isDarkMode, id }: { time: string, description: string, isDarkMode: boolean, id: string }) => (
    <div className="flex items-center gap-3">
        <Checkbox id={id} className="border-slate-400"/>
        <Label htmlFor={id} className="flex-1">
            <span className={`font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{time}</span>
            <span className={`ml-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{description}</span>
        </Label>
        <Switch id={`switch-${id}`} />
    </div>
);


export default function HomePage({ onMetricClick, onMapClick, vitals, dailyActivity, onEmergencyClick, onShowDailyPlan, isDarkMode }: HomePageProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % mockData.quotes.length);
    }, 60000); // 1 minute
    return () => clearInterval(interval);
  }, []);
  
  const textClasses = isDarkMode ? 'text-white' : 'text-slate-900';
  const secondaryTextClasses = isDarkMode ? 'text-slate-400' : 'text-gray-500';
  const cardBg = isDarkMode ? 'bg-slate-800' : 'bg-white';
  const itemBg = isDarkMode ? 'bg-slate-700' : 'bg-slate-100';

  const metrics = [
    { name: 'Heart Rate', value: vitals.heartRate, progress: parseInt(vitals.heartRate), icon: <Heart size={20} className="text-red-500" /> },
    { name: 'Blood Pressure', value: vitals.bloodPressure, progress: parseInt(vitals.bloodPressure.split('/')[0]), icon: <Gauge size={20} className="text-blue-500" /> },
    { name: 'Blood Oxygen', value: vitals.bloodOxygen, progress: parseInt(vitals.bloodOxygen), icon: <Wind size={20} className="text-cyan-500" /> },
    { name: 'Calories Burnt', value: dailyActivity.caloriesBurnt, progress: 65, icon: <Flame size={20} className="text-orange-500" /> },
    { name: 'Distance Walked', value: dailyActivity.distanceWalked, progress: 75, icon: <Footprints size={20} className="text-green-500" /> },
    { name: 'Sleep Hours', value: dailyActivity.sleepHours, progress: 82, icon: <Moon size={20} className="text-indigo-500" /> },
  ];

  const systolic = parseInt(vitals.bloodPressure.split('/')[0]);
  const oxygen = parseInt(vitals.bloodOxygen);
  const sleepData = mockData.dailyActivity.pastReadings.filter(r => r.type === 'Sleep Hours');
  
  const getSeverityIconColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500';
      case 'major': return 'text-orange-500';
      case 'minor': return 'text-yellow-400';
      default: return 'text-gray-500';
    }
  };

  const currentQuote = mockData.quotes[quoteIndex];

  return (
    <div className="space-y-4 animate-fade-in pb-24">
      <div className={`grid grid-cols-3 gap-2 p-2 rounded-2xl shadow-md ${cardBg}`}>
        {metrics.map(metric => (
          <div key={metric.name} className={`p-2 rounded-xl flex flex-col items-center justify-between gap-2 cursor-pointer ${itemBg}`} onClick={() => onMetricClick(metric.name)}>
            <div className="flex flex-col items-center gap-2">
              <ProgressRing progress={metric.progress} isDarkMode={isDarkMode} icon={metric.icon} size={50} />
              <div className='text-center'>
                  <p className={`text-xs font-bold ${textClasses}`}>{metric.name}</p>
                   <div className="flex items-center gap-1">
                    <p className={`text-xs ${secondaryTextClasses}`}>{metric.value}</p>
                  </div>
              </div>
            </div>
            {metric.name === 'Heart Rate' && <EcgBeat bpm={parseInt(vitals.heartRate)} />}
            {metric.name === 'Blood Pressure' && <BpMeter systolic={systolic} />}
            {metric.name === 'Blood Oxygen' && <OxygenWave percentage={oxygen} />}
            {metric.name === 'Sleep Hours' && <SleepChart data={sleepData} isDarkMode={isDarkMode} />}
            {metric.name === 'Calories Burnt' && <FlameAnimation />}
            {metric.name === 'Distance Walked' && <WalkingAnimation />}
          </div>
        ))}
      </div>

      <div className={`p-4 rounded-2xl shadow-md ${isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'}`}>
        <div className="relative text-center p-4 rounded-lg bg-primary/10">
          <p className={`font-medium italic ${textClasses}`}>"{currentQuote.text}"</p>
          <p className={`text-sm mt-2 ${secondaryTextClasses}`}>- {currentQuote.author}</p>
        </div>
      </div>

      <SectionCard isDarkMode={isDarkMode}>
        <div className="flex justify-between items-center mb-4">
            <h3 className={`font-bold ${textClasses} flex items-center gap-2`}><MapPin size={20}/> Live Location</h3>
            <button onClick={onMapClick}><ChevronRight size={20}/></button>
        </div>
        <div className="h-48 cursor-pointer" onClick={onMapClick}>
          <GoogleMap
            location={mockData.location}
            showControls={false}
            isDarkMode={isDarkMode}
          />
        </div>
      </SectionCard>
      
      <div className={`p-4 rounded-2xl shadow-md ${cardBg}`}>
        <div className='flex justify-between items-center mb-2'>
            <h3 className={`font-bold ${textClasses}`}>TODAY'S ACTIVITIES</h3>
            <button><ChevronRight size={20}/></button>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className={`w-full p-3 rounded-lg flex items-center gap-3 text-left ${itemBg} mt-2 hover:no-underline`}>
                <FileText size={24} className='text-primary'/>
                <span className={`flex-1 font-semibold ${textClasses}`}>Your Daily plan</span>
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <PlanSection title="Morning Routine" icon={<Sun size={20} className="text-yellow-500" />} isDarkMode={isDarkMode}>
                  <PlanItem id="task1" time="07:00 AM" description="Wake up & drink a glass of water." isDarkMode={isDarkMode} />
                  <PlanItem id="task2" time="07:30 AM" description="Morning walk for 30 minutes." isDarkMode={isDarkMode} />
                  <PlanItem id="task3" time="08:30 AM" description="Breakfast: Oatmeal with berries." isDarkMode={isDarkMode} />
              </PlanSection>

              <PlanSection title="Afternoon" icon={<Utensils size={20} className="text-orange-500" />} isDarkMode={isDarkMode}>
                  <PlanItem id="task4" time="01:00 PM" description="Lunch: Grilled chicken salad." isDarkMode={isDarkMode} />
                  <PlanItem id="task5" time="03:00 PM" description="Light snack: Apple slices." isDarkMode={isDarkMode} />
                  <PlanItem id="task6" time="05:00 PM" description="Evening exercise: 20 minutes of stretching." isDarkMode={isDarkMode} />
              </PlanSection>

              <PlanSection title="Evening Routine" icon={<Moon size={20} className="text-indigo-500" />} isDarkMode={isDarkMode}>
                  <PlanItem id="task7" time="07:00 PM" description="Dinner: Baked salmon with vegetables." isDarkMode={isDarkMode} />
                  <PlanItem id="task8" time="09:00 PM" description="Read a book or listen to calming music." isDarkMode={isDarkMode} />
                  <PlanItem id="task9" time="10:00 PM" description="Bedtime. Aim for 8 hours of sleep." isDarkMode={isDarkMode} />
              </PlanSection>

              <PlanSection title="Medication" icon={<Pill size={20} className="text-green-500" />} isDarkMode={isDarkMode}>
                  <PlanItem id="med1" time="08:30 AM" description="Take Lisinopril (10mg) with breakfast." isDarkMode={isDarkMode} />
                  <PlanItem id="med2" time="07:00 PM" description="Take Metformin (500mg) with dinner." isDarkMode={isDarkMode} />
              </PlanSection>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className={`p-4 rounded-2xl shadow-md ${cardBg}`}>
        <div className='flex justify-between items-center mb-2'>
            <h3 className={`font-bold ${textClasses}`}>Recent Emergencies</h3>
            <button><ChevronRight size={20}/></button>
        </div>
        <ul className="space-y-2">
          {mockData.emergencies.slice(0, 3).map((emergency, index) => (
            <li
              key={index}
              onClick={() => onEmergencyClick(emergency.date)}
              className={`p-3 rounded-lg flex items-center justify-between cursor-pointer ${itemBg}`}
            >
              <div className="flex items-center space-x-3">
                <AlertTriangle size={20} className={getSeverityIconColor(emergency.severity)} />
                <div>
                  <p className={`font-medium text-sm ${textClasses}`}>{emergency.summary}</p>
                  <p className={`text-xs ${secondaryTextClasses}`}>{emergency.date}</p>
                </div>
              </div>
              <ChevronRight size={20} className={secondaryTextClasses} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
