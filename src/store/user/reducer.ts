import { IUser } from '../../models/player.model';
import { ICurrentRound } from '../../models/toto.models';
import { ActionType } from './action-types';
import { UserActions } from './action-types';

export interface IUserWithCurrentRound extends IUser {
  currentRound: ICurrentRound;
}

export interface IUserState {
  token: string | null;
  user: {
    profile: IUser;
    currentRound: ICurrentRound;
  } | null;
}

const token = localStorage.getItem('user_token');

const initialState: IUserState = {
  token: token,
  user: null,
};

const userReducer = (state = initialState, action: UserActions): IUserState => {
  switch (action.type) {
    case ActionType.LOG_IN_SUCCESS_USER:
      localStorage.setItem('user_token', action.payload.token);
      return {
        ...state,
        user: action.payload.data.user,
        token: action.payload.token,
      };

    case ActionType.LOG_OUT_USER:
      localStorage.removeItem('user_token');
      return { ...initialState, token: null, user: null };

    case ActionType.TOKEN_STILL_VALID_USER:
      localStorage.setItem('user_token', action.payload.token);
      return {
        ...state,
        user: action.payload.data.user,
        token: action.payload.token,
      };

    case ActionType.UPDATE_USER_PROFILE:
      localStorage.setItem('user_token', action.payload.token);
      return {
        ...state,
        user: action.payload.data.user,
        token: action.payload.token,
      };

    default:
      return state;
  }
};

export default userReducer;
