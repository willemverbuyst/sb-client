import {
  SCORES_MATCHES_FETCHED,
  ScoresActionTypes,
  ScoresState,
} from './types';

const initialState: ScoresState = {
  games: null,
  matches: null,
  toto: null,
};

const scoresReducer = (state = initialState, action: ScoresActionTypes) => {
  switch (action.type) {
    case SCORES_MATCHES_FETCHED:
      return { ...state, matches: action.matches };

    default:
      return state;
  }
};

export default scoresReducer;
