export type Dimension = 'x' | 'y' | 'z';

export class Vec {
  x: number;
  y: number;
  z: number;

  constructor(input: string) {
    const vec = input.split(',').map((i) => parseInt(i));
    this.x = vec[0];
    this.y = vec[1];
    this.z = vec[2];
  }

  add(vec: Vec) {
    this.x += vec.x;
    this.y += vec.y;
    this.z += vec.z;
  }

  get(dim: Dimension) {
    return this[dim];
  }

  size() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
}

export class Particle {
  position: Vec;
  velocity: Vec;
  acceleration: Vec;
  id: number;

  constructor(id: number, position: Vec, velocity: Vec, acceleration: Vec) {
    this.id = id;
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
  }
}

export const parseParticle = (input: string, id: number): Particle => {
  const matches = input.matchAll(/-?\d+,-?\d+,-?\d+/g);
  const vectors = [...matches].map((i) => new Vec(i[0]));
  return new Particle(id, vectors[0], vectors[1], vectors[2]);
};
