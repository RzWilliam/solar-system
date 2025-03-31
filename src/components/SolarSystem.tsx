// SolarSystem.tsx
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei"; // Import OrbitControls
import Planet from "./Planet";
import Sun from "./Sun";
import planets from "../data/planets.ts"; // Import the planets data

const SolarSystem = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{ position: [0, 5, 20], fov: 60 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.15} />
        {/* Point light at the Sun's position */}
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

        {/* Soleil */}
        <Sun />

        {/* Planètes */}
        {planets.map((planet, index) => (
          <Planet
            key={index}
            distance={planet.distance}
            size={planet.size}
            texture={planet.texture}
            speed={planet.speed}
            rotationAngle={planet.rotationAngle}
            rotationSpeed={planet.rotationSpeed}
            bumpMap={planet.bumpMap}
            normalMap={planet.normalMap}
          />
        ))}
        
        {/* Fond étoilé */}
        <Stars radius={100} depth={50} count={2500} factor={5} />
        {/* Contrôles de caméra */}
        <OrbitControls minDistance={0} />
      </Canvas>
    </div>
  );
};

export default SolarSystem;
