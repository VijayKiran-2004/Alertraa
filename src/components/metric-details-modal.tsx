'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import MetricChart from './metric-chart';
import { mockData } from '@/lib/mock-data';

interface MetricDetailsModalProps {
  metric: string;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function MetricDetailsModal({ metric, onClose, isDarkMode }: MetricDetailsModalProps) {
  const [clickedPoint, setClickedPoint] = useState<{ date: string; value: number } | null>(null);

  const getMetricData = () => {
    let readings;
    if (metric === 'Heart Rate' || metric === 'Blood Pressure' || metric === 'Blood Oxygen') {
      readings = mockData.vitals.pastReadings.filter((r) => r.type === metric);
    } else {
      readings = mockData.dailyActivity.pastReadings.filter((r) => r.type === metric);
    }
    const formattedReadings = readings.map((r) => ({ date: r.date.substring(5), value: r.value }));
    return { readings: formattedReadings, recommendation: mockData.vitals.recommendations[metric] || mockData.dailyActivity.recommendations[metric] };
  };

  const { readings, recommendation } = getMetricData();
  const modalBgClasses = isDarkMode ? 'bg-[#36454F] text-white' : 'bg-white text-slate-900';
  const listBgClasses = isDarkMode ? 'bg-slate-700' : 'bg-gray-100';
  const listTextClasses = isDarkMode ? 'text-white' : 'text-gray-700';

  const handlePointClick = (data: any) => {
    if (data && data.activePayload && data.activePayload[0] && data.activePayload[0].payload) {
      setClickedPoint(data.activePayload[0].payload);
    }
  };

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
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`p-6 rounded-2xl shadow-xl max-w-lg w-full space-y-4 overflow-y-auto max-h-[90vh] ${modalBgClasses}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-headline font-bold">{metric} History</h2>
          <button onClick={onClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
            <X size={24} />
          </button>
        </div>

        <div>
          <h3 className="text-lg font-headline font-semibold mb-2">Past Readings</h3>
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>A visual comparison of your data. Click on a data point for details!</p>
          <MetricChart data={readings} isDarkMode={isDarkMode} metric={metric} onPointClick={handlePointClick} />
        </div>

        {clickedPoint && (
          <div className={`p-4 rounded-lg mt-4 ${listBgClasses} animate-fade-in`}>
            <div className="flex justify-between items-center">
              <h4 className={`text-md font-bold ${listTextClasses}`}>Details for {clickedPoint.date}</h4>
              <button onClick={() => setClickedPoint(null)} className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}>
                <X size={16} />
              </button>
            </div>
            <p className={`text-sm mt-2 ${listTextClasses}`}>
              Value: <span className="font-semibold">{clickedPoint.value} {getUnit()}</span>
            </p>
          </div>
        )}

        <div>
          <h3 className="text-lg font-headline font-semibold mb-2 mt-4">Recommendation</h3>
          <p className={`p-3 rounded-lg ${listBgClasses}`}>{recommendation}</p>
        </div>
      </div>
    </div>
  );
}
