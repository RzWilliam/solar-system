import { Planet } from '../../types/planet';

interface PlanetInfoPanelProps {
  planetInfo: Planet;
  cameraMode: 'orbit' | 'chase';
  onToggleCamera: () => void;
  onResetView: () => void;
}

const PlanetInfoPanel = ({
  planetInfo,
  cameraMode,
  onToggleCamera,
  onResetView,
}: PlanetInfoPanelProps) => {
  return (
    <div className="absolute top-4 left-4 z-10 flex items-start gap-4">
      <div className="w-80 bg-gray-900/80 backdrop-blur-sm text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-3">{planetInfo.name}</h2>
        <div className="space-y-4">
          <p>
            <span className="font-semibold">Type:</span> {planetInfo.type}
          </p>
          <p className="mt-4">{planetInfo.description}</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={onToggleCamera}
              className="px-4 py-2 text-center cursor-pointer bg-gray-800 font-bold text-white rounded hover:bg-gray-700 transition-colors"
            >
              {cameraMode === 'orbit' ? 'Switch to Chase Camera' : 'Switch to Orbit Controls'}
            </button>
            <button
              onClick={onResetView}
              className="px-4 py-2 text-center cursor-pointer bg-gray-800 font-bold text-white rounded hover:bg-gray-700 transition-colors"
            >
              Reset View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanetInfoPanel;