import { useRef, useEffect } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface PlanetProps {
  name: string;
  distance: number;
  size: number;
  texture: string;
  speed: number;
  rotationAngle: number;
  rotationSpeed: number;
  bumpMap?: string;
  normalMap?: string;
  isFollowed?: boolean;
  onClick: (name: string) => void;
  onPositionUpdate?: (position: THREE.Vector3) => void;
}

const Planet = ({
  name,
  distance,
  size,
  texture,
  speed,
  rotationAngle,
  rotationSpeed,
  bumpMap,
  normalMap,
  isFollowed = false,
  onClick,
  onPositionUpdate,
}: PlanetProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const planetTexture = useLoader(THREE.TextureLoader, texture);
  const bumpTexture = bumpMap ? useLoader(THREE.TextureLoader, bumpMap) : null;
  const normalTexture = normalMap
    ? useLoader(THREE.TextureLoader, normalMap)
    : null;

  useEffect(() => {
    if (ref.current) {
      ref.current.position.x = Math.cos(rotationAngle) * distance;
      ref.current.position.z = Math.sin(rotationAngle) * distance;
    }
  }, [rotationAngle, distance]);

  useFrame(({ clock }) => {
    if (ref.current) {
      // Calculate planet position
      const angle = clock.getElapsedTime() * (speed * 0.1) + rotationAngle;
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;

      // Update planet position
      ref.current.position.x = x;
      ref.current.position.z = z;
      ref.current.rotation.y += rotationSpeed * 0.1;

      // Notify parent component of position update if planet is being followed
      if (isFollowed && onPositionUpdate) {
        onPositionUpdate(new THREE.Vector3(x, 0, z));
      }
    }
  });

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        onClick(name);
      }}
    >
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial
        map={planetTexture}
        bumpMap={bumpTexture}
        bumpScale={bumpTexture ? 2.0 : 0}
        normalMap={normalTexture}
        normalScale={
          normalTexture ? new THREE.Vector2(1, 1) : new THREE.Vector2(0, 0)
        }
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
};

export default Planet;
