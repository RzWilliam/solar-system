import { useState, useCallback, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import Planet from "./Planet";
import Sun from "./Sun";
import OrbitPath from "./OrbitPath";
import planets from "../data/planets";

interface SolarSystemProps {
  onPlanetSelect: (planetName: string | null) => void;
}

const SolarSystem = ({ onPlanetSelect }: SolarSystemProps) => {
  const [followedPlanet, setFollowedPlanet] = useState<string | null>(null);
  const controlsRef = useRef();

  const handlePlanetClick = useCallback(
    (planetName: string) => {
      setFollowedPlanet(planetName === followedPlanet ? null : planetName);
      onPlanetSelect(planetName);
    },
    [followedPlanet, onPlanetSelect]
  );

  const resetView = useCallback(() => {
    setFollowedPlanet(null);
    onPlanetSelect(null);
  }, []);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* View Status UI */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-4">
        <div className="text-white text-lg">
          Current view: {followedPlanet || "Overview"}
        </div>
        {followedPlanet && (
          <button
            onClick={resetView}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Reset View
          </button>
        )}
      </div>

      <Canvas
        camera={{ position: [0, 5, 20], fov: 60 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.15} />
        <pointLight
          position={[0, 0, 0]}
          intensity={50}
          distance={50}
          decay={1}
          color="#fffff0"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Sun />

        {/* Orbit Paths */}
        {planets.map((planet) => (
          <OrbitPath key={`orbit-${planet.name}`} distance={planet.distance} />
        ))}

        {/* Planets */}
        {planets.map((planet) => (
          <Planet
            key={planet.name}
            {...planet}
            isFollowed={followedPlanet === planet.name}
            onClick={handlePlanetClick}
          />
        ))}

        <Stars radius={100} depth={50} count={2500} factor={5} />

        {/* OrbitControls is only enabled when not following a planet */}
        {!followedPlanet && (
          <OrbitControls
            ref={controlsRef}
            enabled={!followedPlanet}
            target={[0, 0, 0]}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
          />
        )}
      </Canvas>
    </div>
  );
};

export default SolarSystem;
