import { useState, useCallback, Suspense, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import PlanetarySystem from "./scene/PlanetarySystem";
import ChaseCamera from "./cameras/ChaseCamera";
import OrbitCamera from "./cameras/OrbitCamera";
import PlanetInfoPanel from "./ui/PlanetInfoPanel";
import planets from "../data/planets";

const InitialCamera = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(100, 100, 100);
    camera.lookAt(100, 100, 100);
  }, []);
  
  return null;
};

const SolarSystem = () => {
  const [followedPlanet, setFollowedPlanet] = useState<string | null>(null);
  const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [cameraMode, setCameraMode] = useState<'orbit' | 'chase'>('orbit');
  const [isInitialTransition, setIsInitialTransition] = useState(true);

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

  useEffect(() => {
    if (isInitialTransition) {
      const timer = setTimeout(() => {
        setIsInitialTransition(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const planetInfo = followedPlanet
    ? planets.find((planet) => planet.name === followedPlanet)
    : null;

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {planetInfo && (
        <PlanetInfoPanel
          planetInfo={planetInfo}
          cameraMode={cameraMode}
          onToggleCamera={toggleCameraMode}
          onResetView={resetView}
        />
      )}
      
      <Canvas
        camera={{ position: [0, 5, 20], fov: 60 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          {isInitialTransition && <InitialCamera />}
          
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

          <PlanetarySystem
            followedPlanet={followedPlanet}
            onPlanetClick={handlePlanetClick}
            onPlanetPosition={handlePlanetPosition}
          />

          <ChaseCamera 
            target={targetPosition} 
            isActive={followedPlanet !== null && cameraMode === 'chase'} 
          />
          <OrbitCamera
            target={targetPosition}
            isActive={!isInitialTransition && cameraMode === 'orbit'}
          />

          <Stars radius={300} depth={50} count={5000} factor={5} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SolarSystem;