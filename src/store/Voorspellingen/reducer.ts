import {
  CURRENT_ROUND_FETCHED,
  ALL_FIXTURES_FETCHED,
  REMOVE_ALL_FIXTURES,
  VoorspellingenState,
  VoorspellingenActionTypes,
} from './types';

const initialState: VoorspellingenState = {
  currentRound: null,
  allFixtures: null,
};

const userReducer = (
  state = initialState,
  action: VoorspellingenActionTypes
) => {
  switch (action.type) {
    case CURRENT_ROUND_FETCHED:
      return { ...state, currentRound: action.currentRound };

    case ALL_FIXTURES_FETCHED:
      return { ...state, allFixtures: action.allFixtures };

    case REMOVE_ALL_FIXTURES:
      return { ...state, allFixtures: null };

    default:
      return state;
  }
};

export default userReducer;
