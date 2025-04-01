import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface ChaseCameraProps {
  target: THREE.Vector3;
  isActive: boolean;
}

const ChaseCamera = ({ target, isActive }: ChaseCameraProps) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const { camera: defaultCamera } = useThree();
  const initialPositionSet = useRef(false);

  useFrame(() => {
    if (!isActive || !cameraRef.current) return;

    // Calculate desired offset based on target position
    const offset = new THREE.Vector3(-5, 2, -5);
    const desiredPosition = target.clone().add(offset);
    
    // Smoothly interpolate camera position
    cameraRef.current.position.lerp(desiredPosition, 0.02);
    cameraRef.current.lookAt(target);

    // Update default camera to match our camera
    defaultCamera.position.copy(cameraRef.current.position);
    defaultCamera.lookAt(target);
  });

  useEffect(() => {
    if (cameraRef.current && isActive && !initialPositionSet.current) {
      // On first activation, set camera position to current default camera position
      cameraRef.current.position.copy(defaultCamera.position);
      initialPositionSet.current = true;
    }

    return () => {
      if (!isActive) {
        initialPositionSet.current = false;
      }
    };
  }, [isActive, defaultCamera]);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault={isActive}
      position={defaultCamera.position.toArray()}
      fov={50}
    />
  );
};

export default ChaseCamera;