import {
  REMOVE_ALL_SCORES,
  SCORES_FIXTURE_FETCHED,
  SCORES_TOTAL_TOTO_FETCHED,
  SCORES_TOTO_ROUND_FETCHED,
  ScoresActionTypes,
  ScoresState,
} from './types';

const initialState: ScoresState = {
  fixtureScores: null,
  totalTotoScores: null,
  totoRoundScores: null,
};

const scoresReducer = (state = initialState, action: ScoresActionTypes) => {
  switch (action.type) {
    case REMOVE_ALL_SCORES:
      return {
        fixtureScores: null,
        totalTotoScores: null,
        totoRoundScores: null,
      };

    case SCORES_FIXTURE_FETCHED:
      return { ...state, fixtureScores: action.fixture };

    case SCORES_TOTAL_TOTO_FETCHED:
      return { ...state, totalTotoScores: action.totalToto };

    case SCORES_TOTO_ROUND_FETCHED:
      return { ...state, totoRoundScores: action.totoRound };

    default:
      return state;
  }
};

export default scoresReducer;
