import { IMessage } from '../../models/app.models';
import { ActionTypeAppState } from './action-types';
import { AppStateActions } from './actions';

export interface IAppState {
  loading: boolean;
  message: IMessage | null;
}

const initialState: IAppState = {
  loading: false,
  message: null,
};

const appStateReducer = (state = initialState, action: AppStateActions): IAppState => {
  switch (action.type) {
    case ActionTypeAppState.APP_LOADING:
      return { ...state, loading: true };

    case ActionTypeAppState.APP_DONE_LOADING:
      return { ...state, loading: false };

    case ActionTypeAppState.SET_MESSAGE:
      return { ...state, message: { ...action.payload } };

    default:
      return state;
  }
};

export default appStateReducer;
