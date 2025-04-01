import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import Planet from "./Planet";
import Sun from "./Sun";
import OrbitPath from "./OrbitPath";
import ChaseCamera from "./cameras/ChaseCamera";
import OrbitCamera from "./cameras/OrbitCamera";
import planets from "../data/planets";

const SolarSystem = () => {
  const [followedPlanet, setFollowedPlanet] = useState<string | null>(null);
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [cameraMode, setCameraMode] = useState<'orbit' | 'chase'>('orbit');

  const handlePlanetClick = useCallback(
    (planetName: string) => {
      if (planetName !== followedPlanet) {
        setFollowedPlanet(planetName);
        setCameraMode('chase');
      }
    },
    [followedPlanet]
  );

  const handlePlanetPosition = useCallback((position: THREE.Vector3) => {
    setTargetPosition(position);
  }, []);

  const resetView = useCallback(() => {
    setFollowedPlanet(null);
    setTargetPosition(new THREE.Vector3(0, 0, 0));
    setCameraMode('orbit');
  }, []);

  const toggleCameraMode = useCallback(() => {
    setCameraMode(prev => prev === 'orbit' ? 'chase' : 'orbit');
  }, []);

  const planetInfo = followedPlanet
    ? planets.find((planet) => planet.name === followedPlanet)
    : null;

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
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
              <div className="flex flex-col gap-2">
                <button
                  onClick={toggleCameraMode}
                  className="px-4 py-2 text-center cursor-pointer bg-gray-800 font-bold text-white rounded hover:bg-gray-700 transition-colors"
                >
                  {cameraMode === 'orbit' ? 'Switch to Chase Camera' : 'Switch to Orbit Controls'}
                </button>
                <button
                  onClick={resetView}
                  className="px-4 py-2 text-center cursor-pointer bg-gray-800 font-bold text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Reset View
                </button>
              </div>
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

        {/* Cameras */}
        <ChaseCamera 
          target={targetPosition} 
          isActive={followedPlanet !== null && cameraMode === 'chase'} 
        />
        <OrbitCamera
          target={targetPosition}
          isActive={cameraMode === 'orbit'}
        />

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
            onPositionUpdate={followedPlanet === planet.name ? handlePlanetPosition : undefined}
          />
        ))}

        <Stars radius={100} depth={50} count={5000} factor={5} />
      </Canvas>
    </div>
  );
};

export default SolarSystem;