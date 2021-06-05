// eslint-disable-next-line
export const sortArrayWithObjects = <U extends keyof T, T extends { [key: string]: any }>(prop: U) => (
  arrayWithObjects: T[],
): T[] => {
  const sortedArrayWithObjects = [...arrayWithObjects].sort((object1, object2): number => {
    const value1 = object1[prop];
    const value2 = object2[prop];
    if (typeof value1 === 'string' && typeof value2 === 'string') {
      return value1.toLowerCase().localeCompare(value2.toLowerCase());
    } else if (typeof value1 === 'number' && typeof value2 === 'number') {
      return value1 - value2;
    } else {
      return 1;
    }
  });
  // console.log(sortedArrayWithObjects); // for testing
  return sortedArrayWithObjects;
};

// TO TEST SORT FUNCTION
// type User = {
//   name: string;
//   id: number;
// };

// const arrayWithFakeUsers: User[] = [
//   { name: 'Sjaak3', id: 1 },
//   { name: 'Sjaak1', id: 3 },
//   { name: 'Sjaak2', id: 2 },
// ];

// sortArrayWithObjects<keyof User, User>('name')(arrayWithFakeUsers);
// sortArrayWithObjects<keyof User, User>('id')(arrayWithFakeUsers);
