 'use client';

const MapPlaceholderIcon = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const primaryColor = isDarkMode ? '#4A5568' : '#E2E8F0'; // gray-700 : gray-200
  const secondaryColor = isDarkMode ? '#2D3748' : '#CBD5E1'; // gray-800 : gray-300
  const accentColor = '#4866FA';

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 150"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0"
    >
      <rect width="200" height="150" fill={primaryColor} />
      {/* Roads */}
      <path d="M 0 80 L 50 75 L 100 90 L 150 85 L 200 95" stroke={secondaryColor} strokeWidth="8" fill="none" />
      <path d="M 0 120 L 80 110 L 160 125 L 200 120" stroke={secondaryColor} strokeWidth="6" fill="none" />
      <path d="M 70 0 L 65 50 L 75 150" stroke={secondaryColor} strokeWidth="7" fill="none" />
      <path d="M 130 0 L 140 70 L 120 150" stroke={secondaryColor} strokeWidth="5" fill="none" />
      
      {/* Location Pin */}
      <g transform="translate(95 65)">
        <path d="M5 0 C-5 0, -5 15, 5 15 C15 15, 15 0, 5 0 Z" fill={accentColor} />
        <circle cx="5" cy="5" r="3" fill="white" />
      </g>
    </svg>
  );
};


export default function MapPlaceholder({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl shadow-inner bg-slate-200 dark:bg-slate-700">
      <MapPlaceholderIcon isDarkMode={isDarkMode} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
    </div>
  );
}
