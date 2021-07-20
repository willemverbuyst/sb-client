import { ICurrentRound, TotoRound } from '../../models/toto.models';
import { ActionType, PredictionActions } from './action-types';

export interface IPredictionsState {
  currentRound: ICurrentRound | null;
  allPredictions: { fixtures: TotoRound[]; player: string } | null;
}

const initialState: IPredictionsState = {
  currentRound: null,
  allPredictions: null,
};

const predictionsReducer = (
  state = initialState,
  action: PredictionActions,
): IPredictionsState => {
  switch (action.type) {
    case ActionType.STORE_ALL_PREDICTIONS:
      return { ...state, allPredictions: action.payload };

    case ActionType.POST_PREDICTION:
      return {
        ...state,
        allPredictions: state.allPredictions
          ? {
              player: state.allPredictions.player,
              fixtures: state.allPredictions.fixtures.map((totoRound) =>
                totoRound.map((round) =>
                  round.map((fixture) =>
                    fixture.id === action.payload.fixtureId
                      ? {
                          ...fixture,
                          predictions: {
                            pGoalsHomeTeam: action.payload.pGoalsHomeTeam,
                            pGoalsAwayTeam: action.payload.pGoalsAwayTeam,
                          },
                        }
                      : fixture,
                  ),
                ),
              ),
            }
          : null,
        currentRound: state.currentRound
          ? {
              ...state.currentRound,
              fixtures: state.currentRound.fixtures.map((fixture) =>
                fixture.id === action.payload.fixtureId
                  ? {
                      ...fixture,
                      predictions: {
                        pGoalsHomeTeam: action.payload.pGoalsHomeTeam,
                        pGoalsAwayTeam: action.payload.pGoalsAwayTeam,
                      },
                    }
                  : fixture,
              ),
            }
          : null,
      };

    case ActionType.RESET_ALL_PREDICTIONS:
      return { allPredictions: null, currentRound: null };

    case ActionType.UPDATE_PREDICTION:
      return {
        ...state,
        allPredictions: state.allPredictions
          ? {
              player: state.allPredictions.player,
              fixtures: state.allPredictions.fixtures.map((totoRound) =>
                totoRound.map((round) =>
                  round.map((fixture) =>
                    fixture.id === action.payload.fixtureId
                      ? {
                          ...fixture,
                          predictions: {
                            pGoalsHomeTeam: action.payload.pGoalsHomeTeam,
                            pGoalsAwayTeam: action.payload.pGoalsAwayTeam,
                          },
                        }
                      : fixture,
                  ),
                ),
              ),
            }
          : null,
        currentRound: state.currentRound
          ? {
              ...state.currentRound,
              fixtures: state.currentRound.fixtures.map((fixture) =>
                fixture.id === action.payload.fixtureId
                  ? {
                      ...fixture,
                      predictions: {
                        pGoalsHomeTeam: action.payload.pGoalsHomeTeam,
                        pGoalsAwayTeam: action.payload.pGoalsAwayTeam,
                      },
                    }
                  : fixture,
              ),
            }
          : null,
      };

    default:
      return state;
  }
};

export default predictionsReducer;
