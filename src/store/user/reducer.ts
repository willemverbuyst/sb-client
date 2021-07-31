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
    currentRound?: ICurrentRound;
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
        user: action.payload.data.user,
        token: action.payload.token,
      };

    case ActionType.LOG_OUT_USER:
      localStorage.removeItem('user_token');
      return { token: null, user: null };

    case ActionType.TOKEN_STILL_VALID_USER:
      localStorage.setItem('user_token', action.payload.token);
      return {
        user: action.payload.data.user,
        token: action.payload.token,
      };

    case ActionType.UPDATE_USER_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          profile: action.payload.data.user.profile,
        },
      };

    case ActionType.UPDATE_USER_CURRENT_ROUND:
      if (state.user && state.user.currentRound) {
        return {
          ...state,
          user: {
            ...state.user,
            currentRound: {
              ...state.user.currentRound,
              fixtures: state.user.currentRound.fixtures.map((fixture) =>
                fixture.id === action.payload.prediction.fixtureId
                  ? {
                      ...fixture,
                      predictions: {
                        pGoalsHomeTeam:
                          action.payload.prediction.pGoalsHomeTeam,
                        pGoalsAwayTeam:
                          action.payload.prediction.pGoalsAwayTeam,
                      },
                    }
                  : fixture,
              ),
            },
          },
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};

export default userReducer;
