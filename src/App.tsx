import { useState } from 'react';
import SolarSystem from './components/SolarSystem';
import planets from './data/planets';

const App = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  const handlePlanetSelect = (planetName: string) => {
    setSelectedPlanet(planetName === selectedPlanet ? null : planetName);
  };

  const planetInfo = selectedPlanet 
    ? planets.find(planet => planet.name === selectedPlanet)
    : null;

  return (
    <div className="relative w-screen h-screen bg-black">
      <SolarSystem onPlanetSelect={handlePlanetSelect} />
      
      {/* Planet Info Panel */}
      {planetInfo && (
        <div className="absolute top-4 left-4 w-80 bg-gray-900/80 backdrop-blur-sm text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-3">{planetInfo.name}</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Type:</span> {planetInfo.type}</p>
            <p className="mt-4">{planetInfo.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;