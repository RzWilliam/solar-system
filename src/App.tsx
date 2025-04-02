import { Suspense, useState } from "react";
import SolarSystem from "./components/SolarSystem";
import LoadingScreen from "./components/LoadingScreen";
import LandingPage from "./components/LandingPage";

const App = () => {
  const [showLanding, setShowLanding] = useState(true);

  return (
    <div className="relative w-screen h-screen bg-black">
      {showLanding ? (
        <LandingPage onExplore={() => setShowLanding(false)} />
      ) : (
        <Suspense fallback={<LoadingScreen />}>
          <SolarSystem />
        </Suspense>
      )}
    </div>
  );
};

export default App;
