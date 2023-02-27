export const getCharCounts = (
  messages: string[]
): Array<Record<string, number>> => {
  const messageLength = messages[0].length;
  const counts: Array<Record<string, number>> = Array(messageLength);

  // Initialise counts array with empty objects.
  for (let i = 0; i < counts.length; i++) {
    counts[i] = {};
  }

  // Count and store characters in each message position.
  for (let i = 0; i < messages.length; i++) {
    for (let j = 0; j < messageLength; j++) {
      const char = messages[i][j];
      counts[j][char] = counts[j][char] ? counts[j][char] + 1 : 1;
    }
  }

  return counts;
};
