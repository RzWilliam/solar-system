import * as THREE from "three";

interface OrbitPathProps {
  distance: number;
}

const OrbitPath = ({ distance }: OrbitPathProps) => {
  const points = [];
  const segments = 64;

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * distance,
        0,
        Math.sin(theta) * distance
      )
    );
  }

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial
        attach="material"
        color="#666666"
        opacity={0.5}
        transparent
      />
    </line>
  );
};

export default OrbitPath;
