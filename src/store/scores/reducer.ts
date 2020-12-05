import {
  SCORES_FIXTURE_FETCHED,
  ScoresActionTypes,
  ScoresState,
} from './types';

const initialState: ScoresState = {
  fixture: null,
};

const scoresReducer = (state = initialState, action: ScoresActionTypes) => {
  switch (action.type) {
    case SCORES_FIXTURE_FETCHED:
      return { ...state, fixture: action.fixture };

    default:
      return state;
  }
};

export default scoresReducer;
