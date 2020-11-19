import { SCORES_MATCH_FETCHED, ScoresActionTypes, ScoresState } from './types';

const initialState: ScoresState = {
  games: null,
  match: null,
  toto: null,
};

const scoresReducer = (state = initialState, action: ScoresActionTypes) => {
  switch (action.type) {
    case SCORES_MATCH_FETCHED:
      return { ...state, match: action.match };

    default:
      return state;
  }
};

export default scoresReducer;
