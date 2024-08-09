import { sum } from '@utilities/reduce';

const stringToCube = (str: string): number[] => str.split(',').map(Number);

const getNeighbours = (cube: number[], convolutions: number[][]): string[] => {
  const neighbours: number[][] = [];

  for (const convolution of convolutions) {
    neighbours.push(cube.map((c, i) => c + convolution[i]));
  }

  return neighbours.map((n) => n.toString());
};

const countActiveNeighbours = (
  cubeStr: string,
  activeCubes: Set<string>,
  convolutions: number[][]
): number => {
  const cube = stringToCube(cubeStr);
  const neighbours = getNeighbours(cube, convolutions);
  let activeNeighbours = 0;

  for (const n of neighbours) {
    if (activeCubes.has(n)) {
      activeNeighbours += 1;
    }
  }

  return activeNeighbours;
};

const getConvolutions = (dimensions: number): number[][] => {
  let convolutions: number[][] = [[]];
  let nextDim = [];

  for (let i = 0; i < dimensions; i++) {
    for (const arr of convolutions) {
      nextDim.push([...arr, -1]);
      nextDim.push([...arr, 0]);
      nextDim.push([...arr, 1]);
    }

    convolutions = nextDim;
    nextDim = [];
  }

  // Filters the convolution for all zeroes.
  return convolutions.filter((arr) => arr.map(Math.abs).reduce(sum) > 0);
};

const iterate = (cubes: number[][], convolutions: number[][]): number[][] => {
  const activeCubes = new Set<string>(cubes.map((c) => c.toString()));
  const nextActiveCubes = new Set<string>();

  const checkCubes: string[] = [];

  // Find all cubes to check in the current iteration.
  for (const cube of cubes) {
    const neighbours = getNeighbours(cube, convolutions);
    checkCubes.push(...neighbours);
  }

  const uniqueCheckCubes = [...new Set<string>(checkCubes)];

  for (const cube of uniqueCheckCubes) {
    const activeNeighbours = countActiveNeighbours(
      cube,
      activeCubes,
      convolutions
    );

    if (
      (activeCubes.has(cube) && activeNeighbours === 2) ||
      activeNeighbours === 3
    ) {
      nextActiveCubes.add(cube);
    }
  }

  return [...nextActiveCubes].map(stringToCube);
};

const parseInitialState = (input: string, dimensions: 3 | 4): number[][] => {
  const grid = input.split('\n').map((row) => row.split(''));

  const cubes: number[][] = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === '#') {
        const cube = [x, y, ...Array(dimensions - 2).fill(0)];
        cubes.push(cube);
      }
    }
  }

  return cubes;
};

export const conwayCubes = (
  input: string,
  dimensions: 3 | 4,
  steps: number
): number => {
  let cubes = parseInitialState(input, dimensions);
  const convolutions = getConvolutions(dimensions);

  for (let i = 0; i < steps; i++) {
    cubes = iterate(cubes, convolutions);
  }

  return cubes.length;
};
