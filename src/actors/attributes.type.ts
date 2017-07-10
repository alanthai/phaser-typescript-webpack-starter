export interface Attributes {
  speed: { x: number; y: number };
}

export function createDefaultAttributes(): Attributes {
  return {
    speed: { x: 0, y: 0 },
  };
}
