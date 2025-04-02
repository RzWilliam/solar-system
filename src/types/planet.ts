export interface Planet {
  name: string;
  distance: number;
  size: number;
  texture: string;
  speed: number;
  rotationAngle: number;
  rotationSpeed: number;
  bumpMap?: string;
  normalMap?: string;
  type: string;
  description: string;
}
