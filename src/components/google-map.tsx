'use client';

import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';

interface GoogleMapProps {
  location: { latitude: number; longitude: number };
  showControls: boolean;
  isDarkMode: boolean;
}

export default function GoogleMap({ location, showControls, isDarkMode }: GoogleMapProps) {
  const mapImageUrl = `https://placehold.co/600x400.png`;

  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl shadow-inner">
      <Image
        src={mapImageUrl}
        alt="Map view of user's location"
        layout="fill"
        objectFit="cover"
        className={isDarkMode ? 'dark-map-filter' : ''}
        data-ai-hint="map illustration"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
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
      <style jsx>{`
        .dark-map-filter {
          filter: invert(1) hue-rotate(180deg) brightness(0.9) contrast(1.1);
        }
      `}</style>
    </div>
  );
}
