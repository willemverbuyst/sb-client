import { sortArrayWithObjects } from '../sort.functions';

describe('if given a string with an underscore', () => {
  const testArray = [
    { id: 1, name: 'xeno' },
    { id: 3, name: 'Freida' },
    { id: 2, name: 'Annie' },
  ];
  const arraySortedById = [
    { id: 1, name: 'xeno' },
    { id: 2, name: 'Annie' },
    { id: 3, name: 'Freida' },
  ];
  const arraySortedByName = [
    { id: 2, name: 'Annie' },
    { id: 3, name: 'Freida' },
    { id: 1, name: 'xeno' },
  ];
  test('returns a string without the underscore', () => {
    expect(sortArrayWithObjects('id')(testArray)).toEqual(arraySortedById);
    expect(sortArrayWithObjects('name')(testArray)).toEqual(arraySortedByName);
  });
});
