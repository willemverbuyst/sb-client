import axios from 'axios'

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
import { appDoneLoading, appLoading } from '../../appState/actions'
import {
  fetchPlayerScores,
  fetchScoresFixture,
  fetchScoresRound,
  fetchScoresTotalToto,
  fetchScoresTotoRound,
} from '../action-creators'
import {
  resetScoresPlayer,
  storePlayerScores,
  storeScoresFixture,
  storeScoresRound,
  storeScoresTotalToto,
  storeScoresTotoRound,
} from '../actions'

const mockAxios = axios as jest.Mocked<typeof axios>

beforeEach(() => {
  jest.resetAllMocks()
})

describe('#fetchScoresFixture', () => {
  it('calls axios and returns a fixture with scores', async () => {
    const id = 1
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
    const predictionWithScorePerUser: IPlayerWithScoreAndPrediction = {
      pGoalsAwayTeam: 1,
      pGoalsHomeTeam: 1,
      score: 10,
      name: 'test_user',
      userId: 'id_1',
    }
    const fixtureScores: IFixtureWithPlayersWithScoreAndPrediction = {
      fixture,
      scores: [predictionWithScorePerUser],
    }

    const dispatch = jest.fn()
    const getState = jest.fn()
    const extraArg = 'extra'
    const response = { data: { data: fixtureScores } }

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response))

    await fetchScoresFixture(id)(dispatch, getState, extraArg)

    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(appLoading())
    expect(dispatch).toHaveBeenCalledWith(
      storeScoresFixture(response.data.data)
    )
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading())
    expect(dispatch).toHaveBeenCalledTimes(3)
  })
})

describe('#fetchScoresRound', () => {
  it('calls axios and returns a round with scores', async () => {
    const id = 1
    const roundScores: IRoundWithPlayersWithScore = {
      scores: [
        {
          userId: 'id_1',
          score: 1,
          name: 'test_user',
        },
      ],
      roundId: 1,
    }

    const dispatch = jest.fn()
    const getState = jest.fn()
    const extraArg = 'extra'
    const response = { data: { data: roundScores } }

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response))

    await fetchScoresRound(id)(dispatch, getState, extraArg)

    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(appLoading())
    expect(dispatch).toHaveBeenCalledWith(storeScoresRound(response.data.data))
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading())
    expect(dispatch).toHaveBeenCalledTimes(3)
  })
})

describe('#fetchScoresTotalToto', () => {
  it('calls axios and returns the totalToto', async () => {
    const totalTotoScores: ITotalToto = {
      scores: [
        {
          score: 10,
          name: 'test_user',
          userId: 'id_1',
        },
      ],
    }

    const dispatch = jest.fn()
    const getState = jest.fn()
    const extraArg = 'extra'
    const response = { data: { data: totalTotoScores } }

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response))

    await fetchScoresTotalToto()(dispatch, getState, extraArg)

    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(appLoading())
    expect(dispatch).toHaveBeenCalledWith(
      storeScoresTotalToto(response.data.data)
    )
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading())
    expect(dispatch).toHaveBeenCalledTimes(3)
  })
})

describe('#fetchScoresTotoRound', () => {
  it('calls axios and returns a totoRound with scores', async () => {
    const id = 1
    const totoRoundScores: ITotoRoundWithPlayersWithScore = {
      scores: [
        {
          userId: 'id_1',
          score: 1,
          name: 'test_user',
        },
      ],
      totoRoundId: 1,
    }

    const dispatch = jest.fn()
    const getState = jest.fn()
    const extraArg = 'extra'
    const response = { data: { data: totoRoundScores } }

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response))

    await fetchScoresTotoRound(id)(dispatch, getState, extraArg)

    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(appLoading())
    expect(dispatch).toHaveBeenCalledWith(
      storeScoresTotoRound(response.data.data)
    )
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading())
    expect(dispatch).toHaveBeenCalledTimes(3)
  })
})

describe('#fetchPlayerScores', () => {
  it('calls axios and returns a totoRound with scores', async () => {
    const id = 'id_1'
    const scoresPlayer: IScoresPlayer = {
      userId: 'id_1',
      scores: [[1], [3]],
      name: 'test_user',
    }

    const dispatch = jest.fn()
    const getState = jest.fn()
    const extraArg = 'extra'
    const response = { data: { data: scoresPlayer } }

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response))

    await fetchPlayerScores(id)(dispatch, getState, extraArg)

    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(appLoading())
    expect(dispatch).toHaveBeenCalledWith(resetScoresPlayer())
    expect(dispatch).toHaveBeenCalledWith(storePlayerScores(response.data.data))
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading())
    expect(dispatch).toHaveBeenCalledTimes(4)
  })
})
