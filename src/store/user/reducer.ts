import { LOGIN_SUCCESS_USER } from './types';

const initialState: any = {
  id: null,
  name: null,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS_USER:
      const userToken = action.user.token;
      userToken && localStorage.setItem('user_token', userToken);
      return { ...state, ...action.user };
    default:
      return state;
  }
};

export default userReducer;
