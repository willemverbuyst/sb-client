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
import {
  resetAllScores,
  storePlayerScores,
  storeScoresFixture,
  storeScoresRound,
  storeScoresTotalToto,
  storeScoresTotoRound,
} from '../actions'

describe('#scoressState', () => {
  describe('#resetAllScores', () => {
    const expected: ResetAllScores = {
      type: ActionType.RESET_ALL_SCORES,
    }

    test('returns an action w/ type RESET_ALL_SCORES and no payload', () => {
      expect(resetAllScores()).toEqual(expected)
      expect(resetAllScores()).not.toHaveProperty('payload')
      expect(resetAllScores().type).toEqual(ActionType.RESET_ALL_SCORES)
    })
  })

  describe('#storeScoresFixture w/ fixture', () => {
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
    const fixtureScores: IFixtureWithPlayersWithScoreAndPrediction = {
      fixture,
      scores: [predictionWithScorePerPlayer],
    }
    const expected: StoreScoresFixture = {
      type: ActionType.STORE_SCORES_FIXTURE,
      payload: fixtureScores,
    }

    test('returns an action w/ type STORE_SCORES_FIXTURE and a fixture as payload', () => {
      expect(storeScoresFixture(fixtureScores)).toEqual(expected)
      expect(storeScoresFixture(fixtureScores).type).toEqual(
        ActionType.STORE_SCORES_FIXTURE
      )
      expect(storeScoresFixture(fixtureScores).payload).toEqual(fixtureScores)
    })
  })

  describe('#storeScoresRound w/ sores', () => {
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
    const expected: StoreScoresRound = {
      type: ActionType.STORE_SCORES_ROUND,
      payload: roundScores,
    }

    test('returns an action w/ type STORE_SCORES_ROUND and a round with scores as payload', () => {
      expect(storeScoresRound(roundScores)).toEqual(expected)
      expect(storeScoresRound(roundScores).payload).toEqual(roundScores)
      expect(storeScoresRound(roundScores).type).toEqual(
        ActionType.STORE_SCORES_ROUND
      )
    })
  })

  describe('#storeScoresTotalToto w/ sores', () => {
    const totalToto: ITotalToto = {
      scores: [
        {
          score: 10,
          name: 'test_user',
          id: 1,
        },
      ],
    }

    const expected: StoreScoresTotalToto = {
      type: ActionType.STORE_SCORES_TOTAL_TOTO,
      payload: totalToto,
    }

    test('returns an action w/ type STORE_SCORES_TOTAL_TOTO and totalToto scores as payload', () => {
      expect(storeScoresTotalToto(totalToto)).toEqual(expected)
      expect(storeScoresTotalToto(totalToto).payload).toEqual(totalToto)
      expect(storeScoresTotalToto(totalToto).type).toBe(
        ActionType.STORE_SCORES_TOTAL_TOTO
      )
    })
  })

  describe('#storeScoresTotoRound w/ sores', () => {
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
    const expected: StoreScoresTotoRound = {
      type: ActionType.STORE_SCORES_TOTO_ROUND,
      payload: totoRoundScores,
    }

    test('returns an action w/ type SCORES_TOTO_ROUND_FETCHED and a totoRound as payload', () => {
      expect(storeScoresTotoRound(totoRoundScores)).toEqual(expected)
      expect(storeScoresTotoRound(totoRoundScores).payload).toEqual(
        totoRoundScores
      )
      expect(storeScoresTotoRound(totoRoundScores).type).toBe(
        ActionType.STORE_SCORES_TOTO_ROUND
      )
    })
  })

  describe('#storeScoresPlayer w/ sores', () => {
    const scoresPlayer: IScoresPlayer = {
      id: 1,
      scores: [[1], [3]],
      name: 'test_user',
    }
    const expected: StorePlayerScores = {
      type: ActionType.STORE_PLAYER_SCORES,
      payload: scoresPlayer,
    }

    test('returns an action w/ type STORE_PLAYER_SCORES and a scoresPlayer as payload', () => {
      expect(storePlayerScores(scoresPlayer)).toEqual(expected)
      expect(storePlayerScores(scoresPlayer).payload).toEqual(scoresPlayer)
      expect(storePlayerScores(scoresPlayer).type).toBe(
        ActionType.STORE_PLAYER_SCORES
      )
    })
  })
})
