import {
  CURRENT_ROUND_FETCHED,
  ALL_FIXTURES_FETCHED,
  POST_PREDICTION,
  REMOVE_ALL_FIXTURES,
  UPDATE_PREDICTION,
  PredictionsState,
  PredictionActionTypes,
} from './types';

const initialState: PredictionsState = {
  currentRound: null,
  allFixtures: null,
};

const predictionsReducer = (
  state = initialState,
  action: PredictionActionTypes
) => {
  switch (action.type) {
    case CURRENT_ROUND_FETCHED:
      return { ...state, currentRound: action.currentRound };

    case ALL_FIXTURES_FETCHED:
      return { ...state, allFixtures: action.allFixtures };

    case POST_PREDICTION:
      console.log('in the reducer');

      if (state.allFixtures) {
        return {
          ...state,
          allFixtures: state.allFixtures.map((af) => af),
          // allFixtures: state.allFixtures.map((game) =>
          //   game.map((round) =>
          //     round.map((fixture) => {
          //       if (fixture.id === action.prediction.fixtureId) {
          //         return {
          //           ...fixture,
          //           predictions: {
          //             pGoalsHomeTeam: action.prediction.pGoalsHomeTeam,
          //             pGoalsAwayTeam: action.prediction.pGoalsAwayTeam,
          //           },
          //         };
          //       }
          //       return {
          //         ...fixture,
          //       };
          //     })
          //   )
          // ),
        };
      }
      return { ...state };

    case REMOVE_ALL_FIXTURES:
      return { allFixtures: null, currentRound: null };

    case UPDATE_PREDICTION:
      if (state.allFixtures) {
        return {
          ...state,
          allFixtures: state.allFixtures.map((game) =>
            game.map((round) =>
              round.map((fixture) => {
                if (fixture.id === action.prediction.fixtureId) {
                  return {
                    ...fixture,
                    predictions: {
                      pGoalsHomeTeam: action.prediction.pGoalsHomeTeam,
                      pGoalsAwayTeam: action.prediction.pGoalsAwayTeam,
                    },
                  };
                }
                return {
                  ...fixture,
                };
              })
            )
          ),
        };
      }
      return { ...state };

    default:
      return state;
  }
};

export default predictionsReducer;
