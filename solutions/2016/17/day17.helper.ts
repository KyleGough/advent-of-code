export type VaultState = [string, number, number, number];

export const isOpen = (char: string): boolean => {
  return 'bcdef'.includes(char);
};
