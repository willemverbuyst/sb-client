import { getStringsInUpperCase, replaceUnderscore } from '../string.functions'

describe('#getStringsInUpperCase', () => {
  describe('if given array of objects and key', () => {
    const arrayForTest = [{ name: 'piet' }, { name: 'sjaak' }]
    const result = ['PIET', 'SJAAK']

    test('returns an array of strings (values) in uppercase', () => {
      expect(getStringsInUpperCase(arrayForTest, 'name')).toEqual(result)
    })
  })
})

describe('#replaceUnderscore', () => {
  describe('if given a string with an underscore', () => {
    test('returns a string without the underscore', () => {
      expect(replaceUnderscore('snake_case')).toBe('snake case')
      expect(replaceUnderscore('snakeCase')).toBe('snakeCase')
    })
  })
})
