interface BlueprintCost {
  ore: number[];
  clay: number[];
  obsidian: number[];
  geode: number[];
  maxCost: number[];
}

export const parseBlueprint = (input: string): BlueprintCost => {
  const [oreText, clayText, obbyText, geodeText] = input.split('.');
  const oreMatch = oreText.match(/costs (\d+) ore/);
  const clayMatch = clayText.match(/costs (\d+) ore/);
  const obbyMatch = obbyText.match(/costs (\d+) ore and (\d+) clay/);
  const geodeMatch = geodeText.match(/costs (\d+) ore and (\d+) obsidian/);

  if (!oreMatch || !clayMatch || !obbyMatch || !geodeMatch) {
    throw new Error('Unable to parse blueprint');
  }

  const ore = [parseInt(oreMatch[1]), 0, 0];
  const clay = [parseInt(clayMatch[1]), 0, 0];
  const obsidian = [parseInt(obbyMatch[1]), parseInt(obbyMatch[2]), 0];
  const geode = [parseInt(geodeMatch[1]), 0, parseInt(geodeMatch[2])];

  const maxCostOre = Math.max(ore[0], clay[0], obsidian[0], geode[0]);

  return {
    ore,
    clay,
    obsidian,
    geode,
    maxCost: [maxCostOre, obsidian[1], geode[2]],
  };
};

let maxGeodes = 0;

export const countGeodes = (
  blueprint: BlueprintCost,
  timeLimit: number
): number => {
  // Ore, Clay, Obsidian
  const resources = [0, 0, 0];
  const robots = [1, 0, 0];
  maxGeodes = 0;
  simulate(blueprint, timeLimit, resources, robots, 0, 0);
  simulate(blueprint, timeLimit, resources, robots, 0, 1);
  return maxGeodes;
};

const simulate = (
  blueprint: BlueprintCost,
  timeLimit: number,
  resources: number[],
  robots: number[],
  geodeCount: number,
  nextRobot: number
) => {
  // Time limit reached.
  if (timeLimit <= 0) {
    // Keep track of current max, to help branch pruning.
    if (geodeCount > maxGeodes) {
      maxGeodes = geodeCount;
    }
    return;
  }

  // Check if branch cannot produce more geodes than current max.
  const theoreticalMax = geodeCount + ((timeLimit - 1) * timeLimit) / 2;
  if (theoreticalMax < maxGeodes) {
    return;
  }

  const buildOreRobot =
    nextRobot === 0 && canConstruct(resources, blueprint.ore);

  const buildClayRobot =
    nextRobot === 1 && canConstruct(resources, blueprint.clay);

  const buildObbyRobot =
    nextRobot === 2 && canConstruct(resources, blueprint.obsidian);

  const buildGeodeRobot =
    nextRobot === 3 && canConstruct(resources, blueprint.geode);

  const nextBuildOreRobot = timeLimit > 1 && robots[0] < blueprint.maxCost[0];

  const nextBuildClayRobot = timeLimit > 2 && robots[1] < blueprint.maxCost[1];

  const nextBuildObbyRobot =
    timeLimit > 1 && robots[2] < blueprint.maxCost[2] && robots[1] > 0;

  const nextBuildGeodeRobot = robots[2] > 0;

  const newRobots = robots.slice();
  let newResources = resources.slice();

  if (buildOreRobot) {
    newResources = consumeResources(newResources, blueprint.ore);
    newResources = collectResources(newResources, newRobots);
    newRobots[0]++;
  } else if (buildClayRobot) {
    newResources = consumeResources(newResources, blueprint.clay);
    newResources = collectResources(newResources, newRobots);
    newRobots[1]++;
  } else if (buildObbyRobot) {
    newResources = consumeResources(newResources, blueprint.obsidian);
    newResources = collectResources(newResources, newRobots);
    newRobots[2]++;
  } else if (buildGeodeRobot) {
    newResources = consumeResources(newResources, blueprint.geode);
    newResources = collectResources(newResources, newRobots);
    geodeCount += timeLimit - 1;
  } else {
    newResources = collectResources(newResources, newRobots);
    simulate(
      blueprint,
      timeLimit - 1,
      newResources,
      newRobots,
      geodeCount,
      nextRobot
    );
    return;
  }

  // Branch next step according to what robots should be built.
  nextBuildOreRobot &&
    simulate(blueprint, timeLimit - 1, newResources, newRobots, geodeCount, 0);
  nextBuildClayRobot &&
    simulate(blueprint, timeLimit - 1, newResources, newRobots, geodeCount, 1);
  nextBuildObbyRobot &&
    simulate(blueprint, timeLimit - 1, newResources, newRobots, geodeCount, 2);
  nextBuildGeodeRobot &&
    simulate(blueprint, timeLimit - 1, newResources, newRobots, geodeCount, 3);
};

// Determine if there are enough resources to construct a robot.
const canConstruct = (resources: number[], cost: number[]): boolean => {
  for (let i = 0; i < 3; i++) {
    if (cost[i] > resources[i]) return false;
  }
  return true;
};

// Collect resources equal to the number of robots in each resource.
const collectResources = (resources: number[], robots: number[]): number[] => {
  for (let i = 0; i < 3; i++) {
    resources[i] += robots[i];
  }
  return resources;
};

// Consume the require resources to build the desired robot.
const consumeResources = (resources: number[], cost: number[]): number[] => {
  for (let i = 0; i < 3; i++) {
    resources[i] -= cost[i];
  }
  return resources;
};
