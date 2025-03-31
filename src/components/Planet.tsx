import { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface PlanetProps {
  distance: number;
  size: number;
  texture: string; // Path to the texture image
  speed: number;
  rotationAngle: number; // Initial rotation angle in radians
  rotationSpeed: number; // Speed of the planet's self-rotation
  bumpMap?: string; // Optional path to the bump map image
  normalMap?: string; // Optional path to the normal map image
}

const Planet = ({ 
  distance, 
  size, 
  texture, 
  speed, 
  rotationAngle, 
  rotationSpeed, 
  bumpMap, 
  normalMap 
}: PlanetProps) => {
  const ref = useRef<THREE.Mesh>(null);

  // Load the texture using useLoader
  const planetTexture = useLoader(THREE.TextureLoader, texture);
  
  // Load the bump map texture if provided
  const bumpTexture = bumpMap ? useLoader(THREE.TextureLoader, bumpMap) : null;
  
  // Load the normal map texture if provided
  const normalTexture = normalMap ? useLoader(THREE.TextureLoader, normalMap) : null;

  useEffect(() => {
    if (ref.current) {
      // Set the initial position based on the rotationAngle
      ref.current.position.x = Math.cos(rotationAngle) * distance;
      ref.current.position.z = Math.sin(rotationAngle) * distance;
    }
  }, [rotationAngle, distance]);

  useFrame(({ clock }) => {
    if (ref.current) {
      // Orbit around the sun
      ref.current.position.x =
        Math.cos(clock.getElapsedTime() * (speed * 0.1) + rotationAngle) * distance;
      ref.current.position.z =
        Math.sin(clock.getElapsedTime() * (speed * 0.1) + rotationAngle) * distance;

      // Rotate the planet on its axis
      ref.current.rotation.y += rotationSpeed * 0.1;
    }
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <sphereGeometry args={[size, 64, 64]} /> {/* Increased segment count for better detail */}
      <meshStandardMaterial 
        map={planetTexture}
        bumpMap={bumpTexture}
        bumpScale={bumpTexture ? 2.0 : 0} // Increased bump scale for visibility
        normalMap={normalTexture}
        normalScale={normalTexture ? new THREE.Vector2(1, 1) : new THREE.Vector2(0, 0)}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
};

export default Planet;