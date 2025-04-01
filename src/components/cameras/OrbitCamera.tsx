import { useRef, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface OrbitCameraProps {
  target: THREE.Vector3;
  isActive: boolean;
}

const OrbitCamera = ({ target, isActive }: OrbitCameraProps) => {
  const controlsRef = useRef<any>();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.copy(target);
    }
  }, [target]);

  return (
    <OrbitControls
      ref={controlsRef}
      target={target}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={3}
      maxDistance={50}
      makeDefault={isActive}
      enabled={isActive}
    />
  );
};

export default OrbitCamera;
