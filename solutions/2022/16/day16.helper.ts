interface Valve {
  name: string;
  flowRate: number;
  connections: Record<string, number>;
  open: boolean;
}

type ValveNetwork = Record<string, Valve>;

export const parseValve = (valveString: string): Valve => {
  const matches = valveString.match(
    /Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? (.+)/
  );

  if (!matches) throw new Error('Unable to parse valve');

  const connections: Record<string, number> = {};
  const connectionArray = matches[3].split(', ');

  for (let i = 0; i < connectionArray.length; i++) {
    connections[connectionArray[i]] = 1;
  }

  return {
    name: matches[1],
    flowRate: parseInt(matches[2]),
    connections,
    open: false,
  };
};

const getZeroFlowValves = (valves: Valve[]): string[] =>
  valves.filter((valve) => valve.flowRate === 0).map((valve) => valve.name);

const initialValveNetwork = (valves: Valve[]): ValveNetwork => {
  const valveNetwork: ValveNetwork = {};

  for (let i = 0; i < valves.length; i++) {
    valveNetwork[valves[i].name] = valves[i];
  }

  return valveNetwork;
};

// Optimise network by removing zero flow valves.
const optimiseValveNetwork = (
  valveNetwork: ValveNetwork,
  zeroFlowValves: string[]
) => {
  for (let i = 0; i < zeroFlowValves.length; i++) {
    const removalValve = valveNetwork[zeroFlowValves[i]];
    const connections = Object.keys(removalValve.connections);

    for (let x = 0; x < connections.length - 1; x++) {
      for (let y = x + 1; y < connections.length; y++) {
        const valveA = connections[x];
        const valveB = connections[y];
        const distance =
          removalValve.connections[valveA] + removalValve.connections[valveB];

        const previousDistanceA = valveNetwork[valveA].connections[valveB];
        const previousDistanceB = valveNetwork[valveB].connections[valveA];

        valveNetwork[valveA].connections[valveB] = previousDistanceA
          ? Math.min(previousDistanceA, distance)
          : distance;

        valveNetwork[valveB].connections[valveA] = previousDistanceB
          ? Math.min(previousDistanceB, distance)
          : distance;

        delete valveNetwork[valveA].connections[removalValve.name];
        delete valveNetwork[valveB].connections[removalValve.name];
      }
    }

    delete valveNetwork[zeroFlowValves[i]];
  }
};

// Populate the missing edges using Floyd-Warshall algorithm O(V^3).
const populateEdges = (valveNetwork: ValveNetwork) => {
  const valveNames = Object.keys(valveNetwork);

  // Initialise valve network.
  for (let i = 0; i < valveNames.length; i++) {
    const valveA = valveNames[i];
    for (let j = 0; j < valveNames.length; j++) {
      const valveB = valveNames[j];
      if (i === j) {
        valveNetwork[valveA].connections[valveB] = 0;
      } else if (!valveNetwork[valveA].connections[valveB]) {
        valveNetwork[valveA].connections[valveB] = Number.MAX_VALUE;
      }
    }
  }

  for (let k = 0; k < valveNames.length; k++) {
    const valveK = valveNames[k];
    for (let i = 0; i < valveNames.length; i++) {
      const valveI = valveNames[i];
      for (let j = 0; j < valveNames.length; j++) {
        const valveJ = valveNames[j];
        const distIJ = valveNetwork[valveI].connections[valveJ];
        const distIK = valveNetwork[valveI].connections[valveK];
        const distKJ = valveNetwork[valveK].connections[valveJ];

        if (distIJ > distIK + distKJ) {
          valveNetwork[valveI].connections[valveJ] = distIK + distKJ;
        }
      }
    }
  }

  return valveNetwork;
};

export const constructValveNetwork = (valves: Valve[]): ValveNetwork => {
  const zeroFlowValves = getZeroFlowValves(valves).filter((i) => i !== 'AA');
  const valveNetwork = initialValveNetwork(valves);
  optimiseValveNetwork(valveNetwork, zeroFlowValves);
  populateEdges(valveNetwork);
  return valveNetwork;
};

export const getTotalFlow = (
  valveNetwork: ValveNetwork,
  route: string[],
  timeLimit: number
): number => {
  let time = 0;
  let flowRate = 0;
  let totalFlow = 0;

  for (let i = 1; i < route.length; i++) {
    const currentValve = route[i - 1];
    const nextValve = route[i];
    const dist = valveNetwork[currentValve].connections[nextValve];

    // Traverse tunnel.
    time += dist;
    totalFlow += dist * flowRate;

    // Open Valve
    time++;
    totalFlow += flowRate;
    flowRate += valveNetwork[nextValve].flowRate;
  }

  // Add flow if there is remaining time.
  if (time < timeLimit) {
    totalFlow += (timeLimit - time) * flowRate;
  }

  return totalFlow;
};

// Get all routes that satisfy the time limit.
export const getAllRoutes = (
  valveNetwork: ValveNetwork,
  valveNames: string[],
  timeLimit: number
): string[][] => {
  const routes: string[][] = [];

  // Get all route combinations.
  const getRoutes = (
    time: number,
    closedValves: string[],
    openValves: string[] = [],
    currentValve = 'AA'
  ) => {
    routes.push(openValves);

    for (let i = 0; i < closedValves.length; i++) {
      const nextValve = closedValves[i];
      const dist = valveNetwork[currentValve].connections[nextValve];

      if (time - 1 - dist > 0) {
        getRoutes(
          time - 1 - dist,
          closedValves.filter((i) => i !== nextValve),
          [...openValves, nextValve],
          nextValve
        );
      }
    }
  };

  getRoutes(
    timeLimit,
    valveNames.filter((i) => i !== 'AA')
  );

  return routes;
};
