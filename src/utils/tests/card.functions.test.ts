import {
  getOutCome,
  getPrediction,
  getPrivatePrediction,
  getPublicPrediction,
  getTemporaryPrediction,
} from '../card.functions'
import { getTimeFromTimeStamp } from '../time.functions'

describe('#getTemporaryPrediction', () => {
  describe('if given goals', () => {
    test('returns a string with the prediction', () => {
      expect(getTemporaryPrediction(0, 0)).toBe(' [ 0 - 0 ] ')
      expect(getTemporaryPrediction(3, 9)).toBe(' [ 3 - 9 ] ')
      expect(getTemporaryPrediction(null, null)).toBe(' [ geen ] ')
    })
  })
})

describe('#getPrivatePrediction', () => {
  describe('if given goals, status and timestamp', () => {
    // 1610206200 = Sat 9 Jan 2021
    // 1910206200 = Sat Jul 13 2030
    test('returns a string with the prediction"', () => {
      expect(getPrivatePrediction(0, 0, 'Match Finished', 1610206200)).toBe(
        'Je voorspelling was 0 - 0'
      )
      expect(
        getPrivatePrediction(null, null, 'Match Finished', 1610206200)
      ).toBe('Geen voorspelling gedaan')
      expect(getPrivatePrediction(null, null, 'Not Started', 1910206200)).toBe(
        'Nog geen voorspelling'
      )
      expect(getPrivatePrediction(3, 3, 'Not Started', 1910206200)).toBe(
        'Je voorspelling is 3 - 3'
      )
      // Now minus one minute
      expect(
        getPrivatePrediction(
          2,
          2,
          'Not Started',
          Math.floor(Date.now() / 1000) - 60
        )
      ).toBe('Voorspelling [ 2 - 2 ] gesloten')
    })
  })
})

describe('#getPublicPrediction', () => {
  describe('if given goals, status and username', () => {
    test('returns a string with the prediction"', () => {
      expect(getPublicPrediction(0, 0, 'Match Finished', 'Sifan')).toBe(
        "Sifan's voorspelling: 0 - 0"
      )
      expect(getPublicPrediction(null, null, 'Match Finished', 'Sifan')).toBe(
        'Geen voorspelling'
      )
      expect(getPublicPrediction(null, null, 'Not Started', 'Sifan')).toBe(
        'Wedstrijd nog niet gespeeld.'
      )
      expect(getPublicPrediction(3, 3, 'Not Started', 'Sifan')).toBe(
        'Wedstrijd nog niet gespeeld.'
      )
    })
  })
})

describe('#getPrediction', () => {
  describe('if given goals, status, timestamp, display and username', () => {
    // 1610206200 = Sat 9 Jan 2021
    // 1910206200 = Sat Jul 13 2030
    test('returns a string with the prediction"', () => {
      expect(
        getPrediction(0, 0, 'Match Finished', 1610206200, 'private', 'Sifan')
      ).toBe(getPrivatePrediction(0, 0, 'Match Finished', 1610206200))
      expect(
        getPrediction(3, 3, 'Not Started', 1910206200, 'private', 'Sifan')
      ).toBe(getPrivatePrediction(3, 3, 'Not Started', 1910206200))
      expect(
        getPrediction(0, 0, 'Match Finished', 1610206200, 'public', 'Sifan')
      ).toBe(getPublicPrediction(0, 0, 'Match Finished', 'Sifan'))
      expect(
        getPrediction(3, 3, 'Not Started', 1910206200, 'public', 'Sifan')
      ).toBe(getPublicPrediction(3, 3, 'Not Started', 'Sifan'))
    })
  })
})

describe('#getOutCome', () => {
  describe('if give status, goals and timestamp', () => {
    // 1610206200 = Sat 9 Jan 2021
    // 1910206200 = Sat Jul 13 2030
    test('returns a string with the outcome or time of the match"', () => {
      expect(getOutCome('Match Finished', 0, 0, 1610206200)).toBe('0 - 0')
      expect(getOutCome('Time to be defined', null, null, 1910206200)).toBe(
        't.b.a.'
      )
      expect(getOutCome('Not Started', null, null, 1910206200)).toBe(
        getTimeFromTimeStamp(1910206200)
      )
    })
  })
})
