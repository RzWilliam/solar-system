import Planet from '../Planet';
import Sun from '../Sun';
import OrbitPath from '../OrbitPath';
import planets from '../../data/planets';
import * as THREE from 'three';

interface PlanetarySystemProps {
  followedPlanet: string | null;
  onPlanetClick: (planetName: string) => void;
  onPlanetPosition: (position: THREE.Vector3) => void;
}

const PlanetarySystem = ({
  followedPlanet,
  onPlanetClick,
  onPlanetPosition,
}: PlanetarySystemProps) => {
  return (
    <>
      <Sun />

      {/* Orbit Paths */}
      {planets.map((planet) => (
        <OrbitPath key={`orbit-${planet.name}`} distance={planet.distance} />
      ))}

      {/* Planets */}
      {planets.map((planet) => (
        <Planet
          key={planet.name}
          {...planet}
          isFollowed={followedPlanet === planet.name}
          onClick={onPlanetClick}
          onPositionUpdate={followedPlanet === planet.name ? onPlanetPosition : undefined}
        />
      ))}
    </>
  );
};

export default PlanetarySystem;