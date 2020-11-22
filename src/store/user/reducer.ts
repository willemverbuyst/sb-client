import {
  LOG_IN_SUCCESS_USER,
  LOG_OUT_USER,
  TOKEN_STILL_VALID_USER,
  UserState,
  UserActionTypes,
} from './types';

const token = localStorage.getItem('user_token');

const initialState: UserState = {
  token: token,
  user: null,
};

const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case LOG_IN_SUCCESS_USER:
      const userToken = action.user.token;
      userToken && localStorage.setItem('user_token', userToken);
      return { ...state, user: action.user, token: userToken };

    case LOG_OUT_USER:
      localStorage.removeItem('user_token');
      return { ...initialState, user: null, token: null };

    case TOKEN_STILL_VALID_USER:
      return { ...state, user: action.user };

    default:
      return state;
  }
};

export default userReducer;
