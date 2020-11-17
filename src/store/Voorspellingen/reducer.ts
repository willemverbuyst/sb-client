import {
  CURRENT_ROUND_FETCHED,
  VoorspellingenState,
  VoorspellingenActionTypes,
} from './types';

const initialState: VoorspellingenState = {
  currentRound: null,
};

const userReducer = (
  state = initialState,
  action: VoorspellingenActionTypes
) => {
  switch (action.type) {
    case CURRENT_ROUND_FETCHED:
      return { ...state, currentRound: action.currentRound };

    default:
      return state;
  }
};

export default userReducer;
