import { Suspense, useState, useEffect } from "react";
import SolarSystem from "./components/SolarSystem";
import LandingPage from "./components/LandingPage";

const App = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [isSystemReady, setIsSystemReady] = useState(false);

  useEffect(() => {
    // Set a small timeout to ensure the system starts loading immediately
    const timer = setTimeout(() => {
      setIsSystemReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black">
      {showLanding && (
        <LandingPage 
          onExplore={() => setShowLanding(false)} 
          showExploreButton={isSystemReady}
        />
      )}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          !isSystemReady ? 'opacity-0' : showLanding ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ pointerEvents: showLanding ? 'none' : 'auto' }}
      >
        <Suspense fallback={null}>
          <SolarSystem />
        </Suspense>
      </div>
    </div>
  );
};

export default App;