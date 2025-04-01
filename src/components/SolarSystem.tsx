import { useState, useCallback, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import Planet from "./Planet";
import Sun from "./Sun";
import OrbitPath from "./OrbitPath";
import planets from "../data/planets";

const SolarSystem = () => {
  const [followedPlanet, setFollowedPlanet] = useState<string | null>(null);
  const controlsRef = useRef();

  const handlePlanetClick = useCallback(
    (planetName: string) => {
      setFollowedPlanet(planetName === followedPlanet ? null : planetName);
    },
    [followedPlanet]
  );

  const resetView = useCallback(() => {
    setFollowedPlanet(null);
  }, []);

  const planetInfo = followedPlanet
    ? planets.find((planet) => planet.name === followedPlanet)
    : null;

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* View Status UI and Planet Info */}

      {/* Planet Info Panel */}
      {planetInfo && (
        <div className="absolute top-4 left-4 z-10 flex items-start gap-4">
          <div className="w-80 bg-gray-900/80 backdrop-blur-sm text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-3">{planetInfo.name}</h2>
            <div className="space-y-4">
              <p>
                <span className="font-semibold">Type:</span> {planetInfo.type}
              </p>
              <p className="mt-4">{planetInfo.description}</p>
              {followedPlanet && (
                <div
                  onClick={resetView}
                  className="mt-4 px-4 py-2 text-center cursor-pointer bg-gray-800 w-100 font-bold text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Reset View
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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

        <Stars radius={100} depth={50} count={5000} factor={5} />

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
