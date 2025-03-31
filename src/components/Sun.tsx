import { useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import sunTexture from "/src/assets/textures/sun.jpg";

const Sun = () => {
  const sunRef = useRef<THREE.Mesh>(null);
  const [emissiveIntensity, setEmissiveIntensity] = useState(0.8);
  const texture = useLoader(THREE.TextureLoader, sunTexture);

  return (
    <>
      {/* Lumière émise par le soleil */}
      <pointLight
        color="#ff8c00"
        intensity={1}
        distance={50}
        decay={2}
        position={[0, 0, 0]}
      />

      {/* Soleil intérieur */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive="#ff8c00"
          emissiveIntensity={emissiveIntensity}
          emissiveMap={texture}
          toneMapped={false}
          color="#ffffff"
        />
      </mesh>
    </>
  );
};

export default Sun;
