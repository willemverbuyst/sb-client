// eslint-disable-next-line
export const getStringsInUpperCase = <U extends keyof T, T extends { [key: string]: any }>(
  array: T[],
  key: U,
): string[] => [...array].map((a) => (typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]));

export const replaceUnderscore = (name: string): string => name.replace('_', ' ');
