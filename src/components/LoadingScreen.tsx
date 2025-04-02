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
      // Start transition
      setIsTransitioning(true);
      
      // Wait for transition to complete
      const transitionTimeout = setTimeout(() => {
        // Add fade out effect
        const fadeTimeout = setTimeout(() => {
          setShow(false);
        }, 1000);
        
        return () => clearTimeout(fadeTimeout);
      }, 500);
      
      return () => clearTimeout(transitionTimeout);
    }
  }, [active, smoothProgress]);
  
  if (!show) return null;
  
  return (
    <div 
      className={`absolute inset-0 flex items-center justify-center bg-black z-50 transition-all duration-1000 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center px-8 w-full max-w-md">
        <div className={`text-4xl font-bold text-white mb-8 transition-transform duration-500 ${
          isTransitioning ? 'transform translate-y-10 opacity-0' : ''
        }`}>
          Loading Solar System
        </div>
        <div className={`w-full h-2 bg-gray-800 rounded-full overflow-hidden transition-transform duration-500 ${
          isTransitioning ? 'transform scale-x-0' : ''
        }`}>
          <div 
            className="h-full bg-white transition-transform duration-300 ease-out origin-left"
            style={{ transform: `scaleX(${smoothProgress / 100})` }}
          />
        </div>
        <div className={`text-white mt-4 text-lg transition-transform duration-500 ${
          isTransitioning ? 'transform -translate-y-10 opacity-0' : ''
        }`}>
          {Math.round(smoothProgress)}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;