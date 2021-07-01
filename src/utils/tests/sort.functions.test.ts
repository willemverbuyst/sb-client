import { sortArrayWithObjects } from '../sort.functions';

describe('#sortArrayWithObjects', () => {
  describe('if given an array with objects and a key', () => {
    const testArray = [
      { id: 1, name: 'Xeno' },
      { id: 3, name: 'Freida' },
      { id: 2, name: 'Annie' },
    ];
    const arraySortedById = [
      { id: 1, name: 'Xeno' },
      { id: 2, name: 'Annie' },
      { id: 3, name: 'Freida' },
    ];
    const arraySortedByName = [
      { id: 2, name: 'Annie' },
      { id: 3, name: 'Freida' },
      { id: 1, name: 'Xeno' },
    ];

    test('returns the array with objects sorted by that key', () => {
      expect(sortArrayWithObjects('id')(testArray)).toEqual(arraySortedById);
      expect(sortArrayWithObjects('name')(testArray)).toEqual(arraySortedByName);
    });
  });
});
