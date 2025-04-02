import { Suspense } from 'react';
import SolarSystem from './components/SolarSystem';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  return (
    <div className="relative w-screen h-screen bg-black">
      <Suspense fallback={<LoadingScreen />}>
        <SolarSystem />
      </Suspense>
    </div>
  );
};

export default App;