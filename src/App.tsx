import { Suspense, useState, useEffect } from "react";
import SolarSystem from "./components/SolarSystem";
import LandingPage from "./components/LandingPage";

const App = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [isPreloaded, setIsPreloaded] = useState(false);

  return (
    <div className="relative w-screen h-screen bg-black">
      {showLanding && <LandingPage onExplore={() => setShowLanding(false)} />}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          showLanding ? "opacity-0" : "opacity-100"
        }`}
      >
        <Suspense fallback={null}>
          <SolarSystem />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
