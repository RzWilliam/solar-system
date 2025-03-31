// SolarSystem.tsx
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei"; // Import OrbitControls
import Planet from "./Planet";
import Sun from "./Sun";

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
        <Planet
          distance={5}
          size={0.6}
          texture="/textures/mercury.png"
          speed={1.2}
          rotationAngle={0}
          rotationSpeed={0.04} // Rotation speed for Mercury
        />
        <Planet
          distance={8}
          size={1}
          texture="/textures/venus.png"
          speed={0.9}
          rotationAngle={Math.PI / 4}
          rotationSpeed={0.02} // Rotation speed for Venus
        />
        <Planet
          distance={11}
          size={1.2}
          texture="/textures/earth.jpg"
          speed={1}
          rotationAngle={Math.PI / 2}
          rotationSpeed={0.01} // Rotation speed for Earth
          bumpMap="/bump/earth.jpg"
          normalMap="/normal/earth.jpg"
        />
        <Planet
          distance={15}
          size={0.8}
          texture="/textures/mars.png"
          speed={0.5}
          rotationAngle={Math.PI}
          rotationSpeed={0.03} // Rotation speed for Mars
        />
        <Planet
          distance={20}
          size={1.5}
          texture="/textures/jupiter.png"
          speed={0.3}
          rotationAngle={Math.PI * 1.5}
          rotationSpeed={0.005} // Rotation speed for Jupiter
        />
        {/* Fond étoilé */}
        <Stars radius={100} depth={50} count={2500} factor={5} />
        {/* Contrôles de caméra */}
        <OrbitControls minDistance={0} />
      </Canvas>
    </div>
  );
};

export default SolarSystem;
