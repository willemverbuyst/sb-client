import { TOTAL_ROUNDS } from '../../constants/setupGame'
import {
  calculateIndex,
  roundByTotoRound,
  totoRoundByRound,
} from '../parameter.functions'

describe('#roundByTotoRound', () => {
  describe('if given a totoRound number', () => {
    test('returns the first round of that toto round', () => {
      expect(roundByTotoRound(1)).toBe(1)
      expect(roundByTotoRound(3)).toBe(7)
      expect(roundByTotoRound(11)).toBe(31)
    })
  })
})

describe('#totoRoundByRound', () => {
  describe('if given a round number', () => {
    test('returns the toto round number of that round', () => {
      expect(totoRoundByRound(1)).toBe(1)
      expect(totoRoundByRound(13)).toBe(5)
      expect(totoRoundByRound(8)).toBe(3)
      expect(totoRoundByRound(TOTAL_ROUNDS)).toBe(11)
    })
  })
})

describe('#calculateIndex', () => {
  describe('if given a round number', () => {
    test('returns the index of that round in the array', () => {
      expect(calculateIndex(1)).toBe(0)
      expect(calculateIndex(13)).toBe(0)
      expect(calculateIndex(8)).toBe(1)
      expect(calculateIndex(9)).toBe(2)
      expect(calculateIndex(TOTAL_ROUNDS)).toBe(3)
    })
  })
})
