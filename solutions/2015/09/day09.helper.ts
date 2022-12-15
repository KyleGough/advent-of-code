type AdjacencyList = Record<string, number>;
type UndirectedGraph = Record<string, AdjacencyList>;

interface Route {
  start: string;
  end: string;
  distance: number;
}

export class Graph {
  graph: UndirectedGraph;
  locations: string[];

  constructor(routes: Route[]) {
    this.locations = [];
    this.graph = {};
    this.addRoutes(routes);
  }

  addRoutes(routes: Route[]) {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      this.addRoute(route.start, route.end, route.distance);
      this.addRoute(route.end, route.start, route.distance);
    }
  }

  addRoute(start: string, end: string, distance: number) {
    if (!this.locations.includes(start)) {
      this.locations.push(start);
    }

    if (start in this.graph) {
      this.graph[start][end] = distance;
    } else {
      const adjacencyList: AdjacencyList = {};
      adjacencyList[end] = distance;
      this.graph[start] = adjacencyList;
    }
  }

  getDistance(from: string, to: string): number {
    return this.graph[from][to];
  }

  getLocations(): string[] {
    return this.locations;
  }

  getTotalDistance(locations: string[]): number {
    let totalDistance = 0;

    for (let i = 0; i < locations.length - 1; i++) {
      totalDistance += this.getDistance(locations[i], locations[i + 1]);
    }

    return totalDistance;
  }
}

export const parseRoute = (route: string): Route => {
  const match = route.match(/(.+) to (.+) = (\d+)/) as RegExpMatchArray;

  return {
    start: match[1],
    end: match[2],
    distance: parseInt(match[3]),
  };
};

// Heap's method to generate all permutations of locations.
export const getLocationPermutations = (locations: string[]): string[][] => {
  const length = locations.length;
  const permutations = [locations.slice()];
  const c = new Array(length).fill(0);
  let i = 1;

  while (i < length) {
    if (c[i] < i) {
      const swapIndex = i % 2 && c[i];
      // Swap locations at index i and k.
      const tmp = locations[i];
      locations[i] = locations[swapIndex];
      locations[swapIndex] = tmp;
      c[i]++;
      i = 1;
      permutations.push(locations.slice());
    } else {
      c[i] = 0;
      i++;
    }
  }

  return permutations;
};
