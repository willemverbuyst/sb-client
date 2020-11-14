import {
  LOG_IN_SUCCESS_USER,
  LOG_OUT_USER,
  TOKEN_STILL_VALID_USER,
  UserState,
  UserActionTypes,
} from './types';

const initialState: UserState = {
  userData: null,
};

const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case LOG_IN_SUCCESS_USER:
      const userToken = action.userData.token;
      userToken && localStorage.setItem('user_token', userToken);
      return { ...state, userData: action.userData };

    case LOG_OUT_USER:
      localStorage.removeItem('user_token');
      return { ...initialState, userData: null };

    case TOKEN_STILL_VALID_USER:
      return { ...state, user: action.userData };

    default:
      return state;
  }
};

export default userReducer;
