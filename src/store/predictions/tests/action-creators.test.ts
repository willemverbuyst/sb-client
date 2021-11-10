import axios from 'axios'

import { Severity } from '../../../models/app.models'
import {
  IPlayerWithPredictions,
  IPostedPrediction,
  IPrediction,
  IUpdatedPrediction,
} from '../../../models/predictions.model'
import { appDoneLoading, appLoading, setMessage } from '../../appState/actions'
import { updateUserCurrentRound } from '../../user/actions'
import {
  changePrediction,
  getAllPredictions,
  postNewPrediction,
} from '../action-creators'
import {
  postPrediction,
  resetAllPredictions,
  storeAllPredictions,
  updatePrediction,
} from '../actions'

const mockAxios = axios as jest.Mocked<typeof axios>

beforeEach(() => {
  jest.resetAllMocks()
})

describe('#changePrediction', () => {
  it('calls axios and changes an existing prediction', async () => {
    const prediction: IPrediction = {
      pGoalsAwayTeam: 1,
      pGoalsHomeTeam: 4,
      fixtureId: 1,
    }

    const dispatch = jest.fn()
    const getState = jest.fn()
    const extraArg = 'extra'
    const response: {
      data: {
        status: Severity
        data: IUpdatedPrediction
        message: string
      }
    } = {
      data: {
        status: 'success',
        data: { prediction },
        message: 'test_message',
      },
    }

    mockAxios.patch.mockImplementationOnce(() => Promise.resolve(response))

    await changePrediction(prediction)(dispatch, getState, extraArg)

    expect(mockAxios.patch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(appLoading())
    expect(dispatch).toHaveBeenCalledWith(
      setMessage(response.data.status, response.data.message)
    )
    expect(dispatch).toHaveBeenCalledWith(updatePrediction(response.data.data))
    expect(dispatch).toHaveBeenCalledWith(
      updateUserCurrentRound(response.data.data)
    )
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading())
    expect(dispatch).toHaveBeenCalledTimes(5)
  })
})

describe('#getAllPredictions', () => {
  it('calls axios and returns predictions', async () => {
    const allPredictions: IPlayerWithPredictions = {
      player: 'Piet',
      fixtures: [
        [
          [
            {
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
              score: 'scores',
              predictions: {
                pGoalsAwayTeam: null,
                pGoalsHomeTeam: null,
              },
            },
          ],
        ],
      ],
    }
    const playerId = 1
    const dispatch = jest.fn()
    const getState = jest.fn()
    const extraArg = 'extra'
    const response = { data: { status: 'success', data: allPredictions } }

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response))

    await getAllPredictions(playerId)(dispatch, getState, extraArg)

    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(resetAllPredictions())
    expect(dispatch).toHaveBeenCalledWith(appLoading())
    expect(dispatch).toHaveBeenCalledWith(
      storeAllPredictions(response.data.data)
    )
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading())
    expect(dispatch).toHaveBeenCalledTimes(4)
  })
})

describe('#postNewPrediction', () => {
  it('calls axios and adds a prediction', async () => {
    const prediction: IPrediction = {
      pGoalsAwayTeam: 1,
      pGoalsHomeTeam: 4,
      fixtureId: 1,
    }

    const dispatch = jest.fn()
    const getState = jest.fn()
    const extraArg = 'extra'
    const response: {
      data: {
        status: Severity
        data: IPostedPrediction
        message: string
      }
    } = {
      data: {
        status: 'success',
        data: { prediction },
        message: 'test_message',
      },
    }

    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response))

    await postNewPrediction(prediction)(dispatch, getState, extraArg)

    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(appLoading())
    expect(dispatch).toHaveBeenCalledWith(postPrediction(response.data.data))
    expect(dispatch).toHaveBeenCalledWith(
      setMessage(response.data.status, response.data.message)
    )
    expect(dispatch).toHaveBeenCalledWith(
      updateUserCurrentRound(response.data.data)
    )
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading())
    expect(dispatch).toHaveBeenCalledTimes(5)
  })
})
