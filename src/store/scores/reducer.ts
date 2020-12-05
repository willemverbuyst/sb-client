import {
  SCORES_FIXTURE_FETCHED,
  SCORES_TOTO_ROUND_FETCHED,
  ScoresActionTypes,
  ScoresState,
} from './types';

const initialState: ScoresState = {
  fixtureScores: null,
  totoRoundScores: null,
};

const scoresReducer = (state = initialState, action: ScoresActionTypes) => {
  switch (action.type) {
    case SCORES_FIXTURE_FETCHED:
      return { ...state, fixtureScores: action.fixture };

    case SCORES_TOTO_ROUND_FETCHED:
      return { ...state, totoRoundScores: action.totoRound };

    default:
      return state;
  }
};

export default scoresReducer;
