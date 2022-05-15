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
import {
  postPrediction,
  resetAllPredictions,
  storeAllPredictions,
  updatePrediction,
} from '../actions'

describe('#predictionsState', () => {
  describe('#storeAllPredictions', () => {
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
    const expected: StoreAllPredictions = {
      type: ActionType.STORE_ALL_PREDICTIONS,
      payload: allPredictions,
    }

    test('returns an action w/ type STORE_ALL_PREDICTIONS and fixtures as payload', () => {
      expect(storeAllPredictions(allPredictions)).toEqual(expected)
      expect(storeAllPredictions(allPredictions).payload).toEqual(
        allPredictions
      )
      expect(storeAllPredictions(allPredictions).type).toEqual(
        ActionType.STORE_ALL_PREDICTIONS
      )
    })
  })

  describe('#postPrediction', () => {
    const postedPrediction: IPostedPrediction = {
      prediction: {
        pGoalsAwayTeam: 1,
        pGoalsHomeTeam: 4,
        fixtureId: 1,
      },
    }
    const expected: PostPrediction = {
      type: ActionType.POST_PREDICTION,
      payload: postedPrediction,
    }

    test('returns an action w/ type POST_PREDICTION, and prediction as payload', () => {
      expect(postPrediction(postedPrediction)).toEqual(expected)
      expect(postPrediction(postedPrediction).payload).toEqual(postedPrediction)
      expect(postPrediction(postedPrediction).type).toEqual(
        ActionType.POST_PREDICTION
      )
    })
  })

  describe('#resetAllPredictions', () => {
    const expected: ResetAllPredictions = {
      type: ActionType.RESET_ALL_PREDICTIONS,
    }

    test('returns an action w/ type RESET_ALL_PREDICTIONS, and no payload', () => {
      expect(resetAllPredictions()).toEqual(expected)
      expect(resetAllPredictions().type).toEqual(
        ActionType.RESET_ALL_PREDICTIONS
      )
      expect(resetAllPredictions()).not.toHaveProperty('payload')
    })
  })

  describe('#updatePrediction', () => {
    const updatedPrediction: IUpdatedPrediction = {
      prediction: {
        pGoalsAwayTeam: 1,
        pGoalsHomeTeam: 4,
        fixtureId: 1,
      },
    }
    const expected: UpdatePrediction = {
      type: ActionType.UPDATE_PREDICTION,
      payload: updatedPrediction,
    }

    test('returns an action w/ type UPDATE_PREDICTION, and prediction as payload', () => {
      expect(updatePrediction(updatedPrediction)).toEqual(expected)
      expect(updatePrediction(updatedPrediction).payload).toEqual(
        updatedPrediction
      )
      expect(updatePrediction(updatedPrediction).type).toEqual(
        ActionType.UPDATE_PREDICTION
      )
    })
  })
})
