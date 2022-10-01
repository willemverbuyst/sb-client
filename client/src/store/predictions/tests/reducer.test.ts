import {
  IPlayerWithPredictions,
  IPostedPrediction,
  IUpdatedPrediction,
} from '../../../models/predictions.model'
import {
  ActionType,
  PostPrediction,
  ResetAllPredictions,
  StoreAllPredictions,
  UpdatePrediction,
} from '../action-types'
import reducer, { IPredictionsState } from '../reducer'

describe('#IPredictionsStateReducer', () => {
  describe('if given STORE_ALL_PREDICTIONS action type and intialState', () => {
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
    const initialState: IPredictionsState = {
      allPredictions: null,
    }
    const action: StoreAllPredictions = {
      type: ActionType.STORE_ALL_PREDICTIONS,
      payload: allPredictions,
    }
    const newState: IPredictionsState = reducer(initialState, action)

    test('returns the initial state with all fixtures', () => {
      expect(newState.allPredictions).not.toEqual(null)
      expect(newState.allPredictions?.fixtures.length).not.toBe(3)
      expect(newState).not.toEqual(initialState)
    })
  })

  describe('if given POST_PREDICTION action type and a state', () => {
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
    const postedPrediction: IPostedPrediction = {
      prediction: {
        pGoalsAwayTeam: 1,
        pGoalsHomeTeam: 4,
        fixtureId: 1,
      },
    }
    const state: IPredictionsState = {
      allPredictions,
    }
    const newAllPredictions: IPlayerWithPredictions = {
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
                pGoalsAwayTeam: 1,
                pGoalsHomeTeam: 4,
              },
            },
          ],
        ],
      ],
    }
    const action: PostPrediction = {
      type: ActionType.POST_PREDICTION,
      payload: postedPrediction,
    }
    const newState: IPredictionsState = reducer(state, action)

    test('returns the state with prediction added', () => {
      expect(newState.allPredictions).not.toEqual(null)
      expect(newState.allPredictions).toEqual(newAllPredictions)
    })
  })

  describe('if given RESET_ALL_PREDICTIONS action type and a state', () => {
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
    const initialState: IPredictionsState = {
      allPredictions: null,
    }
    const state: IPredictionsState = {
      allPredictions,
    }
    const action: ResetAllPredictions = {
      type: ActionType.RESET_ALL_PREDICTIONS,
    }
    const newState: IPredictionsState = reducer(state, action)

    test('returns the initial state', () => {
      expect(newState.allPredictions).toEqual(null)
      expect(newState).toEqual(initialState)
    })
  })

  describe('if given UPDATE_PREDICTION action type and a state', () => {
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
                pGoalsAwayTeam: 1,
                pGoalsHomeTeam: 1,
              },
            },
          ],
        ],
      ],
    }
    const updatedPrediction: IUpdatedPrediction = {
      prediction: {
        pGoalsAwayTeam: 1,
        pGoalsHomeTeam: 4,
        fixtureId: 1,
      },
    }
    const state: IPredictionsState = {
      allPredictions,
    }
    const newAllPredictions: IPlayerWithPredictions = {
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
                pGoalsAwayTeam: 1,
                pGoalsHomeTeam: 4,
              },
            },
          ],
        ],
      ],
    }
    const action: UpdatePrediction = {
      type: ActionType.UPDATE_PREDICTION,
      payload: updatedPrediction,
    }
    const newState: IPredictionsState = reducer(state, action)

    test('returns the state with updated prediction', () => {
      expect(newState.allPredictions).not.toEqual(null)
      expect(newState.allPredictions).toEqual(newAllPredictions)
    })
  })
})
