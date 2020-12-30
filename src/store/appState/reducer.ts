import { APP_DONE_LOADING, APP_LOADING, AppState, AppStateTypes, SET_MESSAGE } from './types';

const initialState: AppState = {
  loading: false,
  message: null,
};

const appStateReducer = (state = initialState, action: AppStateTypes): AppState => {
  switch (action.type) {
    case APP_LOADING:
      return { ...state, loading: true };

    case APP_DONE_LOADING:
      return { ...state, loading: false };

    case SET_MESSAGE:
      return { ...state, message: { ...action.payload } };

    default:
      return state;
  }
};

export default appStateReducer;
