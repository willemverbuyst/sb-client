import {
  getOutCome,
  getPrediction,
  getPrivatePrediction,
  getPublicPrediction,
  getTemporaryPrediction,
} from '../card.functions'
import { getTimeFromTimeStamp } from '../time.functions'

describe('getTemporaryPrediction', () => {
  describe('if given goals', () => {
    test('returns a string with the prediction', () => {
      expect(
        getTemporaryPrediction({ pGoalsHomeTeam: 0, pGoalsAwayTeam: 0 })
      ).toBe(' [ 0 - 0 ] ')
      expect(
        getTemporaryPrediction({ pGoalsHomeTeam: 3, pGoalsAwayTeam: 9 })
      ).toBe(' [ 3 - 9 ] ')
      expect(
        getTemporaryPrediction({ pGoalsHomeTeam: null, pGoalsAwayTeam: null })
      ).toBe(' [ geen ] ')
    })
  })
})

describe('getPrivatePrediction', () => {
  describe('if given goals, status and timestamp', () => {
    // 1610206200 = Sat 9 Jan 2021
    // 1910206200 = Sat Jul 13 2030
    test('returns a string with the prediction"', () => {
      expect(
        getPrivatePrediction({
          pGoalsHomeTeam: 0,
          pGoalsAwayTeam: 0,
          status: 'Match Finished',
          eventTimeStamp: 1610206200,
        })
      ).toBe('Je voorspelling was 0 - 0')
      expect(
        getPrivatePrediction({
          pGoalsHomeTeam: null,
          pGoalsAwayTeam: null,
          status: 'Match Finished',
          eventTimeStamp: 1610206200,
        })
      ).toBe('Geen voorspelling gedaan')
      expect(
        getPrivatePrediction({
          pGoalsHomeTeam: null,
          pGoalsAwayTeam: null,
          status: 'Not Started',
          eventTimeStamp: 1910206200,
        })
      ).toBe('Nog geen voorspelling')
      expect(
        getPrivatePrediction({
          pGoalsHomeTeam: 3,
          pGoalsAwayTeam: 3,
          status: 'Not Started',
          eventTimeStamp: 1910206200,
        })
      ).toBe('Je voorspelling is 3 - 3')
      // Now minus one minute
      expect(
        getPrivatePrediction({
          pGoalsHomeTeam: 2,
          pGoalsAwayTeam: 2,
          status: 'Not Started',
          eventTimeStamp: Math.floor(Date.now() / 1000) - 60,
        })
      ).toBe('Voorspelling [ 2 - 2 ] gesloten')
    })
  })
})

describe('getPublicPrediction', () => {
  describe('if given goals, status and username', () => {
    test('returns a string with the prediction"', () => {
      expect(
        getPublicPrediction({
          pGoalsHomeTeam: 0,
          pGoalsAwayTeam: 0,
          status: 'Match Finished',
          userNamePlayer: 'Sifan',
        })
      ).toBe("Sifan's voorspelling: 0 - 0")
      expect(
        getPublicPrediction({
          pGoalsHomeTeam: null,
          pGoalsAwayTeam: null,
          status: 'Match Finished',
          userNamePlayer: 'Sifan',
        })
      ).toBe('Geen voorspelling')
      expect(
        getPublicPrediction({
          pGoalsHomeTeam: null,
          pGoalsAwayTeam: null,
          status: 'Not Started',
          userNamePlayer: 'Sifan',
        })
      ).toBe('Wedstrijd nog niet gespeeld.')
      expect(
        getPublicPrediction({
          pGoalsHomeTeam: 3,
          pGoalsAwayTeam: 3,
          status: 'Not Started',
          userNamePlayer: 'Sifan',
        })
      ).toBe('Wedstrijd nog niet gespeeld.')
    })
  })
})

describe('getPrediction', () => {
  describe('if given goals, status, timestamp, display and username', () => {
    // 1610206200 = Sat 9 Jan 2021
    // 1910206200 = Sat Jul 13 2030
    test('returns a string with the prediction"', () => {
      expect(
        getPrediction({
          pGoalsHomeTeam: 0,
          pGoalsAwayTeam: 0,
          status: 'Match Finished',
          eventTimeStamp: 1610206200,
          display: 'private',
          userNamePlayer: 'Sifan',
        })
      ).toBe(
        getPrivatePrediction({
          pGoalsHomeTeam: 0,
          pGoalsAwayTeam: 0,
          status: 'Match Finished',
          eventTimeStamp: 1610206200,
        })
      )
      expect(
        getPrediction({
          pGoalsHomeTeam: 3,
          pGoalsAwayTeam: 3,
          status: 'Not Started',
          eventTimeStamp: 1910206200,
          display: 'private',
          userNamePlayer: 'Sifan',
        })
      ).toBe(
        getPrivatePrediction({
          pGoalsHomeTeam: 3,
          pGoalsAwayTeam: 3,
          status: 'Not Started',
          eventTimeStamp: 1910206200,
        })
      )
      expect(
        getPrediction({
          pGoalsHomeTeam: 0,
          pGoalsAwayTeam: 0,
          status: 'Match Finished',
          eventTimeStamp: 1610206200,
          display: 'public',
          userNamePlayer: 'Sifan',
        })
      ).toBe(
        getPublicPrediction({
          pGoalsHomeTeam: 0,
          pGoalsAwayTeam: 0,
          status: 'Match Finished',
          userNamePlayer: 'Sifan',
        })
      )
      expect(
        getPrediction({
          pGoalsHomeTeam: 3,
          pGoalsAwayTeam: 3,
          status: 'Not Started',
          eventTimeStamp: 1910206200,
          display: 'public',
          userNamePlayer: 'Sifan',
        })
      ).toBe(
        getPublicPrediction({
          pGoalsHomeTeam: 3,
          pGoalsAwayTeam: 3,
          status: 'Not Started',
          userNamePlayer: 'Sifan',
        })
      )
    })
  })
})

describe('getOutCome', () => {
  describe('if give status, goals and timestamp', () => {
    // 1610206200 = Sat 9 Jan 2021
    // 1910206200 = Sat Jul 13 2030
    test('returns a string with the outcome or time of the match"', () => {
      expect(
        getOutCome({
          status: 'Match Finished',
          goalsHomeTeam: 0,
          goalsAwayTeam: 0,
          eventTimeStamp: 1610206200,
        })
      ).toBe('0 - 0')
      expect(
        getOutCome({
          status: 'Time to be defined',
          goalsHomeTeam: null,
          goalsAwayTeam: null,
          eventTimeStamp: 1910206200,
        })
      ).toBe('t.b.a.')
      expect(
        getOutCome({
          status: 'Not Started',
          goalsHomeTeam: null,
          goalsAwayTeam: null,
          eventTimeStamp: 1910206200,
        })
      ).toBe(getTimeFromTimeStamp(1910206200))
    })
  })
})
