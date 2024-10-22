export type Wire = {
  horizontal: HorizontalLine[];
  vertical: VerticalLine[];
  vertices: [number, number][];
};

type HorizontalLine = {
  xMin: number;
  xMax: number;
  y: number;
};

type VerticalLine = {
  yMin: number;
  yMax: number;
  x: number;
};

export const parseWire = (path: string): Wire => {
  let x = 0;
  let y = 0;

  const wire: Wire = {
    horizontal: [],
    vertical: [],
    vertices: [[0, 0]],
  };

  for (const ins of path.split(',')) {
    const steps = parseInt(ins.slice(1));

    switch (ins.charAt(0)) {
      case 'U':
        wire.vertical.push({
          x,
          yMin: y,
          yMax: y + steps,
        });
        y += steps;
        break;
      case 'D':
        wire.vertical.push({
          x,
          yMin: y - steps,
          yMax: y,
        });
        y -= steps;
        break;
      case 'L':
        wire.horizontal.push({
          y,
          xMin: x - steps,
          xMax: x,
        });
        x -= steps;
        break;
      case 'R':
        wire.horizontal.push({
          y,
          xMin: x,
          xMax: x + steps,
        });
        x += steps;
        break;
    }

    wire.vertices.push([x, y]);
  }

  return wire;
};

const overlaps = (hLine: HorizontalLine, vLine: VerticalLine): boolean => {
  return (
    hLine.y >= vLine.yMin &&
    hLine.y <= vLine.yMax &&
    vLine.x >= hLine.xMin &&
    vLine.x <= hLine.xMax
  );
};

export const getIntersections = (
  wireA: Wire,
  wireB: Wire
): [number, number][] => {
  return [
    ...getIntersectionsInner(wireA, wireB),
    ...getIntersectionsInner(wireB, wireA),
  ];
};

const getIntersectionsInner = (
  wireA: Wire,
  wireB: Wire
): [number, number][] => {
  const intersections: [number, number][] = [];

  for (const hLine of wireA.horizontal) {
    for (const vLine of wireB.vertical) {
      if (vLine.x === 0 && hLine.y === 0) {
        continue;
      }
      if (overlaps(hLine, vLine)) {
        intersections.push([vLine.x, hLine.y]);
      }
    }
  }

  return intersections;
};
