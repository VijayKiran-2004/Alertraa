'use client';

import { useEffect, useRef, useState } from 'react';
import { Heart, User, Pill, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Page = 'Home' | 'Booking' | 'User' | 'Medicine';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onSosClick: () => void;
  isDarkMode: boolean;
}

export default function Navbar({ currentPage, setCurrentPage, onSosClick, isDarkMode }: NavbarProps) {
  const navItems = [
    { name: 'Home', icon: <Heart size={24} />, page: 'Home' },
    { name: 'Booking', icon: <FileText size={24} />, page: 'Booking' },
    { name: 'Medicine', icon: <Pill size={24} />, page: 'Medicine' },
    { name: 'Profile', icon: <User size={24} />, page: 'User' },
  ];

  const [containerWidth, setContainerWidth] = useState(0);
  const [iconPositions, setIconPositions] = useState<{ left: number, right: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const SVG_HEIGHT = 120;
  const activeIndex = navItems.findIndex(item => item.page === currentPage);
  const totalItems = navItems.length + 1; // +1 for the SOS button

  useEffect(() => {
    const calculatePositions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
      if (iconsRef.current.length > 0) {
        const positions = iconsRef.current.map((el) => {
          if (!el || !containerRef.current) return { left: 0, right: 0 };
          const rect = el.getBoundingClientRect();
          const parentRect = containerRef.current.getBoundingClientRect();
          return {
            left: rect.left - parentRect.left,
            right: rect.right - parentRect.left,
          };
        });
        setIconPositions(positions);
      }
    };
    
    calculatePositions();
    window.addEventListener('resize', calculatePositions);
    return () => window.removeEventListener('resize', calculatePositions);
  }, []);
  
  const generatePath = (index: number) => {
    if (!containerWidth || iconPositions.length === 0 || index < 0 || index >= iconPositions.length) return `M0 0 H${containerWidth} V${SVG_HEIGHT} H0 Z`;

    const pos = iconPositions[index];
    const itemCenter = pos.left + (pos.right - pos.left) / 2;
    const dipWidth = 80; 
    const dipDepth = 50;

    const startX = itemCenter - dipWidth / 2;
    const endX = itemCenter + dipWidth / 2;
    
    return `
      M0 20 
      H${startX}
      C ${itemCenter - 20} 20, ${itemCenter - 30} ${dipDepth}, ${itemCenter} ${dipDepth}
      C ${itemCenter + 30} ${dipDepth}, ${itemCenter + 20} 20, ${endX} 20
      H${containerWidth}
      V${SVG_HEIGHT}
      H0
      Z
    `;
  };

  const pathD = generatePath(activeIndex);

  const navBarBgClasses = isDarkMode 
    ? 'bg-slate-800/80 backdrop-blur-lg' 
    : 'bg-white/80 backdrop-blur-lg';
  
  const navItemClasses = (isActive: boolean) => cn(
    'relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300',
    isActive 
      ? 'text-white -translate-y-8 scale-110' 
      : `opacity-80 -translate-y-2 scale-100 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`
  );
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-24 z-30">
      <div
        ref={containerRef}
        className={cn('relative h-full flex items-center justify-around', navBarBgClasses)}
      >
        <svg
          viewBox={`0 0 ${containerWidth} ${SVG_HEIGHT}`}
          preserveAspectRatio="none"
          className="absolute left-0 -top-10 w-full h-[120px] z-0"
          style={{pointerEvents: 'none'}}
        >
          <motion.path
            d={pathD}
            className={isDarkMode ? 'fill-slate-800/80' : 'fill-white/80'}
            style={{ filter: 'drop-shadow(0 -5px 10px rgba(0,0,0,0.1))' }}
            initial={false}
            animate={{ d: pathD }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </svg>

        {/* Navigation icons */}
        <div className="w-full flex justify-around items-center z-10">
          {navItems.slice(0, 2).map((item, idx) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.name}
                ref={(el) => (iconsRef.current[idx] = el)}
                onClick={() => setCurrentPage(item.page)}
                className={navItemClasses(isActive)}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && <motion.div layoutId="active-nav-item" className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg" />}
                <span className="relative z-10">{item.icon}</span>
              </button>
            );
          })}

          <button
              onClick={onSosClick}
              className={cn(
                  "bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg shadow-xl transition-transform transform hover:scale-105 active:scale-95 border-4 z-20",
                  isDarkMode ? 'border-slate-800' : 'border-white',
                  'relative -translate-y-8'
              )}
              aria-label="SOS Emergency Button"
          >
              SOS
          </button>

          {navItems.slice(2, 4).map((item, idx) => {
             const realIndex = idx + 2;
             const isActive = currentPage === item.page;
            return (
              <button
                key={item.name}
                ref={(el) => (iconsRef.current[realIndex] = el)}
                onClick={() => setCurrentPage(item.page)}
                className={navItemClasses(isActive)}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && <motion.div layoutId="active-nav-item" className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg" />}
                <span className="relative z-10">{item.icon}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
