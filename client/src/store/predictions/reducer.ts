import { IPlayerWithPredictions } from '../../models/predictions.model'
import { ActionType, PredictionActions } from './action-types'

export interface IPredictionsState {
  allPredictions: IPlayerWithPredictions | null
}

const initialState: IPredictionsState = {
  allPredictions: null,
}

const predictionsReducer = (
  state = initialState,
  action: PredictionActions
): IPredictionsState => {
  switch (action.type) {
    case ActionType.STORE_ALL_PREDICTIONS:
      return { ...state, allPredictions: action.payload }

    case ActionType.POST_PREDICTION:
      return {
        ...state,
        allPredictions: state.allPredictions
          ? {
              player: state.allPredictions.player,
              fixtures: state.allPredictions.fixtures.map((totoRound) =>
                totoRound.map((round) =>
                  round.map((fixture) =>
                    fixture.id === action.payload.prediction.fixtureId
                      ? {
                          ...fixture,
                          predictions: {
                            pGoalsHomeTeam:
                              action.payload.prediction.pGoalsHomeTeam,
                            pGoalsAwayTeam:
                              action.payload.prediction.pGoalsAwayTeam,
                          },
                        }
                      : fixture
                  )
                )
              ),
            }
          : null,
      }

    case ActionType.RESET_ALL_PREDICTIONS:
      return { allPredictions: null }

    case ActionType.UPDATE_PREDICTION:
      return {
        ...state,
        allPredictions: state.allPredictions
          ? {
              player: state.allPredictions.player,
              fixtures: state.allPredictions.fixtures.map((totoRound) =>
                totoRound.map((round) =>
                  round.map((fixture) =>
                    fixture.id === action.payload.prediction.fixtureId
                      ? {
                          ...fixture,
                          predictions: {
                            pGoalsHomeTeam:
                              action.payload.prediction.pGoalsHomeTeam,
                            pGoalsAwayTeam:
                              action.payload.prediction.pGoalsAwayTeam,
                          },
                        }
                      : fixture
                  )
                )
              ),
            }
          : null,
      }

    default:
      return state
  }
}

export default predictionsReducer
