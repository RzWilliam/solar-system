import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const { progress, active } = useProgress();
  const [show, setShow] = useState(true);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    // Smooth out the progress updates
    const smoothingInterval = setInterval(() => {
      setSmoothProgress(prev => {
        const diff = progress - prev;
        const step = Math.max(0.5, Math.abs(diff) * 0.1);
        
        if (Math.abs(diff) < 0.1) return progress;
        return prev + (diff > 0 ? step : -step);
      });
    }, 16);

    return () => clearInterval(smoothingInterval);
  }, [progress]);
  
  useEffect(() => {
    if (!active && smoothProgress >= 99.9) {
      setIsTransitioning(true);
      
      const transitionTimeout = setTimeout(() => {
        setShow(false);
      }, 1500);
      
      return () => clearTimeout(transitionTimeout);
    }
  }, [active, smoothProgress]);
  
  if (!show) return null;
  
  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-all duration-1000 ease-in-out ${
        isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={isTransitioning}
    >
      <div className="text-center px-8 w-full max-w-md">
        <div 
          className={`text-4xl font-bold text-white mb-8 transition-all duration-1000 ease-in-out ${
            isTransitioning ? 'transform translate-y-10 opacity-0' : ''
          }`}
        >
          Loading Solar System
        </div>
        <div 
          className={`w-full h-2 bg-gray-800 rounded-full overflow-hidden transition-all duration-1000 ease-in-out ${
            isTransitioning ? 'transform scale-x-0' : ''
          }`}
        >
          <div 
            className="h-full bg-white transition-all duration-500 ease-out origin-left"
            style={{ transform: `scaleX(${smoothProgress / 100})` }}
          />
        </div>
        <div 
          className={`text-white mt-4 text-lg transition-all duration-1000 ease-in-out ${
            isTransitioning ? 'transform -translate-y-10 opacity-0' : ''
          }`}
        >
          {Math.round(smoothProgress)}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;