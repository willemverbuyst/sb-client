import { getTeamsForSelector } from '../selector.functions';

describe('#getTeamsForSelector', () => {
  describe('if given an array with objects', () => {
    const testArray = [
      { id: 1, name: 'Xeno', logo: '122' },
      { id: 3, name: 'Freida', logo: '124' },
      { id: 2, name: 'Annie', logo: '12' },
    ];
    const arrayForSelector = [
      { id: 2, name: 'Annie' },
      { id: 3, name: 'Freida' },
      { id: 1, name: 'Xeno' },
    ];

    test('returns array with objects with name and id as keys only, sorted by name', () => {
      expect(getTeamsForSelector(testArray)).toEqual(arrayForSelector);
    });
  });
});
