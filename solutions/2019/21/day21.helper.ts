export const parseSpringScript = (springScript: string[]): number[] => {
  const asciiInput = [];
  for (const line of springScript) {
    asciiInput.push(...line.split('').map((c) => c.charCodeAt(0)));
    asciiInput.push(10);
  }

  return asciiInput;
};
