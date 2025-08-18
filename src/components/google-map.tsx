'use client';

import { Plus, Minus } from 'lucide-react';

interface GoogleMapProps {
  location: { latitude: number; longitude: number };
  showControls: boolean;
  isDarkMode: boolean;
}

export default function GoogleMap({ location, showControls, isDarkMode }: GoogleMapProps) {
  const mapUrl = `https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed&t=${isDarkMode ? 'k' : ''}`;

  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl shadow-inner">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0, filter: isDarkMode ? 'invert(1) hue-rotate(180deg)' : 'none' }}
        src={mapUrl}
        allowFullScreen
        aria-hidden="false"
        tabIndex={0}
        title="Google Map"
      ></iframe>
      {showControls && (
        <div className="absolute top-2 right-2 p-2 bg-background/70 backdrop-blur-sm rounded-lg shadow-md flex flex-col space-y-2">
          <button className="p-1 rounded-full bg-muted hover:bg-accent transition-colors" aria-label="Zoom in">
            <Plus size={16} />
          </button>
          <button className="p-1 rounded-full bg-muted hover:bg-accent transition-colors" aria-label="Zoom out">
            <Minus size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
