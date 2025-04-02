import { useProgress } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';

const LoadingScreen = () => {
  const { progress, active } = useProgress();
  const [show, setShow] = useState(true);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();
  const lastProgressRef = useRef(0);
  
  useEffect(() => {
    // Smooth out the progress updates
    const smoothingInterval = setInterval(() => {
      setSmoothProgress(prev => {
        // Ensure progress never goes backwards during initial load
        const targetProgress = Math.max(progress, lastProgressRef.current);
        lastProgressRef.current = targetProgress;
        
        const diff = targetProgress - prev;
        // Reduce the step size for smoother progression
        const step = Math.max(0.2, Math.abs(diff) * 0.05);
        
        if (Math.abs(diff) < 0.1) return targetProgress;
        return prev + (diff > 0 ? step : -step);
      });
    }, 16);

    return () => clearInterval(smoothingInterval);
  }, [progress]);
  
  useEffect(() => {
    if (!active && smoothProgress >= 99.9) {
      // Start the transition animation
      setIsTransitioning(true);
      
      // Clear any existing timeout
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      // Wait for animations to complete before hiding
      transitionTimeoutRef.current = setTimeout(() => {
        setShow(false);
      }, 1500); // Increased duration to match animations
    }

    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [active, smoothProgress]);
  
  if (!show) return null;
  
  return (
    <div 
      className={`absolute inset-0 flex items-center justify-center bg-black z-50 transition-all duration-1000 ease-in-out ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
      onTransitionEnd={() => {
        if (isTransitioning) {
          setShow(false);
        }
      }}
    >
      <div className="text-center px-8 w-full max-w-md">
        <div 
          className={`text-4xl font-bold text-white mb-8 transition-all duration-1000 ease-in-out ${
            isTransitioning ? 'transform translate-y-10 opacity-0' : 'transform translate-y-0 opacity-100'
          }`}
        >
          Loading Solar System
        </div>
        <div 
          className={`w-full h-2 bg-gray-800 rounded-full overflow-hidden transition-all duration-1000 ease-in-out ${
            isTransitioning ? 'transform scale-x-0' : 'transform scale-x-100'
          }`}
        >
          <div 
            className="h-full bg-white transition-all duration-500 ease-out origin-left"
            style={{ transform: `scaleX(${smoothProgress / 100})` }}
          />
        </div>
        <div 
          className={`text-white mt-4 text-lg transition-all duration-1000 ease-in-out ${
            isTransitioning ? 'transform -translate-y-10 opacity-0' : 'transform translate-y-0 opacity-100'
          }`}
        >
          {Math.round(smoothProgress)}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;