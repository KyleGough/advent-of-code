export class Droplet {
  x: number;
  y: number;
  z: number;
  surfaceArea: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.surfaceArea = 6;
  }

  add(droplet: Droplet) {
    return new Droplet(
      this.x + droplet.x,
      this.y + droplet.y,
      this.z + droplet.z
    );
  }

  equals(droplet: Droplet) {
    return this.x === droplet.x && this.y === droplet.y && this.z === droplet.z;
  }
}

export const parseDroplet = (input: string): Droplet => {
  const matches = input.match(/(?<x>\d+),(?<y>\d+),(?<z>\d+)/)?.groups;

  if (!matches) throw new Error('Unable to parse droplet');

  return new Droplet(
    parseInt(matches.x),
    parseInt(matches.y),
    parseInt(matches.z)
  );
};

export const adjacentChecks: Droplet[] = [
  new Droplet(-1, 0, 0),
  new Droplet(1, 0, 0),
  new Droplet(0, -1, 0),
  new Droplet(0, 1, 0),
  new Droplet(0, 0, -1),
  new Droplet(0, 0, 1),
];
