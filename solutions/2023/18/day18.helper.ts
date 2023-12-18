import { sum } from '@utilities/reduce';

export const getArea = (steps: [string, number][]): number => {
  const vertices = getVertices(steps);
  const boundaryPoints = steps.map((i) => i[1]).reduce(sum);

  vertices.push(vertices[0]);
  vertices.push(vertices[1]);

  // Shoelace formula.
  let area = 0;
  for (let i = 0; i < vertices.length - 1; i++) {
    area +=
      (vertices[i][1] + vertices[i + 1][1]) *
      (vertices[i][0] - vertices[i + 1][0]);
  }

  area = area / 2;

  // Pick's theorem.
  return area + boundaryPoints / 2 + 1;
};

export const getVertices = (steps: [string, number][]): number[][] => {
  const vertices = [];
  let x = 0;
  let y = 0;

  for (const [direction, count] of steps) {
    switch (direction) {
      case 'U':
        y -= count;
        break;
      case 'D':
        y += count;
        break;
      case 'L':
        x -= count;
        break;
      case 'R':
        x += count;
        break;
    }

    vertices.push([x, y]);
  }

  return vertices;
};
