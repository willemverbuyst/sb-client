import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  AppState,
  AppStateTypes,
} from './types';

const initialState: AppState = {
  loading: false,
  message: null,
};

const appStateReducer = (state = initialState, action: AppStateTypes) => {
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
