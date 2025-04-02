import { useState } from "react";

const LandingPage = ({ onExplore }: { onExplore: () => void }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleExplore = () => {
    setIsAnimating(true);
    setTimeout(onExplore, 1000);
  };

  return (
    <div
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-1000 ${
        isAnimating ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-white mb-6 tracking-wider">
          Solar System Explorer
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Embark on a journey through our cosmic neighborhood. Explore the
          planets, from Mercury's scorched surface to Neptune's icy winds, in
          this interactive 3D experience.
        </p>
        <button
          onClick={handleExplore}
          className="px-8 py-4 bg-white text-black text-xl font-bold rounded-full 
          hover:bg-gray-200 transform hover:scale-105 transition-all duration-300
          focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
        >
          Begin Exploration
        </button>
      </div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 4 + 2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
