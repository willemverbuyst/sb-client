// type User = {
//   name: string;
//   id: number;
// };

// eslint-disable-next-line
export const sortValues = <U extends keyof T, T extends { [key: string]: any }>(prop: U) => (
  arrayWithValues: T[],
): T[] => {
  const returnValue = [...arrayWithValues].sort((value1, value2) => {
    if (typeof value1[prop] === 'string') {
      return value1[prop].toLowerCase().localeCompare(value2[prop].toLowerCase());
    } else {
      return value1[prop] - value2[prop];
    }
  });
  // console.log(returnValue); // for testing
  return returnValue;
};

// const arrayWithFakeUsers: User[] = [
//   { name: 'Sjaak3', id: 1 },
//   { name: 'Sjaak1', id: 3 },
//   { name: 'Sjaak2', id: 2 },
// ];

// sortValues<keyof User, User>('name')(arrayWithFakeUsers);
// sortValues<keyof User, User>('id')(arrayWithFakeUsers);
