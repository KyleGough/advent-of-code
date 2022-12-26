export const getStartMarkerIndex = (
  input: string,
  markerLength: number
): number => {
  for (let i = 0; i <= input.length - markerLength; i++) {
    if (new Set(input.slice(i, i + markerLength)).size === markerLength) {
      return i + markerLength;
    }
  }
  return 0;
};
