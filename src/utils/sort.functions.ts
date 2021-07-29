export const sortArrayWithObjects = <
  U extends keyof T,
  // eslint-disable-next-line
  T extends { [key: string]: any }
>(
  prop: U,
) => (arrayWithObjects: T[]): T[] => {
  const sortedArrayWithObjects = [...arrayWithObjects].sort(
    (object1, object2): number => {
      const value1 = object1[prop];
      const value2 = object2[prop];
      if (typeof value1 === 'string' && typeof value2 === 'string') {
        return value1.toLowerCase().localeCompare(value2.toLowerCase());
      } else if (typeof value1 === 'number' && typeof value2 === 'number') {
        return value2 - value1;
      } else {
        return 1;
      }
    },
  );

  return sortedArrayWithObjects;
};
