import { sortArrayWithObjects } from '../sort.functions'

describe('#sortArrayWithObjects', () => {
  describe('if given an array with objects and a key', () => {
    const testArray = [
      { id: 1, name: 'Xeno' },
      { id: 3, name: 'Freida' },
      { id: 2, name: 'Annie' },
    ]
    const arraySortedByIdAscending = [
      { id: 1, name: 'Xeno' },
      { id: 2, name: 'Annie' },
      { id: 3, name: 'Freida' },
    ]
    const arraySortedByNameAscending = [
      { id: 2, name: 'Annie' },
      { id: 3, name: 'Freida' },
      { id: 1, name: 'Xeno' },
    ]
    const arraySortedByIdDescending = [
      { id: 3, name: 'Freida' },
      { id: 2, name: 'Annie' },
      { id: 1, name: 'Xeno' },
    ]
    const arraySortedByNameDescending = [
      { id: 1, name: 'Xeno' },
      { id: 3, name: 'Freida' },
      { id: 2, name: 'Annie' },
    ]

    test('returns the array with objects sorted by that key', () => {
      expect(sortArrayWithObjects('id')('ascending')(testArray)).toEqual(
        arraySortedByIdAscending
      )
      expect(sortArrayWithObjects('name')('ascending')(testArray)).toEqual(
        arraySortedByNameAscending
      )
      expect(sortArrayWithObjects('id')('descending')(testArray)).toEqual(
        arraySortedByIdDescending
      )
      expect(sortArrayWithObjects('name')('descending')(testArray)).toEqual(
        arraySortedByNameDescending
      )
    })
  })
})
