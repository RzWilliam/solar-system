import { useRef, useMemo } from "react";
import { useFrame, useLoader, extend } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import sunTexture from "/src/assets/textures/sun.jpg";
import SolarFlareShader from "../shaders/SunShader.tsx";

const Sun = () => {
  const sunRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useLoader(THREE.TextureLoader, sunTexture);

  // Création du matériau personnalisé avec le shader
  const customMaterial = useMemo(() => {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        baseTexture: { value: texture },
      },
      vertexShader: SolarFlareShader.vertexShader,
      fragmentShader: SolarFlareShader.fragmentShader,
    });
    return material;
  }, [texture]);

  // Animation du soleil
  useFrame(({ clock }) => {
    if (sunRef.current) {
      // Rotation du soleil
      sunRef.current.rotation.y += 0.001;
      
      // Mise à jour du temps pour les shaders
      if (materialRef.current) {
        materialRef.current.uniforms.time.value = clock.getElapsedTime();
      }
    }
  });

  return (
    <>
      {/* Lumière émise par le soleil */}
      <pointLight
        color="#ff8c00"
        intensity={2}
        distance={50}
        decay={2}
        position={[0, 0, 0]}
      />

      {/* Effet de bloom pour l'aura solaire */}
      <EffectComposer>
        <Bloom 
          intensity={1.5}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          radius={0.8}
        />
      </EffectComposer>

      {/* Soleil avec effets d'éruptions */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <shaderMaterial 
          ref={materialRef} 
          attach="material"
          {...customMaterial}
          transparent
        />
      </mesh>
    </>
  );
};

export default Sun;