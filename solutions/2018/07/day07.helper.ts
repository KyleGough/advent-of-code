export class DependencyGraph {
  dependencies: Dependency[];
  graph: Record<string, string[]>;
  steps: Set<string>;

  constructor(dependencies: Dependency[]) {
    this.dependencies = dependencies;
    this.graph = {};
    this.steps = new Set([
      ...dependencies.map((i) => i.dependency),
      ...dependencies.map((i) => i.step),
    ]);

    this.initialiseGraph();
  }

  initialiseGraph() {
    // Initialise dependency graph.
    this.steps.forEach((step) => {
      this.graph[step] = [];
    });

    // Populate dependency graph.
    this.dependencies.forEach((dependency) => {
      this.graph[dependency.step].push(dependency.dependency);
    });
  }

  nextStep(): string {
    const validSteps = Object.keys(this.graph).filter(
      (i) => !this.graph[i].length && this.steps.has(i)
    );
    validSteps.sort();
    this.steps.delete(validSteps[0]);
    return validSteps[0];
  }

  removeStep(nextStep: string) {
    delete this.graph[nextStep];
    this.steps.forEach((step) => {
      this.graph[step] = this.graph[step].filter((i) => i !== nextStep);
    });
  }

  remainingStepCount(): number {
    return Object.keys(this.graph).length;
  }
}

interface Dependency {
  dependency: string;
  step: string;
}

export const parseDependency = (input: string): Dependency => {
  const words = input.split(' ');
  return {
    dependency: words[1],
    step: words[7],
  };
};
