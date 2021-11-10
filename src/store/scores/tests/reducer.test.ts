import {
  IPlayerWithScoreAndPrediction,
  IScoresPlayer,
} from '../../../models/player.model'
import {
  IFixtureWithPlayersWithScoreAndPrediction,
  IRoundWithPlayersWithScore,
  ITotalToto,
  ITotoRoundWithPlayersWithScore,
} from '../../../models/scores.models'
import { IFixture } from '../../../models/toto.models'
import {
  ActionType,
  ResetAllScores,
  StorePlayerScores,
  StoreScoresFixture,
  StoreScoresRound,
  StoreScoresTotalToto,
  StoreScoresTotoRound,
} from '../action-types'
import reducer, { IScoresState } from '../reducer'

describe('#scoresStateReducer', () => {
  describe('if given RESET_ALL_SCORES action type and a state', () => {
    const initialState: IScoresState = {
      fixtureWithScores: null,
      roundScores: null,
      totalTotoScores: null,
      totoRoundScores: null,
      scoresPlayer: null,
    }
    const fixture: IFixture = {
      awayTeamId: 1,
      awayTeamLogo: 'test',
      awayTeamName: 'test',
      createdAt: 'test',
      eventTimeStamp: 1,
      goalsAwayTeam: null,
      goalsHomeTeam: null,
      homeTeamId: 1,
      homeTeamLogo: 'test',
      homeTeamName: 'test',
      id: 1,
      round: 'test',
      status: 'test',
      updatedAt: 'test',
    }
    const predictionWithScorePerPlayer: IPlayerWithScoreAndPrediction = {
      pGoalsAwayTeam: 1,
      pGoalsHomeTeam: 1,
      score: 10,
      name: 'test_user',
      id: 1,
    }
    const fixtureWithScores: IFixtureWithPlayersWithScoreAndPrediction = {
      fixture,
      scores: [predictionWithScorePerPlayer],
    }
    const roundScores: IRoundWithPlayersWithScore = {
      scores: [
        {
          id: 1,
          score: 1,
          name: 'test_user',
        },
      ],
      roundId: 1,
    }
    const totalTotoScores: ITotalToto = {
      scores: [
        {
          score: 10,
          name: 'test_user',
          id: 1,
        },
      ],
    }
    const totoRoundScores: ITotoRoundWithPlayersWithScore = {
      scores: [
        {
          id: 1,
          score: 1,
          name: 'test_user',
        },
      ],
      totoRoundId: 1,
    }
    const scoresPlayer: IScoresPlayer = {
      id: 1,
      scores: [[1], [3]],
      name: 'test_user',
    }
    const state: IScoresState = {
      fixtureWithScores,
      roundScores,
      totalTotoScores,
      totoRoundScores,
      scoresPlayer,
    }
    const action: ResetAllScores = {
      type: ActionType.RESET_ALL_SCORES,
    }
    const newState: IScoresState = reducer(state, action)

    test('returns the initial state', () => {
      expect(newState).toEqual(initialState)
    })
  })

  describe('if given STORE_SCORES_FIXTURE action type and a payload with fixtures', () => {
    const initialState: IScoresState = {
      fixtureWithScores: null,
      roundScores: null,
      totalTotoScores: null,
      totoRoundScores: null,
      scoresPlayer: null,
    }
    const fetchedFixture: IFixture = {
      awayTeamId: 1,
      awayTeamLogo: 'test',
      awayTeamName: 'test',
      createdAt: 'test',
      eventTimeStamp: 1,
      goalsAwayTeam: null,
      goalsHomeTeam: null,
      homeTeamId: 1,
      homeTeamLogo: 'test',
      homeTeamName: 'test',
      id: 1,
      round: 'test',
      status: 'test',
      updatedAt: 'test',
    }
    const predictionWithScorePerPlayer: IPlayerWithScoreAndPrediction = {
      pGoalsAwayTeam: 1,
      pGoalsHomeTeam: 1,
      score: 10,
      name: 'test_user',
      id: 1,
    }
    const fixture: IFixtureWithPlayersWithScoreAndPrediction = {
      fixture: fetchedFixture,
      scores: [predictionWithScorePerPlayer],
    }

    const action: StoreScoresFixture = {
      type: ActionType.STORE_SCORES_FIXTURE,
      payload: fixture,
    }

    const newState: IScoresState = reducer(initialState, action)

    test('returns a state w/ a fixture with scores', () => {
      expect(newState).not.toEqual(initialState)
      expect(newState.roundScores).toBeNull()
      expect(newState.totalTotoScores).toBeNull()
      expect(newState.totoRoundScores).toBeNull()
      expect(newState).toHaveProperty('fixtureWithScores')
      expect(newState.fixtureWithScores).not.toBeNull()
      expect(newState.fixtureWithScores?.scores?.length).toBeGreaterThan(0)
      expect(newState.fixtureWithScores?.scores?.length).toBeLessThan(2)
      expect(newState.fixtureWithScores?.fixture).not.toBeNull()
    })
  })

  describe('if given STORE_SCORES_ROUND action type and a payload with a round', () => {
    const initialState: IScoresState = {
      fixtureWithScores: null,
      roundScores: null,
      totalTotoScores: null,
      totoRoundScores: null,
      scoresPlayer: null,
    }
    const roundScores: IRoundWithPlayersWithScore = {
      scores: [
        {
          id: 1,
          score: 1,
          name: 'test_user',
        },
      ],
      roundId: 1,
    }
    const action: StoreScoresRound = {
      type: ActionType.STORE_SCORES_ROUND,
      payload: roundScores,
    }
    const newState: IScoresState = reducer(initialState, action)

    test('returns a state w/ totoRoundScores', () => {
      expect(newState).not.toEqual(initialState)
      expect(newState.fixtureWithScores).toBeNull()
      expect(newState.totoRoundScores).toBeNull()
      expect(newState.totalTotoScores).toBeNull()
      expect(newState.roundScores).not.toBeNull()
      expect(newState).toHaveProperty('totoRoundScores')
      expect(newState.roundScores?.scores.length).toBeGreaterThan(0)
      expect(newState.roundScores?.scores.length).toBeLessThan(2)
    })
  })

  describe('if given STORE_SCORES_TOTAL_TOTO action type and a payload with totalToto', () => {
    const initialState: IScoresState = {
      fixtureWithScores: null,
      roundScores: null,
      totalTotoScores: null,
      totoRoundScores: null,
      scoresPlayer: null,
    }
    const totalTotoScores: ITotalToto = {
      scores: [
        {
          score: 10,
          name: 'test_user',
          id: 1,
        },
      ],
    }
    const action: StoreScoresTotalToto = {
      type: ActionType.STORE_SCORES_TOTAL_TOTO,
      payload: totalTotoScores,
    }
    const newState: IScoresState = reducer(initialState, action)

    test('returns a state w/ totalTotoScores', () => {
      expect(newState).not.toEqual(initialState)
      expect(newState.fixtureWithScores).toBeNull()
      expect(newState.roundScores).toBeNull()
      expect(newState.totalTotoScores).not.toBeNull()
      expect(newState.totoRoundScores).toBeNull()
      expect(newState).toHaveProperty('totalTotoScores')
      expect(newState.totalTotoScores?.scores.length).toBeGreaterThan(0)
      expect(newState.totalTotoScores?.scores.length).toBeLessThan(2)
    })
  })

  describe('if given STORE_SCORES_TOTO_ROUND action type and a payload with totoRound', () => {
    const initialState: IScoresState = {
      fixtureWithScores: null,
      roundScores: null,
      totalTotoScores: null,
      totoRoundScores: null,
      scoresPlayer: null,
    }
    const totoRoundScores: ITotoRoundWithPlayersWithScore = {
      scores: [
        {
          id: 1,
          score: 1,
          name: 'test_user',
        },
      ],
      totoRoundId: 1,
    }
    const action: StoreScoresTotoRound = {
      type: ActionType.STORE_SCORES_TOTO_ROUND,
      payload: totoRoundScores,
    }
    const newState: IScoresState = reducer(initialState, action)

    test('returns a state w/ totoRoundScores', () => {
      expect(newState).not.toEqual(initialState)
      expect(newState.fixtureWithScores).toBeNull()
      expect(newState.roundScores).toBeNull()
      expect(newState.totalTotoScores).toBeNull()
      expect(newState.totoRoundScores).not.toBeNull()
      expect(newState).toHaveProperty('totoRoundScores')
      expect(newState.totoRoundScores?.scores.length).toBeGreaterThan(0)
      expect(newState.totoRoundScores?.scores.length).toBeLessThan(2)
    })
  })

  describe('if given STORE_PLAYER_SCORES action type and a payload with totoRound', () => {
    const initialState: IScoresState = {
      fixtureWithScores: null,
      roundScores: null,
      totalTotoScores: null,
      totoRoundScores: null,
      scoresPlayer: null,
    }
    const scoresPlayer: IScoresPlayer = {
      id: 1,
      scores: [[1], [3]],
      name: 'test_user',
    }
    const action: StorePlayerScores = {
      type: ActionType.STORE_PLAYER_SCORES,
      payload: scoresPlayer,
    }
    const newState: IScoresState = reducer(initialState, action)

    test('returns a state w/ scoresPlayer', () => {
      expect(newState).not.toEqual(initialState)
      expect(newState.fixtureWithScores).toBeNull()
      expect(newState.roundScores).toBeNull()
      expect(newState.totalTotoScores).toBeNull()
      expect(newState.totoRoundScores).toBeNull()
      expect(newState).toHaveProperty('scoresPlayer')
      expect(newState.scoresPlayer?.scores.length).toBeGreaterThan(0)
      expect(newState.scoresPlayer?.scores.length).toBeLessThan(3)
    })
  })
})
